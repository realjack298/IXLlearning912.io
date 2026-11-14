import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode, type FormEvent } from "react";
import {
  ArrowLeft,
  Calculator,
  Gamepad2,
  Search,
  Youtube,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

const FACTS = [
  "Octopuses have three hearts, and two of them stop when they swim.",
  "A day on Venus is longer than a year on Venus.",
  "Honey never spoils. Archaeologists have eaten 3,000-year-old honey.",
  "Bananas are berries. Strawberries are not.",
  "There are more possible chess games than atoms in the observable universe.",
  "The first video game was created in 1958: Tennis for Two.",
  "Sharks are older than trees. Trees showed up about 350 million years ago.",
  "A group of flamingos is called a flamboyance.",
];

const GAME_SRC =
  "https://d11jzht7mj96rr.cloudfront.net/games/2024/construct/311/basket-hoop/index-gg.html";

type Screen = "hub" | "games" | "youtube" | "google" | "calc";

function Home() {
  const [phase, setPhase] = useState<"check" | "splash" | "app">("check");
  const [screen, setScreen] = useState<Screen>("hub");
  const [fact, setFact] = useState(FACTS[0]);

  useEffect(() => {
    if (window.localStorage.getItem("ixl-seen-boot") === "1") {
      setPhase("app");
      return;
    }
    setFact(FACTS[Math.floor(Math.random() * FACTS.length)] ?? FACTS[0]);
    setPhase("splash");
    const t = window.setTimeout(() => {
      window.localStorage.setItem("ixl-seen-boot", "1");
      setPhase("app");
    }, 5000);
    return () => window.clearTimeout(t);
  }, []);

  if (phase === "check") {
    return <main className="min-h-dvh bg-bg" />;
  }

  if (phase === "splash") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center bg-bg px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">Booting</p>
        <h1 className="title-anim mt-3 font-display text-5xl font-extrabold text-fg sm:text-7xl">
          IXL Games
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{fact}</p>
        <div className="mt-10 h-1 w-56 overflow-hidden rounded-full bg-surface-2">
          <div className="splash-bar h-full w-full bg-gold" />
        </div>
      </main>
    );
  }

  if (screen !== "hub") {
    return <Panel screen={screen} onBack={() => setScreen("hub")} />;
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col bg-bg px-5 py-10">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Arcade hub</p>
        <h1 className="title-anim mt-2 font-display text-5xl font-extrabold text-fg sm:text-6xl">
          IXL Games
        </h1>
        <p className="mt-3 text-muted">Pick a room. Install this app from your browser anytime.</p>
      </header>
      <nav className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Tile icon={<Gamepad2 />} label="Games" hint="Basket hoop" onClick={() => setScreen("games")} />
        <Tile icon={<Youtube />} label="YouTube" hint="Watch a video" onClick={() => setScreen("youtube")} />
        <Tile icon={<Search />} label="Google" hint="Search the web" onClick={() => setScreen("google")} />
        <Tile icon={<Calculator />} label="Calculator" hint="Real math" onClick={() => setScreen("calc")} />
      </nav>
    </main>
  );
}

