import React from 'react';
import { useAddNewTournamentMutation } from 'services';
import { Button } from 'styles';
import { onlyLatinCharacters } from 'utilities/helpers/string.helper';

interface Props {}

function AddTournaments() {
  const [addTournament, { isLoading }] = useAddNewTournamentMutation();

  const handleAddTournament = () => {
    const name = prompt('Tournament Name:');

    const nameFilter = onlyLatinCharacters(name)?.toString();

    if (nameFilter) {
      addTournament({ name: nameFilter })
        .then((response) => console.log('New Tournament', response))
        .catch((error) => console.error('New Tournament Error', error));
    }
  };

  return (
    <div>
      <Button onClick={handleAddTournament}>Create Tournament</Button>
    </div>
  );
}

export default AddTournaments;
