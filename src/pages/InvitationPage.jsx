import React from "react";
import { WEDDING } from "../config";
import CatCorners from "../components/CatCorners";
import Countdown from "../components/Countdown";
import AttendanceForm from "../components/AttendanceForm";
import SongForm from "../components/SongForm";
import PhotoUpload from "../components/PhotoUpload";
import TipsCard from "../components/TipsCard";

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-6 text-center md:mb-8">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-700/70">
        {eyebrow}
      </p>
      <h2 className="font-script text-4xl text-blue-950 sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

function DateCard() {
  return (
    <article className="panel-card fade-up flex min-h-64 flex-col items-center justify-center px-6 py-8 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700/70">
        Reserva la fecha
      </p>
      <div className="my-4 flex items-center justify-center gap-5 sm:gap-8">
        <span className="max-w-16 text-[10px] font-medium uppercase leading-5 tracking-[0.18em] text-slate-400">
          Sábado
        </span>
        <span className="font-script text-8xl leading-none text-blue-900">
          19
        </span>
        <span className="max-w-16 text-[10px] font-medium uppercase leading-5 tracking-[0.18em] text-slate-400">
          2:00
          <br />
          PM
        </span>
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
        Diciembre · 2026
      </p>
      <span className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
    </article>
  );
}

export default function InvitationPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ivory text-slate-800">
      <section className="relative mx-auto max-w-[1440px] px-3 pb-8 pt-3 sm:px-6 sm:pb-12 sm:pt-6 lg:px-10">
        <div className="hero-panel relative isolate overflow-hidden rounded-[2rem] px-5 pb-8 pt-24 shadow-[0_28px_90px_-48px_rgba(36,76,96,0.5)] sm:rounded-[2.75rem] sm:px-10 sm:pb-12 sm:pt-28 lg:px-16 lg:py-16">
          <CatCorners position="top" />
          <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="fade-up order-2 text-center lg:order-1 lg:text-left">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-blue-800/65 sm:text-xs">
                Con la bendición de nuestras familias
              </p>
              <div className="relative mt-9 pt-8 sm:mt-0 sm:pt-10">
                <div className="bird-decorations" aria-hidden="true">
                  <img
                    className="bird-decoration bird-decoration-left"
                    src="/Pajaro1.png"
                    alt=""
                  />
                  <img
                    className="bird-decoration bird-decoration-right"
                    src="/Pajaro2.png"
                    alt=""
                  />
                </div>
                <h1 className="font-script text-5xl leading-[1.08] text-blue-950 sm:text-7xl xl:text-8xl">
                  Michelle <span className="text-rose-400">&amp;</span> Jair
                </h1>
              </div>
              <p className="mt-5 font-display text-lg italic leading-8 text-slate-600 sm:text-xl">
                Tenemos el gusto de invitarte a compartir el día más especial de
                nuestras vidas.
              </p>
              <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-12 bg-amber-500/60" />
                <span className="text-sm text-amber-700">✦</span>
                <span className="h-px w-12 bg-amber-500/60" />
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
                Nos hará muy felices celebrar este día junto a nuestros seres
                queridos.
              </p>
              <a
                className="primary-link mx-auto mt-8 inline-flex items-center gap-2 lg:mx-0"
                href="#detalles"
              >
                Descubre los detalles <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div
              className="fade-up order-1 mx-auto w-full max-w-2xl lg:order-2"
              style={{ animationDelay: "120ms" }}
            >
              <div className="relative mx-auto aspect-[4/3] max-w-[640px] rotate-1 rounded-[2rem] bg-white p-2.5 shadow-[0_24px_55px_-28px_rgba(36,76,96,0.45)] sm:p-3">
                <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-100 via-[#f7f2e9] to-amber-100">
                  {WEDDING.fotoPareja ? (
                    <img
                      className="h-full w-full object-cover"
                      src={WEDDING.fotoPareja}
                      alt="Michelle y Jair"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                      <span className="mb-4 grid h-16 w-16 place-items-center rounded-full border border-white/80 bg-white/65 text-2xl text-blue-800 shadow-sm">
                        ♡
                      </span>
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-4 -left-4 grid h-12 w-12 place-items-center rounded-full border-4 border-ivory bg-white text-lg text-amber-600 shadow-md sm:h-14 sm:w-14">
                  ✦
                </span>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-blue-950/45 sm:mt-12">
            Nuestra boda · 19 de diciembre de 2026
          </p>
        </div>
      </section>

      <div
        id="detalles"
        className="mx-auto max-w-6xl scroll-mt-8 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8"
      >
        <section className="grid gap-5 md:grid-cols-2 md:gap-7">
          <DateCard />
          <article
            className="panel-card fade-up flex min-h-64 flex-col justify-center px-2 py-5 sm:px-5"
            style={{ animationDelay: "100ms" }}
          >
            <SectionHeading
              eyebrow="Cada vez falta menos"
              title="Cuenta regresiva"
            />
            <Countdown />
          </article>
        </section>

        <section className="section-space">
          <SectionHeading
            eyebrow="Celebremos juntos"
            title="¿Dónde nos vemos?"
            description="Nos encantará compartir contigo este día tan especial."
          />
          <div className="panel-card mx-auto max-w-4xl p-6 sm:p-9 md:p-11">
            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
              <div className="text-center md:text-left">
                <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-xl text-blue-800 md:mx-0">
                  ⌖
                </span>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-700/65">
                  Recepción
                </p>
                <h3 className="font-script text-3xl text-blue-950 sm:text-4xl">
                  {WEDDING.lugarNombre}
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 md:mx-0">
                  {WEDDING.lugarDireccion}
                </p>
              </div>
              <a
                className="primary-link inline-flex items-center justify-center gap-2"
                href={WEDDING.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span aria-hidden="true">↗</span> Cómo llegar
              </a>
            </div>
          </div>
        </section>

        <section className="section-space grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <SectionHeading
              eyebrow="Nos encantará verte"
              title="Confirma tu asistencia"
              description="Ayúdanos a preparar todo para recibirte."
            />
            <AttendanceForm />
          </div>
          <div>
            <SectionHeading
              eyebrow="La música también la eliges tú"
              title="Sugiere una canción"
              description="Cuéntanos cuál canción no puede faltar en la pista."
            />
            <SongForm />
          </div>
        </section>

        <section className="section-space grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div>
            <SectionHeading
              eyebrow="Momentos para recordar"
              title="Galería de fotos"
              description="Comparte con nosotros las fotos que tomes durante la celebración."
            />
            <PhotoUpload />
          </div>
          <div className="lg:pt-[4.5rem]">
            <SectionHeading
              eyebrow="Unos detalles"
              title="Antes de venir"
              description="Algunas notas para que disfrutes la celebración."
            />
            <TipsCard />
          </div>
        </section>
      </div>

      <footer className="relative overflow-hidden border-t border-blue-100 bg-gradient-to-b from-[#f5f8f8] to-[#e7f0f4] px-4 pb-28 pt-12 text-center sm:pb-32 sm:pt-16">
        <CatCorners position="bottom" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-blue-800/55">
            Con mucho cariño
          </p>
          <p className="font-script text-5xl text-blue-950 sm:text-6xl">
            Michelle <span className="text-rose-400">&amp;</span> Jair
          </p>
          <p className="mt-3 font-script text-2xl text-amber-700 sm:text-3xl">
            ¡Te esperamos!
          </p>
        </div>
      </footer>
    </main>
  );
}
