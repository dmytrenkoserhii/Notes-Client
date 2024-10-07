import { Note } from './note.interface';

export interface GetAllNotesResponseData {
  items: Note[];
  total: number;
  page: number;
  limit: number;
}
