/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  id?: number | null;
  createdAt?: any | null;
  updateAt?: any | null;
  email?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
  role?: UserRole | null;
  podcasts?: PodcastInput[] | null;
  subscriptions?: PodcastInput[] | null;
  reviews?: ReviewInput[] | null;
  playedLists?: EpisodeInput[] | null;
}

export interface EpisodeInput {
  title: string;
  category: string;
  description: string;
  episodeImg?: string | null;
  podcast: PodcastInput;
  player: UserInputType;
}

export interface GetPodcastInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PodcastInput {
  title: string;
  category: string;
  description?: string | null;
  rating: number;
  thumbnail?: string | null;
  episodes?: EpisodeInput[] | null;
  user: UserInputType;
  reviews?: ReviewInput[] | null;
}

export interface ReviewInput {
  title: string;
  text: string;
  creator: UserInputType;
  podcast: PodcastInput;
}

export interface UserInputType {
  email: string;
  password: string;
  passwordConfirm: string;
  role: UserRole;
  podcasts: PodcastInput[];
  subscriptions: PodcastInput[];
  reviews?: ReviewInput[] | null;
  playedLists?: EpisodeInput[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
