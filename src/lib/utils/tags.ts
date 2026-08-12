export type TagKind = 'language' | 'framework' | 'api' | 'service' | 'protocol' | 'tool' | 'other';

const languageTags = new Set([
	'javascript', 'typescript', 'python', 'rust', 'go', 'c++', 'c', 'dart', 'html', 'css', 'systemverilog'
]);
const frameworkTags = new Set([
	'react', 'next.js', 'fastapi', 'svelte', 'react native', 'tauri', 'flutter', 'electron'
]);
const apiTags = new Set([
	'spotify api', 'stripe api', 'calendly api', 'semantic scholar api', 'twitch api', 'openai api',
	'github api', 'groq api', 'windows api', 'windows ui automation api', 'lcu api'
]);
const serviceTags = new Set(['docker', 'postgresql', 'sqlite', 'redis', 'neo4j', 'supabase', 'pocketbase', 'duckdb']);
const protocolTags = new Set(['mqtt', 'webrtc', 'manifest v3']);
const toolTags = new Set([
	'discord.js', 'discord.py', 'langchain', 'litellm', 'pytorch', 'opencv', 'mediapipe', 'xgboost',
	'lightgbm', 'scikit-learn', 'optuna', 'pandas', 'ollama', 'demucs', 'ffmpeg', 'rich', 'argparse',
	'chokidar', 'xterm.js', 'node-cron', 'cadence virtuoso', 'tribe v2', 'faster-whisper', 'porcupine',
	'pyyaml', 'pyaudio', 'pyautogui', 'tokio', 'scapy', 'expo', 'ytdl-core'
]);

export function getTagKind(tag: string): TagKind {
	const key = tag.toLowerCase();
	if (languageTags.has(key)) return 'language';
	if (frameworkTags.has(key)) return 'framework';
	if (apiTags.has(key)) return 'api';
	if (serviceTags.has(key)) return 'service';
	if (protocolTags.has(key)) return 'protocol';
	if (toolTags.has(key)) return 'tool';
	return 'other';
}
