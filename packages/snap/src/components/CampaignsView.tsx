import { Box, Heading, Divider, Text } from '@metamask/snaps-sdk/jsx';
import { Campaign } from '../interfaces/component_interfaces';
import CampaignBanner from './CampaignBanner';
import CampaignCard from './CampaignCard';

const PRIORITY_TYPES = ['claim', 'airdrop', 'mint'];

export default function CampaignsView({
  campaigns,
  accounts,
}: {
  campaigns: Campaign[] | number;
  accounts: string[];
}) {
  if (campaigns === -1) {
    return (
      <Box>
        <Text>Error loading campaigns. Please try again later.</Text>
      </Box>
    );
  }

  if (campaigns === 0 || (typeof campaigns !== 'number' && campaigns.length === 0)) {
    return (
      <Box>
        <Heading>SmartSentinels</Heading>
        <Text>
          {`No active campaigns for ${accounts.length} wallet${accounts.length > 1 ? 's' : ''}`}
        </Text>
      </Box>
    );
  }

  if (typeof campaigns === 'number') {
    return (
      <Box>
        <Text>Unexpected state</Text>
      </Box>
    );
  }

  // Split: priority campaigns get banners, rest get cards
  const priorityCampaigns = campaigns.filter((c) =>
    PRIORITY_TYPES.includes(c.campaign_type),
  );
  const otherCampaigns = campaigns.filter(
    (c) => !PRIORITY_TYPES.includes(c.campaign_type),
  );

  return (
    <Box>
      <Heading>SmartSentinels Campaigns</Heading>
      <Text>{`${accounts.length} wallet${accounts.length > 1 ? 's' : ''} connected`}</Text>
      <Divider />

      {priorityCampaigns.map((campaign) => (
        <CampaignBanner campaign={campaign} />
      ))}

      {priorityCampaigns.length > 0 && otherCampaigns.length > 0 ? (
        <Divider />
      ) : null}

      {otherCampaigns.map((campaign) => (
        <CampaignCard campaign={campaign} />
      ))}
    </Box>
  );
}
