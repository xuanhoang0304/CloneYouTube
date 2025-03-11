// utils/uploadVideo.ts
import axios from 'axios';

const uploadVideo = async (
  file: File,
  uploadUrl: string,
  accessToken: string | null,
  onProgress: (progress: number) => void // Thêm callback để cập nhật tiến độ
) => {
  const response = await axios.put(uploadUrl, file, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Length": file.size.toString(),
      "Content-Type": "video/mp4",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || file.size));
      onProgress(percentCompleted);
      if(percentCompleted == 100){
        onProgress(0);
      } // Gọi callback để cập nhật tiến độ
    },
  });

  return response.status === 200 ? "Upload successful!" : "Upload failed";
};

export default uploadVideo;
