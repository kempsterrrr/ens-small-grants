import { mq, Heading, Spinner } from '@ensdomains/thorin';
import styled, { css } from 'styled-components';

import BackButton from '../components/BackButton';
import RoundCard from '../components/RoundCard';
import { useRounds } from '../hooks';
import { Round as RoundType } from '../types';

const RoundGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${theme.space['72']}, 1fr));
    gap: ${theme.space['8']};
    width: 100%;

    ${mq.md.min(css`
      grid-template-columns: repeat(auto-fill, minmax(${theme.space['96']}, 1fr));
    `)}
  `
);

const Title = styled(Heading)(
  () => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    width: 100%;

    text-align: left;
  `
);

const Rounds = () => {
  const { rounds, isLoading } = useRounds();

  if (isLoading || !rounds) {
    return <Spinner />;
  }

  const title = <Title>All rounds</Title>;
  const activeRounds = rounds.filter((round: RoundType) => round.proposalStart < new Date());

  return (
    <>
      <BackButton to="/" title={title} />
      <RoundGrid>
        {activeRounds.map(r => (
          <RoundCard key={r.id} {...r} />
        ))}
      </RoundGrid>
      <div style={{ flexGrow: 1 }} />
    </>
  );
};

export default Rounds;
