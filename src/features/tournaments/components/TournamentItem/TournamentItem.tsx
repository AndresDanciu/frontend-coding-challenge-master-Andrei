/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import { Tournament } from 'models';
import { Button, Card, H6 } from 'styles';
import { formatDate, onlyLatinCharacters } from 'utilities/helpers';
import {
  useDeleteTournamentMutation,
  useEditTournamentMutation,
} from 'services';
import styled from 'styled-components';

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 8px;
`;

interface Props {
  tournament: Tournament;
}

export function TournamentItem({ tournament }: Props) {
  const [editTournament] = useEditTournamentMutation();
  const [deleteTournament] = useDeleteTournamentMutation();

  const {
    id,
    name: nameTournament,
    game,
    organizer,
    participants,
    startDate,
  } = tournament;

  const date = formatDate(startDate);

  const handleEditTournament = async () => {
    const newName = prompt('New Tournament Name:', nameTournament);

    const nameFilter = onlyLatinCharacters(newName)?.toString();

    if (nameFilter) {
      try {
        await editTournament({ id, name: nameFilter }).unwrap();
      } catch {
        console.error('Update Error');
      }
      // .then((response) => console.log('Update', response))
      // .catch((error) => console.error('Update Error', error));
    }
  };

  const handleRemoveTournament = () => {
    if (window.confirm('Do you really want to delete this tournament?')) {
      deleteTournament(id)
        .then((response) => console.log('Delete', response))
        .catch((error) => console.error('Delete Error', error));
    }
  };

  return (
    <Card>
      <H6>{nameTournament}</H6>
      <div>
        <div>
          <span>Organizer: </span>
          <span>{organizer}</span>
        </div>
        <div>
          <span>Game: </span>
          <span>{game}</span>
        </div>
        <div>
          <span>Participants: </span>
          <span>{participants?.current}</span>
        </div>
        <div>Start: {date}</div>
      </div>
      <Actions>
        <Button onClick={handleEditTournament}>Edit</Button>
        <Button onClick={handleRemoveTournament}>Delete</Button>
      </Actions>
    </Card>
  );
}
