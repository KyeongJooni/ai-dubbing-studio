"use client";

import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
}

const ACCEPTED_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/mp3",
  "audio/webm",
  "audio/ogg",
  "video/mp4",
  "video/webm",
  "video/ogg",
];

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export default function FileUpload({
  onFileSelect,
  accept = "audio/*,video/*",
  disabled = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!ACCEPTED_TYPES.some((type) => file.type.startsWith(type.split("/")[0]))) {
      setError("오디오 또는 비디오 파일만 업로드할 수 있습니다.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("파일 크기는 25MB 이하여야 합니다.");
      return false;
    }

    return true;
  };

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card
      className={`transition-colors ${
        dragActive ? "border-primary bg-primary/5" : ""
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <CardContent className="p-6">
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() =>
            document.getElementById("file-upload-input")?.click()
          }
        >
          <div className="text-4xl">📁</div>
          <div>
            <p className="text-lg font-medium">
              파일을 드래그하거나 클릭하여 업로드
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              오디오 (MP3, WAV) 또는 비디오 (MP4, WebM) · 최대 25MB
            </p>
          </div>
          <Input
            id="file-upload-input"
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
            disabled={disabled}
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}

        {selectedFile && !error && (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted p-3">
            <span className="text-xl">
              {selectedFile.type.startsWith("video") ? "🎬" : "🎵"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatSize(selectedFile.size)}
              </p>
            </div>
            <Badge variant="secondary">
              {selectedFile.type.startsWith("video") ? "비디오" : "오디오"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
