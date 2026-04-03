import type {
  OnRpcRequestHandler,
  OnHomePageHandler,
  OnCronjobHandler,
  OnInstallHandler,
  OnUserInputHandler,
} from '@metamask/snaps-sdk';
import { Box, Text, Heading } from '@metamask/snaps-sdk/jsx';
import { getCampaigns, registerWallet, markDelivered } from './api/smartsentinels';
import CampaignsView from './components/CampaignsView';
import CampaignDialog from './components/CampaignDialog';
import type { Campaign } from './interfaces/component_interfaces';

/**
 * Get stored wallet accounts from snap state.
 */
async function getStoredAccounts(): Promise<string[]> {
  const state = await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  }) as { accounts?: string[] } | null;
  return state?.accounts ?? [];
}

/**
 * Save wallet accounts to snap state.
 */
async function storeAccounts(accounts: string[]): Promise<void> {
  await snap.request({
    method: 'snap_manageState',
    params: { operation: 'update', newState: { accounts } },
  });
}

/**
 * Get accounts — reads stored state first, falls back to eth_requestAccounts
 * (which prompts once), then stores for future use.
 */
async function getAccounts(): Promise<string[]> {
  // Try stored accounts first (no prompt)
  const stored = await getStoredAccounts();
  if (stored.length > 0) return stored;

  // No stored accounts — request from MetaMask (prompts user once)
  try {
    const raw = await ethereum.request<string[]>({
      method: 'eth_requestAccounts',
      params: [],
    }) ?? [];
    const accounts = raw.filter((a): a is string => typeof a === 'string');

    if (accounts.length > 0) {
      await storeAccounts(accounts);
    }
    return accounts;
  } catch {
    return [];
  }
}

/**
 * Handle incoming JSON-RPC requests from dapps via wallet_invokeSnap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'findCampaigns': {
      // Dapp passes connected accounts as params
      const params = request.params as { accounts?: string[] } | undefined;
      let accounts = params?.accounts ?? [];

      // Store accounts from dapp for later use by onHomePage/onCronjob
      if (accounts.length > 0) {
        await storeAccounts(accounts);
      } else {
        accounts = await getAccounts();
      }

      const campaigns = await getCampaigns(accounts);

      if (typeof campaigns === 'number') {
        return snap.request({
          method: 'snap_dialog',
          params: {
            type: 'alert',
            content: (
              <Box>
                <Text>
                  {campaigns === -1
                    ? 'Error fetching campaigns'
                    : 'No active campaigns found'}
                </Text>
              </Box>
            ),
          },
        });
      }

      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: (
            <Box>
              <CampaignsView campaigns={campaigns} accounts={accounts} />
            </Box>
          ),
        },
      });
    }
    default:
      throw new Error('Method not found.');
  }
};

/**
 * Snap homepage — shows active campaigns for connected wallets.
 */
export const onHomePage: OnHomePageHandler = async () => {
  const accounts = await getAccounts();
  const campaigns = await getCampaigns(accounts);

  return {
    content: <CampaignsView campaigns={campaigns} accounts={accounts} />,
  };
};

/**
 * Cron job — runs every 30 minutes to check for new campaigns
 * and send push notifications.
 */
export const onCronjob: OnCronjobHandler = async ({ request }) => {
  if (request.method !== 'checkCampaigns') return;

  const accounts = await getAccounts();
  const campaigns = await getCampaigns(accounts);

  if (typeof campaigns === 'number' || campaigns.length === 0) return;

  // Notify about up to 3 new campaigns per cron tick (rate limit: 5/min)
  const toNotify = campaigns.slice(0, 3);

  for (const campaign of toNotify) {
    const link = campaign.action_url || campaign.url || 'https://smartsentinels.net';

    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: `${campaign.title}: ${campaign.message}`.slice(0, 80),
        title: campaign.title,
        content: (
          <Box>
            <Text>{campaign.message}</Text>
            {campaign.description ? (
              <Text>{campaign.description}</Text>
            ) : null}
            {campaign.sponsor ? (
              <Text color="muted">Powered by {campaign.sponsor}</Text>
            ) : null}
          </Box>
        ),
        footerLink: {
          text: campaign.action_label || 'Learn More',
          href: link,
        },
      } as any,
    });

    // Mark as delivered for the first connected account
    if (accounts[0]) {
      await markDelivered(accounts[0], campaign.id);
    }
  }
};

/**
 * Runs once when the snap is first installed.
 * Registers the wallet in the SmartSentinels database.
 */
export const onInstall: OnInstallHandler = async () => {
  const raw = await ethereum.request<string[]>({
    method: 'eth_requestAccounts',
    params: [],
  }) ?? [];
  const accounts = raw.filter((a): a is string => typeof a === 'string');

  // Store accounts so onHomePage/onCronjob can use them
  if (accounts.length > 0) {
    await storeAccounts(accounts);
  }

  for (const account of accounts) {
    await registerWallet(account);
  }

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: (
        <Box>
          <Heading>Welcome to SmartSentinels! 🛡️</Heading>
          <Text>
            Your wallet is now connected. You'll receive airdrop alerts,
            campaign notifications, and exclusive opportunities directly
            inside MetaMask.
          </Text>
          <Text>
            Open this snap anytime from Menu → Snaps to see active campaigns.
          </Text>
        </Box>
      ),
    },
  });
};

/**
 * Handles interactive UI events (button clicks from campaign cards).
 */
export const onUserInput: OnUserInputHandler = async ({ id, event }) => {
  if (event.type !== 'ButtonClickEvent' || !event.name) return;

  const name = event.name;

  // Handle campaign action buttons: "action-{campaignId}"
  if (name.startsWith('action-')) {
    const campaignId = name.replace('action-', '');
    const accounts = await getAccounts();

    if (accounts[0]) {
      await markDelivered(accounts[0], campaignId, true);
    }
  }
};