function Tile({
  icon,
  label,
  hint,
  onClick,
  wide,
}: {
  icon: ReactNode;
  label: string;
  hint: string;
  onClick: () => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-20 items-center gap-4 rounded-2xl border border-line bg-surface px-5 text-left transition hover:border-gold hover:bg-surface-2 ${wide ? "sm:col-span-2" : ""}`}
    >
      <span className="text-gold">{icon}</span>
      <span>
        <span className="block font-display text-xl font-bold text-fg">{label}</span>
        <span className="text-sm text-muted">{hint}</span>
      </span>
    </button>
  );
}

function Panel({ screen, onBack }: { screen: Screen; onBack: () => void }) {
  return (
    <main className="flex h-dvh flex-col bg-bg">
      <header className="flex items-center gap-3 border-b border-line px-3 py-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-fg hover:bg-surface"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <span className="font-display text-lg font-bold tracking-wide text-gold">
          {screen === "games"
            ? "Games"
            : screen === "youtube"
              ? "YouTube"
              : screen === "google"
                ? "Google"
                : "Calculator"}
        </span>
      </header>
      <div className="min-h-0 flex-1">
        {screen === "games" && <GameRoom />}
        {screen === "youtube" && <YouTubeRoom />}
        {screen === "google" && <GoogleRoom />}
        {screen === "calc" && <CalcRoom />}
      </div>
    </main>
  );
}

const GAMES = [
  {
    id: "hoop",
    name: "Basket Hoop",
    src: GAME_SRC,
    allow: "fullscreen",
  },
  {
    id: "pacman",
    name: "Halloween Pac-Man",
    src: "https://searchplayground.google/pacman/halloween/",
    allow: "web-share",
  },
  {
    id: "granny",
    name: "Granny",
    src: "https://app-611144.games.s3.yandex.net/611144/0ila6noialuudahd819fs5ijel7z90n6/index.html?clid=14408047&sdk=%2Fsdk%2F_%2Fv2.2f14a50521d68e9766e1.js#origin=https%3A%2F%2Fplayhop.com&app-id=611144&device-type=desktop",
    allow: "accelerometer; gyroscope",
  },
  {
    id: "minecraft",
    name: "Minecraft",
    src: "/games/2026/more/duckcraft-12/index.html",
    allow: "fullscreen",
  },
  {
    id: "subway",
    name: "Subway Surfers",
    src: "https://classroom-6x.io/games/subway-surfers/",
    allow: "fullscreen",
  },
  {
    id: "drive",
    name: "Ultimate Car Driving",
    src: "https://classroom-6x.io/games/ultimate-car-driving/",
    allow: "fullscreen",
  },
  {
    id: "blast",
    name: "Block Blast",
    src: "https://gamezipper.com/block-blast/?utm_source=embed",
    allow: "autoplay; fullscreen; gamepad",
  },
  {
    id: "cookie",
    name: "Cookie Clicker",
    src: "https://gamezipper.com/cookie-clicker/?utm_source=embed",
    allow: "autoplay; fullscreen; gamepad",
  },
];

function GameRoom() {
  const [picked, setPicked] = useState<string | null>(null);
  const game = GAMES.find((g) => g.id === picked);

  if (!game) {
    return (
      <div className="h-full overflow-y-auto p-4">
        <ul className="mx-auto flex max-w-lg flex-col gap-2">
          {GAMES.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setPicked(g.id)}
                className="flex min-h-14 w-full items-center rounded-2xl border border-line bg-surface px-5 text-left font-display text-xl font-bold text-fg hover:border-gold"
              >
                {g.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-line px-3 py-2">
        <button
          type="button"
          onClick={() => setPicked(null)}
          className="min-h-11 rounded-xl px-3 text-fg hover:bg-surface"
        >
          All games
        </button>
      </div>
      <iframe
        title={game.name}
        src={game.src}
        className="min-h-0 w-full flex-1 border-0 bg-bg"
        allow={game.allow}
        allowFullScreen
      />
    </div>
  );
}

function YouTubeRoom() {
  const [id, setId] = useState("jNQXAC9IVRw");
  const [draft, setDraft] = useState("");

  function load(e: FormEvent) {
    e.preventDefault();
    const raw = draft.trim();
    const match = raw.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{6,})/);
    const next = match?.[1] ?? raw.replace(/[^\w-]/g, "");
    if (next.length >= 6) setId(next.slice(0, 20));
  }

  return (
    <div className="flex h-full flex-col">
      <form onSubmit={load} className="flex gap-2 border-b border-line p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Paste a YouTube link or video id"
          className="min-h-11 flex-1 rounded-xl border border-line bg-surface px-3 text-fg outline-none focus:border-gold"
        />
        <button type="submit" className="min-h-11 rounded-xl bg-gold px-4 font-semibold text-bg">
          Play
        </button>
      </form>
      <iframe
        title="YouTube"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        className="min-h-0 w-full flex-1 border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function GoogleRoom() {
  const [q, setQ] = useState("");
  const [src, setSrc] = useState("https://www.google.com/webhp?igu=1");

  function go(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    setSrc(
      query
        ? `https://www.google.com/search?igu=1&q=${encodeURIComponent(query)}`
        : "https://www.google.com/webhp?igu=1",
    );
  }

  return (
    <div className="flex h-full flex-col">
      <form onSubmit={go} className="flex gap-2 border-b border-line p-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Google"
          className="min-h-11 flex-1 rounded-xl border border-line bg-surface px-3 text-fg outline-none focus:border-gold"
        />
        <button type="submit" className="min-h-11 rounded-xl bg-gold px-4 font-semibold text-bg">
          Search
        </button>
      </form>
      <iframe title="Google" src={src} className="min-h-0 w-full flex-1 border-0 bg-fg" />
    </div>
  );
}

function CalcRoom() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  function inputDigit(d: string) {
    setDisplay((cur) => {
      if (fresh || cur === "0") return d === "." ? "0." : d;
      if (d === "." && cur.includes(".")) return cur;
      return cur + d;
    });
    setFresh(false);
  }

  function apply(nextOp: string | null) {
    const n = Number(display);
    if (stored != null && op && !fresh) {
      const result =
        op === "+"
          ? stored + n
          : op === "-"
            ? stored - n
            : op === "×"
              ? stored * n
              : op === "÷"
                ? n === 0
                  ? NaN
                  : stored / n
                : n;
      const text = Number.isFinite(result) ? String(round(result)) : "Error";
      setDisplay(text);
      setStored(Number.isFinite(result) ? result : null);
    } else {
      setStored(n);
    }
    setOp(nextOp);
    setFresh(true);
  }

  const keys = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"];

  return (
    <div className="mx-auto flex h-full max-w-sm flex-col justify-center p-4">
      <div className="mb-3 rounded-2xl border border-line bg-surface px-4 py-5 text-right font-display text-4xl text-fg">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          type="button"
          className="col-span-2 min-h-14 rounded-xl bg-surface-2 text-fg"
          onClick={() => {
            setDisplay("0");
            setStored(null);
            setOp(null);
            setFresh(true);
          }}
        >
          Clear
        </button>
        <button
          type="button"
          className="col-span-2 min-h-14 rounded-xl bg-surface-2 text-fg"
          onClick={() => setDisplay((d) => (d.startsWith("-") ? d.slice(1) : d === "0" ? d : `-${d}`))}
        >
          ±
        </button>
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            className={`min-h-14 rounded-xl text-lg font-semibold ${
              "÷×-+=".includes(k) ? "bg-gold text-bg" : "bg-surface text-fg"
            }`}
            onClick={() => {
              if ("÷×-+".includes(k)) apply(k);
              else if (k === "=") apply(null);
              else inputDigit(k);
            }}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

function round(n: number) {
  return Math.round(n * 1e10) / 1e10;
}
