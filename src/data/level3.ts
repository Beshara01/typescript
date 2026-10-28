import { Lesson } from './types';

export const level3Lessons: Lesson[] = [
  {
    id: 'advanced-generics',
    title: 'Advanced Generic Patterns',
    level: 3,
    order: 1,
    description: 'Master covariance, contravariance, the infer keyword in complex positions, and recursive generics.',
    sections: [
      {
        heading: 'Variance: Covariance & Contravariance',
        content: 'Variance describes how subtyping relationships are preserved or reversed when wrapped in generic types:',
        code: { code: "// Covariance — preserves subtyping direction\n// If Dog extends Animal, then Dog[] extends Animal[]\n// Arrays are covariant in their element type\n\ninterface Animal { name: string; }\ninterface Dog extends Animal { breed: string; }\n\nlet dogs: Dog[] = [{ name: \"Rex\", breed: \"Lab\" }];\nlet animals: Animal[] = dogs;  // ✅ Covariant — OK\n\n// Contravariance — reverses subtyping direction\n// Function parameters are contravariant\n\ntype AnimalHandler = (animal: Animal) => void;\ntype DogHandler = (dog: Dog) => void;\n\nlet handleAnimal: AnimalHandler = (a) => console.log(a.name);\nlet handleDog: DogHandler = (d) => console.log(d.breed);\n\n// ✅ AnimalHandler can be used where DogHandler is expected\n// Because if you can handle ANY animal, you can handle a dog\nlet handler: DogHandler = handleAnimal;  // ✅ Contravariant\n\n// ❌ DogHandler CANNOT be used where AnimalHandler is expected\n// Because a DogHandler might access .breed on a Cat!\n// let handler2: AnimalHandler = handleDog;  // Error in strict mode", language: 'typescript' },
      },
      {
        heading: 'Advanced infer Patterns',
        content: 'Use `infer` in complex positions to extract deeply nested types:',
        code: { code: "// Extract the type from a Promise chain\ntype DeepAwaited<T> = T extends Promise<infer U>\n  ? DeepAwaited<U>\n  : T;\n\ntype A = DeepAwaited<Promise<Promise<Promise<string>>>>;\n// = string\n\n// Extract constructor parameters\ntype ConstructorParams<T> = T extends new (...args: infer P) => any\n  ? P\n  : never;\n\nclass User {\n  constructor(public name: string, public age: number) {}\n}\ntype UserParams = ConstructorParams<typeof User>;\n// = [name: string, age: number]\n\n// Extract the return type of a method\ntype MethodReturnType<T, K extends keyof T> =\n  T[K] extends (...args: any[]) => infer R ? R : never;\n\ninterface Service {\n  getUser(): Promise<User>;\n  getPosts(): Promise<Post[]>;\n}\n\ntype GetUserReturn = MethodReturnType<Service, \"getUser\">;\n// = Promise<User>\n\n// Conditional infer with multiple branches\ntype Unpack<T> =\n  T extends (infer U)[] ? U :\n  T extends Promise<infer U> ? U :\n  T extends (...args: any[]) => infer U ? U :\n  T;\n\ntype A2 = Unpack<number[]>;        // number\ntype B2 = Unpack<Promise<string>>; // string\ntype C2 = Unpack<() => boolean>;   // boolean\ntype D2 = Unpack<number>;          // number", language: 'typescript' },
      },
      {
        heading: 'Recursive Generics',
        content: 'Generics that reference themselves for deeply nested structures:',
        code: { code: "// DeepReadonly — recursively make everything readonly\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object\n    ? T[K] extends (...args: any[]) => any\n      ? T[K]  // Don't recurse into functions\n      : DeepReadonly<T[K]>\n    : T[K];\n};\n\ninterface Config {\n  db: { host: string; port: number; credentials: { user: string } };\n  features: { enableCache: boolean; maxRetries: number };\n}\n\ntype ReadonlyConfig = DeepReadonly<Config>;\n// Every nested property is readonly!\n\n// DeepPartial — recursively make everything optional\ntype DeepPartial<T> = {\n  [K in keyof T]?: T[K] extends object\n    ? T[K] extends (...args: any[]) => any\n      ? T[K]\n      : DeepPartial<T[K]>\n    : T[K];\n};\n\n// Usage:\nconst partial: DeepPartial<Config> = {\n  db: { host: \"localhost\" },  // Only host, everything else optional\n};", language: 'typescript' },
      },
    ],
  },
  {
    id: 'template-literal-types',
    title: 'Template Literal Types',
    level: 3,
    order: 2,
    description: 'Manipulate strings at the type level using template literals and pattern matching with infer.',
    sections: [
      {
        heading: 'Basic Template Literal Types',
        content: 'Create string types by combining other types using template syntax:',
        code: { code: "// Basic string interpolation at type level\ntype Greeting = `Hello, ${string}`;\nlet g1: Greeting = \"Hello, World\";  // ✅\nlet g2: Greeting = \"Hello, TypeScript\";  // ✅\n// let g3: Greeting = \"Hi, World\";  // ❌ Must start with \"Hello, \"\n\n// Combining union types\ntype Color = \"red\" | \"green\" | \"blue\";\ntype Size = \"sm\" | \"md\" | \"lg\";\n\ntype ProductCode = `${Color}-${Size}`;\n// = \"red-sm\" | \"red-md\" | \"red-lg\" | \"green-sm\" | ...\n// All 9 combinations!\n\n// With Capitalize/Uncapitalize/Lowercase/Uppercase\ntype EventName = `on${Capitalize<\"click\" | \"focus\" | \"blur\">}`;\n// = \"onClick\" | \"onFocus\" | \"onBlur\"\n\n// Practical: CSS class names\ntype Theme = \"light\" | \"dark\";\ntype Component = \"button\" | \"input\" | \"card\";\ntype CSSClass = `${Theme}-${Component}`;\n// = \"light-button\" | \"light-input\" | \"light-card\" | \"dark-button\" | ...", language: 'typescript' },
      },
      {
        heading: 'Pattern Matching with infer',
        content: 'Extract parts of string types using pattern matching:',
        code: { code: "// Extract parts of a string type\ntype ParseRoute<T extends string> =\n  T extends `/${infer Segment}/${infer Rest}`\n    ? Segment | ParseRoute<`/${Rest}`>\n    : T extends `/${infer Segment}`\n      ? Segment\n      : never;\n\ntype Route1 = ParseRoute<\"/users/posts/comments\">;\n// = \"users\" | \"posts\" | \"comments\"\n\n// Extract file extension\ntype GetExtension<T extends string> =\n  T extends `${string}.${infer Ext}` ? Ext : never;\n\ntype A = GetExtension<\"file.ts\">;       // \"ts\"\ntype B = GetExtension<\"photo.jpg\">;     // \"jpg\"\ntype C = GetExtension<\"archive.tar.gz\">; // \"gz\"\n\n// Parse key-value pairs\ntype ParseQueryString<T extends string> =\n  T extends `${infer Key}=${infer Value}&${infer Rest}`\n    ? { [K in Key]: Value } & ParseQueryString<Rest>\n    : T extends `${infer Key}=${infer Value}`\n      ? { [K in Key]: Value }\n      : {};\n\ntype Params = ParseQueryString<\"name=alice&age=30&role=admin\">;\n// = { name: \"alice\" } & { age: \"30\" } & { role: \"admin\" }", language: 'typescript' },
      },
      {
        heading: 'Practical Applications',
        content: 'Template literal types are incredibly useful for type-safe APIs:',
        code: { code: "// Type-safe event emitter\ntype EventMap = {\n  \"user:login\": { userId: string };\n  \"user:logout\": { userId: string };\n  \"order:created\": { orderId: string; total: number };\n};\n\n// Generate handler types from event names\ntype EventHandler<T extends string> =\n  T extends keyof EventMap ? (data: EventMap[T]) => void : never;\n\n// Type-safe URL builder\ntype ApiVersion = \"v1\" | \"v2\" | \"v3\";\ntype Endpoint = \"users\" | \"posts\" | \"comments\";\ntype ApiRoute = `/api/${ApiVersion}/${Endpoint}`;\n// = \"/api/v1/users\" | \"/api/v1/posts\" | ... | \"/api/v3/comments\"\n\n// Type-safe i18n keys\ntype TranslationKeys = {\n  \"nav.home\": string;\n  \"nav.about\": string;\n  \"user.greeting\": string;\n  \"user.farewell\": string;\n};\n\ntype Key = keyof TranslationKeys;\n// = \"nav.home\" | \"nav.about\" | \"user.greeting\" | \"user.farewell\"\n\nfunction t(key: keyof TranslationKeys): string {\n  // Full autocomplete for translation keys!\n  return translations[key];\n}", language: 'typescript' },
      },
    ],
  },
  {
    id: 'recursive-types',
    title: 'Recursive & Self-Referencing Types',
    level: 3,
    order: 3,
    description: 'Build types that reference themselves — tree structures, JSON types, and deeply nested operations.',
    sections: [
      {
        heading: 'Basic Recursive Types',
        content: 'Types can reference themselves to describe recursive structures:',
        code: { code: "// Tree structure\ntype TreeNode<T> = {\n  value: T;\n  children: TreeNode<T>[];\n};\n\nconst tree: TreeNode<number> = {\n  value: 1,\n  children: [\n    {\n      value: 2,\n      children: [\n        { value: 4, children: [] },\n        { value: 5, children: [] },\n      ],\n    },\n    {\n      value: 3,\n      children: [\n        { value: 6, children: [] },\n      ],\n    },\n  ],\n};\n\n// Linked list\ntype LinkedList<T> = {\n  value: T;\n  next: LinkedList<T> | null;\n};\n\nconst list: LinkedList<number> = {\n  value: 1,\n  next: {\n    value: 2,\n    next: {\n      value: 3,\n      next: null,\n    },\n  },\n};", language: 'typescript' },
      },
      {
        heading: 'JSON Type',
        content: 'Define the full JSON type recursively:',
        code: { code: "// Complete JSON type\ntype JSON =\n  | string\n  | number\n  | boolean\n  | null\n  | JSON[]\n  | { [key: string]: JSON };\n\n// Usage\nconst data: JSON = {\n  name: \"Alice\",\n  age: 30,\n  hobbies: [\"reading\", \"coding\"],\n  address: {\n    city: \"NYC\",\n    coords: [40.7, -74.0],\n  },\n  active: true,\n  metadata: null,\n};\n\n// Typed JSON.parse\ntype JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };\n\nfunction safeJsonParse(text: string): JSONValue {\n  return JSON.parse(text);\n}", language: 'typescript' },
      },
      {
        heading: 'Advanced Recursive Operations',
        content: 'Combine recursion with conditional types for powerful transformations:',
        code: { code: "// Get all nested paths of an object type\ntype Paths<T, Prefix extends string = \"\"> =\n  T extends object\n    ? {\n        [K in keyof T & string]: K extends string\n          ? `${Prefix}${Prefix extends \"\" ? \"\" : \".\"}${K}` |\n            Paths<T[K], `${Prefix}${Prefix extends \"\" ? \"\" : \".\"}${K}`>\n          : never;\n      }[keyof T & string]\n    : never;\n\ninterface User {\n  name: string;\n  address: {\n    street: string;\n    city: string;\n    geo: { lat: number; lng: number };\n  };\n}\n\ntype UserPaths = Paths<User>;\n// = \"name\" | \"address\" | \"address.street\" | \"address.city\"\n// | \"address.geo\" | \"address.geo.lat\" | \"address.geo.lng\"\n\n// Get value at a path\ntype PathValue<T, P extends string> =\n  P extends `${infer K}.${infer Rest}`\n    ? K extends keyof T\n      ? PathValue<T[K], Rest>\n      : never\n    : P extends keyof T\n      ? T[P]\n      : never;\n\ntype City = PathValue<User, \"address.city\">;  // string\ntype Lat = PathValue<User, \"address.geo.lat\">;  // number", language: 'typescript' },
      },
    ],
  },
  {
    id: 'declaration-merging',
    title: 'Declaration Merging & Module Augmentation',
    level: 3,
    order: 4,
    description: 'Extend existing types, augment third-party modules, and understand interface merging.',
    sections: [
      {
        heading: 'Interface Merging',
        content: 'Multiple interface declarations with the same name are automatically merged:',
        code: { code: "// These merge into a single interface\ninterface User {\n  name: string;\n}\n\ninterface User {\n  age: number;\n}\n\ninterface User {\n  email: string;\n}\n\n// Result: { name: string; age: number; email: string }\nconst user: User = {\n  name: \"Alice\",\n  age: 30,\n  email: \"alice@example.com\",\n};\n\n// Practical: extending built-in types\ninterface Array<T> {\n  // Add custom methods to all arrays\n  customFilter(predicate: (item: T) => boolean): T[];\n}\n\n// Now ALL arrays have customFilter\n[1, 2, 3].customFilter(n => n > 1);", language: 'typescript' },
      },
      {
        heading: 'Module Augmentation',
        content: 'Extend types from third-party modules without modifying their source:',
        code: { code: "// Augmenting a third-party module\n// In any .ts file in your project:\n\nimport \"express\";  // Import the module to augment\n\ndeclare module \"express\" {\n  interface Request {\n    // Add custom properties to Express Request\n    user?: {\n      id: string;\n      role: \"admin\" | \"user\";\n    };\n    requestId: string;\n  }\n}\n\n// Now in your routes:\napp.get(\"/profile\", (req, res) => {\n  // req.user is typed! (from auth middleware)\n  if (req.user) {\n    res.json({ userId: req.user.id });\n  }\n  // req.requestId is typed!\n  console.log(req.requestId);\n});\n\n// Augmenting Express Response\ndeclare module \"express-serve-static-core\" {\n  interface Response {\n    json(data: ApiResponse<unknown>): Response;\n  }\n}", language: 'typescript' },
      },
      {
        heading: 'Namespace Merging',
        content: 'Namespaces can merge with classes, functions, and enums:',
        code: { code: "// Namespace merging with a class\nclass Album {\n  label: Album.Label;\n  constructor(label: Album.Label) {\n    this.label = label;\n  }\n}\n\nnamespace Album {\n  export interface Label {\n    name: string;\n    country: string;\n  }\n}\n\n// Usage\nconst album = new Album({ name: \"Sony\", country: \"US\" });\n\n// Namespace merging with a function\nfunction buildLabel(name: string): string {\n  return buildLabel.prefix + name;\n}\n\nnamespace buildLabel {\n  export let prefix = \"Project: \";\n}\n\nconsole.log(buildLabel(\"MyApp\"));  // \"Project: MyApp\"\nbuildLabel.prefix = \"App: \";\nconsole.log(buildLabel(\"MyApp\"));  // \"App: MyApp\"\n\n// Note: Namespaces are mostly legacy.\n// Use ES modules for new code.\n// This pattern is mainly seen in older libraries.", language: 'typescript' },
      },
    ],
  },
  {
    id: 'decorators',
    title: 'Decorators (Brief Coverage)',
    level: 3,
    order: 5,
    description: 'Class, method, property, and parameter decorators — relevant mainly for Angular and NestJS.',
    sections: [
      {
        heading: 'What Are Decorators?',
        content: 'Decorators are functions that modify classes, methods, or properties at design time. They use the `@` syntax. **Note:** Decorators are mainly used in Angular and NestJS. If you don\'t use these frameworks, you can skim this section.',
        code: { code: "// Enable in tsconfig:\n// \"experimentalDecorators\": true\n\n// Class decorator\nfunction Singleton<T extends new (...args: any[]) => any>(constructor: T) {\n  let instance: InstanceType<T>;\n  return class extends constructor {\n    constructor(...args: any[]) {\n      if (instance) return instance;\n      instance = new constructor(...args);\n      return instance;\n    }\n  };\n}\n\n@Singleton\nclass Database {\n  constructor(public connectionString: string) {}\n}\n\nconst db1 = new Database(\"postgres://localhost\");\nconst db2 = new Database(\"postgres://localhost\");\nconsole.log(db1 === db2);  // true — same instance!", language: 'typescript' },
      },
      {
        heading: 'Method & Property Decorators',
        content: 'Decorators can modify methods and properties:',
        code: { code: "// Method decorator — log method calls\nfunction Log(\n  target: any,\n  propertyKey: string,\n  descriptor: PropertyDescriptor\n) {\n  const original = descriptor.value;\n  descriptor.value = function (...args: any[]) {\n    console.log(`Calling ${propertyKey} with:`, args);\n    const result = original.apply(this, args);\n    console.log(`Result:`, result);\n    return result;\n  };\n}\n\nclass Calculator {\n  @Log\n  add(a: number, b: number): number {\n    return a + b;\n  }\n\n  @Log\n  multiply(a: number, b: number): number {\n    return a * b;\n  }\n}\n\nconst calc = new Calculator();\ncalc.add(2, 3);  // Logs: \"Calling add with: [2, 3]\" → \"Result: 5\"\n\n// Real-world: NestJS example\n// @Controller(\"users\")\n// class UsersController {\n//   @Get(\"/:id\")\n//   findOne(@Param(\"id\") id: string) { ... }\n// }", language: 'typescript' },
      },
      {
        heading: 'Stage 3 Decorators (Modern)',
        content: 'The TC39 Stage 3 decorators proposal is the modern standard. TypeScript 5.0+ supports them:',
        code: { code: "// Stage 3 decorators (no experimentalDecorators needed)\n// Enable: \"target\": \"ES2022\" or higher\n\n// Class decorator\nfunction logged<T extends new (...args: any[]) => any>(Original: T) {\n  return class extends Original {\n    constructor(...args: any[]) {\n      console.log(`Creating ${Original.name}`);\n      super(...args);\n    }\n  };\n}\n\n// Method decorator (Stage 3 style)\nfunction timing<This, Args extends any[], Return>(\n  target: (this: This, ...args: Args) => Return,\n  context: ClassMethodDecoratorContext\n) {\n  return function (this: This, ...args: Args): Return {\n    const start = performance.now();\n    const result = target.apply(this, args);\n    const end = performance.now();\n    console.log(`${String(context.name)} took ${end - start}ms`);\n    return result;\n  };\n}\n\n@logged\nclass UserService {\n  @timing\n  getUser(id: string) {\n    // ...\n    return { id, name: \"Alice\" };\n  }\n}\n\n// Note: Most codebases still use experimentalDecorators.\n// Stage 3 is the future but adoption is still growing.", language: 'typescript' },
      },
    ],
  },
  {
    id: 'type-challenges',
    title: 'Type Challenges',
    level: 3,
    order: 6,
    description: 'Practice with real-world complex type puzzles to sharpen your type-level programming skills.',
    sections: [
      {
        heading: 'Challenge 1: Implement Pick',
        content: 'Implement your own version of the built-in `Pick<T, K>` utility type:',
        code: { code: "// Implement this type:\ntype MyPick<T, K> = ???;\n\n// Should work like:\ninterface Todo {\n  title: string;\n  description: string;\n  completed: boolean;\n}\n\ntype TodoPreview = MyPick<Todo, \"title\" | \"completed\">;\n// Expected: { title: string; completed: boolean }\n\n// Solution:\ntype MyPick<T, K extends keyof T> = {\n  [P in K]: T[P];\n};\n\n// Challenge: Now implement Omit<T, K> without using the built-in Omit\ntype MyOmit<T, K extends keyof T> = {\n  [P in keyof T as P extends K ? never : P]: T[P];\n};", language: 'typescript' },
      },
      {
        heading: 'Challenge 2: DeepReadonly',
        content: 'Implement a `DeepReadonly<T>` that makes ALL nested properties readonly:',
        code: { code: "// Implement this:\ntype DeepReadonly<T> = ???;\n\n// Test:\ninterface Complex {\n  title: string;\n  nested: {\n    items: Array<{\n      id: number;\n      data: { value: string };\n    }>;\n    metadata: {\n      created: Date;\n      tags: string[];\n    };\n  };\n}\n\ntype ReadonlyComplex = DeepReadonly<Complex>;\n// Every property at every depth should be readonly\n\n// Solution:\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends Function\n    ? T[K]  // Don't recurse into functions\n    : T[K] extends object\n      ? DeepReadonly<T[K]>\n      : T[K];\n};\n\n// Bonus: Implement DeepMutable (reverse of DeepReadonly)\ntype DeepMutable<T> = {\n  -readonly [K in keyof T]: T[K] extends Function\n    ? T[K]\n    : T[K] extends object\n      ? DeepMutable<T[K]>\n      : T[K];\n};", language: 'typescript' },
      },
      {
        heading: 'Challenge 3: TupleToUnion & Chainable Options',
        content: 'Convert tuples to unions and build a chainable options pattern:',
        code: { code: "// Challenge: Convert tuple to union\ntype TupleToUnion<T extends any[]> = T[number];\n\ntype Result = TupleToUnion<[string, number, boolean]>;\n// = string | number | boolean\n\n// Challenge: Chainable options pattern\ntype Chainable<T = {}> = {\n  option<K extends string, V>(\n    key: K,\n    value: V\n  ): Chainable<T & { [P in K]: V }>;\n  get(): T;\n};\n\ndeclare const config: Chainable;\n\nconst result = config\n  .option(\"name\", \"Alice\")\n  .option(\"age\", 30)\n  .option(\"active\", true)\n  .get();\n\n// result type: { name: string; age: number; active: boolean }\n\n// Challenge: Implement Awaited (like Promise.unwrapping)\ntype MyAwaited<T> = T extends Promise<infer U>\n  ? MyAwaited<U>\n  : T;\n\ntype A = MyAwaited<Promise<string>>;           // string\ntype B = MyAwaited<Promise<Promise<number>>>;  // number", language: 'typescript' },
      },
    ],
  },
  {
    id: 'tsconfig-deep-dive',
    title: 'tsconfig Deep Dive',
    level: 3,
    order: 7,
    description: 'All strict flags, path aliases, project references, composite builds, and advanced compiler options.',
    sections: [
      {
        heading: 'All Strict Flags Explained',
        content: 'What each strict flag actually does:',
        code: { code: '{\n  "compilerOptions": {\n    // The "strict" umbrella — enables all of these:\n    "strict": true,\n    \n    // Individual flags (all enabled by "strict": true):\n    "noImplicitAny": true,\n    "strictNullChecks": true,\n    "strictFunctionTypes": true,\n    "strictBindCallApply": true,\n    "strictPropertyInitialization": true,\n    "noImplicitThis": true,\n    "alwaysStrict": true,\n    "useUnknownInCatchVariables": true,\n\n    // Additional useful strict-ish flags:\n    "noFallthroughCasesInSwitch": true,\n    "noImplicitOverride": true,\n    "noPropertyAccessFromIndexSignature": true,\n    "noUncheckedIndexedAccess": true,\n    "exactOptionalPropertyTypes": true\n  }\n}', language: 'json', title: 'tsconfig.json' },
      },
      {
        heading: 'Path Aliases',
        content: 'Configure import aliases to avoid deep relative paths:',
        code: { code: "// tsconfig.json\n{\n  \"compilerOptions\": {\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"@/*\": [\"src/*\"],\n      \"@components/*\": [\"src/components/*\"],\n      \"@utils/*\": [\"src/utils/*\"],\n      \"@types/*\": [\"src/types/*\"]\n    }\n  }\n}\n\n// Before:\nimport { Button } from \"../../../components/Button\";\nimport { formatDate } from \"../../../utils/date\";\n\n// After:\nimport { Button } from \"@/components/Button\";\nimport { formatDate } from \"@utils/date\";\n\n// Note: TypeScript only handles the TYPE resolution.\n// You also need to configure your bundler/runtime:\n// - Vite: resolve.alias in vite.config.ts\n// - Next.js: already configured\n// - Node.js: use tsconfig-paths or package.json imports", language: 'json' },
      },
      {
        heading: 'Project References & Composite Builds',
        content: 'Split large projects into smaller, independently compiled units:',
        code: { code: "// packages/shared/tsconfig.json\n{\n  \"compilerOptions\": {\n    \"composite\": true,\n    \"declaration\": true,\n    \"declarationMap\": true,\n    \"outDir\": \"./dist\"\n  },\n  \"include\": [\"src\"]\n}\n\n// packages/app/tsconfig.json\n{\n  \"compilerOptions\": {\n    \"outDir\": \"./dist\"\n  },\n  \"references\": [\n    { \"path\": \"../shared\" }\n  ],\n  \"include\": [\"src\"]\n}\n\n// Root tsconfig.json\n{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"./packages/shared\" },\n    { \"path\": \"./packages/app\" }\n  ]\n}\n\n// Build all projects:\n// tsc --build (or tsc -b)\n\n// Benefits:\n// - Faster incremental builds\n// - Enforce dependency boundaries\n// - Each package has its own tsconfig\n// - Only rebuild what changed", language: 'json' },
      },
    ],
  },
  {
    id: 'performance-best-practices',
    title: 'Performance & Best Practices',
    level: 3,
    order: 8,
    description: 'Avoid common pitfalls, optimize compilation speed, and follow TypeScript best practices.',
    sections: [
      {
        heading: 'Avoid `any` — Strategies',
        content: 'Practical alternatives to `any` in common situations:',
        code: { code: "// ❌ Instead of any for unknown data:\nfunction process(data: any) { ... }\n\n// ✅ Use unknown + type guards:\nfunction process(data: unknown) {\n  if (isUser(data)) {\n    // data is User here\n  }\n}\n\nfunction isUser(value: unknown): value is User {\n  return (\n    typeof value === \"object\" &&\n    value !== null &&\n    \"name\" in value &&\n    typeof (value as any).name === \"string\"\n  );\n}\n\n// ❌ Instead of any for third-party libs without types:\nimport lib from \"untyped-lib\";  // implicitly any\n\n// ✅ Create a declaration file:\n// types/untyped-lib.d.ts\ndeclare module \"untyped-lib\" {\n  export function init(config: { debug?: boolean }): void;\n  export function process(data: unknown): Promise<unknown>;\n}\n\n// ❌ Instead of any for complex generics:\nfunction merge(a: any, b: any): any { ... }\n\n// ✅ Use proper generics:\nfunction merge<T extends object, U extends object>(a: T, b: U): T & U {\n  return { ...a, ...b };\n}", language: 'typescript' },
      },
      {
        heading: 'Structural Typing Gotchas',
        content: 'TypeScript uses structural typing — shapes matter, not names:',
        code: { code: "// Structural typing: if it looks like a duck...\ninterface Point2D { x: number; y: number; }\ninterface Vector2D { x: number; y: number; }\n\nlet point: Point2D = { x: 1, y: 2 };\nlet vector: Vector2D = point;  // ✅ Works! Same shape.\n\n// Gotcha 1: Excess property checking (only on object literals)\ninterface Config { debug: boolean; }\nconst config: Config = { debug: true, verbose: false };\n// ❌ Error: 'verbose' doesn't exist in Config\n\n// But this works:\nconst raw = { debug: true, verbose: false };\nconst config: Config = raw;  // ✅ OK — no excess check\n\n// Gotcha 2: Empty interface matches everything\ninterface Empty {}\nconst anything: Empty = { foo: \"bar\" };  // ✅\nconst also: Empty = 42;  // ✅\n// Use 'unknown' instead of empty interfaces!\n\n// Gotcha 3: Function parameter bivariance\ntype Handler = (event: { type: string }) => void;\nconst handler: Handler = (e: { type: string; detail: any }) => {};\n// This works because function params are bivariant by default\n// Enable strictFunctionTypes to catch this", language: 'typescript' },
      },
      {
        heading: 'Performance Tips',
        content: 'Keep TypeScript compilation fast and efficient:',
        code: { code: "// 1. Use type-only imports (erased at compile time)\nimport type { User } from \"./types\";\nimport type express from \"express\";\n\n// 2. Enable isolatedModules for faster transpilation\n// Required by esbuild, SWC, Vite\n// \"isolatedModules\": true\n\n// 3. Use 'satisfies' instead of type annotations when possible\n// Keeps narrow types without extra compilation\n\n// 4. Avoid complex conditional types in hot paths\n// These slow down the type checker\n\n// 5. Use 'skipLibCheck: true' to skip checking .d.ts files\n// \"skipLibCheck\": true\n\n// 6. Use project references for large monorepos\n// Compile only what changed\n\n// 7. Prefer interfaces over type aliases for object shapes\n// Interfaces are cached; type aliases are re-evaluated\n\n// 8. Avoid deep recursive types\n// TypeScript has a recursion depth limit (~50)\n// Use iterative approaches when possible\n\n// 9. Use const assertions for literal types\nconst ROUTES = { home: \"/\", about: \"/about\" } as const;\n// Instead of enum or runtime objects\n\n// 10. Use 'noEmit' for type-checking only (CI)\n// tsc --noEmit  — checks types without generating JS", language: 'typescript' },
      },
    ],
  },
  {
    id: 'ecosystem-frameworks',
    title: 'Ecosystem: Framework Integration',
    level: 3,
    order: 9,
    description: 'TypeScript with React (typed props, hooks, events), Node.js, and Express.',
    sections: [
      {
        heading: 'TypeScript + React',
        content: 'Type component props, hooks, and events in React:',
        code: { code: "// Typed component props\ninterface ButtonProps {\n  variant: \"primary\" | \"secondary\" | \"danger\";\n  size?: \"sm\" | \"md\" | \"lg\";\n  disabled?: boolean;\n  onClick: () => void;\n  children: React.ReactNode;\n}\n\nfunction Button({ variant, size = \"md\", disabled, onClick, children }: ButtonProps) {\n  const className = \"btn btn-\" + variant + \" btn-\" + size;\n  return (\n    <button\n      className={className}\n      disabled={disabled}\n      onClick={onClick}\n    >\n      {children}\n    </button>\n  );\n}\n\n// Typed hooks\nfunction useLocalStorage<T>(key: string, initialValue: T) {\n  const [value, setValue] = useState<T>(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initialValue;\n  });\n\n  const setStoredValue = (newValue: T) => {\n    setValue(newValue);\n    localStorage.setItem(key, JSON.stringify(newValue));\n  };\n\n  return [value, setStoredValue] as const;\n}\n\n// Usage\nconst [theme, setTheme] = useLocalStorage<\"light\" | \"dark\">(\"theme\", \"light\");\n\n// Typed events\nfunction handleChange(e: React.ChangeEvent<HTMLInputElement>) {\n  const value: string = e.target.value;\n}\n\nfunction handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n  e.preventDefault();\n}", language: 'typescript' },
      },
      {
        heading: 'TypeScript + Node.js & Express',
        content: 'Type server-side code with Node.js and Express:',
        code: { code: "// Express with TypeScript\nimport express, { Request, Response, NextFunction } from \"express\";\n\nconst app = express();\napp.use(express.json());\n\n// Typed route handlers\ninterface CreateUserBody {\n  name: string;\n  email: string;\n  role?: \"admin\" | \"user\";\n}\n\ninterface UserParams {\n  id: string;\n}\n\n// Generic typed handler\ntype TypedRequest<B = {}, P = {}, Q = {}> = Request<P, any, B, Q>;\n\napp.post(\"/users\", (\n  req: TypedRequest<CreateUserBody>,\n  res: Response<{ user: User; message: string }>\n) => {\n  const { name, email, role = \"user\" } = req.body;\n  // req.body is typed as CreateUserBody!\n  \n  const user = createUser({ name, email, role });\n  res.status(201).json({ user, message: \"Created\" });\n});\n\napp.get(\"/users/:id\", (\n  req: TypedRequest<{}, UserParams>,\n  res: Response<User | { error: string }>\n) => {\n  const user = findUser(req.params.id);\n  if (!user) {\n    res.status(404).json({ error: \"Not found\" });\n    return;\n  }\n  res.json(user);\n});\n\n// Typed error handler\napp.use((err: Error, req: Request, res: Response, next: NextFunction) => {\n  console.error(err.stack);\n  res.status(500).json({ error: \"Internal server error\" });\n});", language: 'typescript' },
      },
      {
        heading: 'Environment Types',
        content: 'Type environment variables and global configuration:',
        code: { code: "// env.d.ts — type environment variables\ndeclare namespace NodeJS {\n  interface ProcessEnv {\n    NODE_ENV: \"development\" | \"production\" | \"test\";\n    PORT: string;\n    DATABASE_URL: string;\n    JWT_SECRET: string;\n    API_KEY: string;\n  }\n}\n\n// Now process.env is fully typed:\nconst port = parseInt(process.env.PORT);  // string\nconst dbUrl = process.env.DATABASE_URL;   // string\n// process.env.UNKNOWN;  // ❌ Error!\n\n// Vite environment variables\n// vite-env.d.ts\n/// <reference types=\"vite/client\" />\n\ninterface ImportMetaEnv {\n  readonly VITE_API_URL: string;\n  readonly VITE_APP_TITLE: string;\n}\n\ninterface ImportMeta {\n  readonly env: ImportMetaEnv;\n}\n\n// Usage in Vite:\n// const apiUrl = import.meta.env.VITE_API_URL;", language: 'typescript' },
      },
    ],
  },
  {
    id: 'ecosystem-tooling',
    title: 'Ecosystem: Tooling',
    level: 3,
    order: 10,
    description: 'ESLint with typescript-eslint, Prettier, Vitest/Jest with typed tests, and CI setup.',
    sections: [
      {
        heading: 'ESLint + typescript-eslint',
        content: 'Configure ESLint for TypeScript projects:',
        code: { code: "// eslint.config.js (flat config — ESLint 9+)\nimport tseslint from \"typescript-eslint\";\n\nexport default tseslint.config(\n  ...tseslint.configs.recommended,\n  {\n    rules: {\n      // TypeScript-specific rules\n      \"@typescript-eslint/no-unused-vars\": [\"error\", {\n        argsIgnorePattern: \"^_\"\n      }],\n      \"@typescript-eslint/no-explicit-any\": \"warn\",\n      \"@typescript-eslint/consistent-type-imports\": \"error\",\n      \"@typescript-eslint/no-non-null-assertion\": \"warn\",\n      \n      // Disable base rules that conflict\n      \"no-unused-vars\": \"off\",\n    }\n  }\n);\n\n// Key rules to enable:\n// @typescript-eslint/no-floating-promises    — Catch unhandled promises\n// @typescript-eslint/no-misused-promises     — Avoid void-returning funcs as async\n// @typescript-eslint/await-thenable          — Only await promises\n// @typescript-eslint/consistent-type-imports — Use 'import type'\n// @typescript-eslint/no-unnecessary-condition — Remove always-true checks", language: 'typescript', title: 'eslint.config.js' },
      },
      {
        heading: 'Testing with TypeScript',
        content: 'Write typed tests with Vitest or Jest:',
        code: { code: "// Vitest example\nimport { describe, it, expect, vi } from \"vitest\";\nimport { UserService } from \"./UserService\";\n\ndescribe(\"UserService\", () => {\n  it(\"should create a user with correct type\", () => {\n    const service = new UserService();\n    \n    const user = service.create({\n      name: \"Alice\",\n      email: \"alice@example.com\",\n    });\n\n    // TypeScript checks these assertions at compile time!\n    expect(user).toHaveProperty(\"id\");\n    expect(user.name).toBe(\"Alice\");\n    expect(user.email).toBe(\"alice@example.com\");\n  });\n\n  it(\"should type mock functions correctly\", () => {\n    const mockFn = vi.fn<(name: string) => string>();\n    mockFn.mockReturnValue(\"hello\");\n    \n    // mockFn(\"hello\");  // ✅ OK\n    // mockFn(42);       // ❌ Type error!\n    \n    expect(mockFn(\"test\")).toBe(\"hello\");\n  });\n\n  it(\"should test API responses with discriminated unions\", async () => {\n    const result = await api.get<User>(\"/users/1\");\n    \n    if (result.status === \"success\") {\n      // result.data is User — fully typed!\n      expect(result.data.name).toBeDefined();\n    } else {\n      // result.error is string\n      expect(result.error).toBeDefined();\n    }\n  });\n});", language: 'typescript', title: 'UserService.test.ts' },
      },
      {
        heading: 'CI Setup & Prettier',
        content: 'TypeScript in CI pipelines and Prettier configuration:',
        code: { code: "# .github/workflows/typecheck.yml\nname: Type Check\non: [push, pull_request]\njobs:\n  typecheck:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npx tsc --noEmit  # Type check only\n      - run: npm run lint       # ESLint\n      - run: npm run test       # Tests\n\n// .prettierrc\n{\n  \"semi\": true,\n  \"singleQuote\": true,\n  \"trailingComma\": \"es5\",\n  \"printWidth\": 100,\n  \"tabWidth\": 2\n}\n\n// package.json scripts\n{\n  \"scripts\": {\n    \"typecheck\": \"tsc --noEmit\",\n    \"lint\": \"eslint src --ext .ts,.tsx\",\n    \"lint:fix\": \"eslint src --ext .ts,.tsx --fix\",\n    \"format\": \"prettier --write \\\"src/**/*.{ts,tsx}\\\"\",\n    \"test\": \"vitest\",\n    \"test:ci\": \"vitest run --coverage\",\n    \"build\": \"tsc && vite build\"\n  }\n}", language: 'bash', title: 'CI Configuration' },
      },
    ],
  },
  {
    id: 'migration-guide',
    title: 'Migration Guide',
    level: 3,
    order: 11,
    description: 'Move a JavaScript project to TypeScript incrementally — allowJs, checkJs, and gradual adoption strategies.',
    sections: [
      {
        heading: 'Incremental Migration Strategy',
        content: "Don't convert everything at once. Use a gradual approach:",
        code: { code: "// Step 1: Add TypeScript to your project\nnpm install --save-dev typescript @types/node\nnpx tsc --init\n\n// Step 2: Configure for gradual migration\n// tsconfig.json\n{\n  \"compilerOptions\": {\n    \"allowJs\": true,          // Allow .js files\n    \"checkJs\": false,         // Don't check .js files yet\n    \"noEmit\": true,           // Don't output JS (use bundler)\n    \"strict\": false,          // Start non-strict\n    \"target\": \"ES2020\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"bundler\",\n    \"esModuleInterop\": true,\n    \"skipLibCheck\": true\n  },\n  \"include\": [\"src/**/*\"]\n}\n\n// Step 3: Convert files one at a time\n// - Rename .js → .ts (or .tsx for React)\n// - Fix type errors\n// - Commit\n// - Repeat\n\n// Step 4: Enable checkJs to type-check remaining .js files\n// \"checkJs\": true\n\n// Step 5: Gradually enable strict flags\n// \"strict\": true", language: 'json' },
      },
      {
        heading: 'Typing Untyped JavaScript',
        content: 'Add types to JS files without converting them:',
        code: { code: "// Option 1: JSDoc type annotations in .js files\n/**\n * @typedef {Object} User\n * @property {number} id\n * @property {string} name\n * @property {string} email\n */\n\n/**\n * @param {string} name\n * @param {string} email\n * @returns {User}\n */\nfunction createUser(name, email) {\n  return { id: Date.now(), name, email };\n}\n\n// Option 2: .d.ts companion files\n// user.d.ts (next to user.js)\nexport interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nexport function createUser(name: string, email: string): User;\n\n// Option 3: @ts-check in individual files\n// @ts-check\n// Now this .js file is type-checked using JSDoc\n\n/** @type {string} */\nlet name;\nname = 42;  // ❌ Error caught by TypeScript!", language: 'javascript' },
      },
      {
        heading: 'Common Migration Challenges',
        content: 'Solutions for typical issues when migrating:',
        code: { code: "// Challenge 1: Untyped third-party libraries\n// Solution: Install @types or create declarations\nnpm install --save-dev @types/lodash\n\n// Or create a shim:\n// types/shims.d.ts\ndeclare module \"untyped-library\" {\n  const value: any;\n  export default value;\n}\n\n// Challenge 2: Dynamic requires\n// Before:\nconst config = require(\"./config.\" + env);\n// After:\nconst configs = {\n  development: require(\"./config.dev\"),\n  production: require(\"./config.prod\"),\n};\nconst config = configs[env as keyof typeof configs];\n\n// Challenge 3: Prototype modifications\n// Before:\nString.prototype.capitalize = function() { ... };\n// After: Use utility functions instead\nfunction capitalize(str: string): string {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\n// Challenge 4: Implicit any in callbacks\n// Before:\nitems.map(function(item) { return item.name; });\n// After:\nitems.map((item: Item) => item.name);\n// Or better: type the array\nconst items: Item[] = [...];\nitems.map(item => item.name);  // item is inferred as Item\n\n// Challenge 5: this context\n// Before: function() { this.value }\n// After: arrow functions or explicit typing\nitems.forEach((item) => {\n  this.process(item);  // 'this' is preserved from outer scope\n});", language: 'typescript' },
      },
    ],
  },
  {
    id: 'project-event-emitter',
    title: '🛠️ Project: Type-Safe Event Emitter',
    level: 3,
    order: 12,
    isProject: true,
    description: 'Build a fully typed event emitter using generics, conditional types, template literals, and mapped types.',
    sections: [
      {
        heading: 'Project Overview',
        content: 'Build an event emitter where event names and their payload types are fully type-checked at compile time. This combines generics, mapped types, template literals, and conditional types.',
      },
      {
        heading: 'Step 1: Define the Event Map',
        content: 'Use an interface to define events and their payloads:',
        code: { code: "// Event map — defines all events and their data types\ninterface AppEvents {\n  \"user:login\": { userId: string; timestamp: Date };\n  \"user:logout\": { userId: string };\n  \"order:created\": { orderId: string; total: number; items: string[] };\n  \"order:shipped\": { orderId: string; trackingNumber: string };\n  \"error\": { message: string; code: number; context?: Record<string, unknown> };\n  \"notification\": { type: \"info\" | \"warning\" | \"error\"; message: string };\n}\n\n// Extract event names\ntype EventNames = keyof AppEvents;\n// = \"user:login\" | \"user:logout\" | \"order:created\" | ...\n\n// Extract payload for a specific event\ntype LoginPayload = AppEvents[\"user:login\"];\n// = { userId: string; timestamp: Date }", language: 'typescript', title: 'events.ts' },
      },
      {
        heading: 'Step 2: Build the Typed Emitter',
        content: 'Use generics to make on/emit/off fully type-safe:',
        code: { code: "type EventHandler<T> = (payload: T) => void;\n\nclass TypedEventEmitter<Events extends Record<string, unknown>> {\n  private handlers = new Map<keyof Events, Set<EventHandler<any>>>();\n\n  on<K extends keyof Events>(\n    event: K,\n    handler: EventHandler<Events[K]>\n  ): () => void {\n    if (!this.handlers.has(event)) {\n      this.handlers.set(event, new Set());\n    }\n    this.handlers.get(event)!.add(handler);\n\n    // Return unsubscribe function\n    return () => this.off(event, handler);\n  }\n\n  off<K extends keyof Events>(\n    event: K,\n    handler: EventHandler<Events[K]>\n  ): void {\n    this.handlers.get(event)?.delete(handler);\n  }\n\n  emit<K extends keyof Events>(event: K, payload: Events[K]): void {\n    this.handlers.get(event)?.forEach(handler => handler(payload));\n  }\n\n  once<K extends keyof Events>(\n    event: K,\n    handler: EventHandler<Events[K]>\n  ): void {\n    const wrapped: EventHandler<Events[K]> = (payload) => {\n      handler(payload);\n      this.off(event, wrapped);\n    };\n    this.on(event, wrapped);\n  }\n\n  listenerCount<K extends keyof Events>(event: K): number {\n    return this.handlers.get(event)?.size ?? 0;\n  }\n}", language: 'typescript', title: 'emitter.ts' },
      },
      {
        heading: 'Step 3: Use It with Full Type Safety',
        content: 'The emitter catches all type errors at compile time:',
        code: { code: "const emitter = new TypedEventEmitter<AppEvents>();\n\n// ✅ Correct usage\nemitter.on(\"user:login\", (payload) => {\n  // payload is { userId: string; timestamp: Date }\n  console.log(`User ${payload.userId} logged in at ${payload.timestamp}`);\n});\n\nemitter.emit(\"user:login\", {\n  userId: \"u123\",\n  timestamp: new Date(),\n});\n\n// ❌ Type errors caught:\n\n// Wrong event name:\n// emitter.emit(\"user:signin\", { userId: \"u123\" });\n// Error: '\"user:signin\"' is not assignable to event names\n\n// Wrong payload:\n// emitter.emit(\"user:login\", { userId: 123 });\n// Error: userId should be string, not number\n\n// Missing payload property:\n// emitter.emit(\"order:created\", { orderId: \"o1\" });\n// Error: missing 'total' and 'items'\n\n// Once listener\nemitter.once(\"notification\", (payload) => {\n  // payload is { type: \"info\" | \"warning\" | \"error\"; message: string }\n  if (payload.type === \"error\") {\n    console.error(payload.message);\n  }\n});\n\nemitter.emit(\"notification\", { type: \"error\", message: \"Something failed\" });", language: 'typescript', title: 'usage.ts' },
      },
      {
        heading: 'Key Takeaways',
        content: '✅ **Generics** — Emitter works with any event map\n✅ **Mapped types** — `Record<string, unknown>` constraint\n✅ **keyof + indexed access** — Type-safe event names and payloads\n✅ **Template literals** — Pattern matching on event names\n✅ **Conditional types** — Middleware logic\n✅ **Function overloads** — on/off/emit with correct types\n\n**Challenge:** Add a `typedOn` method that uses template literal types to match wildcard patterns like `"user:*"` or `"order:created|shipped"`.',
      },
    ],
  },
];
