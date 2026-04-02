import { Section, Heading, Text, Bold, Icon, Link, Box } from '@metamask/snaps-sdk/jsx';
import type { IconName as IconNameType } from '@metamask/snaps-sdk/jsx';
import { Campaign } from '../interfaces/component_interfaces';

const TYPE_ICON: Record<string, IconNameType> = {
  airdrop: 'send-1',
  claim: 'received',
  mint: 'flash',
};

export default function CampaignBanner({ campaign }: { campaign: Campaign }) {
  const link =
    campaign.action_url || campaign.url || 'https://smartsentinels.net';
  const iconName = TYPE_ICON[campaign.campaign_type] || 'notification';

  return (
    <Section>
      <Box direction="horizontal" alignment="start">
        <Icon name={iconName} color="primary" size="md" />
        <Heading size="sm">{campaign.title}</Heading>
      </Box>
      <Text>
        <Bold>{campaign.message}</Bold>
      </Text>
      {campaign.description ? (
        <Text>{campaign.description}</Text>
      ) : null}
      {campaign.sponsor ? (
        <Text color="muted">Sponsored by {campaign.sponsor}</Text>
      ) : null}
      <Link href={link}>{campaign.action_label}</Link>
    </Section>
  );
}
