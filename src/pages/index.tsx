import { Highlights } from '@/components/Highlights';
import { Round } from '@/kysely/db';
import { Heading, Spinner } from '@ensdomains/thorin';

import Anchor from '../components/Anchor';
import { EmptyHouse } from '../components/HouseCard';
import OpenGraphElements from '../components/OpenGraphElements';
import RoundCard from '../components/RoundCard';
import {
  ActiveTypography,
  DesktopHiddenAnchor,
  HeadingContainer,
  MobileHiddenAnchor,
  RoundGrid,
  RoundItemsOuter,
  SectionHeading,
  Subheading,
} from '../components/atoms';
import { useFetch } from '../hooks';
import { AllRounds } from './api/rounds';

const isActiveRound = (round: Round) =>
  new Date(round.votingEnd) > new Date() && new Date(round.proposalStart) < new Date();

const singleRoundCss = {
  gridTemplateColumns: '1fr',
  maxWidth: '37rem',
};

export default function Home() {
  const { data: rounds } = useFetch<AllRounds[]>('/api/rounds');
  const activeRounds = rounds?.filter(r => isActiveRound(r));

  return (
    <>
      <OpenGraphElements />

      {(() => {
        if (!rounds || !activeRounds) {
          return <Spinner size="large" color="black" />;
        }

        return (
          <>
            <HeadingContainer>
              <Heading>Developer DAO Small Grants</Heading>
              <Subheading>
                Developer DAO Small Grants allow the community to vote on projects to receive funding, funded by our
                friends in the ecosystem and the DAO.
              </Subheading>
            </HeadingContainer>

            <Highlights />

            <RoundItemsOuter>
              {activeRounds.length > 1 && (
                <SectionHeading className="desktop-only">
                  <ActiveTypography>Showing all active rounds</ActiveTypography>
                  <MobileHiddenAnchor href="/rounds">See all rounds</MobileHiddenAnchor>
                </SectionHeading>
              )}

              {activeRounds.length === 0 && (
                <div
                  style={{
                    padding: '2rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <EmptyHouse>No active rounds</EmptyHouse>
                  <Anchor href="/rounds">See all rounds</Anchor>
                </div>
              )}

              <RoundGrid style={activeRounds.length === 1 ? singleRoundCss : undefined}>
                {activeRounds.map(round => (
                  <RoundCard key={round.id} {...round} />
                ))}
              </RoundGrid>

              <SectionHeading>
                {activeRounds.length === 1 && (
                  <MobileHiddenAnchor
                    href={`/rounds`}
                    style={{
                      margin: '0.5rem auto',
                    }}
                  >
                    See all rounds
                  </MobileHiddenAnchor>
                )}
                {activeRounds.length > 0 && <DesktopHiddenAnchor href="/rounds">See all rounds</DesktopHiddenAnchor>}
              </SectionHeading>
            </RoundItemsOuter>
          </>
        );
      })()}
    </>
  );
}
