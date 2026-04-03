import { Campaign } from '../interfaces/component_interfaces';

const API_BASE = 'https://smartsentinels.net';

export async function getCampaigns(
  addresses: string[],
): Promise<Campaign[] | 0 | -1> {
  try {
    // If no accounts available, use a zero address to fetch public campaigns
    const wallets = addresses.length > 0
      ? addresses
      : ['0x0000000000000000000000000000000000000000'];

    const allCampaigns: Campaign[] = [];
    const seenIds = new Set<string>();

    for (const address of wallets) {
      const url = `${API_BASE}/api/snap/campaigns?wallet=${address.toLowerCase()}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.log('Error fetching campaigns:', response.status);
        continue;
      }

      const data = await response.json();
      for (const campaign of data.campaigns ?? []) {
        if (!seenIds.has(campaign.id)) {
          seenIds.add(campaign.id);
          allCampaigns.push(campaign);
        }
      }
    }

    if (allCampaigns.length === 0) {
      return 0;
    }

    return allCampaigns;
  } catch (error) {
    console.log('Error fetching campaigns:', error);
    return -1;
  }
}

export async function registerWallet(address: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/snap/register-wallet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress: address }),
    });
    return response.ok;
  } catch (error) {
    console.log('Error registering wallet:', error);
    return false;
  }
}

export async function markDelivered(
  address: string,
  campaignId: string,
  clicked = false,
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/snap/campaign-delivered`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        walletAddress: address,
        campaignId,
        clicked,
      }),
    });
    return response.ok;
  } catch (error) {
    console.log('Error marking delivery:', error);
    return false;
  }
}
