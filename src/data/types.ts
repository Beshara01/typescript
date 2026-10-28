export interface CodeExample {
  code: string;
  language?: 'typescript' | 'javascript' | 'json' | 'bash';
  title?: string;
}

export interface Comparison {
  js: string;
  ts: string;
  explanation: string;
}

export interface LessonSection {
  heading: string;
  content: string;
  code?: CodeExample;
}

export interface Lesson {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  order: number;
  description: string;
  sections: LessonSection[];
  comparisons?: Comparison[];
  isProject?: boolean;
}

export type Level = 1 | 2 | 3;
