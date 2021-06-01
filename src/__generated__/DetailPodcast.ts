/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: DetailPodcast
// ====================================================

export interface DetailPodcast_getPodcastOne_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
}

export interface DetailPodcast_getPodcastOne {
  __typename: "GetPodcastOutput";
  error: string | null;
  ok: boolean;
  podcast: DetailPodcast_getPodcastOne_podcast | null;
}

export interface DetailPodcast {
  getPodcastOne: DetailPodcast_getPodcastOne;
}

export interface DetailPodcastVariables {
  input: GetPodcastInput;
}
