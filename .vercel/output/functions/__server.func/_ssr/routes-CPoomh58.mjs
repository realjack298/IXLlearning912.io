import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as Gamepad2, i as MessageSquare, o as Calculator, r as Search, s as ArrowLeft, t as Youtube } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CPoomh58.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askGrok = createServerFn({ method: "POST" }).validator((input) => {
	const messages = (input?.messages ?? []).slice(-12).map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		content: String(m.content ?? "").slice(0, 2e3)
	})).filter((m) => m.content.trim().length > 0);
	if (messages.length === 0) throw new Error("Say something first.");
	return { messages };
}).handler(createSsrRpc("cfa411bddc35e15676b76fe05d9a573e8ba91c63748751dec5712a6fb3d875d6"));
var FACTS = [
	"Octopuses have three hearts, and two of them stop when they swim.",
	"A day on Venus is longer than a year on Venus.",
	"Honey never spoils. Archaeologists have eaten 3,000-year-old honey.",
	"Bananas are berries. Strawberries are not.",
	"There are more possible chess games than atoms in the observable universe.",
	"The first video game was created in 1958: Tennis for Two.",
	"Sharks are older than trees. Trees showed up about 350 million years ago.",
	"A group of flamingos is called a flamboyance."
];
var GAME_SRC = "https://d11jzht7mj96rr.cloudfront.net/games/2024/construct/311/basket-hoop/index-gg.html";
function Home() {
	const [booting, setBooting] = (0, import_react.useState)(true);
	const [screen, setScreen] = (0, import_react.useState)("hub");
	const [fact, setFact] = (0, import_react.useState)(FACTS[0]);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => setBooting(false), 5e3);
		setFact(FACTS[Math.floor(Math.random() * FACTS.length)] ?? FACTS[0]);
		return () => window.clearTimeout(t);
	}, []);
	if (booting) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-bg px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs uppercase tracking-[0.4em] text-gold",
				children: "Booting"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "title-anim mt-3 font-display text-5xl font-extrabold text-fg sm:text-7xl",
				children: "IXL Games"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-md text-lg leading-relaxed text-muted",
				children: fact
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 h-1 w-56 overflow-hidden rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "splash-bar h-full w-full bg-gold" })
			})
		]
	});
	if (screen !== "hub") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		screen,
		onBack: () => setScreen("hub")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-3xl flex-col bg-bg px-5 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.35em] text-gold",
					children: "Arcade hub"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "title-anim mt-2 font-display text-5xl font-extrabold text-fg sm:text-6xl",
					children: "IXL Games"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "Pick a room. Install this app from your browser anytime."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gamepad2, {}),
					label: "Games",
					hint: "Basket hoop",
					onClick: () => setScreen("games")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, {}),
					label: "YouTube",
					hint: "Watch a video",
					onClick: () => setScreen("youtube")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}),
					label: "Google",
					hint: "Search the web",
					onClick: () => setScreen("google")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {}),
					label: "Calculator",
					hint: "Real math",
					onClick: () => setScreen("calc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {}),
					label: "AI",
					hint: "Talk to IXL",
					onClick: () => setScreen("ai"),
					wide: true
				})
			]
		})]
	});
}
function Tile({ icon, label, hint, onClick, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `flex min-h-20 items-center gap-4 rounded-2xl border border-line bg-surface px-5 text-left transition hover:border-gold hover:bg-surface-2 ${wide ? "sm:col-span-2" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-gold",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-display text-xl font-bold text-fg",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted",
			children: hint
		})] })]
	});
}
function Panel({ screen, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex h-dvh flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-3 border-b border-line px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-fg hover:bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 18 }), "Back"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg font-bold tracking-wide text-gold",
				children: screen === "games" ? "Games" : screen === "youtube" ? "YouTube" : screen === "google" ? "Google" : screen === "calc" ? "Calculator" : "AI"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1",
			children: [
				screen === "games" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRoom, {}),
				screen === "youtube" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubeRoom, {}),
				screen === "google" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleRoom, {}),
				screen === "calc" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcRoom, {}),
				screen === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiRoom, {})
			]
		})]
	});
}
function GameRoom() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		title: "Basket Hoop",
		src: GAME_SRC,
		className: "h-full w-full border-0 bg-bg",
		allow: "fullscreen",
		allowFullScreen: true
	});
}
function YouTubeRoom() {
	const [id, setId] = (0, import_react.useState)("jNQXAC9IVRw");
	const [draft, setDraft] = (0, import_react.useState)("");
	function load(e) {
		e.preventDefault();
		const raw = draft.trim();
		const next = raw.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{6,})/)?.[1] ?? raw.replace(/[^\w-]/g, "");
		if (next.length >= 6) setId(next.slice(0, 20));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: load,
			className: "flex gap-2 border-b border-line p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				placeholder: "Paste a YouTube link or video id",
				className: "min-h-11 flex-1 rounded-xl border border-line bg-surface px-3 text-fg outline-none focus:border-gold"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "min-h-11 rounded-xl bg-gold px-4 font-semibold text-bg",
				children: "Play"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: "YouTube",
			src: `https://www.youtube-nocookie.com/embed/${id}`,
			className: "min-h-0 w-full flex-1 border-0",
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
			allowFullScreen: true
		})]
	});
}
function GoogleRoom() {
	const [q, setQ] = (0, import_react.useState)("");
	const [src, setSrc] = (0, import_react.useState)("https://www.google.com/webhp?igu=1");
	function go(e) {
		e.preventDefault();
		const query = q.trim();
		setSrc(query ? `https://www.google.com/search?igu=1&q=${encodeURIComponent(query)}` : "https://www.google.com/webhp?igu=1");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: go,
			className: "flex gap-2 border-b border-line p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search Google",
				className: "min-h-11 flex-1 rounded-xl border border-line bg-surface px-3 text-fg outline-none focus:border-gold"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "min-h-11 rounded-xl bg-gold px-4 font-semibold text-bg",
				children: "Search"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: "Google",
			src,
			className: "min-h-0 w-full flex-1 border-0 bg-fg"
		})]
	});
}
function CalcRoom() {
	const [display, setDisplay] = (0, import_react.useState)("0");
	const [stored, setStored] = (0, import_react.useState)(null);
	const [op, setOp] = (0, import_react.useState)(null);
	const [fresh, setFresh] = (0, import_react.useState)(true);
	function inputDigit(d) {
		setDisplay((cur) => {
			if (fresh || cur === "0") return d === "." ? "0." : d;
			if (d === "." && cur.includes(".")) return cur;
			return cur + d;
		});
		setFresh(false);
	}
	function apply(nextOp) {
		const n = Number(display);
		if (stored != null && op && !fresh) {
			const result = op === "+" ? stored + n : op === "-" ? stored - n : op === "×" ? stored * n : op === "÷" ? n === 0 ? NaN : stored / n : n;
			const text = Number.isFinite(result) ? String(round(result)) : "Error";
			setDisplay(text);
			setStored(Number.isFinite(result) ? result : null);
		} else setStored(n);
		setOp(nextOp);
		setFresh(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex h-full max-w-sm flex-col justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 rounded-2xl border border-line bg-surface px-4 py-5 text-right font-display text-4xl text-fg",
			children: display
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-4 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "col-span-2 min-h-14 rounded-xl bg-surface-2 text-fg",
					onClick: () => {
						setDisplay("0");
						setStored(null);
						setOp(null);
						setFresh(true);
					},
					children: "Clear"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "col-span-2 min-h-14 rounded-xl bg-surface-2 text-fg",
					onClick: () => setDisplay((d) => d.startsWith("-") ? d.slice(1) : d === "0" ? d : `-${d}`),
					children: "±"
				}),
				[
					"7",
					"8",
					"9",
					"÷",
					"4",
					"5",
					"6",
					"×",
					"1",
					"2",
					"3",
					"-",
					"0",
					".",
					"=",
					"+"
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `min-h-14 rounded-xl text-lg font-semibold ${"÷×-+=".includes(k) ? "bg-gold text-bg" : "bg-surface text-fg"}`,
					onClick: () => {
						if ("÷×-+".includes(k)) apply(k);
						else if (k === "=") apply(null);
						else inputDigit(k);
					},
					children: k
				}, k))
			]
		})]
	});
}
function round(n) {
	return Math.round(n * 1e10) / 1e10;
}
function AiRoom() {
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "I'm IXL. Ask me anything."
	}]);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	async function send(e) {
		e.preventDefault();
		const content = text.trim();
		if (!content || busy) return;
		const next = [...messages, {
			role: "user",
			content
		}];
		setMessages(next);
		setText("");
		setBusy(true);
		setError("");
		try {
			const res = await askGrok({ data: { messages: next.slice(1) } });
			if (!res.ok) setError(res.error);
			else setMessages((cur) => [...cur, {
				role: "assistant",
				content: res.text || "…"
			}]);
		} catch {
			setError("Could not reach AI.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 space-y-3 overflow-y-auto p-4",
			children: [
				messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${m.role === "user" ? "ml-auto bg-gold text-bg" : "bg-surface text-fg"}`,
					children: m.content
				}, i)),
				busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Thinking…"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gold",
					children: error
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: send,
			className: "flex gap-2 border-t border-line p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "Talk to IXL",
				className: "min-h-11 flex-1 rounded-xl border border-line bg-surface px-3 text-fg outline-none focus:border-gold"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: busy,
				className: "min-h-11 rounded-xl bg-gold px-4 font-semibold text-bg disabled:opacity-50",
				children: "Send"
			})]
		})]
	});
}
//#endregion
export { Home as component };
