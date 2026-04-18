import ChatWidget from "@/components/ChatWidget";
import SiteHeader from "@/components/SiteHeader";
import { Landmark, Library, Microscope, Sparkles } from "lucide-react";

const programs = [
  {
    school: "School of Engineering",
    icon: Landmark,
    offerings: ["B.Tech - Computer Science", "B.Tech - Electronics", "B.Tech - Mechanical"],
    detail: "Outcome-driven curriculum with labs, mini-projects, and internships.",
  },
  {
    school: "School of Computing",
    icon: Library,
    offerings: ["B.Sc Computer Science", "BCA", "M.Sc Data Science"],
    detail: "Industry-aligned pathways in AI, software engineering, and analytics.",
  },
  {
    school: "School of Management",
    icon: Sparkles,
    offerings: ["BBA", "MBA - Finance", "MBA - HR & Analytics"],
    detail: "Case-based learning with mentorship from academic and corporate experts.",
  },
  {
    school: "School of Applied Sciences",
    icon: Microscope,
    offerings: ["B.Sc Mathematics", "B.Sc Physics", "M.Sc Applied Mathematics"],
    detail: "Research-ready academics with strong quantitative and laboratory foundations.",
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.12),transparent_38%)]">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <SiteHeader />
          <section className="mt-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Programs</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Academic programs designed for future careers</h1>
            <p className="mt-4 text-base text-muted-foreground">
              Choose from interdisciplinary undergraduate and postgraduate programs built with academic rigor and industry relevance.
            </p>
          </section>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {programs.map(({ school, icon: Icon, offerings, detail }) => (
            <article key={school} className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold">{school}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{detail}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                {offerings.map((offering) => (
                  <li key={offering} className="rounded-lg bg-muted/40 px-3 py-1.5">{offering}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};

export default Programs;
