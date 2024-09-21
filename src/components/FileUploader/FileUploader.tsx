
"use client";
interface FileUploaderProps {
  // 
}

function FileUploader(props: FileUploaderProps) {
  return <div>
    <div>
      <label htmlFor="">File</label>
      <input type="file" name="file" accept="image/*" />
    </div>
  </div>;
}

export default FileUploader;