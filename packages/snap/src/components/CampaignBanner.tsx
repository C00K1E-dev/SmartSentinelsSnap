import { Section, Heading, Text, Bold, Icon, Link, Box, Image } from '@metamask/snaps-sdk/jsx';
import { Campaign } from '../interfaces/component_interfaces';

const TYPE_ICON: Record<string, string> = {
  airdrop: 'send',
  claim: 'received',
  mint: 'flash',
};

export default function CampaignBanner({ campaign }: { campaign: Campaign }) {
  const link =
    campaign.action_url || campaign.url || 'https://smartsentinels.net';
  const iconName = TYPE_ICON[campaign.campaign_type] || 'notification';

  return (
    <Section>
      {campaign.logo_svg ? (
        <Box center>
          <Image src={campaign.logo_svg} />
        </Box>
      ) : null}
      <Box direction="horizontal" alignment="start">
        <Icon name={iconName as any} color="primary" size="md" />
        <Heading size="sm">{campaign.title}</Heading>
      </Box>
      <Text>
        <Bold>{campaign.message}</Bold>
      </Text>
      {campaign.description ? (
        <Text>{campaign.description}</Text>
      ) : null}
      {campaign.sponsor ? (
        <Text color="muted">Powered by {campaign.sponsor}</Text>
      ) : null}
      <Link href={link}>{campaign.action_label}</Link>
    </Section>
  );
}
