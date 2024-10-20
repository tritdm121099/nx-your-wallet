export interface UserFromJwt {
  id: string;
  sub: {
    email: string;
  };
}