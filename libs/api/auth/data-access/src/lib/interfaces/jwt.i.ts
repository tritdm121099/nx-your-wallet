export interface UserFromJwt {
  id: number;
  sub: {
    email: string;
  };
}
