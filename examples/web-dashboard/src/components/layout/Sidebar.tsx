import { NavLink } from "react-router-dom";
import { 
  Home, 
  FlaskConical, 
  BarChart3, 
  ChevronLeft,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const navItems = [
  { title: "Overview", url: "/", icon: Home },
  { title: "Playground", url: "/algorithms", icon: FlaskConical },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export const Sidebar = ({ open, onToggle }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-sidebar-border bg-sidebar-background transition-all duration-300",
        open ? "w-64" : "w-20"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {open && (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber-400 text-primary-foreground shadow-card">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="block bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-lg font-bold text-transparent">
                Rate Limiter
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Vercel demo
              </span>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="rounded-lg p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={open}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              !open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )
            }
            title={!open ? item.title : undefined}
          >
            {({ isActive }) => (
              <>
                <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {open && <span>{item.title}</span>}
                {!open && <span className="sr-only">{item.title}</span>}
                {isActive && <span className="sr-only">(current page)</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {open && (
        <div className="p-3 pt-0">
          <div className="rounded-3xl border border-sidebar-border bg-sidebar-accent/55 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Review context</p>
            <p className="mt-2 text-sm leading-6 text-sidebar-foreground">
              Frontend evaluator on Vercel. Spring Boot + Redis backend lives in the repository.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
