import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, ImagePlus } from "lucide-react";

interface ImageUploadInputProps {
    title?: string;
    multiple?: boolean;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ title = "Upload Images", multiple = true }) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const previews = acceptedFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => multiple ? [...prev, ...previews] : previews.slice(0, 1));
    }, [multiple]);

    const handleRemoveFile = (index: number) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple,
    });

    return (
        <div className="w-full space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG, GIF</p>
            </div>
            <div {...getRootProps()} className="grid gap-4">
                <input {...getInputProps()} />
                <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted">
                    <div className="rounded-full bg-background p-2 shadow-sm">
                        <ImagePlus className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Add Image</p>
                </div>
            </div>
            <div className="grid gap-4 grid-cols-3">
                {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative col-span-1">
                        <div className="group relative h-32 w-full overflow-hidden rounded-lg border">
                            <Image
                                src={preview}
                                alt={`preview-${index}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
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

export default ImageUploadInput;