export interface Snippet {
	id: string;
	text: string;
	difficulty: 'easy' | 'medium' | 'hard';
	language: string;
}

export const snippets: Snippet[] = [
	// Easy snippets
	{
		id: 'easy-1',
		text: "const greeting = 'Hello, World!';",
		difficulty: 'easy',
		language: 'JavaScript'
	},
	{
		id: 'easy-2',
		text: 'function add(a, b) { return a + b; }',
		difficulty: 'easy',
		language: 'JavaScript'
	},
	{
		id: 'easy-3',
		text: 'let count = 0;',
		difficulty: 'easy',
		language: 'JavaScript'
	},
	{
		id: 'easy-4',
		text: "if (user.isActive) { login(); }",
		difficulty: 'easy',
		language: 'JavaScript'
	},
	{
		id: 'easy-5',
		text: 'const items = [1, 2, 3, 4, 5];',
		difficulty: 'easy',
		language: 'JavaScript'
	},

	// Medium snippets
	{
		id: 'medium-1',
		text: `const fetchData = async (url) => {
  const res = await fetch(url);
  return res.json();
}`,
		difficulty: 'medium',
		language: 'JavaScript'
	},
	{
		id: 'medium-2',
		text: "const users = data.filter(u => u.age > 18);",
		difficulty: 'medium',
		language: 'JavaScript'
	},
	{
		id: 'medium-3',
		text: `try {
  await saveUser(user);
} catch (err) {
  console.error(err);
}`,
		difficulty: 'medium',
		language: 'JavaScript'
	},
	{
		id: 'medium-4',
		text: `const result = items
  .map(x => x * 2)
  .filter(x => x > 10);`,
		difficulty: 'medium',
		language: 'JavaScript'
	},
	{
		id: 'medium-5',
		text: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
		difficulty: 'medium',
		language: 'JavaScript'
	},

	// Hard snippets
	{
		id: 'hard-1',
		text: `interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json();
}`,
		difficulty: 'hard',
		language: 'TypeScript'
	},
	{
		id: 'hard-2',
		text: `const validateEmail = (email: string): boolean => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}`,
		difficulty: 'hard',
		language: 'TypeScript'
	},
	{
		id: 'hard-3',
		text: `class EventEmitter {
  private events: Map<string, Function[]> = new Map();

  on(event: string, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  emit(event: string, ...args: any[]) {
    this.events.get(event)?.forEach(cb => cb(...args));
  }
}`,
		difficulty: 'hard',
		language: 'TypeScript'
	},
	{
		id: 'hard-4',
		text: `const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}`,
		difficulty: 'hard',
		language: 'TypeScript'
	},
	{
		id: 'hard-5',
		text: `async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max attempts reached');
}`,
		difficulty: 'hard',
		language: 'TypeScript'
	}
];

export function getSnippetsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Snippet[] {
	return snippets.filter((s) => s.difficulty === difficulty);
}

export function getRandomSnippet(difficulty?: 'easy' | 'medium' | 'hard'): Snippet {
	const pool = difficulty ? getSnippetsByDifficulty(difficulty) : snippets;
	return pool[Math.floor(Math.random() * pool.length)];
}
