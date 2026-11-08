import React, { useState } from "react";
import { useWedding } from "../context/WeddingContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { downloadImage } from "../utils/downloadImage";

export default function AdminPage() {
  const {
    asistentes,
    canciones,
    fotos,
    deleteAsistente,
    deleteCancion,
    deleteFoto,
    loading,
    configured,
  } = useWedding();
  useWedding();
  const { logout } = useAuth();
  const [tab, setTab] = useState("asistentes");

  const familias = asistentes.reduce((acc, p) => {
    const fid = p.familia_id || p.id;
    if (!acc[fid]) acc[fid] = [];
    acc[fid].push(p);
    return acc;
  }, {});

  const s = {
    page: {
      minHeight: "100vh",
      background: "var(--cream)",
      maxWidth: 430,
      margin: "0 auto",
    },
    header: {
      background: "white",
      padding: "16px 20px",
      borderBottom: "1px solid rgba(197,216,228,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },
    headerTitle: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: 24,
      color: "var(--blue-deep)",
    },
    logoutBtn: {
      padding: "6px 14px",
      background: "transparent",
      border: "1px solid var(--blue-mist)",
      borderRadius: 8,
      fontFamily: "'Lora', serif",
      fontSize: 12,
      color: "var(--text-mid)",
      cursor: "pointer",
    },
    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 10,
      padding: "16px 16px 0",
    },
    statCard: {
      background: "white",
      borderRadius: 12,
      padding: "14px 10px",
      textAlign: "center",
      boxShadow: "0 2px 12px rgba(61,110,138,0.07)",
      border: "1px solid rgba(197,216,228,0.4)",
    },
    statNum: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: 36,
      color: "var(--blue-deep)",
      display: "block",
      lineHeight: 1,
    },
    statLabel: {
      fontFamily: "'Lora', serif",
      fontSize: 10,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: "var(--text-soft)",
      marginTop: 4,
      display: "block",
    },
    tabs: {
      display: "flex",
      borderBottom: "1px solid rgba(197,216,228,0.5)",
      margin: "16px 0 0",
      background: "white",
    },
    tabBtn: (active) => ({
      flex: 1,
      padding: "12px 8px",
      border: "none",
      borderBottom: `2px solid ${active ? "var(--blue-deep)" : "transparent"}`,
      background: "transparent",
      fontFamily: "'Lora', serif",
      fontSize: 12,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: active ? "var(--blue-deep)" : "var(--text-soft)",
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      marginBottom: -1,
      transition: "all 0.2s",
    }),
    content: { padding: "16px" },
    card: {
      background: "white",
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 10,
      boxShadow: "0 1px 8px rgba(61,110,138,0.06)",
      border: "1px solid rgba(197,216,228,0.3)",
    },
    familiaLabel: {
      fontFamily: "'Lora', serif",
      fontSize: 10,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: "var(--blue-mid)",
      marginBottom: 6,
      display: "block",
    },
    nombre: {
      fontFamily: "'Lora', serif",
      fontSize: 14,
      color: "var(--text)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6,
      gap: 8,
    },
    nombreLeft: { display: "flex", alignItems: "center", gap: 8 },
    dot: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--blue-mid)",
      flexShrink: 0,
    },
    deleteBtn: {
      padding: "3px 10px",
      background: "transparent",
      border: "1px solid #e05050",
      borderRadius: 6,
      fontFamily: "'Lora', serif",
      fontSize: 11,
      color: "#e05050",
      cursor: "pointer",
      flexShrink: 0,
      transition: "all 0.2s",
    },
    songTitle: {
      fontFamily: "'Lora', serif",
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text)",
      marginBottom: 2,
    },
    songArtist: {
      fontFamily: "'Lora', serif",
      fontSize: 12,
      fontStyle: "italic",
      color: "var(--text-soft)",
    },
    photoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 8,
    },
    photoItem: { borderRadius: 10, overflow: "hidden", aspectRatio: "1" },
    photoImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    empty: {
      textAlign: "center",
      padding: "32px 20px",
      fontFamily: "'Lora', serif",
      fontStyle: "italic",
      fontSize: 13,
      color: "var(--text-soft)",
    },
    notConfigured: {
      background: "#FFF8E8",
      border: "1px solid #E8D080",
      borderRadius: 10,
      padding: "12px 14px",
      margin: "0 0 14px",
      fontFamily: "'Lora', serif",
      fontSize: 12,
      color: "#806020",
      lineHeight: 1.5,
    },
  };

  const fotosOrdenadas = [...fotos].sort(
    (a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0),
  );

  if (loading)
    return (
      <div
        style={{
          ...s.page,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 24,
            color: "var(--blue-deep)",
          }}
        >
          Cargando...
        </p>
      </div>
    );

  return (
    <div style={s.page}>
      <header style={s.header}>
        <span style={s.headerTitle}>Panel Admin</span>
        <div style={{ display: "flex", gap: 8 }}>
          <Link
            to="/"
            style={{
              ...s.logoutBtn,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Ver sitio
          </Link>
          <button style={s.logoutBtn} onClick={logout}>
            Salir
          </button>
        </div>
      </header>

      <div style={s.statsRow}>
        <div style={s.statCard}>
          <span style={s.statNum}>{asistentes.length}</span>
          <span style={s.statLabel}>Confirmados</span>
        </div>
        <div style={s.statCard}>
          <span style={s.statNum}>{canciones.length}</span>
          <span style={s.statLabel}>Canciones</span>
        </div>
        <div style={s.statCard}>
          <span style={s.statNum}>{fotos.length}</span>
          <span style={s.statLabel}>Fotos</span>
        </div>
      </div>

      <div style={s.tabs}>
        <button
          style={s.tabBtn(tab === "asistentes")}
          onClick={() => setTab("asistentes")}
        >
          Invitados
        </button>
        <button
          style={s.tabBtn(tab === "canciones")}
          onClick={() => setTab("canciones")}
        >
          Canciones
        </button>
        <button
          style={s.tabBtn(tab === "fotos")}
          onClick={() => setTab("fotos")}
        >
          Fotos
        </button>
      </div>

      <div style={s.content}>
        {!configured && (
          <div style={s.notConfigured}>
            Configura el API_URL en src/config.js para ver los datos en tiempo
            real. Por ahora los datos son locales a este navegador.
          </div>
        )}

        {tab === "asistentes" && (
          <>
            {Object.entries(familias).length === 0 ? (
              <p style={s.empty}>Aun no hay confirmaciones</p>
            ) : (
              Object.entries(familias).map(([fid, personas], i) => (
                <div key={fid} style={s.card}>
                  <span style={s.familiaLabel}>
                    Familia {i + 1} — {personas.length} persona
                    {personas.length > 1 ? "s" : ""}
                  </span>
                  {personas.map((p) => (
                    <div key={p.id} style={s.nombre}>
                      <div style={s.nombreLeft}>
                        <div style={s.dot} />
                        {p.nombre}
                      </div>
                      <button
                        style={s.deleteBtn}
                        onClick={() => {
                          if (window.confirm(`Borrar a ${p.nombre}?`)) {
                            deleteAsistente(p.id);
                          }
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#e05050";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#e05050";
                        }}
                      >
                        Borrar
                      </button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </>
        )}

        {tab === "canciones" && (
          <>
            {canciones.length === 0 ? (
              <p style={s.empty}>Aun no hay sugerencias de canciones</p>
            ) : (
              canciones.map((c) => (
                <div
                  key={c.id}
                  style={{
                    ...s.card,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p style={s.songTitle}>🎵 {c.cancion}</p>
                    {c.artista && <p style={s.songArtist}>{c.artista}</p>}
                  </div>
                  <button
                    style={s.deleteBtn}
                    onClick={() => {
                      if (window.confirm(`Borrar "${c.cancion}"?`))
                        deleteCancion(c.id);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e05050";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#e05050";
                    }}
                  >
                    Borrar
                  </button>
                </div>
              ))
            )}
          </>
        )}

        {tab === "fotos" && (
          <>
            {fotos.length === 0 ? (
              <p style={s.empty}>Aun no hay fotos subidas</p>
            ) : (
              <div style={s.photoGrid}>
                {fotosOrdenadas.map((f) => (
                  <div
                    key={f.id}
                    style={{ ...s.photoItem, position: "relative" }}
                  >
                    <img src={f.url} alt="foto boda" style={s.photoImg} />
                    <button
                      type="button"
                      onClick={() => downloadImage(f.url, `foto-boda-${f.id || "imagen"}`)}
                      style={{
                        position: "absolute",
                        left: 6,
                        bottom: 6,
                        border: "none",
                        borderRadius: 999,
                        padding: "6px 9px",
                        background: "rgba(255,255,255,0.92)",
                        color: "#153f63",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Descargar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Borrar esta foto?"))
                          deleteFoto(f.id);
                      }}
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        background: "rgba(0,0,0,0.6)",
                        border: "none",
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        color: "white",
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
