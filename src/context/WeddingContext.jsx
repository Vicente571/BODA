import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";

const WeddingContext = createContext(null);

// Valida si hay una URL configurada válida
const configured = Boolean(API_URL && API_URL.trim() !== "");

async function apiGet(action, params = "") {
  if (!configured) return [];
  const res = await fetch(`${API_URL}?action=${action}${params}`);
  return res.json();
}

async function apiPost(action, data) {
  if (!configured) return { ok: true, offline: true };
  const encoded = encodeURIComponent(JSON.stringify(data));
  const res = await fetch(`${API_URL}?action=${action}&data=${encoded}`);
  return res.json();
}

export function WeddingProvider({ children }) {
  const [asistentes, setAsistentes] = useState([]);
  const [canciones, setCanciones] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [a, c, f] = await Promise.all([
          apiGet("getAsistentes"),
          apiGet("getCanciones"),
          apiGet("getFotos"),
        ]);
        if (Array.isArray(a)) setAsistentes(a);
        if (Array.isArray(c)) setCanciones(c);
        if (Array.isArray(f)) setFotos(f);
      } catch (e) {
        console.error("Error cargando datos:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function confirmarAsistencia(familia) {
    const familiaId = Date.now().toString();
    const rows = familia.map((p) => ({
      id: `${familiaId}_${Math.random().toString(36).slice(2)}`,
      nombre: p.nombre,
      familia_id: familiaId,
      timestamp: new Date().toISOString(),
    }));

    // Enviamos todas las filas en paralelo
    await Promise.all(rows.map((row) => apiPost("addAsistente", row)));

    setAsistentes((prev) => [...prev, ...rows]);
    return { ok: true };
  }

  async function sugerirCancion(cancion, artista) {
    const row = {
      id: Date.now().toString(),
      cancion,
      artista,
      timestamp: new Date().toISOString(),
    };
    await apiPost("addCancion", row);
    setCanciones((prev) => [...prev, row]);
    return { ok: true };
  }

  async function agregarFoto(url) {
    const row = {
      id: Date.now().toString(),
      url,
      timestamp: new Date().toISOString(),
    };
    await apiPost("addFoto", row);
    setFotos((prev) => [...prev, row]);
    return { ok: true };
  }

  async function deleteAsistente(id) {
    await apiGet("deleteAsistente", `&id=${id}`);
    setAsistentes((prev) => prev.filter((a) => a.id !== id));
  }

  async function deleteCancion(id) {
    await apiGet("deleteCancion", `&id=${id}`);
    setCanciones((prev) => prev.filter((c) => c.id !== id));
  }

  async function deleteFoto(id) {
    await apiGet("deleteFoto", `&id=${id}`);
    setFotos((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <WeddingContext.Provider
      value={{
        asistentes,
        canciones,
        fotos,
        loading,
        configured,
        confirmarAsistencia,
        sugerirCancion,
        agregarFoto,
        deleteAsistente,
        deleteCancion,
        deleteFoto,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  return useContext(WeddingContext);
}
