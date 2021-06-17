/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPodcastsQuery
// ====================================================

export interface myPodcastsQuery_myPodcasts_myPodcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  createdAt: any;
  thumbnail: string | null;
  category: string;
  description: string | null;
}

export interface myPodcastsQuery_myPodcasts {
  __typename: "MyPodcastsOutput";
  ok: boolean;
  error: string | null;
  myPodcasts: myPodcastsQuery_myPodcasts_myPodcasts[] | null;
}

export interface myPodcastsQuery {
  myPodcasts: myPodcastsQuery_myPodcasts;
}
