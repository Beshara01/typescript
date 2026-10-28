import { Lesson } from './types';

export const level1Lessons: Lesson[] = [
  {
    id: 'what-is-typescript',
    title: 'What is TypeScript?',
    level: 1,
    order: 1,
    description: 'Understand why TypeScript exists, how it differs from JavaScript, and how to set up your first TypeScript project.',
    sections: [
      {
        heading: 'TypeScript = JavaScript + Types',
        content: 'TypeScript is a **superset** of JavaScript. Every valid JS file is a valid TS file. TypeScript adds static type checking that runs at compile time — it doesn\'t change how your code runs in the browser or Node.js.\n\nThink of it as a safety net that catches bugs *before* you run your code.',
      },
      {
        heading: 'Why TypeScript?',
        content: '• **Catches bugs early** — typos, wrong argument types, null errors caught at build time\n• **Better IDE support** — autocomplete, refactoring, go-to-definition\n• **Self-documenting code** — types serve as living documentation\n• **Scales better** — large codebases are easier to maintain\n• **Industry standard** — used by Angular, NestJS, Deno, and most modern frameworks',
      },
      {
        heading: 'Setting Up',
        content: 'Install TypeScript globally or in your project:',
        code: { code: `# Install TypeScript\nnpm install -g typescript\n\n# Or per-project\nnpm install --save-dev typescript\n\n# Check version\ntsc --version\n\n# Create a tsconfig.json\ntsc --init`, language: 'bash', title: 'Terminal' },
      },
      {
        heading: 'Your First TypeScript File',
        content: 'Create a file called `hello.ts`:',
        code: { code: `// hello.ts\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\n// ✅ Works fine\nconsole.log(greet("TypeScript"));\n\n// ❌ Error: Argument of type 'number' is not assignable to parameter of type 'string'\nconsole.log(greet(42));`, language: 'typescript', title: 'hello.ts' },
      },
      {
        heading: 'Compiling TypeScript',
        content: 'The TypeScript compiler (`tsc`) converts `.ts` files to `.js` files:',
        code: { code: `# Compile a single file\ntsc hello.ts\n\n# Compile all files in project (uses tsconfig.json)\ntsc\n\n# Watch mode — recompile on changes\ntsc --watch`, language: 'bash', title: 'Terminal' },
      },
    ],
    comparisons: [
      {
        js: `function greet(name) {\n  return "Hello, " + name;\n}\n\n// No error at write time\n// Bug discovered at runtime!\ngreet(42); // "Hello, 42"`,
        ts: `function greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\n// ❌ Caught immediately!\n// Error: Argument of type 'number'\n// is not assignable to type 'string'\ngreet(42);`,
        explanation: 'TypeScript catches the type mismatch at compile time, not at runtime.',
      },
    ],
  },
  {
    id: 'tsconfig-strict-mode',
    title: 'tsconfig & Strict Mode Basics',
    level: 1,
    order: 2,
    description: 'Understand the TypeScript compiler configuration and why strict mode matters from day one.',
    sections: [
      {
        heading: 'What is tsconfig.json?',
        content: 'The `tsconfig.json` file tells the TypeScript compiler how to behave. It controls which files to compile, what JavaScript version to target, and how strict the type checking should be.\n\nWhen you run `tsc --init`, you get a comprehensive config file. Here are the most important settings:',
        code: { code: `{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "ESNext",\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true,\n    "outDir": "./dist",\n    "rootDir": "./src"\n  },\n  "include": ["src/**/*"],\n  "exclude": ["node_modules", "dist"]\n}`, language: 'json', title: 'tsconfig.json' },
      },
      {
        heading: 'The `strict` Flag',
        content: 'Setting `"strict": true` enables ALL strict type-checking options at once. This is the recommended setting for any new project. It includes:\n\n• `noImplicitAny` — Error on variables with implied `any` type\n• `strictNullChecks` — `null` and `undefined` are not assignable to other types\n• `strictFunctionTypes` — Stricter checking of function parameter types\n• `strictBindCallApply` — Stricter checking for `bind`, `call`, `apply`\n• `noImplicitThis` — Error on `this` with implied `any`\n• `alwaysStrict` — Parse in strict mode and emit `"use strict"`',
      },
      {
        heading: 'noImplicitAny',
        content: 'Without this flag, TypeScript silently allows `any` when it can\'t figure out a type. With it enabled, you MUST explicitly type things:',
        code: { code: `// With "noImplicitAny": true\n\nfunction logValue(value) {  // ❌ Error!\n  // Parameter 'value' implicitly has an 'any' type\n  console.log(value);\n}\n\n// ✅ Fix: Add a type annotation\nfunction logValue(value: unknown) {\n  console.log(value);\n}\n\n// Also affects arrays\nconst items = [];      // ❌ Error: implicitly any[]\nconst items: string[] = [];  // ✅ Explicit type`, language: 'typescript' },
      },
      {
        heading: 'strictNullChecks',
        content: 'This is arguably the most important strict flag. Without it, `null` and `undefined` can be assigned to ANY type — which is the source of countless bugs.',
        code: { code: `// With "strictNullChecks": true\n\nlet name: string = "Alice";\nname = null;       // ❌ Error!\nname = undefined;  // ❌ Error!\n\n// ✅ Use union types for nullable values\nlet nameOrNull: string | null = "Alice";\nnameOrNull = null;  // ✅ OK\n\n// ✅ Optional properties\ninterface User {\n  name: string;\n  email?: string;  // string | undefined\n}\n\n// ✅ Non-null assertion (use sparingly)\nconst el = document.getElementById("app")!;`, language: 'typescript' },
      },
      {
        heading: 'target vs module',
        content: '• **`target`** — What JavaScript version to output. `"ES2020"` means TS will compile down to ES2020-compatible JS.\n• **`module`** — What module system to use. `"ESNext"` uses ES imports/exports, `"CommonJS"` uses `require()`.\n\nFor modern projects, use `"target": "ES2020"` or higher and `"module": "ESNext"` or `"NodeNext"`.',
      },
    ],
  },
  {
    id: 'basic-types',
    title: 'Basic Types',
    level: 1,
    order: 3,
    description: 'Learn the fundamental types: string, number, boolean, null, undefined, void, any, unknown, and never.',
    sections: [
      {
        heading: 'Primitive Types',
        content: 'TypeScript has the same primitive types as JavaScript, plus a few extras:',
        code: { code: `// String\nlet name: string = "Alice";\nlet greeting: string = \`Hello, \${name}\`;\n\n// Number (integers and floats are both 'number')\nlet age: number = 30;\nlet price: number = 9.99;\nlet hex: number = 0xff00;\n\n// Boolean\nlet isActive: boolean = true;\n\n// BigInt\nlet bigNumber: bigint = 9007199254740991n;\n\n// Symbol\nlet id: symbol = Symbol("id");`, language: 'typescript' },
      },
      {
        heading: 'null and undefined',
        content: 'With `strictNullChecks` enabled, these are their own types and can\'t be assigned to other types:',
        code: { code: `let u: undefined = undefined;\nlet n: null = null;\n\n// With strictNullChecks:\nlet value: string = null;       // ❌ Error\nlet value: string = undefined;  // ❌ Error\n\n// You need union types:\nlet value: string | null = null;       // ✅\nlet value: string | undefined = undefined; // ✅`, language: 'typescript' },
      },
      {
        heading: 'void',
        content: '`void` means "no value" — used for functions that don\'t return anything:',
        code: { code: `function logMessage(msg: string): void {\n  console.log(msg);\n  // No return statement — returns void\n}\n\n// Arrow function version\nconst notify = (msg: string): void => {\n  alert(msg);\n};\n\n// void is NOT the same as undefined!\n// void = "function doesn't return"\n// undefined = "actual value is undefined"`, language: 'typescript' },
      },
      {
        heading: 'any — The Escape Hatch (Avoid It!)',
        content: '`any` disables type checking entirely. It\'s like telling TypeScript "trust me." **Avoid it** — it defeats the purpose of TypeScript:',
        code: { code: `let data: any = "hello";\ndata = 42;        // ✅ No error (bad!)\ndata.foo();       // ✅ No error (will crash at runtime!)\ndata.bar.baz;     // ✅ No error (will crash!)\n\n// ❌ Why this is bad:\n// - No autocomplete\n// - No type safety\n// - Bugs found at runtime, not compile time\n// - Defeats the purpose of TypeScript\n\n// ✅ Better alternatives:\n// - Use 'unknown' for truly unknown types\n// - Use specific types when possible\n// - Use 'any' only as a LAST resort during migration`, language: 'typescript' },
      },
      {
        heading: 'unknown — The Safe Alternative to any',
        content: '`unknown` is like `any` but SAFE. You can assign anything to it, but you can\'t USE it until you narrow the type:',
        code: { code: `let data: unknown = "hello";\ndata = 42;        // ✅ Can assign anything\n\n// ❌ Can't use it directly:\n// data.toUpperCase();  // Error: Object is of type 'unknown'\n// data.toFixed();      // Error!\n\n// ✅ Narrow the type first:\nif (typeof data === "string") {\n  data.toUpperCase();  // ✅ TS knows it's a string now\n}\n\nif (typeof data === "number") {\n  data.toFixed(2);     // ✅ TS knows it's a number now\n}\n\n// ✅ Type assertion (when you're sure):\nconst str = data as string;\nstr.toUpperCase();`, language: 'typescript' },
      },
      {
        heading: 'never — The Impossible Type',
        content: '`never` represents values that should never occur. Useful for exhaustive checks and unreachable code:',
        code: { code: `// Function that never returns (throws or infinite loop)\nfunction throwError(msg: string): never {\n  throw new Error(msg);\n}\n\nfunction infiniteLoop(): never {\n  while (true) {\n    // ...\n  }\n}\n\n// ✅ Exhaustive checking with never\nfunction assertNever(x: never): never {\n  throw new Error("Unexpected value: " + x);\n}\n\ntype Shape = "circle" | "square" | "triangle";\n\nfunction getArea(shape: Shape): number {\n  switch (shape) {\n    case "circle": return Math.PI * 1;\n    case "square": return 1 * 1;\n    case "triangle": return 0.5 * 1 * 1;\n    default: return assertNever(shape);\n    // If you add "hexagon" to Shape but forget\n    // to handle it, TS will ERROR here!\n  }\n}`, language: 'typescript' },
      },
    ],
    comparisons: [
      {
        js: `// No type safety at all\nlet data = fetchSomething();\ndata.process();  // Might crash!\ndata.foo.bar;    // Might crash!`,
        ts: `let data: unknown = fetchSomething();\n\n// Must check type before using\nif (data instanceof Response) {\n  data.json();  // ✅ Safe!\n}\n\n// Or use specific types:\nlet data: Response = await fetch(url);\ndata.json();  // ✅ Always safe`,
        explanation: 'unknown forces you to verify the type before using it, preventing runtime errors.',
      },
    ],
  },
  {
    id: 'type-annotations',
    title: 'Type Annotations',
    level: 1,
    order: 4,
    description: 'Learn how to explicitly annotate variables, function parameters, and return types.',
    sections: [
      {
        heading: 'Variable Annotations',
        content: 'You can explicitly declare the type of a variable using `: Type` syntax:',
        code: { code: `// Explicit type annotations\nlet username: string = "alice";\nlet score: number = 100;\nlet isOnline: boolean = true;\n\n// TypeScript can usually INFER the type:\nlet username = "alice";     // inferred as string\nlet score = 100;            // inferred as number\nlet isOnline = true;        // inferred as boolean\n\n// When to use explicit annotations:\n// 1. When the type can't be inferred\nlet userId: string | number;\nuserId = "abc123";\nuserId = 42;\n\n// 2. When declaring without initialization\nlet items: string[];\nitems = ["a", "b", "c"];`, language: 'typescript' },
      },
      {
        heading: 'Function Parameter Annotations',
        content: 'Always annotate function parameters — TypeScript can\'t infer them from the call site:',
        code: { code: `// ✅ Annotate parameters\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// Return type is inferred, but you can be explicit:\nfunction multiply(a: number, b: number): number {\n  return a * b;\n}\n\n// Arrow functions\nconst divide = (a: number, b: number): number => {\n  return a / b;\n};\n\n// Callback types\nfunction fetchData(\n  url: string,\n  callback: (data: string) => void\n): void {\n  const data = "response";\n  callback(data);\n}`, language: 'typescript' },
      },
      {
        heading: 'Object Type Annotations',
        content: 'You can describe the shape of objects inline:',
        code: { code: `// Inline object type\nlet user: { name: string; age: number; email?: string } = {\n  name: "Alice",\n  age: 30,\n};\n\n// This gets verbose quickly — use interfaces or type aliases!\ninterface User {\n  name: string;\n  age: number;\n  email?: string;\n}\n\nlet user: User = {\n  name: "Alice",\n  age: 30,\n};`, language: 'typescript' },
      },
    ],
    comparisons: [
      {
        js: `// No way to know what this expects\nfunction process(data, options) {\n  return data.map(item => {\n    return options.transform(item);\n  });\n}\n\n// What is data? What is options?\n// You have to read the implementation to know!`,
        ts: `function process(\n  data: number[],\n  options: { transform: (item: number) => string }\n): string[] {\n  return data.map(item => {\n    return options.transform(item);\n  });\n}\n\n// Instantly clear what this function needs!`,
        explanation: 'Type annotations make function signatures self-documenting.',
      },
    ],
  },
  {
    id: 'arrays-tuples',
    title: 'Arrays & Tuples',
    level: 1,
    order: 5,
    description: 'Work with typed arrays, fixed-length tuples, and readonly collections.',
    sections: [
      {
        heading: 'Typed Arrays',
        content: 'Arrays in TypeScript are typed — every element must match the declared type:',
        code: { code: `// Two ways to declare array types:\nlet numbers: number[] = [1, 2, 3];\nlet names: Array<string> = ["Alice", "Bob"];\n\n// Both are equivalent — use [] syntax (more common)\n\n// Type inference works for arrays:\nlet fruits = ["apple", "banana"];  // string[]\nlet mixed = [1, "two"];           // (string | number)[]\n\n// ✅ All operations are type-checked\nnumbers.push(4);       // ✅ OK\nnumbers.push("five");  // ❌ Error!\n\n// Array methods are fully typed:\nconst doubled = numbers.map(n => n * 2);  // number[]\nconst first = numbers.find(n => n > 1);   // number | undefined`, language: 'typescript' },
      },
      {
        heading: 'Tuples',
        content: 'Tuples are fixed-length arrays where each position has a specific type:',
        code: { code: `// Tuple: [string, number]\nlet pair: [string, number] = ["age", 30];\n\n// Access by index — types are known!\nlet label = pair[0];  // string\nlet value = pair[1];  // number\n\n// ❌ Wrong types\nlet bad: [string, number] = [30, "age"];  // Error!\n\n// ❌ Wrong length\nlet bad2: [string, number] = ["a", 1, true];  // Error!\n\n// Named tuples (TS 4.0+)\nlet coordinate: [x: number, y: number] = [10, 20];\n\n// Tuples with rest elements\nlet team: [lead: string, ...members: string[]] = [\n  "Alice", "Bob", "Charlie"\n];`, language: 'typescript' },
      },
      {
        heading: 'Readonly Arrays',
        content: 'Use `readonly` to prevent mutations:',
        code: { code: `// Readonly array — can't be modified\nconst colors: readonly string[] = ["red", "green", "blue"];\n\ncolors.push("yellow");  // ❌ Error!\ncolors[0] = "pink";     // ❌ Error!\n\n// ✅ Can still read\ncolors.length;       // 3\ncolors[0];           // "red"\ncolors.includes("red"); // true\n\n// Readonly tuple\nconst point: readonly [number, number] = [10, 20];\npoint[0] = 30;  // ❌ Error!\n\n// When to use readonly:\n// - Return values that shouldn't be mutated\n// - Configuration objects\n// - Function parameters that shouldn't change`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'union-literal-types',
    title: 'Union & Literal Types',
    level: 1,
    order: 6,
    description: 'Combine types with unions and restrict values with literal types.',
    sections: [
      {
        heading: 'Union Types',
        content: 'A union type means a value can be one of several types, using the `|` operator:',
        code: { code: `// Value can be string OR number\nlet id: string | number = "abc123";\nid = 42;  // ✅ OK\n\n// Function accepting multiple types\nfunction formatId(id: string | number): string {\n  return \`ID: \${id}\`;\n}\n\nformatId("abc");  // ✅\nformatId(42);     // ✅\nformatId(true);   // ❌ Error!\n\n// Union of object types\ntype StringOrNumber = string | number;\ntype Result = Success | Error;\n\ninterface Success {\n  ok: true;\n  data: string;\n}\ninterface Error {\n  ok: false;\n  message: string;\n}`, language: 'typescript' },
      },
      {
        heading: 'Literal Types',
        content: 'Literal types restrict a value to exact specific values:',
        code: { code: `// String literal types\nlet direction: "up" | "down" | "left" | "right";\ndirection = "up";    // ✅\ndirection = "diagonal"; // ❌ Error!\n\n// Number literal types\nlet statusCode: 200 | 404 | 500;\nstatusCode = 200;  // ✅\nstatusCode = 201;  // ❌ Error!\n\n// Boolean literal types (less common)\nlet isReady: true | false;  // Same as boolean\n\n// Practical use: event types\nfunction handleEvent(\n  event: "click" | "focus" | "blur",\n  handler: () => void\n) {\n  // ...\n}\n\nhandleEvent("click", () => {});    // ✅\nhandleEvent("scroll", () => {});   // ❌ Error!`, language: 'typescript' },
      },
      {
        heading: 'Narrowing Unions',
        content: 'TypeScript narrows union types based on control flow:',
        code: { code: `function formatValue(value: string | number): string {\n  // TypeScript knows value is string | number here\n  \n  if (typeof value === "string") {\n    // Here, value is narrowed to 'string'\n    return value.toUpperCase();\n  }\n  \n  // Here, value is narrowed to 'number'\n  return value.toFixed(2);\n}\n\n// With objects:\ntype Fish = { swim: () => void };\ntype Bird = { fly: () => void };\n\nfunction move(animal: Fish | Bird) {\n  if ("swim" in animal) {\n    animal.swim();  // ✅ TS knows it's Fish\n  } else {\n    animal.fly();   // ✅ TS knows it's Bird\n  }\n}`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'type-aliases',
    title: 'Type Aliases',
    level: 1,
    order: 7,
    description: 'Create custom type names to make your code more readable and maintainable.',
    sections: [
      {
        heading: 'Creating Type Aliases',
        content: 'A type alias gives a name to any type — primitives, unions, objects, functions:',
        code: { code: `// Name a union type\ntype ID = string | number;\n\nlet userId: ID = "abc123";\nlet postId: ID = 42;\n\n// Name an object shape\ntype User = {\n  name: string;\n  age: number;\n  email?: string;\n};\n\nlet user: User = {\n  name: "Alice",\n  age: 30,\n};\n\n// Name a function type\ntype Formatter = (value: string) => string;\n\nconst toUpper: Formatter = (value) => value.toUpperCase();\nconst toLower: Formatter = (value) => value.toLowerCase();`, language: 'typescript' },
      },
      {
        heading: 'Composing Types',
        content: 'Type aliases can be combined and composed:',
        code: { code: `// Union of object types\ntype Circle = { kind: "circle"; radius: number };\ntype Square = { kind: "square"; side: number };\ntype Shape = Circle | Square;\n\n// Intersection types (combine multiple types)\ntype HasName = { name: string };\ntype HasAge = { age: number };\ntype Person = HasName & HasAge;\n\nlet person: Person = {\n  name: "Alice",\n  age: 30,\n};\n\n// Type aliases with generics\ntype Result<T> = { ok: true; data: T } | { ok: false; error: string };\n\ntype UserResult = Result<User>;\n// = { ok: true; data: User } | { ok: false; error: string }`, language: 'typescript' },
      },
      {
        heading: 'Type Aliases vs Interfaces',
        content: 'Both can describe object shapes. When to use which?\n\n• **Use `interface`** for object shapes that might be extended or implemented\n• **Use `type`** for unions, intersections, primitives, tuples, and complex types\n\nIn practice, many teams use `interface` for public API shapes and `type` for everything else.',
      },
    ],
  },
  {
    id: 'interfaces',
    title: 'Interfaces',
    level: 1,
    order: 8,
    description: 'Define object shapes with interfaces, including optional properties, readonly, and extending.',
    sections: [
      {
        heading: 'Basic Interface',
        content: 'An interface defines the shape of an object:',
        code: { code: `interface User {\n  name: string;\n  age: number;\n  email: string;\n}\n\n// ✅ Correct shape\nconst alice: User = {\n  name: "Alice",\n  age: 30,\n  email: "alice@example.com",\n};\n\n// ❌ Missing property\nconst bob: User = {\n  name: "Bob",\n  age: 25,\n  // Error: Property 'email' is missing\n};\n\n// ❌ Extra property (in object literals)\nconst charlie: User = {\n  name: "Charlie",\n  age: 35,\n  email: "charlie@example.com",\n  phone: "123",  // Error: not in interface\n};`, language: 'typescript' },
      },
      {
        heading: 'Optional & Readonly Properties',
        content: 'Mark properties as optional with `?` and immutable with `readonly`:',
        code: { code: `interface Config {\n  readonly apiUrl: string;     // Can't be changed after creation\n  readonly timeout: number;\n  retries?: number;            // Optional: number | undefined\n  debug?: boolean;             // Optional: boolean | undefined\n}\n\nconst config: Config = {\n  apiUrl: "https://api.example.com",\n  timeout: 5000,\n  // retries and debug are optional\n};\n\nconfig.apiUrl = "other";  // ❌ Error! readonly\nconfig.retries = 3;       // ✅ OK (optional, but can set)\n\n// Readonly applies to the reference, not deep immutability\ninterface User {\n  readonly address: {\n    street: string;  // Can still be modified!\n  };\n}\n\nlet user: User = { address: { street: "Main St" } };\nuser.address.street = "Oak Ave";  // ✅ Still works!`, language: 'typescript' },
      },
      {
        heading: 'Extending Interfaces',
        content: 'Interfaces can extend other interfaces to inherit properties:',
        code: { code: `interface Animal {\n  name: string;\n  age: number;\n}\n\ninterface Dog extends Animal {\n  breed: string;\n}\n\ninterface GuideDog extends Dog {\n  owner: string;\n  isWorking: boolean;\n}\n\nconst rex: GuideDog = {\n  name: "Rex",\n  age: 5,\n  breed: "Labrador",\n  owner: "Alice",\n  isWorking: true,\n};\n\n// Multiple inheritance\ninterface Timestamped {\n  createdAt: Date;\n  updatedAt: Date;\n}\n\ninterface Auditable extends Animal, Timestamped {\n  id: string;\n}`, language: 'typescript' },
      },
    ],
    comparisons: [
      {
        js: `// No shape definition\n// Just hope the object has the right properties\nfunction printUser(user) {\n  console.log(user.name);\n  console.log(user.email);\n  // What if email doesn't exist? Runtime error!\n}`,
        ts: `interface User {\n  name: string;\n  email: string;\n}\n\nfunction printUser(user: User) {\n  console.log(user.name);   // ✅ Safe\n  console.log(user.email);  // ✅ Safe\n  // TS guarantees these exist!\n}`,
        explanation: 'Interfaces guarantee that objects have the expected shape.',
      },
    ],
  },
  {
    id: 'enums-vs-unions',
    title: 'Enums vs Union Literals',
    level: 1,
    order: 9,
    description: 'Learn about enums and why most modern TypeScript teams prefer union types or as const objects instead.',
    sections: [
      {
        heading: 'Numeric Enums',
        content: 'Enums let you define a set of named constants:',
        code: { code: `// Numeric enum — auto-increments\nenum Direction {\n  Up,     // 0\n  Down,   // 1\n  Left,   // 2\n  Right,  // 3\n}\n\nlet dir: Direction = Direction.Up;\nconsole.log(dir);  // 0\nconsole.log(Direction[0]);  // "Up"\n\n// Custom values\nenum Status {\n  Active = 1,\n  Inactive = 2,\n  Banned = 3,\n}`, language: 'typescript' },
      },
      {
        heading: 'String Enums',
        content: 'String enums are more readable but more verbose:',
        code: { code: `enum Color {\n  Red = "RED",\n  Green = "GREEN",\n  Blue = "BLUE",\n}\n\nlet c: Color = Color.Red;\nconsole.log(c);  // "RED"`, language: 'typescript' },
      },
      {
        heading: 'Why Most Teams Avoid Enums',
        content: '**Problems with enums:**\n• They generate runtime JavaScript code (not just types)\n• They don\'t work well with tree-shaking\n• Numeric enums allow invalid values\n• They can\'t be iterated in a type-safe way\n\n**Modern alternatives:**',
        code: { code: `// ✅ Alternative 1: Union of string literals\ntype Direction = "Up" | "Down" | "Left" | "Right";\n\nlet dir: Direction = "Up";  // ✅\n// dir = "Diagonal";  // ❌ Error!\n\n// ✅ Alternative 2: 'as const' object (preferred by many)\nconst Direction = {\n  Up: "UP",\n  Down: "DOWN",\n  Left: "LEFT",\n  Right: "RIGHT",\n} as const;\n\ntype Direction = (typeof Direction)[keyof typeof Direction];\n// = "UP" | "DOWN" | "LEFT" | "RIGHT"\n\nlet dir: Direction = Direction.Up;  // "UP"\n\n// ✅ Benefits:\n// - No runtime code generated\n// - Works with tree-shaking\n// - Can be iterated: Object.values(Direction)\n// - Type-safe`, language: 'typescript' },
      },
    ],
    comparisons: [
      {
        js: `// Common JS pattern\nconst Direction = {\n  Up: "UP",\n  Down: "DOWN",\n};\n\n// No type safety\nlet dir = Direction.Up;\ndir = "something else"; // No error!`,
        ts: `const Direction = {\n  Up: "UP",\n  Down: "DOWN",\n} as const;\n\ntype Direction = typeof Direction[keyof typeof Direction];\n\nlet dir: Direction = Direction.Up;\n// dir = "something else"; // ❌ Error!`,
        explanation: 'as const + type extraction gives you enum-like behavior with full type safety.',
      },
    ],
  },
  {
    id: 'functions',
    title: 'Functions',
    level: 1,
    order: 10,
    description: 'Master typed functions: parameters, return types, optional params, defaults, rest params, and callbacks.',
    sections: [
      {
        heading: 'Function Types',
        content: 'TypeScript lets you type every aspect of a function:',
        code: { code: `// Named function with types\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// Arrow function\nconst multiply = (a: number, b: number): number => a * b;\n\n// Function type expression\ntype MathOp = (a: number, b: number) => number;\n\nconst divide: MathOp = (a, b) => a / b;\nconst mod: MathOp = (a, b) => a % b;\n\n// Void return type\nfunction log(msg: string): void {\n  console.log(msg);\n}`, language: 'typescript' },
      },
      {
        heading: 'Optional & Default Parameters',
        content: 'Parameters can be optional or have default values:',
        code: { code: `// Optional parameter (?)\nfunction greet(name: string, greeting?: string): string {\n  // greeting is string | undefined\n  return greeting ? \`\${greeting}, \${name}!\` : \`Hello, \${name}!\`;\n}\n\ngreet("Alice");            // "Hello, Alice!"\ngreet("Alice", "Hi");      // "Hi, Alice!"\n\n// Default parameter\nfunction createUser(\n  name: string,\n  role: string = "viewer"\n): { name: string; role: string } {\n  return { name, role };\n}\n\ncreateUser("Alice");           // { name: "Alice", role: "viewer" }\ncreateUser("Bob", "admin");    // { name: "Bob", role: "admin" }\n\n// Optional params must come AFTER required ones\nfunction bad(a?: string, b: string) {}  // ❌ Error!\nfunction good(a: string, b?: string) {} // ✅`, language: 'typescript' },
      },
      {
        heading: 'Rest Parameters & Callbacks',
        content: 'Rest parameters collect remaining arguments into an array:',
        code: { code: `// Rest parameters\nfunction sum(...numbers: number[]): number {\n  return numbers.reduce((acc, n) => acc + n, 0);\n}\n\nsum(1, 2, 3);       // 6\nsum(10, 20, 30, 40); // 100\n\n// Mixed: required + rest\nfunction log(level: string, ...messages: string[]): void {\n  messages.forEach(msg => console.log(\`[\${level}] \${msg}\`));\n}\n\nlog("INFO", "Server started", "Listening on port 3000");\n\n// Callback types\nfunction fetchData(\n  url: string,\n  onSuccess: (data: string) => void,\n  onError: (error: Error) => void\n): void {\n  try {\n    const data = "response";\n    onSuccess(data);\n  } catch (e) {\n    onError(e as Error);\n  }\n}`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'type-assertions',
    title: 'Type Assertions',
    level: 1,
    order: 11,
    description: 'Learn how to tell TypeScript what type a value is using `as` and the non-null assertion operator.',
    sections: [
      {
        heading: 'The `as` Keyword',
        content: 'Type assertions tell the compiler "I know more about this type than you do":',
        code: { code: `// When TS can't figure out the type\nconst input = document.getElementById("username") as HTMLInputElement;\ninput.value = "Alice";  // ✅ TS knows it's an input element\n\n// From unknown to specific type\nlet data: unknown = { name: "Alice", age: 30 };\n\nconst user = data as { name: string; age: number };\nconsole.log(user.name);  // ✅\n\n// ⚠️ Use with caution — TS trusts you!\nlet value: string = "hello";\nlet num = value as number;  // ❌ Error — TS catches incompatible types\n\n// But this compiles (dangerous!):\nlet anything: any = "hello";\nlet num2 = anything as number;  // ✅ Compiles, but wrong!\n// num2.toFixed() would crash at runtime`, language: 'typescript' },
      },
      {
        heading: 'Non-Null Assertion (!)',
        content: 'The `!` operator tells TypeScript "this value is definitely not null or undefined":',
        code: { code: `interface User {\n  name: string;\n  email?: string;  // optional\n}\n\nfunction printEmail(user: User) {\n  // user.email is string | undefined\n  // console.log(user.email.toUpperCase());  // ❌ Error!\n  \n  // ✅ Non-null assertion: "I promise this exists"\n  console.log(user.email!.toUpperCase());\n  \n  // ⚠️ If email is actually undefined, this CRASHES at runtime!\n}\n\n// DOM example\nconst el = document.getElementById("app")!;\n// Tells TS: "this element definitely exists"\n// ⚠️ If it doesn't exist, runtime error!\n\n// ✅ Safer alternative: check first\nconst el = document.getElementById("app");\nif (el) {\n  el.textContent = "Hello";  // ✅ TS narrows to HTMLElement\n}`, language: 'typescript' },
      },
      {
        heading: 'Double Assertion',
        content: 'Sometimes you need to assert through `unknown` to force a conversion:',
        code: { code: `// Can't directly assert incompatible types:\n// const x = "hello" as number;  // ❌ Error\n\n// Must go through unknown first:\nconst x = "hello" as unknown as number;  // ✅ Compiles\n\n// ⚠️ This is DANGEROUS — avoid when possible!\n// It's a sign your types might be wrong.\n\n// ✅ Better: use proper type guards\nfunction isNumber(value: unknown): value is number {\n  return typeof value === "number";\n}\n\nlet data: unknown = 42;\nif (isNumber(data)) {\n  data.toFixed(2);  // ✅ Safe!\n}`, language: 'typescript' },
      },
    ],
  },
  {
    id: 'project-todo-list',
    title: '🛠️ Project: Typed To-Do List',
    level: 1,
    order: 12,
    isProject: true,
    description: 'Build a fully typed to-do list application using all the concepts from Level 1.',
    sections: [
      {
        heading: 'Project Overview',
        content: 'In this project, you\'ll build a to-do list with full type safety. You\'ll use interfaces, union types, type aliases, functions, and arrays — everything from Level 1!',
      },
      {
        heading: 'Step 1: Define Your Types',
        content: 'Start by defining the types for your to-do items:',
        code: { code: `// Types for our to-do app\ntype Priority = "low" | "medium" | "high";\ntype Status = "pending" | "in-progress" | "done";\n\ninterface Todo {\n  id: number;\n  title: string;\n  description?: string;\n  priority: Priority;\n  status: Status;\n  createdAt: Date;\n  tags: string[];\n}\n\n// Type for creating a new todo (without id and createdAt)\ntype NewTodo = Omit<Todo, "id" | "createdAt">;\n\n// Or define it explicitly:\ninterface CreateTodoInput {\n  title: string;\n  description?: string;\n  priority: Priority;\n  status: Status;\n  tags: string[];\n}`, language: 'typescript', title: 'types.ts' },
      },
      {
        heading: 'Step 2: Build the Store',
        content: 'Create a typed store that manages the to-do list:',
        code: { code: `class TodoStore {\n  private todos: Todo[] = [];\n  private nextId: number = 1;\n\n  add(input: CreateTodoInput): Todo {\n    const todo: Todo = {\n      id: this.nextId++,\n      ...input,\n      createdAt: new Date(),\n    };\n    this.todos.push(todo);\n    return todo;\n  }\n\n  getById(id: number): Todo | undefined {\n    return this.todos.find(t => t.id === id);\n  }\n\n  updateStatus(id: number, status: Status): Todo | undefined {\n    const todo = this.getById(id);\n    if (todo) {\n      todo.status = status;\n    }\n    return todo;\n  }\n\n  getByPriority(priority: Priority): Todo[] {\n    return this.todos.filter(t => t.priority === priority);\n  }\n\n  getAll(): readonly Todo[] {\n    return this.todos;  // Return readonly to prevent external mutation\n  }\n\n  remove(id: number): boolean {\n    const index = this.todos.findIndex(t => t.id === id);\n    if (index === -1) return false;\n    this.todos.splice(index, 1);\n    return true;\n  }\n}`, language: 'typescript', title: 'store.ts' },
      },
      {
        heading: 'Step 3: Use It',
        content: 'Now use the store with full type safety:',
        code: { code: `const store = new TodoStore();\n\n// ✅ Add todos\nconst todo1 = store.add({\n  title: "Learn TypeScript",\n  priority: "high",\n  status: "in-progress",\n  tags: ["learning", "typescript"],\n});\n\nconst todo2 = store.add({\n  title: "Build a project",\n  description: "Apply what I've learned",\n  priority: "medium",\n  status: "pending",\n  tags: ["project"],\n});\n\n// ✅ Type-safe operations\nstore.updateStatus(todo1.id, "done");\n\nconst highPriority = store.getByPriority("high");\n// Type: Todo[]\n\n// ❌ Caught by TypeScript:\n// store.add({ title: "Bad", priority: "urgent" });\n// Error: "urgent" is not assignable to Priority\n\n// store.updateStatus(todo1.id, "cancelled");\n// Error: "cancelled" is not assignable to Status`, language: 'typescript', title: 'app.ts' },
      },
      {
        heading: 'Key Takeaways',
        content: '✅ **Interfaces** define the Todo shape\n✅ **Union types** restrict Priority and Status to valid values\n✅ **Optional properties** for description\n✅ **Type aliases** for NewTodo/CreateTodoInput\n✅ **Readonly arrays** prevent external mutation\n✅ **Typed functions** catch errors at compile time\n\n**Challenge:** Add a `filter` method that accepts a partial Todo object and returns matching items. Hint: use `Partial<Todo>`!',
      },
    ],
  },
];
