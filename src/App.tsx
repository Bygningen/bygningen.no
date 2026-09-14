import { useState } from "react";
import {
  Mail,
  ArrowUpRight,
  SeparatorHorizontal,
} from "lucide-react";
import membersData from "./data/medlemmer.json";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

type Lang = "no" | "en";

interface Contact {
  linkedin: { brukernavn: string; url: string };
  github: { brukernavn: string; url: string };
  epost: string;
}

interface Locale {
  rolle: string;
  ferdigheter: string[];
  interesser: string[];
  bio: string;
  om_meg?: string;
}

interface Member {
  id: string;
  fornavn: string;
  etternavn: string;
  bilder: string[];
  kontakt: Contact;
  i18n: { no: Locale; en: Locale };
}

const members = membersData as Member[];

const copy = {
  no: {
    kicker: "Bacheloroppgave 2026",
    title: "Teamet bak prosjektet",
    intro:
      "Fire studenter, ett semester, én leveranse. Her er hvem vi er, hva vi kan, og hva vi driver med når vi ikke skriver kode.",
    skillsLabel: "Ferdigheter",
    interestsLabel: "Utenfor prosjektet",
    contactLabel: "Kontakt",
    footerNote: "Laget som en del av bacheloroppgaven.",
  },
  en: {
    kicker: "Bachelor thesis 2026",
    title: "The team behind the project",
    intro:
      "Four students, one semester, one deliverable. Here's who we are, what we do, and what keeps us busy outside the codebase.",
    skillsLabel: "Skills",
    interestsLabel: "Outside the project",
    contactLabel: "Contact",
    footerNote: "Made as part of the bachelor thesis.",
  },
};

function initials(fornavn: string, etternavn: string) {
  return `${fornavn[0]}${etternavn[0]}`.toUpperCase();
}

function MemberRow({
  member,
  index,
  lang,
  reversed,
}: {
  member: Member;
  index: number;
  lang: Lang;
  reversed: boolean;
}) {
  const locale = member.i18n[lang];
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="py-14 md:py-20">
      <div
        className={`flex flex-col gap-10 md:gap-16 md:items-start ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Portrait block */}
        <div className="md:w-[280px] shrink-0">
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-serif text-sm tracking-wide text-[#A97C3F]">
              {number}
            </span>
            <SeparatorHorizontal className="flex-1 bg-[#1C2333]/10" />
          </div>
          <div className="aspect-[4/5] w-full rounded-sm bg-[#1C2333]/[0.06] border border-[#1C2333]/10 flex items-center justify-center overflow-hidden">
            <span className="font-serif text-5xl text-[#1C2333]/25">
              {initials(member.fornavn, member.etternavn)}
            </span>
          </div>
        </div>

        {/* Content block */}
        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1C2333] leading-tight">
            {member.fornavn} {member.etternavn}
          </h2>
          <p className="mt-1.5 text-[15px] text-[#6E7F5C] font-medium">
            {locale.rolle}
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-[#1C2333]/80 max-w-[62ch]">
            {locale.bio}
          </p>
          {locale.om_meg && (
            <p className="mt-3 text-[15px] leading-relaxed text-[#1C2333]/70 max-w-[62ch] italic font-serif">
              {locale.om_meg}
            </p>
          )}

          <div className="mt-7 grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-[#1C2333]/50 mb-2.5">
                {copy[lang].skillsLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {locale.ferdigheter.map((skill) => (
                  <Badge
                    key={skill}
                    className="border-[#1C2333]/15 text-[#1C2333]/80 font-normal rounded-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#1C2333]/50 mb-2.5">
                {copy[lang].interestsLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {locale.interesser.map((interest) => (
                  <Badge
                    key={interest}
                    className="bg-[#6E7F5C]/10 text-[#4C5940] hover:bg-[#6E7F5C]/10 font-normal rounded-sm border-0"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <a
              href={`mailto:${member.kontakt.epost}`}
              className="inline-flex items-center gap-1.5 text-sm text-[#1C2333]/70 hover:text-[#A97C3F] transition-colors"
            >
              <Mail className="w-4 h-4" />
              {member.kontakt.epost}
            </a>
            <a
              href={member.kontakt.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#1C2333]/70 hover:text-[#A97C3F] transition-colors"
            >
              <Mail className="w-4 h-4" />
              {member.kontakt.linkedin.brukernavn}
            </a>
            <a
              href={member.kontakt.github.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#1C2333]/70 hover:text-[#A97C3F] transition-colors"
            >
              <Mail className="w-4 h-4" />
              {member.kontakt.github.brukernavn}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("no");
  const t = copy[lang];

  if (!members || members.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <p className="text-[#1C2333]/50 text-sm">
          Ingen medlemmer funnet i ./data/medlemmer.json
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1C2333]">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Header */}
        <header className="pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs tracking-wide text-[#A97C3F] mb-4">
                {t.kicker}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl leading-[1.05]">
                {t.title}
              </h1>
              <p className="mt-5 text-[15px] md:text-base text-[#1C2333]/70 max-w-[52ch] leading-relaxed">
                {t.intro}
              </p>
            </div>

            <div className="flex gap-1 shrink-0 mt-1">
              <Button
                variant={lang === "no" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLang("no")}
                className={
                  lang === "no"
                    ? "bg-[#1C2333] hover:bg-[#1C2333]/90 text-[#FAF8F3]"
                    : "text-[#1C2333]/60"
                }
              >
                NO
              </Button>
              <Button
                variant={lang === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLang("en")}
                className={
                  lang === "en"
                    ? "bg-[#1C2333] hover:bg-[#1C2333]/90 text-[#FAF8F3]"
                    : "text-[#1C2333]/60"
                }
              >
                EN
              </Button>
            </div>
          </div>
        </header>

        <Separator className="bg-[#1C2333]/10" />

        {/* Roster */}
        <div className="divide-y divide-[#1C2333]/10">
          {members.map((member, i) => (
            <MemberRow
              key={member.id}
              member={member}
              index={i}
              lang={lang}
              reversed={i % 2 === 1}
            />
          ))}
        </div>

        <SeparatorHorizontal className="bg-[#1C2333]/10" />

        {/* Footer */}
        <footer className="py-10 flex items-center justify-between text-sm text-[#1C2333]/50">
          <span>{t.footerNote}</span>
          <a
            href="#"
            className="inline-flex items-center gap-1 hover:text-[#A97C3F] transition-colors"
          >
            {lang === "no" ? "Les oppgaven" : "Read the thesis"}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </footer>
      </div>
    </div>
  );
}