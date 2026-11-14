import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-DzVixlO-.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askGrok_createServerFn_handler = createServerRpc({
	id: "cfa411bddc35e15676b76fe05d9a573e8ba91c63748751dec5712a6fb3d875d6",
	name: "askGrok",
	filename: "src/lib/chat.ts"
}, (opts) => askGrok.__executeServer(opts));
var askGrok = createServerFn({ method: "POST" }).validator((input) => {
	const messages = (input?.messages ?? []).slice(-12).map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		content: String(m.content ?? "").slice(0, 2e3)
	})).filter((m) => m.content.trim().length > 0);
	if (messages.length === 0) throw new Error("Say something first.");
	return { messages };
}).handler(askGrok_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available right now."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 500,
			messages: [{
				role: "system",
				content: "You are IXL, a sharp, friendly assistant inside a games hub. Keep answers tight and useful. No illegal help."
			}, ...data.messages]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `AI error ${res.status}`
	};
	return {
		ok: true,
		text: (await res.json()).choices?.[0]?.message?.content ?? ""
	};
});
//#endregion
export { askGrok_createServerFn_handler };
