/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: subscribeMutation
// ====================================================

export interface subscribeMutation_subscribe {
  __typename: "SubscribeOutput";
  ok: boolean;
  error: string | null;
}

export interface subscribeMutation {
  subscribe: subscribeMutation_subscribe;
}

export interface subscribeMutationVariables {
  input: SubscribeInput;
}
