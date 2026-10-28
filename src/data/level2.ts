import { Lesson } from './types';

export const level2Lessons: Lesson[] = [
  {
    id: 'generics',
    title: 'Generics',
    level: 2,
    order: 1,
    description: 'Write reusable, type-safe code with generic functions, interfaces, and constraints.',
    sections: [
      {
        heading: 'Why Generics?',
        content: 'Generics let you write code that works with ANY type while still being type-safe. Without generics, you\'d have to use `any` (losing safety) or duplicate code for every type.',
        code: { code: `// ❌ Without generics — loses type info\nfunction firstItem(arr: any[]): any {\n  return arr[0];\n}\nconst result = firstItem([1, 2, 3]);  // type: any — no help!\n\n// ❌ Duplicating code for each type\nfunction firstNumber(arr: number[]): number { return arr[0]; }\nfunction firstString(arr: string[]): string { return arr[0]; }\n\n// ✅ With generics — type-safe AND reusable\nfunction firstItem<T>(arr: T[]): T {\n  return arr[0];\n}\n\nconst num = firstItem([1, 2, 3]);       // type: number\nconst str = firstItem(["a", "b", "c"]); // type: string\nconst bool = firstItem([true, false]);   // type: boolean`, language: 'typescript' },
      },
      {
        heading: 'Generic Functions',
        content: 'Type parameters (conventionally single uppercase letters) act as placeholders:',
        code: { code: `// Single type parameter\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nidentity<string>("hello");  // Explicit: T = string\nidentity(42);               // Inferred: T = number\n\n// Multiple type parameters\nfunction pair<A, B>(first: A, second: B): [A, B] {\n  return [first, second];\n}\n\npair("hello", 42);        // [string, number]\npair(true, [1, 2, 3]);    // [boolean, number[]]\n\n// Generic with constraints\nfunction getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}\n\ngetLength("hello");     // ✅ string has .length\ngetLength([1, 2, 3]);   // ✅ array has .length\n// getLength(42);        // ❌ number doesn't have .length`, language: 'typescript' },
      },
      {
        heading: 'Generic Interfaces & Classes',
        content: 'Generics work with interfaces and classes too:',
        code: { code: `// Generic interface\ninterface ApiResponse<T> {\n  data: T;\n  status: number;\n  message: string;\n}\n\n// Usage:\ntype UserResponse = ApiResponse<User>;\n// = { data: User; status: number; message: string }\n\ntype UsersResponse = ApiResponse<User[]>;\n// = { data: User[]; status: number; message: string }\n\n// Generic class\nclass Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    this.items.push(item);\n  }\n\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n}\n\nconst numberStack = new Stack<number>();\nnumberStack.push(1);\nnumberStack.push(2);\nconst top = numberStack.pop();  // type: number | undefined\n\n// ❌ numberStack.push("string");  // Error!`, language: 'typescript' },
      },
      {
        heading: 'Generic Constraints',
        content: 'Use `extends` to restrict what types a generic parameter accepts:',
        code: { code: `// Must have an 'id' property\ninterface HasId {\n  id: string | number;\n}\n\nfunction findById<T extends HasId>(\n  items: T[],\n  id: T["id"]\n): T | undefined {\n  return items.find(item => item.id === id);\n}\n\ninterface User { id: number; name: string; }\ninterface Product { id: string; title: string; price: number; }\n\nconst users: User[] = [{ id: 1, name: "Alice" }];\nfindById(users, 1);  // ✅ T = User\n\nconst products: Product[] = [{ id: "p1", title: "Widget", price: 9.99 }];\nfindById(products, "p1");  // ✅ T = Product\n\n// Keyof constraint\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { name: "Alice", age: 30 };\ngetProperty(user, "name");  // ✅ returns string\ngetProperty(user, "email"); // ❌ Error! "email" is not a key`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'type-guards-narrowing',
    title: 'Type Guards & Narrowing',
    level: 2,
    order: 2,
    description: 'Narrow union types using typeof, in, instanceof, and custom type predicates.',
    sections: [
      {
        heading: 'What is Narrowing?',
        content: 'Narrowing is how TypeScript refines a general type to a more specific one within a code block. It happens automatically with control flow:',
        code: { code: `function process(value: string | number) {\n  // value is string | number\n  \n  if (typeof value === "string") {\n    // value is narrowed to 'string'\n    console.log(value.toUpperCase());\n  } else {\n    // value is narrowed to 'number'\n    console.log(value.toFixed(2));\n  }\n}\n\n// Works with truthiness\nfunction printLength(str: string | null | undefined) {\n  if (str) {\n    // str is narrowed to 'string' (null/undefined filtered out)\n    console.log(str.length);\n  }\n}\n\n// Works with equality\nfunction example(x: string | number) {\n  if (x === "hello") {\n    // x is narrowed to literal "hello"\n    console.log(x.toUpperCase());\n  }\n}`, language: 'typescript' },
      },
      {
        heading: 'The `in` Operator',
        content: 'Use `in` to check for property existence and narrow object types:',
        code: { code: `type Fish = { swim: () => void; name: string };\ntype Bird = { fly: () => void; name: string };\n\nfunction move(animal: Fish | Bird) {\n  if ("swim" in animal) {\n    animal.swim();  // ✅ TS knows it's Fish\n  } else {\n    animal.fly();   // ✅ TS knows it's Bird\n  }\n}\n\n// Works with optional properties\ninterface Admin { role: "admin"; permissions: string[]; }\ninterface Viewer { role: "viewer"; }\n\nfunction showAccess(user: Admin | Viewer) {\n  if ("permissions" in user) {\n    // user is narrowed to Admin\n    console.log(user.permissions);\n  }\n}`, language: 'typescript' },
      },
      {
        heading: 'instanceof & Custom Type Guards',
        content: 'Use `instanceof` for classes and custom type predicates for complex narrowing:',
        code: { code: `// instanceof\nclass Dog {\n  bark() { console.log("Woof!"); }\n}\nclass Cat {\n  meow() { console.log("Meow!"); }\n}\n\nfunction makeSound(animal: Dog | Cat) {\n  if (animal instanceof Dog) {\n    animal.bark();  // ✅\n  } else {\n    animal.meow();  // ✅\n  }\n}\n\n// Custom type predicate (is keyword)\ninterface Circle { kind: "circle"; radius: number; }\ninterface Rectangle { kind: "rectangle"; width: number; height: number; }\ntype Shape = Circle | Rectangle;\n\nfunction isCircle(shape: Shape): shape is Circle {\n  return shape.kind === "circle";\n}\n\nfunction getArea(shape: Shape): number {\n  if (isCircle(shape)) {\n    // shape is narrowed to Circle\n    return Math.PI * shape.radius ** 2;\n  }\n  // shape is narrowed to Rectangle\n  return shape.width * shape.height;\n}\n\n// Inline type predicates\nfunction isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nconst data: unknown = "hello";\nif (isString(data)) {\n  data.toUpperCase();  // ✅ TS knows it's string\n}`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'discriminated-unions',
    title: 'Discriminated Unions',
    level: 2,
    order: 3,
    description: 'Master tagged unions for state machines, API responses, and reducers — one of TypeScript\'s most powerful patterns.',
    sections: [
      {
        heading: 'What Are Discriminated Unions?',
        content: 'A discriminated union (aka tagged union) is a union of types that share a common literal property (the "discriminant"). TypeScript uses this property to narrow the type:',
        code: { code: `// Each variant has a 'kind' discriminant\ntype Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number }\n  | { kind: "triangle"; base: number; height: number };\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle":\n      // shape is { kind: "circle"; radius: number }\n      return Math.PI * shape.radius ** 2;\n    case "square":\n      // shape is { kind: "square"; side: number }\n      return shape.side ** 2;\n    case "triangle":\n      // shape is { kind: "triangle"; base: number; height: number }\n      return 0.5 * shape.base * shape.height;\n  }\n}`, language: 'typescript' },
      },
      {
        heading: 'Exhaustive Checking',
        content: 'Use `never` in the default branch to ensure all cases are handled:',
        code: { code: `type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number };\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle":\n      return Math.PI * shape.radius ** 2;\n    case "square":\n      return shape.side ** 2;\n    default:\n      // If all cases are handled, shape is 'never' here\n      const _exhaustive: never = shape;\n      return _exhaustive;\n  }\n}\n\n// If you add a new variant:\ntype Shape2 =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number }\n  | { kind: "triangle"; base: number; height: number };\n\n// function area2(shape: Shape2): number { ... }\n// ❌ Error in default: Type 'triangle' is not assignable to 'never'\n// This tells you to add the missing case!`, language: 'typescript' },
      },
      {
        heading: 'Real-World: API Responses',
        content: 'Discriminated unions are perfect for handling different API response states:',
        code: { code: `// API response states\ntype ApiState<T> =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: T }\n  | { status: "error"; error: string };\n\nfunction renderUsers(state: ApiState<User[]>) {\n  switch (state.status) {\n    case "idle":\n      return <p>Click "Load" to fetch users</p>;\n    case "loading":\n      return <Spinner />;\n    case "success":\n      // state.data is User[]\n      return <UserList users={state.data} />;\n    case "error":\n      // state.error is string\n      return <ErrorBanner message={state.error} />;\n  }\n}\n\n// Real-world fetch example\nasync function fetchUser(id: string): Promise<\n  | { ok: true; user: User }\n  | { ok: false; error: string }\n> {\n  try {\n    const res = await fetch(\`/api/users/\${id}\`);\n    if (!res.ok) return { ok: false, error: "Not found" };\n    const user = await res.json();\n    return { ok: true, user };\n  } catch (e) {\n    return { ok: false, error: String(e) };\n  }\n}`, language: 'typescript' },
      },
      {
        heading: 'Real-World: Reducers & State Machines',
        content: 'Discriminated unions shine in Redux-style reducers and state machines:',
        code: { code: `// Actions as discriminated union\ntype Action =\n  | { type: "ADD_TODO"; payload: { title: string } }\n  | { type: "TOGGLE_TODO"; payload: { id: number } }\n  | { type: "DELETE_TODO"; payload: { id: number } }\n  | { type: "SET_FILTER"; payload: { filter: "all" | "active" | "done" } };\n\ninterface State {\n  todos: Todo[];\n  filter: "all" | "active" | "done";\n}\n\nfunction reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case "ADD_TODO":\n      // action.payload is { title: string }\n      return {\n        ...state,\n        todos: [...state.todos, { id: Date.now(), title: action.payload.title, done: false }],\n      };\n    case "TOGGLE_TODO":\n      // action.payload is { id: number }\n      return {\n        ...state,\n        todos: state.todos.map(t =>\n          t.id === action.payload.id ? { ...t, done: !t.done } : t\n        ),\n      };\n    case "DELETE_TODO":\n      return {\n        ...state,\n        todos: state.todos.filter(t => t.id !== action.payload.id),\n      };\n    case "SET_FILTER":\n      return { ...state, filter: action.payload.filter };\n  }\n}`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'keyof-typeof-indexed-access',
    title: 'keyof, typeof & Indexed Access Types',
    level: 2,
    order: 4,
    description: 'Learn keyof T, typeof, and T[K] — the building blocks for advanced type manipulation.',
    sections: [
      {
        heading: 'keyof Operator',
        content: '`keyof` takes an object type and produces a union of its keys:',
        code: { code: `interface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\ntype UserKeys = keyof User;\n// = "name" | "age" | "email"\n\n// Practical use: type-safe property access\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user: User = { name: "Alice", age: 30, email: "a@b.com" };\n\nconst name = getProperty(user, "name");   // type: string\nconst age = getProperty(user, "age");     // type: number\n// getProperty(user, "phone");            // ❌ Error!\n\n// keyof with arrays\ntype ArrayKeys = keyof string[];\n// = "length" | "push" | "pop" | "map" | ... (all array methods)`, language: 'typescript' },
      },
      {
        heading: 'typeof Operator (Type-Level)',
        content: 'At the type level, `typeof` extracts the type of a value:',
        code: { code: `// Extract type from a value\nconst point = { x: 10, y: 20 };\ntype Point = typeof point;\n// = { x: number; y: number }\n\n// With 'as const'\nconst COLORS = {\n  red: "#ff0000",\n  green: "#00ff00",\n  blue: "#0000ff",\n} as const;\n\ntype Color = typeof COLORS[keyof typeof COLORS];\n// = "#ff0000" | "#00ff00" | "#0000ff"\n\ntype ColorName = keyof typeof COLORS;\n// = "red" | "green" | "blue"\n\n// typeof for function types\nfunction add(a: number, b: number): number {\n  return a + b;\n}\ntype AddFn = typeof add;\n// = (a: number, b: number) => number`, language: 'typescript' },
      },
      {
        heading: 'Indexed Access Types (T[K])',
        content: 'Use `T[K]` to look up the type of a specific property:',
        code: { code: `interface User {\n  name: string;\n  age: number;\n  address: {\n    street: string;\n    city: string;\n  };\n}\n\n// Look up property types\ntype UserName = User["name"];     // string\ntype UserAge = User["age"];       // number\ntype UserAddress = User["address"]; // { street: string; city: string }\n\n// Look up multiple at once\ntype NameOrAge = User["name" | "age"]; // string | number\n\n// Nested access\ntype City = User["address"]["city"]; // string\n\n// Practical: extract array element type\ntype Numbers = number[];\ntype Element = Numbers[number]; // number\n\n// Practical: get all value types from an object\nconst STATUS_CODES = {\n  ok: 200,\n  notFound: 404,\n  error: 500,\n} as const;\n\ntype StatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];\n// = 200 | 404 | 500`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'utility-types',
    title: 'Utility Types',
    level: 2,
    order: 5,
    description: 'Master built-in utility types: Partial, Required, Pick, Omit, Record, ReturnType, Exclude, Extract.',
    sections: [
      {
        heading: 'Partial & Required',
        content: '`Partial` makes all properties optional. `Required` makes them all required:',
        code: { code: `interface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// Partial — all properties become optional\ntype UserUpdate = Partial<User>;\n// = { name?: string; age?: number; email?: string }\n\n// Perfect for update functions:\nfunction updateUser(id: number, updates: Partial<User>) {\n  // Only update provided fields\n}\n\nupdateUser(1, { name: "Bob" });  // ✅ Only name\nupdateUser(1, {});               // ✅ Empty is fine\n\n// Required — all properties become required\ninterface Config {\n  host: string;\n  port?: number;\n  debug?: boolean;\n}\n\ntype FullConfig = Required<Config>;\n// = { host: string; port: number; debug: boolean }`, language: 'typescript' },
      },
      {
        heading: 'Pick & Omit',
        content: '`Pick` selects specific properties. `Omit` removes them:',
        code: { code: `interface User {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n  role: "admin" | "user";\n}\n\n// Pick — select specific properties\ntype UserPublic = Pick<User, "id" | "name">;\n// = { id: number; name: string }\n\n// Omit — remove specific properties\ntype UserWithoutPassword = Omit<User, "password">;\n// = { id: number; name: string; email: string; role: "admin" | "user" }\n\n// Create input type (exclude id and role)\ntype CreateUserInput = Omit<User, "id" | "role">;\n// = { name: string; email: string; password: string }\n\n// Practical: API response vs input\ntype ApiUser = Omit<User, "password">;\ntype RegisterInput = Omit<User, "id" | "role">;`, language: 'typescript' },
      },
      {
        heading: 'Record, ReturnType & More',
        content: 'More essential utility types:',
        code: { code: `// Record — create a type with specific keys and value type\ntype UserRoles = Record<string, "admin" | "user" | "viewer">;\nconst roles: UserRoles = {\n  alice: "admin",\n  bob: "user",\n};\n\n// Enum-like with Record\ntype Permissions = Record<"read" | "write" | "delete", boolean>;\nconst perms: Permissions = {\n  read: true,\n  write: true,\n  delete: false,\n};\n\n// ReturnType — extract function return type\nfunction createUser() {\n  return { name: "Alice", age: 30 };\n}\ntype CreateUserReturn = ReturnType<typeof createUser>;\n// = { name: string; age: number }\n\n// Parameters — extract function parameter types\ntype CreateUserParams = Parameters<typeof createUser>;\n// = [] (no params)\n\nfunction greet(name: string, greeting: string): string {\n  return \`\${greeting}, \${name}\`;\n}\ntype GreetParams = Parameters<typeof greet>;\n// = [name: string, greeting: string]\n\n// Exclude & Extract\ntype Status = "idle" | "loading" | "success" | "error";\ntype ActiveStatus = Exclude<Status, "idle">;\n// = "loading" | "success" | "error"\n\ntype FinalStatus = Extract<Status, "success" | "error">;\n// = "success" | "error"`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'mapped-types',
    title: 'Mapped Types',
    level: 2,
    order: 6,
    description: 'Transform types programmatically by iterating over keys — the foundation of utility types.',
    sections: [
      {
        heading: 'Basic Mapped Types',
        content: 'Mapped types create new types by transforming each property of an existing type:',
        code: { code: `// Syntax: { [K in KeyType]: ValueType }\n\n// Make all properties readonly\ntype MyReadonly<T> = {\n  readonly [K in keyof T]: T[K];\n};\n\ninterface User { name: string; age: number; }\ntype ReadonlyUser = MyReadonly<User>;\n// = { readonly name: string; readonly age: number; }\n\n// Make all properties optional\ntype MyPartial<T> = {\n  [K in keyof T]?: T[K];\n};\n\n// Make all properties required\ntype MyRequired<T> = {\n  [K in keyof T]-?: T[K];  // -? removes optional modifier\n};\n\n// Custom: make all properties nullable\ntype Nullable<T> = {\n  [K in keyof T]: T[K] | null;\n};\n\ntype NullableUser = Nullable<User>;\n// = { name: string | null; age: number | null; }`, language: 'typescript' },
      },
      {
        heading: 'Key Remapping (as clause)',
        content: 'TypeScript 4.1+ lets you transform keys with `as`:',
        code: { code: `// Add a prefix to all keys\ntype Getters<T> = {\n  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];\n};\n\ninterface User { name: string; age: number; }\ntype UserGetters = Getters<User>;\n// = { getName: () => string; getAge: () => number; }\n\n// Filter out certain keys\ntype RemoveMethods<T> = {\n  [K in keyof T as T[K] extends Function ? never : K]: T[K];\n};\n\ninterface Mixed {\n  name: string;\n  age: number;\n  greet(): void;\n}\ntype DataOnly = RemoveMethods<Mixed>;\n// = { name: string; age: number; }  (greet removed)\n\n// Convert to event handlers\ntype EventHandlers<T> = {\n  [K in keyof T as \`on\${Capitalize<string & K>}Change\`]: (value: T[K]) => void;\n};\n\ntype FormHandlers = EventHandlers<{ email: string; age: number }>;\n// = { onEmailChange: (value: string) => void; onAgeChange: (value: number) => void; }`, language: 'typescript' },
      },
      {
        heading: 'Practical Mapped Types',
        content: 'Real-world mapped type patterns:',
        code: { code: `// Deep partial — recursively make everything optional\ntype DeepPartial<T> = {\n  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];\n};\n\ninterface Config {\n  db: { host: string; port: number; credentials: { user: string; pass: string } };\n  api: { url: string; timeout: number };\n}\n\ntype PartialConfig = DeepPartial<Config>;\n// All nested properties are optional!\n\n// Mutable — remove readonly from all properties\ntype Mutable<T> = {\n  -readonly [K in keyof T]: T[K];\n};\n\n// Pick by value type\ntype PickByType<T, V> = {\n  [K in keyof T as T[K] extends V ? K : never]: T[K];\n};\n\ninterface Model {\n  id: number;\n  name: string;\n  email: string;\n  age: number;\n}\n\ntype StringFields = PickByType<Model, string>;\n// = { name: string; email: string; }\n\ntype NumberFields = PickByType<Model, number>;\n// = { id: number; age: number; }`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'conditional-types',
    title: 'Conditional Types',
    level: 2,
    order: 7,
    description: 'Create types that depend on conditions: T extends X ? A : B, with distributive behavior.',
    sections: [
      {
        heading: 'Basic Conditional Types',
        content: 'Conditional types choose a type based on a condition — similar to ternary expressions but for types:',
        code: { code: `// Syntax: T extends U ? TrueType : FalseType\n\ntype IsString<T> = T extends string ? true : false;\n\ntype A = IsString<string>;   // true\ntype B = IsString<number>;   // false\ntype C = IsString<"hello">;  // true\n\n// Practical: NonNullable (built-in)\ntype MyNonNullable<T> = T extends null | undefined ? never : T;\n\ntype X = MyNonNullable<string | null>;  // string\ntype Y = MyNonNullable<number | undefined>;  // number\n\n// Flatten arrays\ntype Flatten<T> = T extends Array<infer U> ? U : T;\n\ntype A2 = Flatten<number[]>;    // number\ntype B2 = Flatten<string>;      // string (not an array)\n\n// Extract promise value\ntype UnwrapPromise<T> = T extends Promise<infer U> ? U : T;\n\ntype A3 = UnwrapPromise<Promise<string>>;  // string\ntype B3 = UnwrapPromise<number>;           // number`, language: 'typescript' },
      },
      {
        heading: 'The `infer` Keyword',
        content: '`infer` lets you extract types from within another type:',
        code: { code: `// Extract return type of a function\ntype MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\nfunction greet(name: string): string {\n  return \`Hello, \${name}\`;\n}\n\ntype GreetReturn = MyReturnType<typeof greet>;  // string\n\n// Extract parameter types\ntype MyParameters<T> = T extends (...args: infer P) => any ? P : never;\n\ntype GreetParams = MyParameters<typeof greet>;  // [name: string]\n\n// Extract element type from arrays\ntype ElementType<T> = T extends (infer U)[] ? U : never;\n\ntype NumElement = ElementType<number[]>;  // number\ntype StrElement = ElementType<string[]>;  // string\n\n// Extract resolved type from a Promise\ntype Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;\n\ntype A = Awaited<Promise<string>>;          // string\ntype B = Awaited<Promise<Promise<number>>>; // number (recursive!)`, language: 'typescript' },
      },
      {
        heading: 'Distributive Conditional Types',
        content: 'When a conditional type acts on a union, it distributes over each member:',
        code: { code: `// Distributive behavior\ntype ToArray<T> = T extends any ? T[] : never;\n\ntype Result = ToArray<string | number>;\n// = string[] | number[]  (NOT (string | number)[])\n\n// Each member of the union is processed separately:\n// string extends any ? string[] : never  →  string[]\n// number extends any ? number[] : never  →  number[]\n// Result: string[] | number[]\n\n// To PREVENT distribution, wrap in tuple:\ntype ToArrayNonDist<T> = [T] extends [any] ? T[] : never;\n\ntype Result2 = ToArrayNonDist<string | number>;\n// = (string | number)[]\n\n// Practical: Filter union members\ntype Exclude<T, U> = T extends U ? never : T;\n\ntype Status = "idle" | "loading" | "success" | "error";\ntype ActiveStatus = Exclude<Status, "idle" | "error">;\n// = "loading" | "success"\n\n// Extract only string members\ntype OnlyStrings<T> = T extends string ? T : never;\ntype Mixed = "a" | 1 | "b" | 2;\ntype Strings = OnlyStrings<Mixed>;  // "a" | "b"`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'satisfies-as-const',
    title: 'satisfies & as const',
    level: 2,
    order: 8,
    description: 'The `satisfies` operator and `as const` assertions — modern TypeScript essentials.',
    sections: [
      {
        heading: 'The `satisfies` Operator (TS 4.9+)',
        content: '`satisfies` checks that a value matches a type WITHOUT widening the inferred type:',
        code: { code: `// Problem with regular type annotation:\ninterface Config {\n  port: number;\n  host: string;\n  debug: boolean;\n}\n\n// Type annotation widens the type\nconst config: Config = {\n  port: 3000,\n  host: "localhost",\n  debug: true,\n};\n\n// config.port is 'number', not '3000'\n// config.debug is 'boolean', not 'true'\n\n// ✅ With satisfies — keeps literal types!\nconst config = {\n  port: 3000,\n  host: "localhost",\n  debug: true,\n} satisfies Config;\n\n// config.port is 3000 (literal!)\n// config.debug is true (literal!)\n\n// Still validates the shape:\n// const bad = { port: "3000" } satisfies Config;\n// ❌ Error: string is not assignable to number`, language: 'typescript' },
      },
      {
        heading: 'satisfies vs Type Annotations',
        content: 'The key difference: `satisfies` preserves the narrowest type while still validating:',
        code: { code: `type Theme = {\n  colors: { primary: string; secondary: string };\n  spacing: { small: number; large: number };\n};\n\n// ❌ With annotation — loses literal info\nconst theme: Theme = {\n  colors: { primary: "#ff0000", secondary: "#00ff00" },\n  spacing: { small: 4, large: 16 },\n};\ntheme.colors.primary;  // type: string\n\n// ✅ With satisfies — keeps literals\nconst theme = {\n  colors: { primary: "#ff0000", secondary: "#00ff00" },\n  spacing: { small: 4, large: 16 },\n} satisfies Theme;\ntheme.colors.primary;  // type: "#ff0000" (literal!)\ntheme.spacing.small;   // type: 4 (literal!)\n\n// Practical: config maps\ntype RouteConfig = Record<string, { path: string; method: "GET" | "POST" }>;\n\nconst routes = {\n  getUsers: { path: "/users", method: "GET" },\n  createUser: { path: "/users", method: "POST" },\n} satisfies RouteConfig;\n\n// routes.getUsers.method is "GET" (literal), not "GET" | "POST"\nroutes.getUsers.method === "GET";  // ✅ Type-safe comparison`, language: 'typescript' },
      },
      {
        heading: 'as const Assertions',
        content: '`as const` makes values deeply readonly with literal types:',
        code: { code: `// Without 'as const'\nconst colors = ["red", "green", "blue"];\n// type: string[]\n\n// With 'as const'\nconst colors = ["red", "green", "blue"] as const;\n// type: readonly ["red", "green", "blue"]\n\n// Object example\nconst config = {\n  apiUrl: "https://api.example.com",\n  timeout: 5000,\n  retries: 3,\n} as const;\n\n// type: {\n//   readonly apiUrl: "https://api.example.com";\n//   readonly timeout: 5000;\n//   readonly retries: 3;\n// }\n\n// Extract types from 'as const'\ntype Color = typeof colors[number];  // "red" | "green" | "blue"\ntype Timeout = typeof config.timeout; // 5\n\n// Combined with satisfies\nconst ROLES = {\n  ADMIN: "admin",\n  USER: "user",\n  GUEST: "guest",\n} as const satisfies Record<string, string>;\n\ntype Role = typeof ROLES[keyof typeof ROLES];\n// = "admin" | "user" | "guest"`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'type-inference',
    title: 'Type Inference',
    level: 2,
    order: 9,
    description: 'Understand how TypeScript automatically figures out types — contextual typing, best common type, and more.',
    sections: [
      {
        heading: 'How Inference Works',
        content: 'TypeScript infers types from context so you don\'t have to annotate everything:',
        code: { code: `// Variable inference\nlet name = "Alice";     // string\nlet age = 30;           // number\nlet active = true;      // boolean\n\n// Array inference\nlet numbers = [1, 2, 3];        // number[]\nlet mixed = [1, "two", true];   // (string | number | boolean)[]\n\n// Function return type inference\nfunction add(a: number, b: number) {\n  return a + b;  // inferred: number\n}\n\n// Object inference\nconst user = {\n  name: "Alice",    // string\n  age: 30,          // number\n  hobbies: ["reading"],  // string[]\n};\n\n// Inference from context (contextual typing)\nconst numbers = [1, 2, 3];\nnumbers.map(n => n.toString());\n// 'n' is inferred as number from the array context`, language: 'typescript' },
      },
      {
        heading: 'Contextual Typing',
        content: 'TypeScript uses the surrounding context to infer types:',
        code: { code: `// Event handlers\nwindow.addEventListener("click", (event) => {\n  // event is inferred as MouseEvent\n  console.log(event.clientX, event.clientY);\n});\n\n// Callback parameters\nconst users = [{ name: "Alice" }, { name: "Bob" }];\nusers.forEach(user => {\n  // user is inferred as { name: string }\n  console.log(user.name);\n});\n\n// Function type context\ntype Handler = (value: string, index: number) => void;\n\nconst handler: Handler = (value, index) => {\n  // value: string, index: number — inferred from Handler type!\n  console.log(value, index);\n};\n\n// Return type context\ninterface Repository {\n  find(id: number): Promise<User>;\n}\n\nconst repo: Repository = {\n  async find(id) {\n    // Return type inferred as Promise<User>\n    return { id, name: "Alice", email: "a@b.com" };\n  },\n};`, language: 'typescript' },
      },
      {
        heading: 'When Inference Falls Short',
        content: 'Sometimes you need to help TypeScript with explicit annotations:',
        code: { code: `// Empty array — can't infer element type\nlet items = [];        // any[] (with noImplicitAny: error!)\nlet items: string[] = [];  // ✅ Explicit\n\n// Union inference — might be wider than expected\nconst value = Math.random() > 0.5 ? "hello" : 42;\n// type: string | number (might want just one)\n\n// Object with optional properties\nfunction createUser() {\n  const user: { name: string; age?: number } = { name: "Alice" };\n  // Need annotation because age might be added later\n  if (someCondition) {\n    user.age = 30;\n  }\n  return user;\n}\n\n// Callback return types\nconst items = [1, 2, 3].map(n => {\n  // If this is complex, TS might infer a wider type\n  // Add return type annotation to be explicit\n  return { value: n, label: String(n) };\n});\n// Inferred as { value: number; label: string; }[]`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'classes-access-modifiers',
    title: 'Classes & Access Modifiers',
    level: 2,
    order: 10,
    description: 'TypeScript classes with public, private, protected, readonly, and parameter properties.',
    sections: [
      {
        heading: 'TypeScript Classes',
        content: 'TypeScript adds type annotations and access modifiers to classes:',
        code: { code: `class User {\n  // Properties with types\n  name: string;\n  private email: string;\n  readonly id: number;\n\n  constructor(id: number, name: string, email: string) {\n    this.id = id;\n    this.name = name;\n    this.email = email;\n  }\n\n  // Methods\n  greet(): string {\n    return \`Hello, I'm \${this.name}\`;\n  }\n\n  private getEmail(): string {\n    return this.email;\n  }\n}\n\nconst user = new User(1, "Alice", "alice@example.com");\nuser.name;       // ✅ public\nuser.greet();    // ✅ public\n// user.email;   // ❌ private\n// user.id = 2;  // ❌ readonly`, language: 'typescript' },
      },
      {
        heading: 'Parameter Properties (Shorthand)',
        content: 'TypeScript lets you declare and initialize properties in the constructor:',
        code: { code: `// Verbose way\nclass User {\n  name: string;\n  private email: string;\n  readonly id: number;\n\n  constructor(id: number, name: string, email: string) {\n    this.id = id;\n    this.name = name;\n    this.email = email;\n  }\n}\n\n// ✅ Shorthand — add access modifier to constructor params\nclass User {\n  constructor(\n    readonly id: number,\n    public name: string,\n    private email: string\n  ) {}\n}\n\n// Same result, much less code!\nconst user = new User(1, "Alice", "alice@example.com");\nuser.id;    // ✅ readonly\nuser.name;  // ✅ public\n// user.email; // ❌ private`, language: 'typescript' },
      },
      {
        heading: 'Access Modifiers & Inheritance',
        content: '`public` (default), `private`, and `protected` control visibility:',
        code: { code: `class Animal {\n  constructor(\n    public name: string,        // Accessible everywhere\n    protected species: string,  // Accessible in this class + subclasses\n    private id: number          // Accessible only in this class\n  ) {}\n\n  getInfo(): string {\n    return \`\${this.name} (\${this.species}) #\${this.id}\`;\n    // Can access all — we're inside the class\n  }\n}\n\nclass Dog extends Animal {\n  bark(): string {\n    return \`\${this.name} says Woof!\`;\n    // ✅ Can access 'name' (public) and 'species' (protected)\n    // ❌ Cannot access 'id' (private to Animal)\n  }\n}\n\nconst dog = new Dog("Rex", "Canine", 1);\ndog.name;      // ✅ public\ndog.getInfo(); // ✅ public method\n// dog.species; // ❌ protected — not accessible outside\n// dog.id;      // ❌ private`, language: 'typescript' },
      },
      {
        heading: 'Implementing Interfaces',
        content: 'Classes can implement interfaces to guarantee they have certain properties/methods:',
        code: { code: `interface Printable {\n  print(): string;\n  readonly format: string;\n}\n\ninterface Serializable {\n  toJSON(): string;\n}\n\nclass Document implements Printable, Serializable {\n  readonly format = "PDF";\n\n  constructor(public title: string, public content: string) {}\n\n  print(): string {\n    return \`[\${this.format}] \${this.title}: \${this.content}\`;\n  }\n\n  toJSON(): string {\n    return JSON.stringify({ title: this.title, content: this.content });\n  }\n}\n\n// TS ensures Document has all members from both interfaces\nconst doc = new Document("Report", "Content here");\ndoc.print();   // "[PDF] Report: Content here"\ndoc.toJSON();  // '{"title":"Report","content":"Content here"}'`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'modules-declaration-files',
    title: 'Modules & Declaration Files',
    level: 2,
    order: 11,
    description: 'ES modules in TypeScript, declaration files (.d.ts), @types packages, and ambient declarations.',
    sections: [
      {
        heading: 'ES Modules in TypeScript',
        content: 'TypeScript uses standard ES module syntax — import and export:',
        code: { code: `// Named exports\nexport interface User {\n  id: number;\n  name: string;\n}\n\nexport function createUser(name: string): User {\n  return { id: Date.now(), name };\n}\n\nexport const MAX_USERS = 100;\n\n// Default export\nexport default class UserService {\n  private users: User[] = [];\n  add(user: User) { this.users.push(user); }\n}\n\n// Re-exports\nexport { UserService } from "./UserService";\nexport type { User } from "./types";\n\n// Importing\nimport UserService, { User, createUser, MAX_USERS } from "./module";\n\n// Type-only imports (erased at compile time)\nimport type { User } from "./types";\nimport type UserService from "./UserService";`, language: 'typescript' },
      },
      {
        heading: 'Declaration Files (.d.ts)',
        content: 'Declaration files provide types for JavaScript libraries that don\'t include them:',
        code: { code: `// Example: declaring types for a JS library\n// types/lodash.d.ts\n\ndeclare module "lodash" {\n  export function chunk<T>(array: T[], size?: number): T[][];\n  export function compact<T>(array: (T | null | undefined)[]): T[];\n  export function uniq<T>(array: T[]): T[];\n  \n  export function debounce<T extends (...args: any[]) => any>(\n    func: T,\n    wait?: number\n  ): T & { cancel(): void; flush(): void };\n}\n\n// Using @types packages (preferred)\n// npm install --save-dev @types/lodash\n// This installs the declaration file automatically\n\n// Common @types packages:\n// @types/node      — Node.js APIs\n// @types/react     — React\n// @types/express   — Express.js\n// @types/jest      — Jest testing`, language: 'typescript', title: 'declaration.d.ts' },
      },
      {
        heading: 'Ambient Declarations',
        content: 'Declare types for global variables, environment variables, or non-module scripts:',
        code: { code: `// global.d.ts — ambient declarations\n\n// Global variables\ndeclare const __VERSION__: string;\ndeclare const __DEV__: boolean;\n\n// Environment variables (Node.js)\ndeclare namespace NodeJS {\n  interface ProcessEnv {\n    NODE_ENV: "development" | "production" | "test";\n    API_URL: string;\n    DATABASE_URL: string;\n  }\n}\n\n// Now process.env.API_URL is typed as string!\n\n// Browser globals\ndeclare global {\n  interface Window {\n    myCustomAPI: {\n      init(): void;\n      version: string;\n    };\n  }\n}\n\n// Usage:\n// window.myCustomAPI.init();  // ✅ Typed!\n// process.env.API_URL;        // ✅ Typed as string`, language: 'typescript', title: 'global.d.ts' },
      },
    ],
  },
  {
    id: 'project-api-client',
    title: '🛠️ Project: Typed API Client',
    level: 2,
    order: 12,
    isProject: true,
    description: 'Build a generic, type-safe HTTP client using generics, utility types, and discriminated unions.',
    sections: [
      {
        heading: 'Project Overview',
        content: 'Build a reusable API client that provides full type safety for requests and responses using generics, discriminated unions, and utility types.',
      },
      {
        heading: 'Step 1: Define the Response Types',
        content: 'Use discriminated unions for API responses:',
        code: { code: `// Discriminated union for API responses\ntype ApiResponse<T> =\n  | { status: "success"; data: T; statusCode: number }\n  | { status: "error"; error: string; statusCode: number };\n\n// Base types\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\ninterface Post {\n  id: number;\n  title: string;\n  body: string;\n  userId: number;\n}\n\n// Paginated response\ntype PaginatedResponse<T> = {\n  data: T[];\n  total: number;\n  page: number;\n  perPage: number;\n};`, language: 'typescript', title: 'types.ts' },
      },
      {
        heading: 'Step 2: Build the Generic Client',
        content: 'Use generics to make the client work with any endpoint:',
        code: { code: `interface RequestConfig {\n  headers?: Record<string, string>;\n  params?: Record<string, string>;\n  timeout?: number;\n}\n\nclass ApiClient {\n  private baseUrl: string;\n  private defaultHeaders: Record<string, string>;\n\n  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {\n    this.baseUrl = baseUrl;\n    this.defaultHeaders = {\n      "Content-Type": "application/json",\n      ...defaultHeaders,\n    };\n  }\n\n  async get<T>(\n    endpoint: string,\n    config?: RequestConfig\n  ): Promise<ApiResponse<T>> {\n    return this.request<T>("GET", endpoint, undefined, config);\n  }\n\n  async post<T>(\n    endpoint: string,\n    body: unknown,\n    config?: RequestConfig\n  ): Promise<ApiResponse<T>> {\n    return this.request<T>("POST", endpoint, body, config);\n  }\n\n  async put<T>(\n    endpoint: string,\n    body: unknown,\n    config?: RequestConfig\n  ): Promise<ApiResponse<T>> {\n    return this.request<T>("PUT", endpoint, body, config);\n  }\n\n  async delete<T>(\n    endpoint: string,\n    config?: RequestConfig\n  ): Promise<ApiResponse<T>> {\n    return this.request<T>("DELETE", endpoint, undefined, config);\n  }\n\n  private async request<T>(\n    method: string,\n    endpoint: string,\n    body?: unknown,\n    config?: RequestConfig\n  ): Promise<ApiResponse<T>> {\n    try {\n      const url = new URL(endpoint, this.baseUrl);\n      if (config?.params) {\n        Object.entries(config.params).forEach(([k, v]) =>\n          url.searchParams.set(k, v)\n        );\n      }\n\n      const response = await fetch(url.toString(), {\n        method,\n        headers: { ...this.defaultHeaders, ...config?.headers },\n        body: body ? JSON.stringify(body) : undefined,\n      });\n\n      const data = await response.json();\n\n      if (!response.ok) {\n        return {\n          status: "error",\n          error: data.message || "Unknown error",\n          statusCode: response.status,\n        };\n      }\n\n      return {\n        status: "success",\n        data: data as T,\n        statusCode: response.status,\n      };\n    } catch (error) {\n      return {\n        status: "error",\n        error: error instanceof Error ? error.message : "Network error",\n        statusCode: 0,\n      };\n    }\n  }\n}`, language: 'typescript', title: 'client.ts' },
      },
      {
        heading: 'Step 3: Create a Typed Service Layer',
        content: 'Use the client with specific types:',
        code: { code: `const api = new ApiClient("https://jsonplaceholder.typicode.com");\n\n// Type-safe service layer\nclass UserService {\n  async getAll(): Promise<ApiResponse<User[]>> {\n    return api.get<User[]>("/users");\n  }\n\n  async getById(id: number): Promise<ApiResponse<User>> {\n    return api.get<User>(\`/users/\${id}\`);\n  }\n\n  async create(input: Omit<User, "id">): Promise<ApiResponse<User>> {\n    return api.post<User>("/users", input);\n  }\n\n  async update(id: number, input: Partial<User>): Promise<ApiResponse<User>> {\n    return api.put<User>(\`/users/\${id}\`, input);\n  }\n\n  async delete(id: number): Promise<ApiResponse<void>> {\n    return api.delete<void>(\`/users/\${id}\`);\n  }\n}\n\n// Usage with discriminated union handling\nconst userService = new UserService();\n\nasync function displayUsers() {\n  const response = await userService.getAll();\n\n  switch (response.status) {\n    case "success":\n      // response.data is User[] — fully typed!\n      response.data.forEach(user => {\n        console.log(user.name, user.email);\n      });\n      break;\n    case "error":\n      // response.error is string\n      console.error(\`Error \${response.statusCode}: \${response.error}\`);\n      break;\n  }\n}`, language: 'typescript', title: 'service.ts' },
      },
      {
        heading: 'Key Takeaways',
        content: '✅ **Generics** — Client works with any response type\n✅ **Discriminated unions** — Type-safe success/error handling\n✅ **Utility types** — `Omit<User, "id">` for create input, `Partial<User>` for updates\n✅ **Record type** — For headers and params\n✅ **Type assertions** — `as T` for parsed JSON\n\n**Challenge:** Add request/response interceptors with typed middleware. Add retry logic with a generic `RetryConfig` type.',
      },
    ],
  },
];
