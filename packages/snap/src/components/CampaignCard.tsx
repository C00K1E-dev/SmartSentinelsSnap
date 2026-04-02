import { Section, Text, Bold, Link, Heading, Box, Icon } from '@metamask/snaps-sdk/jsx';
import { Campaign } from '../interfaces/component_interfaces';

function formatDate(date: string | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const label = campaign.action_label || 'Learn More';
  const link =
    campaign.action_url || campaign.url || 'https://smartsentinels.net';

  const endInfo = campaign.end_date
    ? ` · Ends ${formatDate(campaign.end_date)}`
    : '';

  return (
    <Section>
      <Box direction="horizontal" alignment="start">
        <Icon name="notification" color="muted" size="md" />
        <Heading size="sm">{campaign.title}</Heading>
      </Box>
      <Text>
        <Bold>{campaign.message}</Bold>
      </Text>
      {campaign.description ? (
        <Text>{campaign.description}</Text>
      ) : null}
      {campaign.sponsor || campaign.end_date ? (
        <Text color="muted">
          {campaign.sponsor ? `By ${campaign.sponsor}` : ''}{endInfo}
        </Text>
      ) : null}
      <Link href={link}>{label}</Link>
    </Section>
  );
}
