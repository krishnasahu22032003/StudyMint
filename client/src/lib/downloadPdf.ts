import axiosInstance from "../utils/axios";
import { toast } from "sonner";

export type DownloadPdfResponse = Blob;

export async function downloadPdf(result: unknown): Promise<void> {
    try {
        const response = await axiosInstance.post<DownloadPdfResponse>(
            "/api/v1/pdf/generate-pdf",
            { result },
            {
                responseType: "blob",
            }
        );

        const blob = new Blob([response.data], {
            type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "StudyMint-Notes.pdf";

        document.body.appendChild(link);
        link.click();
        toast.success("PDF downloaded successfully");
        link.remove();

        window.URL.revokeObjectURL(url);
    } catch (error: any) {
        toast.error("Failed to download PDF");
        throw error;
    };
};