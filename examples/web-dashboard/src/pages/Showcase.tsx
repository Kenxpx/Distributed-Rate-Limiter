import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  CloudCog,
  Database,
  ExternalLink,
  Github,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const repoUrl = "https://github.com/Kenxpx/Distributed-Rate-Limiter";

const highlightCards = [
  {
    title: "Algorithm Lab",
    description: "Compare token bucket, sliding window, fixed window, and leaky bucket behavior side by side.",
    icon: Radar,
  },
  {
    title: "Production Backend",
    description: "Spring Boot + Redis service with OpenAPI, monitoring, scheduling, and deployment assets.",
    icon: CloudCog,
  },
  {
    title: "Systems Thinking",
    description: "This demo makes the tradeoffs visible instead of hiding them behind screenshots.",
    icon: Boxes,
  },
  {
    title: "Hiring Review Ready",
    description: "Designed so an engineer can understand the product, the architecture, and the execution quickly.",
    icon: ShieldCheck,
  },
];

const evaluationSteps = [
  {
    title: "Start with the live playground",
    description: "Run the simulator in-browser and observe how each algorithm reacts to bursty and steady traffic.",
  },
  {
    title: "Check the analytics preview",
    description: "Review the observability and analysis surfaces that support real operations workflows.",
  },
  {
    title: "Open the repository",
    description: "Inspect the Spring Boot service, Redis integration, Docker assets, and Kubernetes manifests.",
  },
];

const architectureLayers = [
  {
    title: "Edge-friendly evaluator",
    description: "This Vercel deployment hosts the interactive UI, charts, and deterministic simulator for review.",
    icon: Sparkles,
  },
  {
    title: "Distributed decision engine",
    description: "The repository backend is built around Spring Boot APIs and Redis-backed state management.",
    icon: Database,
  },
  {
    title: "Operational surface area",
    description: "Monitoring, scheduling, analytics, and admin workflows demonstrate how the system would run in production.",
    icon: BrainCircuit,
  },
];

const proofPoints = [
  "Interactive simulator runs entirely in-browser",
  "GitHub repo contains the backend implementation",
  "Vercel hosts the review experience cleanly",
  "Architecture is presented honestly, not oversold",
];

const Showcase = () => {
  return (
    <div className="space-y-8 pb-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-elevated backdrop-blur md:p-8 xl:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.18),transparent_30%)]" />
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit border border-border/60 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em]">
              Interactive evaluator for technical review
            </Badge>

            <div className="space-y-4">
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
                Distributed rate limiting, presented the way a principal engineer would want to evaluate it.
              </h2>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
                This Vercel app is the live review surface for the project. The interactive playground is hosted here,
                while the repository contains the full Spring Boot + Redis implementation, deployment assets, and
                systems-oriented backend work.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6">
                <Link to="/algorithms">
                  Launch Playground
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-6">
                <a href={repoUrl} target="_blank" rel="noreferrer">
                  View GitHub
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-11 rounded-full px-6">
                <Link to="/analytics">
                  Analytics Preview
                  <BarChart3 className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {highlightCards.map((card) => (
                <Card key={card.title} className="rounded-2xl border border-border/60 bg-background/75 p-5 backdrop-blur-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="rounded-[1.75rem] border border-border/60 bg-slate-950 p-5 text-slate-50 shadow-elevated">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-200/80">Review Snapshot</p>
                  <h3 className="mt-2 text-2xl font-semibold">What this demo proves</h3>
                </div>
                <Badge className="bg-amber-400 text-slate-950 hover:bg-amber-300">Hosted on Vercel</Badge>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
                <img
                  src="/screenshots/dashboard-preview.png"
                  alt="Distributed Rate Limiter dashboard preview"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[1.75rem] border border-border/60 bg-card/85 p-6 shadow-card">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
              Honest deployment note
            </Badge>
            <h3 className="text-2xl font-semibold text-foreground">Can the whole project live on Vercel?</h3>
            <p className="leading-7 text-muted-foreground">
              Not as-is. The repository&apos;s core service is a stateful Spring Boot + Redis system, which is better
              suited to a container platform. Vercel is the right place for the evaluator UI, interactive algorithm
              walkthrough, and portfolio-grade frontend surface.
            </p>
            <p className="leading-7 text-muted-foreground">
              That is the version a strong hiring manager will respect: the frontend demo is live and polished, while
              the architecture note stays technically honest about where the backend belongs.
            </p>
          </div>
        </Card>

        <Card className="rounded-[1.75rem] border border-border/60 bg-card/85 p-6 shadow-card">
          <div className="space-y-5">
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
              Suggested evaluation flow
            </Badge>
            <div className="grid gap-4 md:grid-cols-3">
              {evaluationSteps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border/60 bg-background/70 p-5">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
            System design at a glance
          </Badge>
          <h3 className="text-2xl font-semibold text-foreground">How the hosted experience maps to the actual project</h3>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {architectureLayers.map((layer) => (
            <Card key={layer.title} className="rounded-[1.5rem] border border-border/60 bg-card/85 p-6 shadow-card">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-amber-300/20 text-primary">
                <layer.icon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">{layer.title}</h4>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{layer.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[1.75rem] border border-border/60 bg-card/85 p-6 shadow-card">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
              Why this helps your candidacy
            </Badge>
            <h3 className="text-2xl font-semibold text-foreground">The live link answers the questions a reviewer will actually ask.</h3>
            <div className="space-y-3 text-sm leading-7 text-muted-foreground">
              <p>Can I understand the product quickly without cloning the repo?</p>
              <p>Can I interact with the core algorithmic idea instead of just reading claims in a README?</p>
              <p>Does the candidate understand deployment boundaries well enough to separate demo UX from production backend reality?</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-[1.75rem] border border-border/60 bg-card/85 p-6 shadow-card">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
              Quick links
            </Badge>
            <div className="grid gap-3">
              <Button asChild variant="secondary" className="justify-between rounded-2xl px-4 py-6">
                <Link to="/algorithms">
                  Open the live algorithm lab
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="justify-between rounded-2xl px-4 py-6">
                <Link to="/analytics">
                  Review analytics and export flows
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="justify-between rounded-2xl px-4 py-6">
                <a href={repoUrl} target="_blank" rel="noreferrer">
                  Inspect backend code on GitHub
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <div className="rounded-2xl border border-dashed border-border/70 px-4 py-4 text-sm leading-6 text-muted-foreground">
                Next step after this Vercel demo: deploy the Spring Boot backend and Redis on a container platform, then
                wire the frontend to live APIs for a full-stack public demo.
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Showcase;
