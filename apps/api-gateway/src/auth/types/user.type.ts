export interface GithubUser {
  githubId: string;
  avatar: string;
  name: string;
  location?: string;
  email: string;
  exist?: boolean;
  accessToken?: string;
}
