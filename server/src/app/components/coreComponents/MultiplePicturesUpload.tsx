import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "../ui/Card";
interface MultiplePicturesUploadProps {
  onUpload: (files: File[]) => void;
}

const MultiplePicturesUpload: React.FC<MultiplePicturesUploadProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const allowedFileTypes = ["image/jpeg", "image/png"];

  const onDrop = (acceptedFiles: File[]) => {
    const invalidFiles = acceptedFiles.filter(file =>
      !allowedFileTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setErrorMessage("Only JPEG and PNG files are allowed.");
    } else {
      setFiles(acceptedFiles);
      setErrorMessage(null);
    }
  };

  const handleUpload = () => {
    if (files.length > 0) {
      onUpload(files);
      setFiles([]);
    } else {
      setErrorMessage("Please select files before uploading.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card className="m-4  p-4 box-border">
      <div  {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop logos here, or click to select files</p>
        )}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {files.map((file) => (
          <p key={file.name}>{file.name}</p>
        ))}
      </div>
      <button onClick={handleUpload} className="bg-green-500 hover:bg-green-600 cursor-pointer w-full text-white font-bold py-2 px-4 rounded">
        Upload
      </button>
    </Card>
  );
};

const dropzoneStyle: React.CSSProperties = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  marginBottom: "10px",
};



export default MultiplePicturesUpload;
