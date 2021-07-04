export type UserSignInRequest = {
  email: string;
  grant_type: string;
  password: string;
};

export type UserSignInFormValues = UserSignInRequest;

export type UserSignUpRequest = {
  email: string;
  full_name: string;
  password: string;
};

export type UserSignUpFormValues = UserSignUpRequest & {
  passwordConfirmation: string;
};
