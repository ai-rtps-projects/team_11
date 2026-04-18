import ChatWidget from "@/components/ChatWidget";
import SiteHeader from "@/components/SiteHeader";
import { CalendarDays, CheckCircle2, GraduationCap, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const featureCards = [
  {
    title: "NAAC A+ Accredited",
    description: "Recognized for quality academics and student success outcomes.",
    icon: CheckCircle2,
  },
  {
    title: "35+ Programs",
    description: "Career-focused undergraduate and postgraduate learning paths.",
    icon: GraduationCap,
  },
  {
    title: "92% Placement Support",
    description: "Recruiter network, internship support, and training pipelines.",
    icon: Users,
  },
];

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.14),transparent_42%),radial-gradient(circle_at_10%_30%,rgba(34,197,94,0.08),transparent_35%)]">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <SiteHeader />

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" />
              Admissions 2026 now open
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome to Meow University
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Explore our academics, admissions, and campus life through dedicated pages. For instant admission support, use the chatbot in the bottom-right corner.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <NavLink to="/admissions" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Start Application Journey
              </NavLink>
              <NavLink to="/programs" className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">
                Explore Programs
              </NavLink>
            </div>
          </div>

          <div className="grid gap-3">
            {featureCards.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-border/80 bg-background/85 p-4 shadow-sm backdrop-blur">
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-semibold">{title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>

    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-4 md:grid-cols-3">
        <NavLink to="/programs" className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Programs</p>
          <h2 className="mt-2 text-lg font-semibold">Academic Schools</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Browse departments, degrees, and career-focused pathways.</p>
        </NavLink>
        <NavLink to="/admissions" className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Admissions</p>
          <h2 className="mt-2 text-lg font-semibold">Procedure & Deadlines</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Get eligibility, required documents, and timeline details.</p>
        </NavLink>
        <NavLink to="/campus" className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Campus</p>
          <h2 className="mt-2 text-lg font-semibold">Life at Meow University</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Discover facilities, student life, and institutional strengths.</p>
        </NavLink>
      </section>
    </main>

    <ChatWidget />
  </div>
);

export default Index;
