import { Box, Heading, Divider, Text, Icon } from '@metamask/snaps-sdk/jsx';
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
        <Box direction="horizontal" alignment="space-between">
          <Heading>SmartSentinels</Heading>
          <Icon name="warning" color="muted" />
        </Box>
        <Text color="error">Error loading campaigns. Please try again later.</Text>
      </Box>
    );
  }

  if (campaigns === 0 || (typeof campaigns !== 'number' && campaigns.length === 0)) {
    return (
      <Box>
        <Heading>SmartSentinels</Heading>
        <Text color="muted">No active campaigns right now.</Text>
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

  const priorityCampaigns = campaigns.filter((c) =>
    PRIORITY_TYPES.includes(c.campaign_type),
  );
  const otherCampaigns = campaigns.filter(
    (c) => !PRIORITY_TYPES.includes(c.campaign_type),
  );

  return (
    <Box>
      <Heading>SmartSentinels</Heading>
      <Divider />

      {priorityCampaigns.map((campaign) => (
        <CampaignBanner campaign={campaign} />
      ))}

      {otherCampaigns.map((campaign) => (
        <CampaignCard campaign={campaign} />
      ))}
    </Box>
  );
}
