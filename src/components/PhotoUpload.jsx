import React, { useState, useRef } from "react";
import { useWedding } from "../context/WeddingContext";
import { useImgBBUpload } from "../hooks/useImgBBUpload";
import { downloadImage } from "../utils/downloadImage";

export default function PhotoUpload() {
  const { fotos, agregarFoto } = useWedding();
  const { upload, uploading, progress, error } = useImgBBUpload();
  const [preview, setPreview] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const inputRef = useRef();

  async function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    const url = await upload(file);
    if (url) {
      await agregarFoto(url);
      setPreview(null);
    }
  }

  const s = {
    card: {
      background: "white",
      borderRadius: 16,
      padding: "24px 20px",
      margin: "0 16px",
      boxShadow: "0 2px 20px rgba(61,110,138,0.08)",
      border: "1px solid rgba(197,216,228,0.4)",
    },
    title: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: 26,
      color: "var(--blue-deep)",
      marginBottom: 4,
    },
    sub: {
      fontFamily: "'Lora', serif",
      fontSize: 12,
      color: "var(--text-soft)",
      marginBottom: 20,
      fontStyle: "italic",
    },
    uploadZone: {
      border: "2px dashed var(--blue-mist)",
      borderRadius: 12,
      padding: "28px 20px",
      textAlign: "center",
      cursor: "pointer",
      background: "var(--cream)",
      marginBottom: 16,
      transition: "all 0.2s",
    },
    uploadIcon: { fontSize: 32, display: "block", marginBottom: 8 },
    uploadText: {
      fontFamily: "'Lora', serif",
      fontSize: 14,
      color: "var(--blue-mid)",
    },
    uploadSub: {
      fontFamily: "'Lora', serif",
      fontSize: 11,
      color: "var(--text-soft)",
      marginTop: 4,
    },
    progressBar: {
      height: 4,
      background: "var(--blue-mist)",
      borderRadius: 2,
      overflow: "hidden",
      marginBottom: 12,
    },
    progressFill: {
      height: "100%",
      background: "var(--blue-deep)",
      borderRadius: 2,
      transition: "width 0.3s",
      width: `${progress}%`,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12,
    },
    photoThumb: {
      aspectRatio: "1",
      borderRadius: 10,
      overflow: "hidden",
      cursor: "pointer",
      position: "relative",
    },
    photoImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    preview: {
      width: "100%",
      aspectRatio: "16/9",
      borderRadius: 10,
      objectFit: "cover",
      marginBottom: 10,
      opacity: 0.7,
    },
    lightboxOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.9)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    lightboxImg: {
      maxWidth: "95vw",
      maxHeight: "85vh",
      objectFit: "contain",
      borderRadius: 8,
    },
    closeBtn: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "rgba(255,255,255,0.15)",
      border: "none",
      borderRadius: "50%",
      width: 40,
      height: 40,
      color: "white",
      fontSize: 18,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    downloadBtn: {
      position: "absolute",
      left: "50%",
      bottom: 18,
      transform: "translateX(-50%)",
      border: "none",
      borderRadius: 999,
      padding: "10px 16px",
      background: "white",
      color: "#153f63",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    },
  };

  const fotosOrdenadas = [...fotos].sort(
    (a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0),
  );

  return (
    <>
      <div style={s.card}>
        <h3 style={s.title}>Fotos de la Boda</h3>
        <p style={s.sub}>Tomaste fotos? Subelas aqui para que todos las vean</p>

        {preview && <img src={preview} alt="preview" style={s.preview} />}

        {uploading && (
          <div style={s.progressBar}>
            <div style={s.progressFill} />
          </div>
        )}

        <div
          style={s.uploadZone}
          onClick={() => !uploading && inputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = "var(--blue-deep)";
          }}
          onDragLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--blue-mist)")
          }
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = "var(--blue-mist)";
            handleFile(e.dataTransfer.files[0]);
          }}
        >
          <span style={s.uploadIcon}>{uploading ? "⏳" : "📷"}</span>
          <p style={s.uploadText}>
            {uploading
              ? `Subiendo... ${progress}%`
              : "Toca para subir una foto"}
          </p>
          <p style={s.uploadSub}>JPG · PNG · WEBP</p>
        </div>

        {error && (
          <p style={{ fontSize: 12, color: "#C05050", marginBottom: 10 }}>
            {error}
          </p>
        )}

        {fotos.length > 0 && (
          <div style={s.grid}>
            {fotosOrdenadas.map((f) => (
              <div
                key={f.id}
                style={s.photoThumb}
                onClick={() => setLightbox(f.url)}
              >
                <img src={f.url} alt="foto boda" style={s.photoImg} />
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {lightbox && (
        <div style={s.lightboxOverlay} onClick={() => setLightbox(null)}>
          <button style={s.closeBtn} onClick={() => setLightbox(null)}>
            ✕
          </button>
          <img
            src={lightbox}
            alt="foto"
            style={s.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            style={s.downloadBtn}
            onClick={(event) => {
              event.stopPropagation();
              downloadImage(lightbox, "foto-boda");
            }}
          >
            Descargar imagen
          </button>
        </div>
      )}
    </>
  );
}
