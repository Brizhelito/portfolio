import { createFileRoute } from "@tanstack/react-router";
import I18nProvider from "@/components/I18nProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reny Mireles — Fullstack Developer · Distributed Systems" },
      {
        name: "description",
        content:
          "Portfolio de Reny Mireles, Fullstack Developer especializado en sistemas distribuidos y apps cross-platform. Flutter · Go · React · Cloudflare Workers.",
      },
      { property: "og:title", content: "Reny Mireles — Fullstack Developer" },
      {
        property: "og:description",
        content:
          "Distributed systems · cross-platform apps · plugin architectures. Featured project: Kumoriya.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <I18nProvider>
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  );
}
