/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodeDetailInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodeDetail_Query
// ====================================================

export interface getEpisodeDetail_Query_getEpisodeDetail_episode_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnail: string | null;
}

export interface getEpisodeDetail_Query_getEpisodeDetail_episode {
  __typename: "Episode";
  id: number;
  title: string;
  description: string;
  createdAt: any;
  podcast: getEpisodeDetail_Query_getEpisodeDetail_episode_podcast;
}

export interface getEpisodeDetail_Query_getEpisodeDetail {
  __typename: "GetEpisodeDetailOutput";
  ok: boolean;
  error: string | null;
  episode: getEpisodeDetail_Query_getEpisodeDetail_episode | null;
}

export interface getEpisodeDetail_Query {
  getEpisodeDetail: getEpisodeDetail_Query_getEpisodeDetail;
}

export interface getEpisodeDetail_QueryVariables {
  input: GetEpisodeDetailInput;
}
