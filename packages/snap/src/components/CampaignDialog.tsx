import { Box, Text, Heading, Bold, Link, Divider } from '@metamask/snaps-sdk/jsx';
import { Campaign } from '../interfaces/component_interfaces';

export default function CampaignDialog({ campaign }: { campaign: Campaign }) {
  const link =
    campaign.action_url || campaign.url || 'https://smartsentinels.net';

  return (
    <Box>
      <Heading>{campaign.title}</Heading>
      <Text>
        <Bold>{campaign.message}</Bold>
      </Text>
      {campaign.description ? (
        <Text>{campaign.description}</Text>
      ) : null}
      <Divider />
      {campaign.sponsor ? (
        <Text>Powered by {campaign.sponsor}</Text>
      ) : null}
      <Link href={link}>{campaign.action_label}</Link>
    </Box>
  );
}
