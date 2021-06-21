/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: DetailPodcast
// ====================================================

export interface DetailPodcast_getPodcastOne_podcast_subscriber {
  __typename: "User";
  id: number;
}

export interface DetailPodcast_getPodcastOne_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
}

export interface DetailPodcast_getPodcastOne_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  subscriber: DetailPodcast_getPodcastOne_podcast_subscriber[] | null;
  episodes: DetailPodcast_getPodcastOne_podcast_episodes[] | null;
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
