/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SawEpisodesInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: sawEpisodeMutation
// ====================================================

export interface sawEpisodeMutation_sawEpisodes {
  __typename: "SawEpisodesOutput";
  ok: boolean;
  error: string | null;
  isSawEpisode: boolean | null;
}

export interface sawEpisodeMutation {
  sawEpisodes: sawEpisodeMutation_sawEpisodes;
}

export interface sawEpisodeMutationVariables {
  input: SawEpisodesInput;
}
