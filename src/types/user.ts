export type UserSignInRequest = {
  email: string;
  password: string;
};

export type UserSignInFormValues = UserSignInRequest;

export type UserSignUpRequest = {
  email: string;
  name: string;
  password: string;
};

export type UserSignUpFormValues = UserSignUpRequest & {
  passwordConfirmation: string;
};
