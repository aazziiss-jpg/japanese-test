import { Capacitor } from "@capacitor/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { TextToSpeech } from "@capacitor-community/text-to-speech";

export type SenseiMessage = {
  role: "user" | "assistant";
  content: string;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isNativeSenseiAvailable() {
  return Capacitor.isNativePlatform();
}

export async function sendMessage(messages: SenseiMessage[]): Promise<string> {
  if (!url || !key) throw new Error("Supabase belum dikonfigurasi.");

  const response = await fetch(`${url}/functions/v1/sensei-chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: messages.at(-1)?.content ?? "",
      history: messages.slice(0, -1),
    }),
  });

  const data: unknown = await response.json();
  if (!response.ok || !data || typeof data !== "object") {
    const error = data && typeof data === "object" && "error" in data
      ? String(data.error)
      : "Sensei tidak dapat dihubungi.";
    throw new Error(error);
  }

  const result = data as { response?: { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> } };
  const reply = result.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!reply) throw new Error("Sensei tidak memberi balasan.");
  return reply;
}

export async function startListening(language = "ja-JP"): Promise<string> {
  if (!isNativeSenseiAvailable()) {
    throw new Error("Fitur mikrofon hanya tersedia di aplikasi Android.");
  }

  const available = await SpeechRecognition.available();
  if (!available.available) throw new Error("Pengenalan suara tidak tersedia di perangkat ini.");

  const permission = await SpeechRecognition.requestPermissions();
  if (permission.speechRecognition !== "granted") {
    throw new Error("Izin mikrofon diperlukan.");
  }

  const result = await SpeechRecognition.start({
    language,
    maxResults: 1,
    popup: true,
  });
  return result.matches?.[0]?.trim() ?? "";
}

export async function speak(text: string, language = "ja-JP") {
  if (!isNativeSenseiAvailable() || !text.trim()) return;
  await TextToSpeech.speak({ text, lang: language, rate: 1, pitch: 1, volume: 1 });
}