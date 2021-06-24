/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProfileInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProfileMutation
// ====================================================

export interface editProfileMutation_editProfile_user {
  __typename: "User";
  id: number;
  email: string;
  nickName: string;
  role: UserRole;
  profilePhoto: string | null;
}

export interface editProfileMutation_editProfile {
  __typename: "EditProfileOutput";
  ok: boolean;
  error: string | null;
  user: editProfileMutation_editProfile_user | null;
}

export interface editProfileMutation {
  editProfile: editProfileMutation_editProfile;
}

export interface editProfileMutationVariables {
  input: EditProfileInput;
}
