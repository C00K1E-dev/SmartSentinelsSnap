import { Benefit } from "../interfaces/component_interfaces";
import { Box, Text, Heading } from '@metamask/snaps-sdk/jsx';
import BenefitPreview from "./BenefitPreview";
import BenefitsView from "./BenefitsView";

export default function BenefitsViewDialogPopup({benefits, origin, request, accounts}: {
  benefits: Benefit[] | number, 
  origin: string, 
  request: any,
  accounts: string[]
}) {
      if (benefits === -1) {
        return snap.request({
          method: "snap_dialog",
          params: {
            type: "alert",
            content: (
              <Box>
                <Text>Error fetching benefits</Text>
              </Box>
            ),
          }
        });
      }
      
      return snap.request({
        method: "snap_dialog",
        params: {
          type: "alert",
          content: (
            <Box>
              <BenefitsView benefits={benefits} accounts={accounts} />
            </Box>
          ),
        }
      });
}