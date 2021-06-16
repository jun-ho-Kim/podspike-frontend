/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subscriptionQuery
// ====================================================

export interface subscriptionQuery_subscriptions_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  thumbnail: string | null;
  category: string;
  updateAt: any;
}

export interface subscriptionQuery_subscriptions {
  __typename: "SubscriptionOutput";
  ok: boolean;
  error: string | null;
  subscriptions: subscriptionQuery_subscriptions_subscriptions[] | null;
  subscriptionCount: number | null;
}

export interface subscriptionQuery {
  subscriptions: subscriptionQuery_subscriptions;
}
