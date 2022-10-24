import { useDebounce } from 'hooks';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'styles';
import AddTournaments from './containers/AddTournaments/AddTournaments';
import TournamentsList from './containers/TournamentsList/TournamentsList';

const Header = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 1.25rem 0rem;
  width: 100%;
`;

const TournamentsManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchTerm(value);
  };

  return (
    <>
      <Header>
        <Input
          autoFocus
          value={searchTerm}
          onChange={onChange}
          placeholder="Search tournament..."
        />
        <AddTournaments />
      </Header>
      <TournamentsList searchTerm={debouncedSearchTerm} />
    </>
  );
};
export default TournamentsManager;
