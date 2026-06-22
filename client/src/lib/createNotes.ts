import axiosInstance from "../utils/axios";

export type GenerateNotesPayload = {
    topic: string;
    classLevel?: string;
    examType?: string;
    revisionMode: boolean;
    includeDiagram: boolean;
    includeChart: boolean;
};

export type GeneratedNotesResponse = {
    success: boolean;
    message: string;
    data: any;
    noteId: string;
    creditsLeft: number;
};

export type ApiErrorResponse = {
    success: false;
    message: string;
    error?: unknown;
};


export default async function createNotes(payload: GenerateNotesPayload): Promise<GeneratedNotesResponse> {

    try {

        const response = await axiosInstance.post<GeneratedNotesResponse>("/api/v1/notes/generate-notes", payload);
        return response.data;

    } catch (error: any) {
        console.error(error?.response?.data?.message || "Generate Failed");
        throw error
    };

};