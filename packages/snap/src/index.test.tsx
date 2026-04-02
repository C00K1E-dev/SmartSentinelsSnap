import type {
  OnRpcRequestHandler,
  OnHomePageHandler,
  OnCronjobHandler,
  OnInstallHandler,
  OnUserInputHandler,
} from '@metamask/snaps-sdk';
import { Box, Text, Heading } from '@metamask/snaps-sdk/jsx';
import { getCampaigns, registerWallet, markDelivered } from './api/smartsentinels';
import CampaignsView from './components/CampaignsView';
import CampaignDialog from './components/CampaignDialog';
import type { Campaign } from './interfaces/component_interfaces';

describe('SmartSentinels Snap', () => {
  it('should export onRpcRequest handler', async () => {
    const { onRpcRequest } = await import('./index');
    expect(onRpcRequest).toBeDefined();
  });

  it('should export onHomePage handler', async () => {
    const { onHomePage } = await import('./index');
    expect(onHomePage).toBeDefined();
  });

  it('should export onCronjob handler', async () => {
    const { onCronjob } = await import('./index');
    expect(onCronjob).toBeDefined();
  });

  it('should export onInstall handler', async () => {
    const { onInstall } = await import('./index');
    expect(onInstall).toBeDefined();
  });

  it('should export onUserInput handler', async () => {
    const { onUserInput } = await import('./index');
    expect(onUserInput).toBeDefined();
  });
});
