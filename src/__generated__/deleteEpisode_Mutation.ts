/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodeSearchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteEpisode_Mutation
// ====================================================

export interface deleteEpisode_Mutation_deleteEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteEpisode_Mutation {
  deleteEpisode: deleteEpisode_Mutation_deleteEpisode;
}

export interface deleteEpisode_MutationVariables {
  input: EpisodeSearchInput;
}
