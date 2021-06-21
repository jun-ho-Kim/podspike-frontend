/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: recentPodcasts_Query
// ====================================================

export interface recentPodcasts_Query_recentPodcasts_podcast_host {
  __typename: "User";
  id: number;
  nickName: string;
}

export interface recentPodcasts_Query_recentPodcasts_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  thumbnail: string | null;
  host: recentPodcasts_Query_recentPodcasts_podcast_host;
}

export interface recentPodcasts_Query_recentPodcasts {
  __typename: "GetAllPodcastOutput";
  error: string | null;
  ok: boolean;
  podcast: recentPodcasts_Query_recentPodcasts_podcast[];
}

export interface recentPodcasts_Query {
  recentPodcasts: recentPodcasts_Query_recentPodcasts;
}
