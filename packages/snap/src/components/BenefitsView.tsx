import { Benefit } from "../interfaces/component_interfaces";
import { Box, Text, Heading } from '@metamask/snaps-sdk/jsx';
import BenefitPreview from "./BenefitPreview";

export default function BenefitsView({benefits, accounts}: {
  benefits: Benefit[] | number, 
  accounts: string[]
}) {
      if (benefits === -1) {
        return (
              <Box>
                <Text>{`Error fetching benefits: ${JSON.stringify(benefits)}`}</Text>
              </Box>
            )
      }

      else if (benefits === 0) {
        return (
              <Box>
                <Text>{`No benefits found for ${accounts.length} wallet${accounts.length > 1 ? "s" : ""}`}</Text>
              </Box>
            )
      }
      
      return (
            <Box>
              <Heading>{`Your Benefits - ${accounts.length} Wallets`}</Heading>
              {/* {Object.entries(benefits).map(([collectionName, collectionBenefits]) => (
                <Box>
                  <Heading>{`${collectionName} - ${collectionBenefits.length} Benefits`}</Heading>
                  {collectionBenefits.map((benefit: Benefit) => (
                    <BenefitPreview benefit={benefit} />
                  ))}
                </Box>
              ))} */}
              <Box>
                {typeof benefits !== 'number' && benefits.map((benefit: Benefit) => (
                  <BenefitPreview benefit={benefit} />
                ))}
              </Box>
            </Box>
        )
}