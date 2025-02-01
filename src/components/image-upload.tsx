"use client"

import Image from 'next/image';
import React, { useState, ChangeEvent, DragEvent, useCallback } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { ImagePlus, Trash2, X } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploadProps {
  multiple?: boolean;
  onUpload: (files: File[]) => void;
  grid: string;
  title: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  multiple = false,
  onUpload,
  grid,
  title
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store preview URLs
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    handleFiles(newFiles);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const newFiles = Array.from(event.dataTransfer.files);
    handleFiles(newFiles);
  };

  const handleFiles = useCallback((newFiles: File[]) => {
    const validFiles: File[] = [];
    const newImagePreviews: string[] = []; // Previews for the current batch
    const errors: string[] = [];

    for (const file of newFiles) {
      // ... (validation logic remains the same)

      validFiles.push(file);
      newImagePreviews.push(URL.createObjectURL(file)); // Create and store preview URL
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    setFiles((prevFiles) => (multiple ? [...prevFiles, ...validFiles] : validFiles));
    setImagePreviews((prevPreviews) => (multiple ? [...prevPreviews, ...newImagePreviews] : newImagePreviews)); // Update previews
    onUpload(validFiles);
  }, [multiple, onUpload]);


  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index)); // Remove preview
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };


  return (
    <div className="w-full space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Supported formats: JPG, PNG, GIF
        </p>
      </div>

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        multiple={multiple}
        onChange={handleInputChange}
        id="fileInput"
      />

      <div className={cn("grid gap-4", grid && grid)}>
        {/* Always show input label */}
        <label htmlFor="fileInput" className="col-span-1">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={cn(
              "flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted"
            )}
          >
            <div className="rounded-full bg-background p-2 shadow-sm">
              <ImagePlus className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Add Image</p>
          </div>
        </label>

        {/* Image Previews */}
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative col-span-1">
            <div className="group relative h-32 w-full overflow-hidden rounded-lg border">
              <Image
                src={preview}
                alt={`preview-${index}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemoveFile(index)}
                  className="h-7 w-7 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;