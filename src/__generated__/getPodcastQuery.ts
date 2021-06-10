/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastQuery
// ====================================================

export interface getPodcastQuery_getPodcastOne_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnail: string | null;
}

export interface getPodcastQuery_getPodcastOne {
  __typename: "GetPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcastQuery_getPodcastOne_podcast | null;
}

export interface getPodcastQuery {
  getPodcastOne: getPodcastQuery_getPodcastOne;
}

export interface getPodcastQueryVariables {
  input: GetPodcastInput;
}
