import en from "./en.json"; import zh from "./zh-CN.json"; import pt from "./pt.json"; import es from "./es.json"; import fr from "./fr.json";
import type { Locale } from "./config";
export type Dictionary = typeof en;
const dictionaries: Record<Locale, Dictionary> = { en, zh, pt, es, fr };
export function getDictionary(locale: Locale): Dictionary { return dictionaries[locale]; }
