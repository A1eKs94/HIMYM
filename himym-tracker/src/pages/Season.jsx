import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSeasonDetail, getSeriesInfo, getPosterUrl } from "../services/tmdb";

{
  /* estrellas */
}
function StarRating({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(
        <span key={i} style={{ fontSize: "18px", color: "#F5C842" }}>
          ★
        </span>,
      );
    } else if (value >= i - 0.5) {
      stars.push(
        <span
          key={i}
          style={{
            fontSize: "18px",
            position: "relative",
            color: "rgba(255,255,255,0.12)",
          }}
        >
          ★
          <span
            style={{
              position: "absolute",
              left: 0,
              width: "50%",
              overflow: "hidden",
              color: "#F5C842",
            }}
          >
            ★
          </span>
        </span>,
      );
    } else {
      stars.push(
        <span
          key={i}
          style={{ fontSize: "18px", color: "rgba(255,255,255,0.12)" }}
        >
          ★
        </span>,
      );
    }
  }
  return <div style={{ display: "flex", gap: "3px" }}>{stars}</div>;
}

function EyeIcon({ watched }) {
  return watched ? (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F5C842"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8fa8d0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function EpisodeCard({ episode }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [watched, setWatched] = useState(false);

  const stillUrl = episode.still_path
    ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
    : null;

  const myRating = null;
  const friendRating = null;
  const comments = [];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#1a2744",
        borderRadius: "14px",
        border: `1px solid ${expanded ? "#F5C842" : hovered ? "rgba(245,200,66,0.3)" : "rgba(255,255,255,0.06)"}`,
        marginBottom: "10px",
        overflow: "hidden",
        transition: "border-color 0.15s",
      }}
    >
      {/* fila main */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "22px 24px",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* num */}
        <div
          style={{
            fontSize: "17px",
            fontWeight: "500",
            color: "#F5C842",
            minWidth: "30px",
          }}
        >
          {String(episode.episode_number).padStart(2, "0")}
        </div>

        {/* still */}
        <div
          style={{
            width: "220px",
            minWidth: "150px",
            height: "125px",
            borderRadius: "8px",
            background: "#0f1724",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {stillUrl ? (
            <img
              src={stillUrl}
              alt={episode.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "11px", color: "#8fa8d0" }}>
              sin imagen
            </span>
          )}
        </div>

        {/* title */}
        <div
          style={{
            flex: 1,
            fontSize: "16px",
            fontWeight: "500",
            color: "#ffffff",
            minWidth: 0,
          }}
        >
          {episode.name}
        </div>

        {/* calificasao */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#8fa8d0",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
              }}
            >
              Aleks
            </div>
            <StarRating value={myRating || 0} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#8fa8d0",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
              }}
            >
              Leo
            </div>
            <StarRating value={friendRating || 0} />
          </div>
        </div>

        {/* boton visto */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWatched(!watched);
          }}
          title={watched ? "Marcar como no visto" : "Marcar como visto"}
          style={{
            background: watched
              ? "rgba(245,200,66,0.1)"
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${watched ? "#F5C842" : "rgba(255,255,255,0.15)"}`,
            borderRadius: "8px",
            padding: "8px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
            transition: "all 0.15s",
          }}
        >
          <EyeIcon watched={watched} />
          <span
            style={{
              fontSize: "12px",
              color: watched ? "#F5C842" : "#8fa8d0",
              fontWeight: "500",
            }}
          >
            {watched ? "Visto" : "No visto"}
          </span>
        </button>

        <div
          style={{
            fontSize: "12px",
            color: "#8fa8d0",
            flexShrink: 0,
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          ▼
        </div>
      </div>

      {/* details */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 20px 18px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "#8fa8d0",
              lineHeight: 1.7,
              marginBottom: "14px",
            }}
          >
            {episode.overview || "Sin sinopsis disponible."}
          </div>

          {comments.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {comments.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    background: "#0f1724",
                    borderRadius: "8px",
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "rgba(245,200,66,0.15)",
                      border: "1px solid #F5C842",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "500",
                      color: "#F5C842",
                    }}
                  >
                    {c.author === "tu" ? "TU" : "AM"}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        letterSpacing: "0.4px",
                        marginBottom: "3px",
                        color:
                          c.type === "cita"
                            ? "#8fa8d0"
                            : c.type === "todo"
                              ? "#5DCAA5"
                              : "#F5C842",
                      }}
                    >
                      {c.type}
                      {c.minute ? ` · ${c.minute}` : ""}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#c8d8f0",
                        lineHeight: 1.5,
                      }}
                    >
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                fontSize: "13px",
                color: "#8fa8d0",
                fontStyle: "italic",
                marginBottom: "12px",
              }}
            >
              Sin comentarios aún.
            </div>
          )}

          <button
            onClick={() =>
              navigate(
                `/season/${episode.season_number}/episode/${episode.episode_number}`,
              )
            }
            style={{
              background: "#F5C842",
              color: "#0f1724",
              border: "none",
              fontSize: "13px",
              fontWeight: "500",
              padding: "8px 20px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Ver detalle completo →
          </button>
        </div>
      )}
    </div>
  );
}

function Season() {
  const { seasonNumber } = useParams();
  const navigate = useNavigate();
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSeasonDetail(seasonNumber)
      .then(setSeason)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [seasonNumber]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <div style={{ fontSize: "14px", color: "#8fa8d0" }}>Cargando...</div>
      </div>
    );

  const posterUrl = season?.poster_path
    ? getPosterUrl(season.poster_path)
    : null;
  const episodes = season?.episodes?.filter((e) => e.episode_number > 0) || [];
  const year = season?.air_date ? season.air_date.split("-")[0] : "—";

  return (
    <div style={{ padding: "2rem", maxWidth: "960px", margin: "0 auto" }}>
      {/* back */}
      <button
        onClick={() => navigate("/")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          color: "#8fa8d0",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "1.75rem",
        }}
      >
        ← Todas las temporadas
      </button>

      {/* header temporada */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "160px",
            minWidth: "80px",
            height: "220px",
            borderRadius: "10px",
            background: "#1a2744",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`Temporada ${seasonNumber}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: "28px", color: "#F5C842" }}>
              {seasonNumber}
            </span>
          )}
        </div>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "500", color: "#ffffff" }}>
            Temporada {seasonNumber}
          </h2>
          <p style={{ fontSize: "14px", color: "#8fa8d0", marginTop: "5px" }}>
            {year} · {episodes.length} episodios
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#F5C842",
                background: "rgba(245,200,66,0.1)",
                padding: "4px 12px",
                borderRadius: "20px",
              }}
            >
              0/{episodes.length} vistos
            </span>
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: "11px",
          fontWeight: "500",
          color: "#8fa8d0",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Episodios
      </p>

      {episodes.map((episode) => (
        <EpisodeCard key={episode.episode_number} episode={episode} />
      ))}
    </div>
  );
}

export default Season;
