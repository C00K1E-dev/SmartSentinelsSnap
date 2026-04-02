import { Box, Banner, Text, Link } from '@metamask/snaps-sdk/jsx';
import { Campaign, BannerSeverity } from '../interfaces/component_interfaces';

function mapSeverity(
  severity: BannerSeverity,
): 'info' | 'success' | 'warning' | 'danger' {
  return severity;
}

export default function CampaignBanner({ campaign }: { campaign: Campaign }) {
  const link =
    campaign.action_url || campaign.url || 'https://smartsentinels.net';

  return (
    <Box>
      <Banner title={campaign.title} severity={mapSeverity(campaign.banner_severity)}>
        <Text>{campaign.message}</Text>
        <Link href={link}>{campaign.action_label}</Link>
      </Banner>
    </Box>
  );
}
