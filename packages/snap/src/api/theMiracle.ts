import { Benefit } from "../interfaces/component_interfaces";
export async function getBenefits(addresses: string[]) {
    try {
        // Initialize combined benefits object
        const allBenefitsByCollection: Record<string, Benefit[]> = {};
        const allBenefits: Benefit[] = [];
        // Fetch benefits for each address
        for (const address of addresses) {
            const url = `https://www.themiracle.io/api/v1/wallet/${"ethereum"}/${address}/benefits`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-api-key': `073a5a4d-e0cb-4a5d-95ae-f9ec6d0b33d8`
                }
            });
            
            if (!response.ok) {
                console.log("Error: ", response.status);
                continue; // Skip this address if there's an error, but continue with others
            }

            const data = await response.json();
            // Add benefits from this address to the combined object
            data.forEach((benefit: Benefit) => {
                benefit.collections.forEach((collection) => {
                    if (!allBenefitsByCollection[collection.name]) {
                        allBenefitsByCollection[collection.name] = [];
                    }
                    // Avoid duplicates by checking if benefit already exists
                    if (!allBenefitsByCollection[collection.name]?.some(b => JSON.stringify(b) === JSON.stringify(benefit))) {
                        allBenefitsByCollection[collection.name]?.push(benefit);
                    }
                });
            });
            allBenefits.push(...data);
        }

        // If no benefits were found for any address, return error code
        if (Object.keys(allBenefitsByCollection).length === 0) {
            console.log("No benefits found");
            return 0;
        }

        return allBenefits;
    } catch (error) {
        console.log("error fetching benefits", error);
        return -1;
    }
}
