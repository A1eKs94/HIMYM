import { useState, useEffect } from "react";
import { getSeriesInfo, getPosterUrl, getBackdropUrl } from "../services/tmdb";
import { useNavigate } from "react-router-dom";

function SeasonCarousel({ quotes }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [quotes]);

  return (
    <div
      style={{
        width: "200px",
        minWidth: "200px",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        height: "140px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {quotes.map((q, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.6s ease",
            padding: "0 0.25rem",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#c8d8f0",
              fontStyle: "italic",
              lineHeight: 1.5,
              marginBottom: "6px",
            }}
          >
            "{q.text}"
          </div>
          <div style={{ fontSize: "10px", color: "#F5C842" }}>
            — Ep. {q.episode} · {q.author}
          </div>
        </div>
      ))}
    </div>
  );
}

function SeasonCard({ season }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const watched = 0;
  const total = season.episode_count;
  const progress = total > 0 ? (watched / total) * 100 : 0;
  const hasStarted = watched > 0;
  const isComplete = watched === total && total > 0;
  const quotes = [];

  const posterUrl = getPosterUrl(season.poster_path);
  const year = season.air_date ? season.air_date.split("-")[0] : "—";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/season/${season.season_number}`)}
      style={{
        backgroundColor: "#1a2744",
        borderRadius: "14px",
        border: `1px solid ${hovered ? "#F5C842" : "rgba(255,255,255,0.08)"}`,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        marginBottom: "12px",
        cursor: "pointer",
        minHeight: "180",
        opacity: hasStarted ? 1 : 0.6,
        transition: "border-color 0.2s, opacity 0.2s",
      }}
    >
      {/* Icono num / caratula */}
      <div
        style={{
          width: "220px",
          minWidth: "220px",
          height: "250px",
          backgroundColor: "#0f1724",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Temporada ${season.season_number}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            <div
              style={{
                fontSize: "36px",
                fontWeight: "500",
                color: hasStarted ? "#F5C842" : "#8fa8d0",
              }}
            >
              {season.season_number}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#8fa8d0",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              temporada
            </div>
          </>
        )}
      </div>

      {/* Info temporada */}
      <div
        style={{
          flex: 1,
          padding: "0 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: hasStarted ? "#ffffff" : "#8fa8d0",
          }}
        >
          Temporada {season.season_number}
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <div
            style={{
              fontSize: "12px",
              color: "#8fa8d0",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#F5C842",
              }}
            />
            {total} episodios
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#8fa8d0",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#F5C842",
              }}
            />
            {year}
          </div>
        </div>
        {/* Barra de progreso */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              flex: 1,
              height: "3px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "2px",
              maxWidth: "160px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#F5C842",
                borderRadius: "2px",
              }}
            />
          </div>
          <div style={{ fontSize: "11px", color: "#8fa8d0" }}>
            {watched}/{total} vistos
          </div>
        </div>

        {/* Rating o estado */}
        {isComplete ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(245,200,66,0.12)",
              color: "#F5C842",
              fontSize: "12px",
              fontWeight: "500",
              padding: "3px 10px",
              borderRadius: "20px",
              width: "fit-content",
            }}
          >
            ★ — promedio
          </div>
        ) : hasStarted ? (
          <div
            style={{ fontSize: "11px", color: "#8fa8d0", fontStyle: "italic" }}
          >
            en progreso...
          </div>
        ) : (
          <div
            style={{ fontSize: "11px", color: "#8fa8d0", fontStyle: "italic" }}
          >
            sin empezar
          </div>
        )}
      </div>

      {/* Coms carrusel */}
      {quotes.length > 0 ? (
        <SeasonCarousel quotes={quotes} />
      ) : (
        <div
          style={{
            width: "300px",
            minWidth: "200px",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#8fa8d0",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Los comentarios
            <br />
            aparecerán aquí
          </div>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [series, setSeries] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const backdropUrl = series ? getBackdropUrl(series.backdrop_path) : null;

  useEffect(() => {
    getSeriesInfo()
      .then((data) => {
        setSeries(data);
        const filtered = data.seasons.filter((s) => s.season_number > 0);
        setSeasons(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      {/* Hero Banner */}
      <div
        style={{
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "2rem",
          position: "relative",
          overflow: "hidden",
          minHeight: "140px",
          backgroundColor: "#1a2744",
        }}
      >
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt="backdrop"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.15,
            }}
          />
        )}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          <span style={{ fontSize: "56px", lineHeight: 1 }}>☂</span>
          <div>
            <h1
              style={{ fontSize: "34px", fontWeight: "500", color: "#F5C842" }}
            >
              How I Met Your Mother
            </h1>
            <p style={{ fontSize: "20px", color: "#8fa8d0", marginTop: "6px" }}>
              Bitacora Mosby legen-daria
            </p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "2rem" }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  color: "#F5C842",
                }}
              >
                {seasons.length}
              </div>
              <div
                style={{ fontSize: "11px", color: "#8fa8d0", marginTop: "2px" }}
              >
                temporadas
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  color: "#F5C842",
                }}
              >
                {series?.number_of_episodes || 208}
              </div>
              <div
                style={{ fontSize: "11px", color: "#8fa8d0", marginTop: "2px" }}
              >
                episodios
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Titulo seccion */}
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
        Temporadas
      </p>
      {/* Lista de temporadas */}
      {seasons.map((season) => (
        <SeasonCard key={season.season_number} season={season} />
      ))}
    </div>
  );
}

export default Home;
