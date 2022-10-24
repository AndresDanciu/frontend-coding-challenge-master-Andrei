import { ErrorGeneric, Loading } from 'components';
import { TournamentItem } from 'features/tournaments/components';
import React, { useEffect, useState } from 'react';
import { useGetTournamentsQuery } from 'services';
import styled from 'styled-components';
import { H6 } from 'styles';

// TODO adding global css variables
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
  width: 100%;
  gap: 24px;
`;

type Props = {
  searchTerm: string;
};

function TournamentsList({ searchTerm = '' }: Props) {
  const [filter, setFilter] = useState(searchTerm);
  const {
    data: tournaments = [],
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useGetTournamentsQuery(filter);

  useEffect(() => {
    // Min length search
    if (searchTerm.length === 0 || searchTerm.length > 2) {
      setFilter(searchTerm);
    }
  }, [searchTerm]);

  if (isLoading || isFetching) return <Loading />;

  if (isError)
    return <ErrorGeneric message="Something went wrong" onRetry={refetch} />;

  if (!tournaments || tournaments.length === 0) {
    return <H6>No tournaments found.</H6>;
  }

  return (
    <Container>
      {tournaments?.map((tournament) => (
        <TournamentItem tournament={tournament} key={tournament.id} />
      ))}
    </Container>
  );
}

export default TournamentsList;
