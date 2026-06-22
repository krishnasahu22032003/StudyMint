import PDFDocument from "pdfkit";
import type { Request, Response } from "express";

export const pdfDownload = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { result } = req.body;

    if (!result || typeof result !== "object") {
      res.status(400).json({
        success: false,
        message: "No content provided",
      });
      return;
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    doc.on("error", (error) => {
      console.error("PDF Generation Error:", error);

      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Failed to generate PDF",
        });
      }
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="StudyMint-Notes.pdf"'
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("StudyMint Notes", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(14)
      .text(
        `Importance: ${result.importance || "Not Available"}`
      );

    doc.moveDown();

    doc.fontSize(16).text("Sub Topics");

    doc.moveDown(0.5);

    if (result.subTopics) {
      Object.entries(result.subTopics).forEach(
        ([star, topics]: [string, any]) => {
          doc.moveDown(0.5);

          doc
            .fontSize(13)
            .text(`${star} Topics:`);

          if (Array.isArray(topics)) {
            topics.forEach((topic) => {
              doc
                .fontSize(12)
                .text(`• ${topic}`);
            });
          }
        }
      );
    }

    doc.moveDown();

    doc.fontSize(16).text("Notes");

    doc.moveDown(0.5);

    doc.fontSize(12).text(
      result.notes
        ? result.notes.replace(/[#*]/g, "")
        : "No notes available"
    );

    doc.moveDown();

    doc.fontSize(16).text("Revision Points");

    doc.moveDown(0.5);

    if (Array.isArray(result.revisionPoints)) {
      result.revisionPoints.forEach((point: string) => {
        doc
          .fontSize(12)
          .text(`• ${point}`);
      });
    }

    doc.moveDown();

    doc.fontSize(16).text("Important Questions");

    doc.moveDown(0.5);

    doc.fontSize(13).text("Short Questions:");

    if (
      Array.isArray(result.questions?.short)
    ) {
      result.questions.short.forEach(
        (question: string) => {
          doc
            .fontSize(12)
            .text(`• ${question}`);
        }
      );
    }

    doc.moveDown(0.5);

    doc.fontSize(13).text("Long Questions:");

    if (
      Array.isArray(result.questions?.long)
    ) {
      result.questions.long.forEach(
        (question: string) => {
          doc
            .fontSize(12)
            .text(`• ${question}`);
        }
      );
    }

    doc.moveDown(0.5);

    doc.fontSize(13).text("Diagram Question:");

    doc
      .fontSize(12)
      .text(
        result.questions?.diagram ||
          "No diagram question available"
      );

    doc.end();
  } catch (error: any) {
    console.error(
      "PDF Download Controller Error:",
      error.message
    );

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};