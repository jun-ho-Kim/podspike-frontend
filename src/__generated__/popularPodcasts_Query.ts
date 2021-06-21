/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: popularPodcasts_Query
// ====================================================

export interface popularPodcasts_Query_popularPodcasts_popularPodcasts_subscriber {
  __typename: "User";
  id: number;
}

export interface popularPodcasts_Query_popularPodcasts_popularPodcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  description: string | null;
  thumbnail: string | null;
  updateAt: any;
  subscriber: popularPodcasts_Query_popularPodcasts_popularPodcasts_subscriber[] | null;
}

export interface popularPodcasts_Query_popularPodcasts {
  __typename: "PopularPodcastsOutput";
  ok: boolean;
  error: string | null;
  popularPodcasts: popularPodcasts_Query_popularPodcasts_popularPodcasts[] | null;
}

export interface popularPodcasts_Query {
  popularPodcasts: popularPodcasts_Query_popularPodcasts;
}
