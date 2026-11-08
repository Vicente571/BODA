export async function downloadImage(url, fileName = "foto-boda") {
  if (!url) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo descargar la imagen");
    const blob = await response.blob();
    const extension =
      blob.type === "image/png"
        ? "png"
        : blob.type === "image/webp"
          ? "webp"
          : "jpg";
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${fileName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
