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
 * Get connected wallet accounts.
 */
async function getAccounts(): Promise<string[]> {
  return (window as any).ethereum.request({
    method: 'eth_requestAccounts',
    params: [],
  });
}

/**
 * Handle incoming JSON-RPC requests from dapps via wallet_invokeSnap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const accounts = await getAccounts();

  switch (request.method) {
    case 'findCampaigns': {
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
        message: `${campaign.title}: ${campaign.message}`.slice(0, 50),
      },
    });

    // Mark as delivered for the first connected account
    if (accounts.length > 0) {
      await markDelivered(accounts[0], campaign.id);
    }
  }
};

/**
 * Runs once when the snap is first installed.
 * Registers the wallet in the SmartSentinels database.
 */
export const onInstall: OnInstallHandler = async () => {
  const accounts = await getAccounts();

  for (const account of accounts) {
    await registerWallet(account);
  }

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: (
        <Box>
          <Heading>Welcome to SmartSentinels!</Heading>
          <Text>
            You'll receive campaign alerts, airdrop notifications, and
            exclusive opportunities directly inside MetaMask.
          </Text>
          <Text>
            {`${accounts.length} wallet${accounts.length > 1 ? 's' : ''} registered.`}
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

    if (accounts.length > 0) {
      await markDelivered(accounts[0], campaignId, true);
    }
  }
};
