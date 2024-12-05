export function validateFile(file: File): void {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['application/pdf', 'text/plain'];

  if (!file) {
    throw new Error('Please select a file to upload');
  }

  if (!file.type) {
    throw new Error('Unable to determine file type. Please ensure you are uploading a valid PDF or text file');
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}. Please upload a PDF or text file`);
  }

  if (file.size === 0) {
    throw new Error('The selected file appears to be empty');
  }

  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = Math.round(file.size / (1024 * 1024));
    throw new Error(`File size (${sizeMB}MB) exceeds the 10MB limit. Please upload a smaller file`);
  }
}