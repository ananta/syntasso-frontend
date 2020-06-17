import React from 'react';
import Section from 'components/Layout/Section';
import HeroWithForm from 'components/Common/HeroWithForm';
import PricingTable from 'components/Common/PricingTable';
import FAQ from 'components/Common/FAQ';
import InfoSection from 'components/Common/InfoSection';

const Home = () => {
    return (
        <div>
            <Section isInverted hasPattern>
                <HeroWithForm />
            </Section>
            <Section>
                <PricingTable />
            </Section>
            <Section isInverted>
                <FAQ />
            </Section>
            <Section>
                <InfoSection />
            </Section>
        </div>
    );
};

export default Home;
