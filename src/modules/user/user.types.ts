export type UserResponse = {
  id: string;
  email: string;
  password: string;
  username: string;
};
export type UserRequest = {
  email: string;
  password: string;
  username: string;
};

export type SessionUserRequest = {
  email: string;
  password: string;
};

export type SessionUserResponse = {
  user: UserResponse;
  token: string;
};
