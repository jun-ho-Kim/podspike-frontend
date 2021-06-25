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

export interface CategoriesInput {
  page?: number | null;
  category: string;
  takeNumber?: number | null;
}

export interface CreateAccountInput {
  id?: number | null;
  createdAt?: any | null;
  updateAt?: any | null;
  nickName?: string | null;
  profilePhoto?: string | null;
  email?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
  role?: UserRole | null;
  podcasts?: PodcastInput[] | null;
  subscriptions?: PodcastInput[] | null;
  reviews?: ReviewInput[] | null;
  playedLists?: EpisodeInput[] | null;
  sawEpisode?: EpisodeInput[] | null;
}

export interface CreateEpisodeInput {
  id: number;
  title: string;
  description: string;
  seenNum?: number | null;
  episodeImg?: string | null;
  audioUrl?: string | null;
  audioLength?: number | null;
}

export interface CreatePodcastInput {
  title: string;
  category: string;
  description?: string | null;
  thumbnail?: string | null;
}

export interface CreateReviewInput {
  title: string;
  text: string;
  podcastId: number;
}

export interface EditProfileInput {
  nickName?: string | null;
  profilePhoto?: string | null;
  email?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
  role?: UserRole | null;
}

export interface EpisodeInput {
  title: string;
  description: string;
  episodeImg?: string | null;
  seenNum?: number | null;
  podcast: PodcastInput;
  audioUrl?: string | null;
  audioLength?: number | null;
  player: UserInputType;
  seenUser: UserInputType[];
}

export interface EpisodeSearchInput {
  id: number;
}

export interface GetEpisodeDetailInput {
  id: number;
}

export interface GetEpisodeInput {
  id: number;
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
  subscriber?: UserInputType[] | null;
  subscriberNum?: number | null;
  episodes?: EpisodeInput[] | null;
  host: UserInputType;
  reviews?: ReviewInput[] | null;
}

export interface PodcastSearchInput {
  id: number;
}

export interface PopularEpisodesInput {
  page?: number | null;
}

export interface PopularPodcastInput {
  page?: number | null;
}

export interface ReviewInput {
  title: string;
  text: string;
  creator: UserInputType;
  podcast: PodcastInput;
}

export interface SawEpisodesInput {
  id?: number | null;
}

export interface SearchPodcastInput {
  page?: number | null;
  query: string;
  takeNumber?: number | null;
}

export interface SubscribeInput {
  podcastId: number;
}

export interface UpdatePodcastInput {
  id?: number | null;
  createdAt?: any | null;
  updateAt?: any | null;
  title?: string | null;
  category?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  subscriber?: UserInputType[] | null;
  subscriberNum?: number | null;
  host?: UserInputType | null;
}

export interface UserInputType {
  nickName: string;
  profilePhoto?: string | null;
  email: string;
  password: string;
  passwordConfirm: string;
  role: UserRole;
  podcasts: PodcastInput[];
  subscriptions: PodcastInput[];
  reviews?: ReviewInput[] | null;
  playedLists?: EpisodeInput[] | null;
  sawEpisode?: EpisodeInput[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
