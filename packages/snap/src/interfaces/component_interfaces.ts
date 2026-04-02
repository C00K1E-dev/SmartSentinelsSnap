export type CampaignType =
  | 'alert'
  | 'claim'
  | 'mint'
  | 'join_seed'
  | 'join_private'
  | 'join_public'
  | 'airdrop'
  | 'whitelist';

export type BannerSeverity = 'info' | 'success' | 'warning' | 'danger';

export interface Campaign {
  id: string;
  title: string;
  message: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  sponsor: string | null;
  campaign_type: CampaignType;
  action_label: string;
  action_url: string | null;
  banner_severity: BannerSeverity;
  start_date: string;
  end_date: string | null;
}
