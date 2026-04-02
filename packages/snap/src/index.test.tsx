import type { OnRpcRequestHandler, OnHomePageHandler } from '@metamask/snaps-sdk';
import { Heading, Box, Text, Bold, Copyable} from '@metamask/snaps-sdk/jsx';
import { Benefit } from './interfaces/component_interfaces';
import BenefitsView from './components/BenefitsView';
import BenefitsViewDialogPopup from './components/BenefitsViewDialogPopup';
import { getBenefits } from './api/theMiracle';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  let accounts = await (window as any).ethereum.request({
    "method": "eth_requestAccounts",
    "params": [],
   });
  switch (request.method) {
    case 'findBenefits':
      const benefits = await getBenefits(accounts);
      return BenefitsViewDialogPopup({benefits, origin, request, accounts});
    default:
      throw new Error('Method not found.');
  }
};


export const onHomePage: OnHomePageHandler = async () => {
  let accounts = await (window as any).ethereum.request({
    "method": "eth_requestAccounts",
    "params": [],
   });
   const benefits = await getBenefits(accounts);
  return {
    content: (
      <BenefitsView benefits={benefits} accounts={accounts}/>
    ),
  };
};
