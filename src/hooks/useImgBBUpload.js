import { useState } from "react";
import { IMGBB_KEY } from "../config";

const configured = Boolean(IMGBB_KEY);

export function useImgBBUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  async function upload(file) {
    if (!file) return null;
    setUploading(true);
    setProgress(10);
    setError(null);
    try {
      if (!configured) {
        // local preview fallback
        return await new Promise((res) => {
          const r = new FileReader();
          r.onload = (e) => res(e.target.result);
          r.readAsDataURL(file);
        });
      }
      setProgress(30);
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        { method: "POST", body: form },
      );
      setProgress(90);
      const data = await res.json();
      if (!data.success)
        throw new Error(data.error?.message || "Error al subir");
      setProgress(100);
      return data.data.url;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading, progress, error, configured };
}
