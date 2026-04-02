import { Box, Card, Section, Link, Text, Bold } from '@metamask/snaps-sdk/jsx';
import { Campaign } from '../interfaces/component_interfaces';

function formatDate(date: string | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

function actionLabelForType(campaign: Campaign): string {
  return campaign.action_label || 'Learn More';
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const maxLen = 22;
  const title =
    campaign.title.length > maxLen
      ? campaign.title.substring(0, maxLen) + '...'
      : campaign.title;
  const description =
    (campaign.message || '').length > maxLen
      ? campaign.message.substring(0, maxLen) + '...'
      : campaign.message || '';

  const endInfo = campaign.end_date
    ? `Ends ${formatDate(campaign.end_date)}`
    : '';

  const link =
    campaign.action_url || campaign.url || 'https://smartsentinels.net';

  return (
    <Box>
      <Section>
        <Card
          title={title}
          description={description}
          value={endInfo}
          extra={campaign.sponsor || ''}
        />
      </Section>
      {campaign.description ? (
        <Text>
          <Bold>{actionLabelForType(campaign)}:</Bold> {campaign.description}
        </Text>
      ) : null}
      <Link href={link}>{actionLabelForType(campaign)}</Link>
    </Box>
  );
}
