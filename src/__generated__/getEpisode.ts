/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisode
// ====================================================

export interface getEpisode_getAllEpisode_episodes_seenUser {
  __typename: "User";
  id: number;
}

export interface getEpisode_getAllEpisode_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  episodeImg: string | null;
  seenUser: getEpisode_getAllEpisode_episodes_seenUser[];
}

export interface getEpisode_getAllEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  error: string | null;
  episodes: getEpisode_getAllEpisode_episodes[] | null;
}

export interface getEpisode {
  getAllEpisode: getEpisode_getAllEpisode;
}

export interface getEpisodeVariables {
  input: GetEpisodeInput;
}
