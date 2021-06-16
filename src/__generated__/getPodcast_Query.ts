/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPodcast_Query
// ====================================================

export interface getPodcast_Query_getPodcast_podcast_host {
  __typename: "User";
  id: number;
  nickName: string;
}

export interface getPodcast_Query_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: getPodcast_Query_getPodcast_podcast_host;
}

export interface getPodcast_Query_getPodcast {
  __typename: "GetAllPodcastOutput";
  error: string | null;
  ok: boolean;
  podcast: getPodcast_Query_getPodcast_podcast[];
}

export interface getPodcast_Query {
  getPodcast: getPodcast_Query_getPodcast;
}
