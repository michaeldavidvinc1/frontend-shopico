"use client";

import Image from 'next/image';
import React, { useState, ChangeEvent, DragEvent, useCallback, useEffect } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { ImagePlus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploadProps {
    multiple?: boolean;
    onUpload: (files: File[]) => void;
    onRemove?: (index: number) => void; // Prop untuk handle remove
    grid: string;
    title: string;
    existingImages?: { url: string }[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ multiple = false, onUpload, onRemove, grid, title, existingImages = [] }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (existingImages.length > 0) {
            setImagePreviews(existingImages.map(img => img.url));
        }
    }, [existingImages]);

    const handleFiles = useCallback((newFiles: File[]) => {
        const validFiles: File[] = [];
        const newImagePreviews: string[] = [];

        for (const file of newFiles) {
            validFiles.push(file);
            newImagePreviews.push(URL.createObjectURL(file));
        }

        setImagePreviews(prevPreviews => {
            prevPreviews.forEach(url => URL.revokeObjectURL(url));
            return multiple ? [...prevPreviews, ...newImagePreviews] : newImagePreviews;
        });

        setFiles(prevFiles => (multiple ? [...prevFiles, ...validFiles] : validFiles));
        onUpload(validFiles);
    }, [multiple, onUpload]);

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || []);
        handleFiles(newFiles);
    }, [handleFiles]);

    const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragActive(false);

        const newFiles = Array.from(event.dataTransfer.files);
        handleFiles(newFiles);
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setImagePreviews(prevPreviews => {
            URL.revokeObjectURL(prevPreviews[index]);
            return prevPreviews.filter((_, i) => i !== index);
        });

        if (onRemove) {
            onRemove(index); // Panggil prop onRemove kalau ada
        }
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

            <div className={cn("grid gap-4", grid)}>
                <label htmlFor="fileInput" className="col-span-1">
                    <div
                        onDragOver={handleDragOver}
                        onDragEnter={() => setDragActive(true)}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        className={cn(
                            "flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors",
                            dragActive ? "border-primary bg-muted/80" : "border-muted-foreground/25 bg-muted/50"
                        )}
                    >
                        <div className="rounded-full bg-background p-2 shadow-sm">
                            <ImagePlus className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">Add Image</p>
                    </div>
                </label>

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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFile(index);
                                    }}
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
