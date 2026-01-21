/**
 * File Parser Utilities
 * Uses server-side API for reliable PDF/Word parsing
 */

// Parse file using server-side API
export async function parseFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();
  const maxSize = 10 * 1024 * 1024; // 10MB limit

  if (file.size > maxSize) {
    throw new Error("File is too large. Maximum size is 10MB.");
  }

  // Validate file type
  const validExtensions = [".pdf", ".docx", ".txt"];
  const hasValidExtension = validExtensions.some((ext) =>
    fileName.endsWith(ext)
  );

  if (!hasValidExtension) {
    if (fileName.endsWith(".doc")) {
      throw new Error(
        "Old .doc format is not supported. Please save as .docx or paste your CV text manually."
      );
    }
    throw new Error(
      "Unsupported file format. Please upload PDF, Word (.docx), or TXT files."
    );
  }

  // Send to server for parsing
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/parse-file", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to parse file");
  }

  return data.text;
}

// Get supported file types
export const SUPPORTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "text/plain": [".txt"],
};

export const SUPPORTED_EXTENSIONS = ".pdf,.docx,.txt";
export const SUPPORTED_MIME_TYPES =
  "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";
