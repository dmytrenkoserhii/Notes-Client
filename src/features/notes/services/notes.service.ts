import { privateAxios } from '../../../lib';
import {
  CreateNoteRequestData,
  EditNoteRequestData,
  GetAllNotesRequestData,
  GetAllNotesResponseData,
  Note,
} from '../types';

export const NotesService = {
  async createNote(createNoteData: CreateNoteRequestData) {
    const response = await privateAxios.post<Note>('/notes', createNoteData);
    return response.data;
  },
  async editNote(id: number, editNoteData: EditNoteRequestData): Promise<Note> {
    const response = await privateAxios.put<Note>(`/notes/${id}`, editNoteData);
    return response.data;
  },
  async deleteNote(id: number) {
    return privateAxios.delete(`/notes/${id}`);
  },
  async getAllNotes(
    queryParams: GetAllNotesRequestData
  ): Promise<GetAllNotesResponseData> {
    const response = await privateAxios.get<GetAllNotesResponseData>('/notes', {
      params: queryParams,
    });
    return response.data;
  },
  async getCurrentNote(id: number) {
    return privateAxios.get<Note>(`/lists/${id}`);
  },
};
