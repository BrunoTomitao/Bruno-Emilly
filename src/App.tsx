"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export default function App() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const diasEntreDatas = (dataInicio: string) => {
    const hoje = new Date();
    const inicio = new Date(dataInicio + "T00:00:00");
    const diffMs = hoje.getTime() - inicio.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };

  const animarContador = (id: string, valorFinal: number, duracao: number = 1500) => {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const incremento = valorFinal / (duracao / 16);
    const update = () => {
      start += incremento;
      if (start >= valorFinal) {
        el.textContent = valorFinal.toString();
        return;
      }
      el.textContent = Math.floor(start).toString();
      requestAnimationFrame(update);
    };
    update();
  };

  useEffect(() => {
    animarContador("dias-conhecer", diasEntreDatas("2025-01-10"));
    animarContador("dias-namoro", diasEntreDatas("2025-03-15"));

    const totalHearts = 40;

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("heart-emoji");

      const animationClass = `floatUpSideways${Math.floor(Math.random() * 3) + 1}`;
      heart.classList.add(animationClass);

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.setProperty("--rotate", `${Math.random() * 360}deg`);
      heart.style.animationDuration = 6 + Math.random() * 3 + "s";

      heart.textContent = "❤️";

      document.body.appendChild(heart);

      heart.addEventListener("animationend", () => {
        heart.remove();
        createHeart();
      });
    };

    for (let i = 0; i < totalHearts; i++) {
      setTimeout(createHeart, i * 300);
    }
  }, []);

  const fotos = [
    { src: "public/images/Festa_Junina_Sao_jose.png"},
    { src: "/images/Festa_Junina_Sao_jose_banco.jpg", alt: "Bruno e Emilly tomando café", desc: "Café da manhã juntos" },
    { src: "/images/aniversario.jpg", alt: "Aniversário da Emilly", desc: "Aniversário da Emilly" },
    { src: "/images/a.jpg", alt: "Bruno e Emilly na praia", desc: "Dia na praia" },
    { src: "/images/aa.jpg", alt: "Bruno e Emilly na praia", desc: "Dia na praia" },
    { src: "/images/hehe.jpg", alt: "Bruno e Emilly na praia", desc: "Dia na praia" },
  ];


  const abrirModal = (src: string) => setModalImage(src);
  const fecharModal = () => setModalImage(null);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) fecharModal();
  };

  return (
    <>
      <header className="header">
        <img
          src="/images/Festa_Junina_Sao_jose.jpg"
          alt="Foto perfil Bruno & Emilly"
          className="profile-pic"
          loading="lazy"
          draggable={false}
        />
        <h1>Bruno Cherbaty & Emilly Mariany</h1>
        <h2>Nosso amor em dias e memórias</h2>
      </header>

      <main className="main-container">
        <section className="counters" aria-label="Contadores de dias">
          <div
            className="counter-box"
            tabIndex={0}
            role="region"
            aria-live="polite"
            aria-label="Dias desde que nos conhecemos"
          >
            <div id="dias-conhecer" className="counter-number">0</div>
            <div className="counter-label">Desde que nos conhecemos</div>
            <div className="counter-date">10/01/2025</div>
          </div>

          <div
            className="counter-box"
            tabIndex={0}
            role="region"
            aria-live="polite"
            aria-label="Dias desde que começamos a namorar"
          >
            <div id="dias-namoro" className="counter-number">0</div>
            <div className="counter-label">Desde que começamos a namorar</div>
            <div className="counter-date">15/03/2025</div>
          </div>
        </section>

        <section className="gallery" aria-label="Galeria de fotos do casal">
          {fotos.map((foto, i) => (
            <article
              key={i}
              className="photo-card"
              tabIndex={0}
              role="button"
              aria-pressed="false"
              aria-label={`Abrir foto: ${foto.desc}`}
              onClick={() => abrirModal(foto.src)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") abrirModal(foto.src);
              }}
            >
              <img src={foto.src} alt={foto.alt} draggable={false} />
            </article>
          ))}
        </section>
      </main>

      {modalImage && (
        <div
          className="modal-overlay"
          onClick={onOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização da imagem em tamanho maior"
        >
          <div className="modal-content" tabIndex={-1}>
            <button
              aria-label="Fechar modal"
              className="btn-close"
              onClick={fecharModal}
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Imagem ampliada do casal"
              className="modal-img"
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
