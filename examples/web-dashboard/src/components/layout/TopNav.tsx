import { Link, useLocation } from "react-router-dom";
import { ExternalLink, Github, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TopNavProps {
  onMenuClick: () => void;
}

const routeMeta: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Distributed Rate Limiter",
    subtitle: "Interactive project evaluator hosted on Vercel",
  },
  "/algorithms": {
    title: "Live Playground",
    subtitle: "Compare rate limiting algorithms in real time",
  },
  "/analytics": {
    title: "Analytics Preview",
    subtitle: "Demo observability and export workflows",
  },
};

export const TopNav = ({ onMenuClick }: TopNavProps) => {
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const meta = routeMeta[pathname] ?? routeMeta["/"];

  return (
    <header className="flex min-h-16 items-center justify-between border-b border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground sm:text-xl">
            {meta.title}
          </h1>
          <p className="hidden text-sm text-muted-foreground md:block">
            {meta.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="hidden rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] md:inline-flex">
          Vercel Demo
        </Badge>

        <Button asChild variant="outline" className="hidden rounded-full md:inline-flex">
          <a href="https://github.com/Kenxpx/Distributed-Rate-Limiter" target="_blank" rel="noreferrer">
            GitHub
            <Github className="h-4 w-4" />
          </a>
        </Button>

        <Button asChild className="hidden rounded-full lg:inline-flex">
          <Link to="/algorithms">
            Open Playground
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};
