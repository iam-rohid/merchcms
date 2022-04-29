import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type ChangePasswordFailure = {
  __typename?: 'ChangePasswordFailure';
  newPasswordError?: Maybe<Scalars['String']>;
  oldPasswordError?: Maybe<Scalars['String']>;
  otherError?: Maybe<Scalars['String']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type ChangePasswordResult = ChangePasswordFailure | ChangePasswordSuccess;

export type ChangePasswordSuccess = {
  __typename?: 'ChangePasswordSuccess';
  message: Scalars['String'];
};

export type EmailPasswordSignInFailure = {
  __typename?: 'EmailPasswordSignInFailure';
  emailError?: Maybe<Scalars['String']>;
  otherError?: Maybe<Scalars['String']>;
  passwordError?: Maybe<Scalars['String']>;
};

export type EmailPasswordSignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EmailPasswordSignInResult = EmailPasswordSignInFailure | EmailPasswordSignInSuccess;

export type EmailPasswordSignInSuccess = {
  __typename?: 'EmailPasswordSignInSuccess';
  token: Scalars['String'];
  user: User;
};

export type EmailPasswordSignUpFailure = {
  __typename?: 'EmailPasswordSignUpFailure';
  emailError?: Maybe<Scalars['String']>;
  otherError?: Maybe<Scalars['String']>;
  passwordError?: Maybe<Scalars['String']>;
  usernameError?: Maybe<Scalars['String']>;
};

export type EmailPasswordSignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type EmailPasswordSignUpResult = EmailPasswordSignUpFailure | EmailPasswordSignUpSuccess;

export type EmailPasswordSignUpSuccess = {
  __typename?: 'EmailPasswordSignUpSuccess';
  email: Scalars['String'];
};

export type EmailVerificationFailure = {
  __typename?: 'EmailVerificationFailure';
  emailError?: Maybe<Scalars['String']>;
  otherError?: Maybe<Scalars['String']>;
  tokenError?: Maybe<Scalars['String']>;
};

export type EmailVerificationInput = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export type EmailVerificationResult = EmailVerificationFailure | EmailVerificationSuccess;

export type EmailVerificationSuccess = {
  __typename?: 'EmailVerificationSuccess';
  token: Scalars['String'];
  user: User;
};

export type FindProfileFailure = {
  __typename?: 'FindProfileFailure';
  message: Scalars['String'];
};

export type FindProfileInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type FindProfileResult = FindProfileFailure | FindProfileSuccess;

export type FindProfileSuccess = {
  __typename?: 'FindProfileSuccess';
  profile: Profile;
};

export type FindUserFailure = {
  __typename?: 'FindUserFailure';
  message: Scalars['String'];
};

export type FindUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type FindUserResult = FindUserFailure | FindUserSuccess;

export type FindUserSuccess = {
  __typename?: 'FindUserSuccess';
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordResult;
  eamilPasswordSignIn: EmailPasswordSignInResult;
  eamilPasswordSignUp: EmailPasswordSignUpResult;
  resendVerificationEmail: ResendVerificationEmailResult;
  resetPassword: ResetPasswordResult;
  sendResetPasswordEmail: SendResetPasswordEmailResult;
  updateProfile: UpdateProfileResult;
  verifyEmail: EmailVerificationResult;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationEamilPasswordSignInArgs = {
  input: EmailPasswordSignInInput;
};


export type MutationEamilPasswordSignUpArgs = {
  input: EmailPasswordSignUpInput;
};


export type MutationResendVerificationEmailArgs = {
  input: ResendVerificationEmailInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendResetPasswordEmailArgs = {
  input: SendResetPasswordEmailInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationVerifyEmailArgs = {
  input: EmailVerificationInput;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  currentProfile: Profile;
  currentUser: User;
  findProfile: FindProfileResult;
  findUser: FindUserResult;
};


export type QueryFindProfileArgs = {
  input: FindProfileInput;
};


export type QueryFindUserArgs = {
  input: FindUserInput;
};

export type ResendVerificationEmailFailure = {
  __typename?: 'ResendVerificationEmailFailure';
  emailError?: Maybe<Scalars['String']>;
  otherError?: Maybe<Scalars['String']>;
};

export type ResendVerificationEmailInput = {
  email: Scalars['String'];
};

export type ResendVerificationEmailResult = ResendVerificationEmailFailure | ResendVerificationEmailSuccess;

export type ResendVerificationEmailSuccess = {
  __typename?: 'ResendVerificationEmailSuccess';
  message: Scalars['String'];
};

export type ResetPasswordFailure = {
  __typename?: 'ResetPasswordFailure';
  newPasswordError?: Maybe<Scalars['String']>;
  otherError?: Maybe<Scalars['String']>;
  tokenError?: Maybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordResult = ResetPasswordFailure | ResetPasswordSuccess;

export type ResetPasswordSuccess = {
  __typename?: 'ResetPasswordSuccess';
  message: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SendResetPasswordEmailFailure = {
  __typename?: 'SendResetPasswordEmailFailure';
  emailError?: Maybe<Scalars['String']>;
  otherError?: Maybe<Scalars['String']>;
};

export type SendResetPasswordEmailInput = {
  email: Scalars['String'];
};

export type SendResetPasswordEmailResult = SendResetPasswordEmailFailure | SendResetPasswordEmailSuccess;

export type SendResetPasswordEmailSuccess = {
  __typename?: 'SendResetPasswordEmailSuccess';
  message: Scalars['String'];
};

export type UpdateProfileFailure = {
  __typename?: 'UpdateProfileFailure';
  nameError?: Maybe<Scalars['String']>;
  otherError?: Maybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileResult = UpdateProfileFailure | UpdateProfileSuccess;

export type UpdateProfileSuccess = {
  __typename?: 'UpdateProfileSuccess';
  updatedProfile: Profile;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  id: Scalars['ID'];
  profile?: Maybe<Profile>;
  role: Role;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type CheckUserExistsWithEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type CheckUserExistsWithEmailQuery = { __typename?: 'Query', findUser: { __typename: 'FindUserFailure' } | { __typename: 'FindUserSuccess' } };

export type CheckUserExistsWithUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type CheckUserExistsWithUsernameQuery = { __typename?: 'Query', findUser: { __typename: 'FindUserFailure' } | { __typename: 'FindUserSuccess' } };

export type SignInWithEmailPasswordMutationVariables = Exact<{
  input: EmailPasswordSignInInput;
}>;


export type SignInWithEmailPasswordMutation = { __typename?: 'Mutation', eamilPasswordSignIn: { __typename: 'EmailPasswordSignInFailure', emailError?: string | null, passwordError?: string | null, otherError?: string | null } | { __typename: 'EmailPasswordSignInSuccess', token: string, user: { __typename?: 'User', id: string, username: string, email: string } } };

export type SignUpWithEmailPasswordMutationVariables = Exact<{
  input: EmailPasswordSignUpInput;
}>;


export type SignUpWithEmailPasswordMutation = { __typename?: 'Mutation', eamilPasswordSignUp: { __typename: 'EmailPasswordSignUpFailure', usernameError?: string | null, emailError?: string | null, passwordError?: string | null, otherError?: string | null } | { __typename: 'EmailPasswordSignUpSuccess', email: string } };

export type ResendVerificationEmailMutationVariables = Exact<{
  input: ResendVerificationEmailInput;
}>;


export type ResendVerificationEmailMutation = { __typename?: 'Mutation', resendVerificationEmail: { __typename: 'ResendVerificationEmailFailure', emailError?: string | null, otherError?: string | null } | { __typename: 'ResendVerificationEmailSuccess', message: string } };

export type VerifyEmailMutationVariables = Exact<{
  input: EmailVerificationInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename: 'EmailVerificationFailure', tokenError?: string | null, emailError?: string | null, otherError?: string | null } | { __typename: 'EmailVerificationSuccess', token: string, user: { __typename?: 'User', id: string, username: string, email: string, emailVerified: boolean } } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename: 'ChangePasswordFailure', newPasswordError?: string | null, oldPasswordError?: string | null, otherError?: string | null } | { __typename: 'ChangePasswordSuccess', message: string } };

export type SendResetPasswordEmailMutationVariables = Exact<{
  input: SendResetPasswordEmailInput;
}>;


export type SendResetPasswordEmailMutation = { __typename?: 'Mutation', sendResetPasswordEmail: { __typename: 'SendResetPasswordEmailFailure', emailError?: string | null, otherError?: string | null } | { __typename: 'SendResetPasswordEmailSuccess', message: string } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename: 'ResetPasswordFailure', tokenError?: string | null, newPasswordError?: string | null, otherError?: string | null } | { __typename: 'ResetPasswordSuccess', message: string } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename: 'UpdateProfileFailure', nameError?: string | null, otherError?: string | null } | { __typename: 'UpdateProfileSuccess', updatedProfile: { __typename?: 'Profile', id: string, name?: string | null, bio?: string | null } } };

export type FindProfileQueryVariables = Exact<{
  input: FindProfileInput;
}>;


export type FindProfileQuery = { __typename?: 'Query', findProfile: { __typename: 'FindProfileFailure', message: string } | { __typename: 'FindProfileSuccess', profile: { __typename?: 'Profile', id: string, name?: string | null, bio?: string | null } } };

export type FindUserQueryVariables = Exact<{
  input: FindUserInput;
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: { __typename: 'FindUserFailure', message: string } | { __typename: 'FindUserSuccess', user: { __typename?: 'User', id: string, username: string } } };


export const CheckUserExistsWithEmailDocument = gql`
    query CheckUserExistsWithEmail($email: String!) {
  findUser(input: {email: $email}) {
    __typename
  }
}
    `;

/**
 * __useCheckUserExistsWithEmailQuery__
 *
 * To run a query within a React component, call `useCheckUserExistsWithEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserExistsWithEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserExistsWithEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCheckUserExistsWithEmailQuery(baseOptions: Apollo.QueryHookOptions<CheckUserExistsWithEmailQuery, CheckUserExistsWithEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserExistsWithEmailQuery, CheckUserExistsWithEmailQueryVariables>(CheckUserExistsWithEmailDocument, options);
      }
export function useCheckUserExistsWithEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserExistsWithEmailQuery, CheckUserExistsWithEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserExistsWithEmailQuery, CheckUserExistsWithEmailQueryVariables>(CheckUserExistsWithEmailDocument, options);
        }
export type CheckUserExistsWithEmailQueryHookResult = ReturnType<typeof useCheckUserExistsWithEmailQuery>;
export type CheckUserExistsWithEmailLazyQueryHookResult = ReturnType<typeof useCheckUserExistsWithEmailLazyQuery>;
export type CheckUserExistsWithEmailQueryResult = Apollo.QueryResult<CheckUserExistsWithEmailQuery, CheckUserExistsWithEmailQueryVariables>;
export const CheckUserExistsWithUsernameDocument = gql`
    query CheckUserExistsWithUsername($username: String!) {
  findUser(input: {username: $username}) {
    __typename
  }
}
    `;

/**
 * __useCheckUserExistsWithUsernameQuery__
 *
 * To run a query within a React component, call `useCheckUserExistsWithUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserExistsWithUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserExistsWithUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckUserExistsWithUsernameQuery(baseOptions: Apollo.QueryHookOptions<CheckUserExistsWithUsernameQuery, CheckUserExistsWithUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserExistsWithUsernameQuery, CheckUserExistsWithUsernameQueryVariables>(CheckUserExistsWithUsernameDocument, options);
      }
export function useCheckUserExistsWithUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserExistsWithUsernameQuery, CheckUserExistsWithUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserExistsWithUsernameQuery, CheckUserExistsWithUsernameQueryVariables>(CheckUserExistsWithUsernameDocument, options);
        }
export type CheckUserExistsWithUsernameQueryHookResult = ReturnType<typeof useCheckUserExistsWithUsernameQuery>;
export type CheckUserExistsWithUsernameLazyQueryHookResult = ReturnType<typeof useCheckUserExistsWithUsernameLazyQuery>;
export type CheckUserExistsWithUsernameQueryResult = Apollo.QueryResult<CheckUserExistsWithUsernameQuery, CheckUserExistsWithUsernameQueryVariables>;
export const SignInWithEmailPasswordDocument = gql`
    mutation SignInWithEmailPassword($input: EmailPasswordSignInInput!) {
  eamilPasswordSignIn(input: $input) {
    __typename
    ... on EmailPasswordSignInFailure {
      emailError
      passwordError
      otherError
    }
    ... on EmailPasswordSignInSuccess {
      user {
        id
        username
        email
      }
      token
    }
  }
}
    `;
export type SignInWithEmailPasswordMutationFn = Apollo.MutationFunction<SignInWithEmailPasswordMutation, SignInWithEmailPasswordMutationVariables>;

/**
 * __useSignInWithEmailPasswordMutation__
 *
 * To run a mutation, you first call `useSignInWithEmailPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithEmailPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithEmailPasswordMutation, { data, loading, error }] = useSignInWithEmailPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInWithEmailPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithEmailPasswordMutation, SignInWithEmailPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInWithEmailPasswordMutation, SignInWithEmailPasswordMutationVariables>(SignInWithEmailPasswordDocument, options);
      }
export type SignInWithEmailPasswordMutationHookResult = ReturnType<typeof useSignInWithEmailPasswordMutation>;
export type SignInWithEmailPasswordMutationResult = Apollo.MutationResult<SignInWithEmailPasswordMutation>;
export type SignInWithEmailPasswordMutationOptions = Apollo.BaseMutationOptions<SignInWithEmailPasswordMutation, SignInWithEmailPasswordMutationVariables>;
export const SignUpWithEmailPasswordDocument = gql`
    mutation SignUpWithEmailPassword($input: EmailPasswordSignUpInput!) {
  eamilPasswordSignUp(input: $input) {
    __typename
    ... on EmailPasswordSignUpFailure {
      usernameError
      emailError
      passwordError
      otherError
    }
    ... on EmailPasswordSignUpSuccess {
      email
    }
  }
}
    `;
export type SignUpWithEmailPasswordMutationFn = Apollo.MutationFunction<SignUpWithEmailPasswordMutation, SignUpWithEmailPasswordMutationVariables>;

/**
 * __useSignUpWithEmailPasswordMutation__
 *
 * To run a mutation, you first call `useSignUpWithEmailPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpWithEmailPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpWithEmailPasswordMutation, { data, loading, error }] = useSignUpWithEmailPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpWithEmailPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SignUpWithEmailPasswordMutation, SignUpWithEmailPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpWithEmailPasswordMutation, SignUpWithEmailPasswordMutationVariables>(SignUpWithEmailPasswordDocument, options);
      }
export type SignUpWithEmailPasswordMutationHookResult = ReturnType<typeof useSignUpWithEmailPasswordMutation>;
export type SignUpWithEmailPasswordMutationResult = Apollo.MutationResult<SignUpWithEmailPasswordMutation>;
export type SignUpWithEmailPasswordMutationOptions = Apollo.BaseMutationOptions<SignUpWithEmailPasswordMutation, SignUpWithEmailPasswordMutationVariables>;
export const ResendVerificationEmailDocument = gql`
    mutation ResendVerificationEmail($input: ResendVerificationEmailInput!) {
  resendVerificationEmail(input: $input) {
    __typename
    ... on ResendVerificationEmailFailure {
      emailError
      otherError
    }
    ... on ResendVerificationEmailSuccess {
      message
    }
  }
}
    `;
export type ResendVerificationEmailMutationFn = Apollo.MutationFunction<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>;

/**
 * __useResendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useResendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationEmailMutation, { data, loading, error }] = useResendVerificationEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResendVerificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>(ResendVerificationEmailDocument, options);
      }
export type ResendVerificationEmailMutationHookResult = ReturnType<typeof useResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationResult = Apollo.MutationResult<ResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($input: EmailVerificationInput!) {
  verifyEmail(input: $input) {
    __typename
    ... on EmailVerificationFailure {
      tokenError
      emailError
      otherError
    }
    ... on EmailVerificationSuccess {
      user {
        id
        username
        email
        emailVerified
      }
      token
    }
  }
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    __typename
    ... on ChangePasswordFailure {
      newPasswordError
      oldPasswordError
      otherError
    }
    ... on ChangePasswordSuccess {
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const SendResetPasswordEmailDocument = gql`
    mutation SendResetPasswordEmail($input: SendResetPasswordEmailInput!) {
  sendResetPasswordEmail(input: $input) {
    __typename
    ... on SendResetPasswordEmailFailure {
      emailError
      otherError
    }
    ... on SendResetPasswordEmailSuccess {
      message
    }
  }
}
    `;
export type SendResetPasswordEmailMutationFn = Apollo.MutationFunction<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;

/**
 * __useSendResetPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendResetPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetPasswordEmailMutation, { data, loading, error }] = useSendResetPasswordEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendResetPasswordEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>(SendResetPasswordEmailDocument, options);
      }
export type SendResetPasswordEmailMutationHookResult = ReturnType<typeof useSendResetPasswordEmailMutation>;
export type SendResetPasswordEmailMutationResult = Apollo.MutationResult<SendResetPasswordEmailMutation>;
export type SendResetPasswordEmailMutationOptions = Apollo.BaseMutationOptions<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    __typename
    ... on ResetPasswordFailure {
      tokenError
      newPasswordError
      otherError
    }
    ... on ResetPasswordSuccess {
      message
    }
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    __typename
    ... on UpdateProfileFailure {
      nameError
      otherError
    }
    ... on UpdateProfileSuccess {
      updatedProfile {
        id
        name
        bio
      }
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const FindProfileDocument = gql`
    query FindProfile($input: FindProfileInput!) {
  findProfile(input: $input) {
    __typename
    ... on FindProfileFailure {
      message
    }
    ... on FindProfileSuccess {
      profile {
        id
        name
        bio
      }
    }
  }
}
    `;

/**
 * __useFindProfileQuery__
 *
 * To run a query within a React component, call `useFindProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindProfileQuery(baseOptions: Apollo.QueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
      }
export function useFindProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export type FindProfileQueryHookResult = ReturnType<typeof useFindProfileQuery>;
export type FindProfileLazyQueryHookResult = ReturnType<typeof useFindProfileLazyQuery>;
export type FindProfileQueryResult = Apollo.QueryResult<FindProfileQuery, FindProfileQueryVariables>;
export const FindUserDocument = gql`
    query FindUser($input: FindUserInput!) {
  findUser(input: $input) {
    __typename
    ... on FindUserFailure {
      message
    }
    ... on FindUserSuccess {
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindUserQuery(baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
      }
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;