import CodeBlock from './CodeBlock';

interface ComparisonPanelProps {
  js: string;
  ts: string;
  explanation: string;
}

export default function ComparisonPanel({ js, ts, explanation }: ComparisonPanelProps) {
  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
        <div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">
              ❌ JavaScript
            </span>
          </div>
          <CodeBlock code={js} language="javascript" />
        </div>
        <div>
          <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
              ✅ TypeScript
            </span>
          </div>
          <CodeBlock code={ts} language="typescript" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <span className="font-medium">Key insight:</span> {explanation}
        </p>
      </div>
    </div>
  );
}
