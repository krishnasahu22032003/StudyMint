import axiosInstance from "../utils/axios";
import type { SingleNote } from "../types/notes";

export type GetSingleNoteResponse = {
  success: boolean;
  data: SingleNote;
};

export default async function getNoteById(
  id: string
): Promise<SingleNote> {
  try {
    const response =
      await axiosInstance.get<GetSingleNoteResponse>(
        `/api/v1/notes/${id}`
      );

    return response.data.data;
  } catch (error: any) {
    console.error(
      error?.response?.data?.message ||
      "Failed to fetch note"
    );

    throw error;
  };
};