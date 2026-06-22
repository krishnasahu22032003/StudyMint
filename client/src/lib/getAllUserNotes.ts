import axiosInstance from "../utils/axios";
import type { NoteHistoryItem } from "../types/notes";

export type GetNotesResponse = {
  success: boolean;
  count: number;
  data: NoteHistoryItem[];
};

export default async function getNotes(): Promise<NoteHistoryItem[]> {
  try {
    const response =
      await axiosInstance.get<GetNotesResponse>(
        "/api/v1/notes/get-notes"
      );

    return response.data.data;
  } catch (error: any) {
    console.error(
      error?.response?.data?.message ||
      "Failed to fetch notes"
    );

    throw error;
  }
}