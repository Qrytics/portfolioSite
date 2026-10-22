export interface Snippet {
	id: string;
	text: string;
	difficulty: 'easy' | 'medium' | 'hard' | 'zen';
	language: string;
	filename?: string;
	pattern?: string;
	description?: string;
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

export const zenSnippets: Snippet[] = [
	{
		id: 'zen-retry-backoff',
		filename: 'retry_backoff.py',
		language: 'Python',
		pattern: 'Exponential Backoff with Jitter',
		description: 'Prevents thundering herds by spacing out retry attempts with random noise.',
		difficulty: 'zen',
		text: `def retry_with_backoff(fn, retries=5, base_delay=0.5):
    for attempt in range(retries):
        try:
            return fn()
        except NetworkException:
            if attempt == retries - 1:
                raise
            sleep = (base_delay * 2 ** attempt) + random.uniform(0, 0.1)
            time.sleep(sleep)`
	},
	{
		id: 'zen-lru-cache',
		filename: 'lru_cache.ts',
		language: 'TypeScript',
		pattern: 'LRU Cache (Least Recently Used)',
		description: 'Evicts the oldest unaccessed entry when capacity is exceeded in O(1) time.',
		difficulty: 'zen',
		text: `class LRUCache<K, V> {
  private items = new Map<K, V>();
  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    if (!this.items.has(key)) return undefined;
    const value = this.items.get(key)!;
    this.items.delete(key);
    this.items.set(key, value);
    return value;
  }
}`
	},
	{
		id: 'zen-worker-pool',
		filename: 'worker_pool.go',
		language: 'Go',
		pattern: 'Worker Pool with Channels',
		description: 'Processes jobs concurrently across a fixed pool of goroutines with sync.WaitGroup.',
		difficulty: 'zen',
		text: `func Worker(id int, jobs <-chan Job, results chan<- Result, wg *sync.WaitGroup) {
    defer wg.Done()
    for job := range jobs {
        res := job.Execute()
        results <- res
    }
}`
	},
	{
		id: 'zen-result-match',
		filename: 'result_handler.rs',
		language: 'Rust',
		pattern: 'Pattern Matching on Result',
		description: 'Safely handles success and failure branches without throwing unhandled exceptions.',
		difficulty: 'zen',
		text: `fn parse_port(input: &str) -> Result<u16, ConfigError> {
    match input.trim().parse::<u16>() {
        Ok(port) if port > 1024 => Ok(port),
        Ok(_) => Err(ConfigError::PrivilegedPort),
        Err(e) => Err(ConfigError::InvalidFormat(e)),
    }
}`
	},
	{
		id: 'zen-use-debounce',
		filename: 'useDebounce.ts',
		language: 'React / TypeScript',
		pattern: 'Custom Hook: Debounced Value',
		description: 'Delays updating state until the user has stopped typing for a given duration.',
		difficulty: 'zen',
		text: `export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handler);
  }, [value, delayMs]);
  return debounced;
}`
	},
	{
		id: 'zen-context-manager',
		filename: 'context_manager.py',
		language: 'Python',
		pattern: 'Context Manager with @contextmanager',
		description: 'Guarantees resource teardown even when an unhandled exception occurs.',
		difficulty: 'zen',
		text: `@contextmanager
def temporary_lock(lock_path: Path):
    acquired = acquire_lock(lock_path)
    if not acquired:
        raise LockTimeout("Could not acquire lock")
    try:
        yield
    finally:
        release_lock(lock_path)`
	},
	{
		id: 'zen-rate-limiter',
		filename: 'token_bucket.ts',
		language: 'TypeScript',
		pattern: 'Token Bucket Rate Limiter',
		description: 'Smooths out traffic bursts by refilling tokens at a steady deterministic rate.',
		difficulty: 'zen',
		text: `class TokenBucket {
  private tokens: number;
  private lastRefill: number = Date.now();

  constructor(private capacity: number, private refillRate: number) {
    this.tokens = capacity;
  }

  take(): boolean {
    this.refill();
    if (this.tokens < 1) return false;
    this.tokens -= 1;
    return true;
  }
}`
	},
	{
		id: 'zen-fan-out-fan-in',
		filename: 'fan_in.go',
		language: 'Go',
		pattern: 'Fan-Out Fan-In Multiplexing',
		description: 'Merges multiple async output channels into a single consolidated stream.',
		difficulty: 'zen',
		text: `func Merge(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for val := range c { out <- val }
        }(ch)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}`
	},
	{
		id: 'zen-builder-pattern',
		filename: 'builder.rs',
		language: 'Rust',
		pattern: 'Type-Safe Fluent Builder',
		description: 'Constructs complex structs piece-by-piece with fluent chained configuration.',
		difficulty: 'zen',
		text: `impl ClientBuilder {
    pub fn timeout(mut self, duration: Duration) -> Self {
        self.timeout = Some(duration);
        self
    }
    pub fn build(self) -> Result<Client, BuildError> {
        let endpoint = self.endpoint.ok_or(BuildError::MissingEndpoint)?;
        Ok(Client::new(endpoint, self.timeout.unwrap_or_default()))
    }
}`
	},
	{
		id: 'zen-transaction-savepoint',
		filename: 'transaction_savepoint.sql',
		language: 'SQL',
		pattern: 'ACID Transaction with Savepoint',
		description: 'Partially rolls back nested operations without aborting the entire outer transaction.',
		difficulty: 'zen',
		text: `BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 150 WHERE id = 101;
SAVEPOINT credit_step;
UPDATE accounts SET balance = balance + 150 WHERE id = 202;
-- On sub-step validation failure:
-- ROLLBACK TO SAVEPOINT credit_step;
COMMIT;`
	},
	{
		id: 'zen-circuit-breaker',
		filename: 'CircuitBreaker.java',
		language: 'Java',
		pattern: 'Circuit Breaker State Machine',
		description: 'Trips open when error thresholds are exceeded to protect downstream microservices.',
		difficulty: 'zen',
		text: `public synchronized void recordFailure() {
    failureCount++;
    if (state == State.CLOSED && failureCount >= threshold) {
        state = State.OPEN;
        lastTrippedAt = System.currentTimeMillis();
    }
}`
	},
	{
		id: 'zen-sliding-window',
		filename: 'sliding_window.py',
		language: 'Python',
		pattern: 'Sliding Window Algorithm',
		description: 'Maintains a running subarray metric in O(N) linear time without nested re-computation.',
		difficulty: 'zen',
		text: `def max_sum_subarray(nums: list[int], k: int) -> int:
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum`
	},
	{
		id: 'zen-thread-safe-singleton',
		filename: 'database_singleton.cpp',
		language: 'C++',
		pattern: 'Thread-Safe Meyer’s Singleton',
		description: 'Initializes a single shared instance upon first use with guaranteed thread safety.',
		difficulty: 'zen',
		text: `class DatabasePool {
public:
    static DatabasePool& getInstance() {
        static DatabasePool instance;
        return instance;
    }
    DatabasePool(const DatabasePool&) = delete;
    void operator=(const DatabasePool&) = delete;
private:
    DatabasePool() { initialize(); }
};`
	},
	{
		id: 'zen-event-emitter',
		filename: 'typed_emitter.ts',
		language: 'TypeScript',
		pattern: 'Strongly-Typed Observer Pattern',
		description: 'Decouples event publishers and subscribers with full compile-time type checking.',
		difficulty: 'zen',
		text: `type Handler<T> = (payload: T) => void;
class TypedBus<Events extends Record<string, unknown>> {
  private listeners = new Map<keyof Events, Set<Handler<any>>>();

  on<K extends keyof Events>(event: K, fn: Handler<Events[K]>): () => void {
    const set = this.listeners.get(event) ?? new Set();
    set.add(fn);
    this.listeners.set(event, set);
    return () => set.delete(fn);
  }
}`
	},
	{
		id: 'zen-semaphore',
		filename: 'semaphore.go',
		language: 'Go',
		pattern: 'Counting Semaphore via Buffered Channel',
		description: 'Limits max simultaneous access to a bounded resource pool.',
		difficulty: 'zen',
		text: `type Semaphore chan struct{}

func NewSemaphore(limit int) Semaphore {
    return make(Semaphore, limit)
}
func (s Semaphore) Acquire() { s <- struct{}{} }
func (s Semaphore) Release() { <-s }`
	},
	{
		id: 'zen-custom-iterator',
		filename: 'countdown_iter.rs',
		language: 'Rust',
		pattern: 'Custom Iterator Implementation',
		description: 'Supplies sequential items on demand by satisfying the Iterator trait contract.',
		difficulty: 'zen',
		text: `struct Countdown { current: usize }
impl Iterator for Countdown {
    type Item = usize;
    fn next(&mut self) -> Option<Self::Item> {
        if self.current == 0 { return None; }
        self.current -= 1;
        Some(self.current + 1)
    }
}`
	},
	{
		id: 'zen-memoize-decorator',
		filename: 'memoize.py',
		language: 'Python',
		pattern: 'Function Memoization Decorator',
		description: 'Intercepts calls and caches return values keyed by serialized arguments.',
		difficulty: 'zen',
		text: `def memoize(fn):
    cache = {}
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        key = (args, tuple(sorted(kwargs.items())))
        if key not in cache:
            cache[key] = fn(*args, **kwargs)
        return cache[key]
    return wrapper`
	},
	{
		id: 'zen-deep-clone',
		filename: 'deep_clone.ts',
		language: 'TypeScript',
		pattern: 'Deep Clone with Cycle Detection',
		description: 'Recursively clones nested object structures while preventing infinite loops.',
		difficulty: 'zen',
		text: `function deepClone<T>(value: T, seen = new WeakMap()): T {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);
  const copy = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, copy);
  for (const [k, v] of Object.entries(value)) {
    (copy as Record<string, unknown>)[k] = deepClone(v, seen);
  }
  return copy as T;
}`
	},
	{
		id: 'zen-middleware-pipeline',
		filename: 'pipeline.ts',
		language: 'TypeScript',
		pattern: 'Onion Middleware Pipeline',
		description: 'Chains composable request processors wrapped in before/after execution layers.',
		difficulty: 'zen',
		text: `type Next = () => Promise<void>;
type Middleware<Ctx> = (ctx: Ctx, next: Next) => Promise<void>;

function compose<Ctx>(stack: Middleware<Ctx>[]) {
  return (ctx: Ctx) => {
    const dispatch = (i: number): Promise<void> => {
      if (i >= stack.length) return Promise.resolve();
      return stack[i](ctx, () => dispatch(i + 1));
    };
    return dispatch(0);
  };
}`
	},
	{
		id: 'zen-two-pointer',
		filename: 'two_pointer.py',
		language: 'Python',
		pattern: 'Two-Pointer Invariant Search',
		description: 'Finds complementary target pairs in sorted lists with O(N) single-pass traversal.',
		difficulty: 'zen',
		text: `def two_sum_sorted(nums: list[int], target: int) -> tuple[int, int]:
    left, right = 0, len(nums) - 1
    while left < right:
        curr = nums[left] + nums[right]
        if curr == target:
            return left, right
        elif curr < target:
            left += 1
        else:
            right -= 1
    raise ValueError("Target pair not found")`
	},
	{
		id: 'zen-sync-once',
		filename: 'singleton_once.go',
		language: 'Go',
		pattern: 'Thread-Safe sync.Once Lazy Init',
		description: 'Ensures expensive setup logic runs strictly once even under heavy concurrent access.',
		difficulty: 'zen',
		text: `var (
    instance *ServiceConfig
    once     sync.Once
)

func GetConfig() *ServiceConfig {
    once.Do(func() {
        instance = loadConfigFromDisk()
    })
    return instance
}`
	},
	{
		id: 'zen-arc-mutex',
		filename: 'shared_state.rs',
		language: 'Rust',
		pattern: 'Shared Concurrency with Arc and Mutex',
		description: 'Safely shares and mutates cross-thread state without data races.',
		difficulty: 'zen',
		text: `fn increment_counter(counter: Arc<Mutex<u32>>) {
    let mut num = counter.lock().unwrap();
    *num += 1;
}`
	},
	{
		id: 'zen-optimistic-lock',
		filename: 'optimistic_lock.sql',
		language: 'SQL',
		pattern: 'Optimistic Concurrency Control',
		description: 'Prevents overwrite collisions using version check predicates instead of heavy row locks.',
		difficulty: 'zen',
		text: `UPDATE inventory_items
SET quantity = quantity - 1, version = version + 1
WHERE sku = 'PROD-409' AND version = 3;

-- If rows affected == 0, another concurrent transaction modified this row.
-- Application can reload, revalidate, and retry.`
	},
	{
		id: 'zen-use-previous',
		filename: 'usePrevious.ts',
		language: 'React / TypeScript',
		pattern: 'Custom Hook: usePrevious Value',
		description: 'Tracks prior render values using mutable refs without triggering extra re-renders.',
		difficulty: 'zen',
		text: `export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}`
	},
	{
		id: 'zen-generator-stream',
		filename: 'batch_stream.py',
		language: 'Python',
		pattern: 'Chunking Generator Stream',
		description: 'Yields large datasets in bite-sized chunks to keep memory usage bounded and minimal.',
		difficulty: 'zen',
		text: `def chunked_stream(iterable, chunk_size=100):
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) >= chunk_size:
            yield chunk
            chunk = []
    if chunk:
        yield chunk`
	},
	{
		id: 'zen-state-machine',
		filename: 'state_machine.ts',
		language: 'TypeScript',
		pattern: 'Finite State Machine Transition Table',
		description: 'Enforces valid state lifecycle paths by checking against an explicit transition matrix.',
		difficulty: 'zen',
		text: `type OrderState = 'draft' | 'placed' | 'shipped' | 'delivered';
const transitions: Record<OrderState, OrderState[]> = {
  draft: ['placed'],
  placed: ['shipped', 'draft'],
  shipped: ['delivered'],
  delivered: []
};

function canTransition(from: OrderState, to: OrderState): boolean {
  return transitions[from].includes(to);
}`
	},
	{
		id: 'zen-recursive-cte',
		filename: 'recursive_org.sql',
		language: 'SQL',
		pattern: 'Recursive Common Table Expression (CTE)',
		description: 'Traverses hierarchical parent-child relationships like org charts or taxonomy trees.',
		difficulty: 'zen',
		text: `WITH RECURSIVE employee_hierarchy AS (
    SELECT id, name, manager_id, 1 as depth
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id, h.depth + 1
    FROM employees e
    JOIN employee_hierarchy h ON e.manager_id = h.id
)
SELECT * FROM employee_hierarchy ORDER BY depth;`
	},
	{
		id: 'zen-curry-compose',
		filename: 'pipe_compose.ts',
		language: 'TypeScript',
		pattern: 'Functional Composition Pipe',
		description: 'Threads an initial value sequentially through a chain of unary transformation functions.',
		difficulty: 'zen',
		text: `export const pipe = <T>(initial: T, ...fns: Array<(arg: any) => any>): any =>
  fns.reduce((acc, fn) => fn(acc), initial);`
	},
	{
		id: 'zen-raii-guard',
		filename: 'raii_scoped_lock.cpp',
		language: 'C++',
		pattern: 'RAII Lock Guard Resource Management',
		description: 'Binds resource lifecycle to variable scope so cleanup is automatic on block exit.',
		difficulty: 'zen',
		text: `void safeAccountTransfer(Account& from, Account& to, double amount) {
    std::scoped_lock lock(from.mutex, to.mutex);
    if (from.getBalance() >= amount) {
        from.withdraw(amount);
        to.deposit(amount);
    }
}`
	},
	{
		id: 'zen-context-timeout',
		filename: 'request_timeout.go',
		language: 'Go',
		pattern: 'Context Cancellation & Deadlines',
		description: 'Prevents orphaned network calls by attaching strict timeouts via context.WithTimeout.',
		difficulty: 'zen',
		text: `func FetchWithTimeout(url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
    if err != nil { return nil, err }
    resp, err := http.DefaultClient.Do(req)
    if err != nil { return nil, err }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}`
	},
	{
		id: 'zen-result-monad',
		filename: 'result_monad.ts',
		language: 'TypeScript',
		pattern: 'Monadic Result Type (Railway Oriented)',
		description: 'Chains operations that can fail without throwing runtime exceptions.',
		difficulty: 'zen',
		text: `type Result<T, E> = { ok: true; val: T } | { ok: false; err: E };

const andThen = <T, U, E>(
  res: Result<T, E>,
  fn: (val: T) => Result<U, E>
): Result<U, E> => {
  return res.ok ? fn(res.val) : res;
};`
	},
	{
		id: 'zen-dataclass-validate',
		filename: 'order_dataclass.py',
		language: 'Python',
		pattern: 'Validated Frozen Dataclass',
		description: 'Constructs immutable value objects that assert internal domain invariants on creation.',
		difficulty: 'zen',
		text: `@dataclass(frozen=True)
class Money:
    amount: Decimal
    currency: str

    def __post_init__(self):
        if self.amount < Decimal('0.00'):
            raise ValueError("Amount cannot be negative")
        if len(self.currency) != 3:
            raise ValueError("Currency must be a 3-letter ISO code")`
	},
	{
		id: 'zen-trie-node',
		filename: 'prefix_trie.rs',
		language: 'Rust',
		pattern: 'Prefix Search Trie Tree',
		description: 'Enables rapid autocomplete and dictionary lookup with O(K) word length complexity.',
		difficulty: 'zen',
		text: `#[derive(Default)]
struct TrieNode {
    children: HashMap<char, TrieNode>,
    is_terminal: bool,
}
impl TrieNode {
    fn insert(&mut self, word: &str) {
        let mut curr = self;
        for ch in word.chars() {
            curr = curr.children.entry(ch).or_default();
        }
        curr.is_terminal = true;
    }
}`
	},
	{
		id: 'zen-di-container',
		filename: 'di_container.ts',
		language: 'TypeScript',
		pattern: 'Inversion of Control (DI Container)',
		description: 'Decouples service instantiation from consumer logic via lazy factory registration.',
		difficulty: 'zen',
		text: `class Container {
  private factories = new Map<string, () => unknown>();
  private singletons = new Map<string, unknown>();

  register<T>(token: string, factory: () => T, isSingleton = true): void {
    this.factories.set(token, () => {
      if (!isSingleton) return factory();
      if (!this.singletons.has(token)) this.singletons.set(token, factory());
      return this.singletons.get(token);
    });
  }
}`
	},
	{
		id: 'zen-health-check',
		filename: 'health_check.go',
		language: 'Go',
		pattern: 'Concurrent Dependency Health Ping',
		description: 'Probes databases, caches, and queues simultaneously and summarizes status.',
		difficulty: 'zen',
		text: `func CheckServices(probes map[string]func() bool) map[string]bool {
    results := make(map[string]bool)
    var mu sync.Mutex
    var wg sync.WaitGroup
    for name, probe := range probes {
        wg.Add(1)
        go func(n string, p func() bool) {
            defer wg.Done()
            ok := p()
            mu.Lock()
            results[n] = ok
            mu.Unlock()
        }(name, probe)
    }
    wg.Wait()
    return results
}`
	}
];

export function getSnippetsByDifficulty(difficulty: 'easy' | 'medium' | 'hard' | 'zen'): Snippet[] {
	if (difficulty === 'zen') return zenSnippets;
	return snippets.filter((s) => s.difficulty === difficulty);
}

export function getRandomSnippet(difficulty?: 'easy' | 'medium' | 'hard' | 'zen'): Snippet {
	const pool = difficulty ? getSnippetsByDifficulty(difficulty) : snippets;
	if (!pool || pool.length === 0) return snippets[0];
	return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Creates an endless shuffled deck that yields every single pattern without repeating
 * until the full deck is exhausted, then reshuffles seamlessly.
 */
export class ZenSnippetDeck {
	private deck: Snippet[] = [];
	private lastId: string | null = null;

	next(): Snippet {
		if (this.deck.length === 0) {
			const shuffled = [...zenSnippets].sort(() => Math.random() - 0.5);
			// Avoid immediate duplicate on reshuffle boundary
			if (shuffled.length > 1 && shuffled[shuffled.length - 1].id === this.lastId) {
				const temp = shuffled[0];
				shuffled[0] = shuffled[shuffled.length - 1];
				shuffled[shuffled.length - 1] = temp;
			}
			this.deck = shuffled;
		}
		const picked = this.deck.pop()!;
		this.lastId = picked.id;
		return picked;
	}
}
