import * as pdfjsLib from 'pdfjs-dist';

// Configure the worker source before any PDF operations
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string> {
  if (!file) {
    throw new Error('No PDF file provided for text extraction');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error('PDF file appears to be empty');
    }

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    if (!pdf || pdf.numPages === 0) {
      throw new Error('No pages found in PDF document');
    }

    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .filter((item: any) => item.str && item.str.trim().length > 0)
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      } catch (pageError) {
        console.warn(`Warning: Failed to extract text from page ${i}:`, pageError);
        // Continue with other pages even if one fails
      }
    }
    
    const cleanedText = cleanText(fullText);
    
    if (!cleanedText) {
      throw new Error('No readable text content extracted from PDF');
    }
    
    return cleanedText;
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? `Failed to extract text from PDF: ${error.message}`
      : 'Failed to extract text from PDF: Unknown error';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

function cleanText(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s.,@-]/g, ' ')
    .trim();
}