import PDFDocument from "pdfkit";
import { FastifyReply } from "fastify";

export const generatePDF = (reply: FastifyReply, data: any) => {
  const doc = new PDFDocument({ margin: 50 });

  reply.header("Content-Type", "application/pdf");
  reply.header(
    "Content-Disposition",
    "attachment; filename=expense_report.pdf"
  );

  doc.pipe(reply.raw);

  doc.fontSize(18).text("Expense Report", { align: "center" });
  doc.moveDown();

  doc.text(`Total Amount     : ₹${data.total_amount}`);
  doc.text(`Expense Amount   : ₹${data.expense_amount}`);
  doc.text(`Remaining Amount : ₹${data.remaining_amount}`);
  doc.moveDown();

  doc.text(`Category         : ${data.category || "-"}`);
  doc.text(`Description      : ${data.description || "-"}`);
  doc.moveDown();

  doc.text(`Created By       : ${data.created_by}`);
  doc.text(`Updated By       : ${data.updated_by}`);
  doc.moveDown();

  doc.text(`Generated At     : ${data.generated_at}`);

  doc.end();
};
