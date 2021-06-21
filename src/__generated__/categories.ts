/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoriesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: categories
// ====================================================

export interface categories_categories_podcasts_subscriber {
  __typename: "User";
  id: number;
  nickName: string;
}

export interface categories_categories_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnail: string | null;
  description: string | null;
  updateAt: any;
  subscriber: categories_categories_podcasts_subscriber[] | null;
}

export interface categories_categories {
  __typename: "CategoriesOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  totalResults: number | null;
  currentPage: number | null;
  currentCount: number | null;
  categories: string | null;
  podcasts: categories_categories_podcasts[] | null;
}

export interface categories {
  categories: categories_categories;
}

export interface categoriesVariables {
  input: CategoriesInput;
}
