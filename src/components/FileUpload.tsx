import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateFile } from '../utils/fileValidator';
import { DocumentIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length > 0) {
      try {
        const file = acceptedFiles[0];
        validateFile(file);
        onFileUpload(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    }
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
          {isDragActive ? (
            <p className="text-blue-500">Drop your resume here...</p>
          ) : (
            <>
              <p className="text-gray-600">
                Drag and drop your resume here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, TXT (max 10MB)
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex items-start">
            <XCircleIcon className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}