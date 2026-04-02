import { Box, Card, Section, Button, Row, Link } from '@metamask/snaps-sdk/jsx';
import { Benefit } from '../interfaces/component_interfaces';
import { benefitSubCategoryMap } from './icons/benefit_sub_data';
import GasIcon from '../../images/gas.svg';

export default function BenefitPreview({ benefit }: { benefit: Benefit }) {
    const getIconForBenefit = (benefitName: string) => {
        return benefitSubCategoryMap[benefitName as keyof typeof benefitSubCategoryMap];
    };

    const maxLength = 18;
    const formatDate = (date: string | null) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit', 
            year: 'numeric'
        });
    };
    const title = benefit.longTitle.length > maxLength ? benefit.longTitle.substring(0, maxLength) + '...' : benefit.longTitle;
    const description = benefit.longDescription.length > maxLength ? benefit.longDescription.substring(0, maxLength) + '...' : benefit.longDescription;
    const link = benefit.url && (benefit.url.startsWith('https:') || benefit.url.startsWith('mailto:') || benefit.url.startsWith('metamask:')) ? benefit.url : 'https://degenz.finance';
    return (
        <Box alignment='start'>
            <Section alignment='start'>
                <Card
                    image={getIconForBenefit(benefit.categories?.[0]?.name ?? GasIcon)}
                    title={title}
                    description={description}
                    value={formatDate(benefit.validFrom)}
                    extra={formatDate(benefit.validTo)}
                />
            </Section>
            <Link href={link}> Learn more! </Link>
        </Box>
    );
}