import ChatWidget from "@/components/ChatWidget";
import SiteHeader from "@/components/SiteHeader";
import { Building2, FlaskConical, House, Trophy } from "lucide-react";

const campusHighlights = [
  {
    title: "Modern Academic Blocks",
    icon: Building2,
    detail: "Smart classrooms, seminar halls, and collaborative project spaces.",
  },
  {
    title: "Research Laboratories",
    icon: FlaskConical,
    detail: "Discipline-focused labs for innovation, experiments, and prototyping.",
  },
  {
    title: "Residential Life",
    icon: House,
    detail: "Secure hostels, student clubs, sports facilities, and wellness support.",
  },
  {
    title: "Student Achievements",
    icon: Trophy,
    detail: "National-level competition wins and strong placement outcomes.",
  },
];

const Campus = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.12),transparent_45%)]">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <SiteHeader />
          <section className="mt-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Campus</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">A vibrant campus for academics, innovation, and student life</h1>
            <p className="mt-4 text-base text-muted-foreground">
              Meow University provides a learning environment where classrooms, labs, and student communities come together for holistic growth.
            </p>
          </section>
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-2">
          {campusHighlights.map(({ title, icon: Icon, detail }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-5">
            <p className="text-3xl font-semibold">12,000+</p>
            <p className="mt-1 text-sm text-muted-foreground">Students across UG and PG programs</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5">
            <p className="text-3xl font-semibold">450+</p>
            <p className="mt-1 text-sm text-muted-foreground">Faculty and visiting scholars</p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5">
            <p className="text-3xl font-semibold">150+</p>
            <p className="mt-1 text-sm text-muted-foreground">Industry collaborations and MoUs</p>
          </article>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
};

export default Campus;
