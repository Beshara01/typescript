import { Lesson } from '../data/types';
import CodeBlock from './CodeBlock';
import ComparisonPanel from './ComparisonPanel';

interface LessonViewProps {
  lesson: Lesson;
}

export default function LessonView({ lesson }: LessonViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            lesson.level === 1 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            lesson.level === 2 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            Level {lesson.level}
          </span>
          {lesson.isProject && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              🛠️ Project
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {lesson.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {lesson.description}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {lesson.sections.map((section, idx) => (
          <section key={idx} className="scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-blue-500 dark:text-blue-400">§</span>
              {section.heading}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {renderMarkdown(section.content)}
              </p>
            </div>
            {section.code && (
              <CodeBlock
                code={section.code.code}
                language={section.code.language}
                title={section.code.title}
              />
            )}
          </section>
        ))}
      </div>

      {/* Comparisons */}
      {lesson.comparisons && lesson.comparisons.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-purple-500 dark:text-purple-400">⚡</span>
            JavaScript vs TypeScript
          </h2>
          {lesson.comparisons.map((comp, idx) => (
            <ComparisonPanel
              key={idx}
              js={comp.js}
              ts={comp.ts}
              explanation={comp.explanation}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Simple markdown-like renderer
function renderMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Bullet point
    const bulletMatch = remaining.match(/^• (.+)/m);

    const matches = [
      boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
      codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const first = matches[0]!;
    if (first.index > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, first.index)}</span>);
    }

    if (first.type === 'bold') {
      parts.push(<strong key={key++} className="font-semibold text-gray-900 dark:text-white">{first.match![1]}</strong>);
    } else if (first.type === 'code') {
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 text-sm font-mono">
          {first.match![1]}
        </code>
      );
    }

    remaining = remaining.slice(first.index + first.match![0].length);
  }

  return parts;
}
