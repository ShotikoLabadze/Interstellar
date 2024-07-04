export class AuthorEntity {
  id: number;
  firstName: string;
  lastName: string;
  musics: CreateMusicDto[];
  biography: string;
}
