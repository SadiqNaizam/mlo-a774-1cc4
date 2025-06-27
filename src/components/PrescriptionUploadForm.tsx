import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PrescriptionUploadFormProps {
  productId: string | number;
  onUploadSuccess: (file: File, productId: string | number) => void;
  onClose?: () => void;
}

const PrescriptionUploadForm: React.FC<PrescriptionUploadFormProps> = ({
  productId,
  onUploadSuccess,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log('PrescriptionUploadForm loaded for productId:', productId);

  const handleFile = (files: FileList | null) => {
    if (files && files[0]) {
      // Basic validation for file type (example)
      if (files[0].type.startsWith('image/') || files[0].type === 'application/pdf') {
        setSelectedFile(files[0]);
      } else {
        toast.error('Invalid file type.', {
          description: 'Please upload an image (JPG, PNG) or a PDF file.',
        });
      }
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFile(e.target.files);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('No file selected', {
        description: 'Please select a prescription file to upload.',
      });
      return;
    }

    setIsUploading(true);
    // Simulate API call for upload
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsUploading(false);
    toast.success('Prescription Uploaded!', {
      description: `Your prescription for product ID ${productId} has been received.`,
    });
    onUploadSuccess(selectedFile, productId);
    if (onClose) {
        onClose();
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium">Upload Your Prescription</h3>
        <p className="text-sm text-muted-foreground">
          Please upload a clear image or PDF of your prescription.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!selectedFile ? (
          <div
            className={cn(
              'flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
              dragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
          >
            <input
              ref={inputRef}
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*,application/pdf"
              onChange={handleChange}
            />
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 text-center text-muted-foreground">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PDF, PNG, JPG or GIF</p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-xs">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="flex gap-2 justify-end pt-2">
            {onClose && (
                <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
                    Cancel
                </Button>
            )}
            <Button type="submit" disabled={!selectedFile || isUploading} className="w-36">
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isUploading ? 'Uploading...' : 'Submit Prescription'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionUploadForm;