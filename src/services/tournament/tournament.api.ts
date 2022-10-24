// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/default-param-last */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Tournament as TournamentResponse } from 'models';
import { API_BASE_URL, ENDPOINT_TOURNAMENT } from 'constants/api';

// type TournamentsRequest = Pick<TournamentResponse, 'id'> &
//   Partial<TournamentResponse>;
type TournamentsRequest = Partial<TournamentResponse>;

export const tournamentApi = createApi({
  reducerPath: 'tournamentApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Tournament'],
  endpoints: (builder) => ({
    getTournaments: builder.query<TournamentResponse[], string | undefined>({
      query: (searchTerm = '') => `${ENDPOINT_TOURNAMENT}?q=${searchTerm}`,
      providesTags: (result = [], error, arg) => [
        'Tournament',
        ...result.map(({ id }) => ({ type: 'Tournament' as const, id })),
      ],
    }),
    getTournament: builder.query<TournamentResponse, string>({
      query: (id) => `tournaments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tournament', id }],
    }),
    addNewTournament: builder.mutation<TournamentResponse, TournamentsRequest>({
      query: (payload) => ({
        url: ENDPOINT_TOURNAMENT,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: payload,
      }),
      invalidatesTags: ['Tournament'],
    }),
    // FIX: Clear cache when you edit with a search
    editTournament: builder.mutation<TournamentResponse, TournamentsRequest>({
      query: ({ id, ...body }) => ({
        url: `${ENDPOINT_TOURNAMENT}/${id}`,
        method: 'PATCH',
        body,
      }),
      // Optimistic updated
      onQueryStarted({ id, ...body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tournamentApi.util.updateQueryData('getTournaments', '', (draft) => {
            const tournament = draft.find((item) => item.id === id);
            if (tournament?.name && body?.name) {
              tournament.name = body.name;
            }
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    // FIX: Clear cache when you edit with a search
    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `${ENDPOINT_TOURNAMENT}/${id}`,
        method: 'DELETE',
      }),
      // Optimistic updated
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tournamentApi.util.updateQueryData('getTournaments', '', (draft) =>
            draft.filter((item) => item.id !== id)
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTournamentsQuery,
  useAddNewTournamentMutation,
  useEditTournamentMutation,
  useDeleteTournamentMutation,
} = tournamentApi;
