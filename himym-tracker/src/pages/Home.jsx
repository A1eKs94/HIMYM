import { useState, useEffect } from "react";

const PLACEHOLDER_QUOTES = [
  "salaverga",
  "asi de grandes peter",
  "Barney es god",
  "uwuwuwuwu",
];

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
        height: "130px",
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

function SeasonCard({
  number,
  episodes,
  year,
  watched,
  total,
  rating,
  quotes,
}) {
  const [hovered, setHovered] = useState(false);
  const hasStarted = watched > 0;
  const isComplete = watched === total;
  const progress = total > 0 ? (watched / total) * 100 : 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#1a2744",
        borderRadius: "14px",
        border: `1px solid ${hovered ? "#F5C842" : "rgba(255,255,255,0.08)"}`,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        marginBottom: "12px",
        cursor: "pointer",
        minHeight: "130px",
        opacity: hasStarted ? 1 : 0.5,
        transition: "border-color 0.2s, opacity 0.2s",
      }}
    >
      {/* Icono num */}
      <div
        style={{
          width: "110px",
          minWidth: "110px",
          height: "130px",
          backgroundColor: "#0f1724",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: "500",
            color: hasStarted ? "#F5C842" : "#8fa8d0",
            lineHeight: 1,
          }}
        >
          {number}
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
            fontWeight: "500",
            color: hasStarted ? "#ffffff" : "#8fa8d0",
          }}
        >
          Temporada {number}
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
            {episodes} episodios
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
                transition: "width 0.3s",
              }}
            />
          </div>
          <div style={{ fontSize: "11px", color: "#8fa8d0" }}>
            {watched}/{total} vistos
          </div>
        </div>

        {/* Rating o estado */}
        {isComplete && rating ? (
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
            ★ {rating} promedio
          </div>
        ) : hasStarted && !isComplete ? (
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
      {hasStarted && quotes.length > 0 ? (
        <SeasonCarousel quotes={quotes} />
      ) : (
        <div
          style={{
            width: "200px",
            minWidth: "200px",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            height: "130px",
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

const SEASONS_DATA = [
  {
    number: 1,
    episodes: 22,
    year: 2005,
    watched: 22,
    total: 22,
    rating: 8.4,
    quotes: [
      {
        text: "XDDDDDDDDDDDDDDDDDDD",
        episode: 1,
        author: "Tú",
      },
      {
        text: "asi de grandes peter",
        episode: 7,
        author: "Amiga",
      },
      {
        text: "si la leo lee esto es gei",
        episode: 12,
        author: "Tú",
      },
      {
        text: "uwuwuwuwuwwuwuwuw",
        episode: 4,
        author: "Amiga",
      },
    ],
  },
  {
    number: 2,
    episodes: 22,
    year: 2006,
    watched: 12,
    total: 22,
    rating: null,
    quotes: [
      {
        text: "67",
        episode: 1,
        author: "Amiga",
      },
      { text: "aaaaaaaaaaaa", episode: 9, author: "Tú" },
      { text: "lorem", episode: 5, author: "Amiga" },
    ],
  },
  {
    number: 3,
    episodes: 20,
    year: 2007,
    watched: 0,
    total: 20,
    rating: null,
    quotes: [],
  },
  {
    number: 4,
    episodes: 24,
    year: 2008,
    watched: 0,
    total: 24,
    rating: null,
    quotes: [],
  },
  {
    number: 5,
    episodes: 24,
    year: 2009,
    watched: 0,
    total: 24,
    rating: null,
    quotes: [],
  },
  {
    number: 6,
    episodes: 24,
    year: 2010,
    watched: 0,
    total: 24,
    rating: null,
    quotes: [],
  },
  {
    number: 7,
    episodes: 24,
    year: 2011,
    watched: 0,
    total: 24,
    rating: null,
    quotes: [],
  },
  {
    number: 8,
    episodes: 24,
    year: 2012,
    watched: 0,
    total: 24,
    rating: null,
    quotes: [],
  },
  {
    number: 9,
    episodes: 24,
    year: 2013,
    watched: 0,
    total: 24,
    rating: null,
    quotes: [],
  },
];

function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      {/* Hero Banner */}
      <div
        style={{
          backgroundColor: "#1a2744",
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "-20px",
            width: "180px",
            height: "180px",
            backgroundColor: "#F5C842",
            borderRadius: "50%",
            opacity: 0.06,
          }}
        />
        <span style={{ fontSize: "56px", lineHeight: 1 }}>☂</span>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "500", color: "#F5C842" }}>
            How I Met Your Mother
          </h1>
          <p style={{ fontSize: "14px", color: "#8fa8d0", marginTop: "6px" }}>
            Leo que deberia de poner aqui?
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "22px", fontWeight: "500", color: "#F5C842" }}
            >
              9
            </div>
            <div
              style={{ fontSize: "11px", color: "#8fa8d0", marginTop: "2px" }}
            >
              temporadas
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "22px", fontWeight: "500", color: "#F5C842" }}
            >
              999
            </div>
            <div
              style={{ fontSize: "11px", color: "#8fa8d0", marginTop: "2px" }}
            >
              episodios
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
      {SEASONS_DATA.map((season) => (
        <SeasonCard key={season.number} {...season} />
      ))}
    </div>
  );
}

export default Home;
