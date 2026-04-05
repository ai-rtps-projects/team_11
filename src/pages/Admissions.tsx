import ChatWidget from "@/components/ChatWidget";
import SiteHeader from "@/components/SiteHeader";

const timeline = [
  { month: "May", title: "Applications Open", detail: "Online portal opens for all UG/PG programs." },
  { month: "June", title: "Document Verification", detail: "Eligibility and marksheet validation window." },
  { month: "July", title: "Merit & Counseling", detail: "Merit list publication and seat allotment rounds." },
  { month: "August", title: "Enrollment", detail: "Fee confirmation, orientation, and classes begin." },
];

const documents = [
  "10th and 12th marksheets",
  "Transfer certificate",
  "Government photo ID",
  "Passport-size photographs",
  "Category certificate (if applicable)",
  "Entrance scorecard (if applicable)",
];

const Admissions = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_45%)]">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <SiteHeader />
          <section className="mt-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Admissions</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your complete admission guide for Meow University</h1>
            <p className="mt-4 text-base text-muted-foreground">
              Get clear steps, timeline, and requirements for a smooth admission process. For instant query support, use the admission chatbot in the bottom-right corner.
            </p>
          </section>
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">Admission Enquiries Use Case</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Problem:</strong> Students repeatedly ask about admission procedures, eligibility, and deadlines.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Chatbot Solution:</strong> Instant answers on courses, fees, eligibility, deadlines, and required documents.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">Required Documents</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              {documents.map((item) => (
                <li key={item} className="rounded-lg bg-muted/40 px-3 py-2">{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-muted/20 p-5">
          <h2 className="text-lg font-semibold">Admission Timeline</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <article key={item.title} className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{item.month}</p>
                <h3 className="mt-1 text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <ChatWidget />
    </div>
  );
};

export default Admissions;
