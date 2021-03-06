/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PopularEpisodesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: popularEpisode_Query
// ====================================================

export interface popularEpisode_Query_popularEpisodes_popularEpisodes_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface popularEpisode_Query_popularEpisodes_popularEpisodes {
  __typename: "Episode";
  id: number;
  title: string;
  episodeImg: string | null;
  seenNum: number | null;
  podcast: popularEpisode_Query_popularEpisodes_popularEpisodes_podcast;
}

export interface popularEpisode_Query_popularEpisodes {
  __typename: "PopularEpisodesOutput";
  ok: boolean;
  error: string | null;
  popularEpisodes: popularEpisode_Query_popularEpisodes_popularEpisodes[] | null;
}

export interface popularEpisode_Query {
  popularEpisodes: popularEpisode_Query_popularEpisodes;
}

export interface popularEpisode_QueryVariables {
  input: PopularEpisodesInput;
}
