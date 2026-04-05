import { ArrowRight, GraduationCap } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const linkBase = "px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground";

const SiteHeader = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/70 px-4 py-3 backdrop-blur">
      <NavLink to="/" className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold leading-tight">Meow University</p>
          <p className="text-xs text-muted-foreground">Excellence in Learning & Research</p>
        </div>
      </NavLink>

      <nav className="hidden items-center gap-5 md:flex">
        <NavLink to="/programs" className={linkBase} activeClassName="text-foreground font-medium">
          Programs
        </NavLink>
        <NavLink to="/admissions" className={linkBase} activeClassName="text-foreground font-medium">
          Admissions
        </NavLink>
        <NavLink to="/campus" className={linkBase} activeClassName="text-foreground font-medium">
          Campus
        </NavLink>
      </nav>

      <NavLink
        to="/admissions"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Apply Now
        <ArrowRight className="h-4 w-4" />
      </NavLink>
    </header>
  );
};

export default SiteHeader;
