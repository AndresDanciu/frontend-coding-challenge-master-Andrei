// import { AuthState } from 'app/models';
import { Tournament } from 'models';
import { tournamentApi } from 'services/tournament/tournament.api';

export interface RootReducer {
  tournaments: Tournament[];
}

export const rootReducers = {
  [tournamentApi.reducerPath]: tournamentApi.reducer,
};

export const middlewares = [tournamentApi.middleware];

/**
 *
 * The initial state of the store. Useful for preloading previous user sessions
 *
 */
export const initialState = {};
