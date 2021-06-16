/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcast
// ====================================================

export interface searchPodcast_searchPodcast_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnail: string | null;
  updateAt: any;
}

export interface searchPodcast_searchPodcast {
  __typename: "SearchPodcastOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  totalResults: number | null;
  currentPage: number | null;
  currentCount: number | null;
  podcasts: searchPodcast_searchPodcast_podcasts[] | null;
}

export interface searchPodcast {
  searchPodcast: searchPodcast_searchPodcast;
}

export interface searchPodcastVariables {
  input: SearchPodcastInput;
}
