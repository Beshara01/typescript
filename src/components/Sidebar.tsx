import { Lesson, Level } from '../data/types';

interface SidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  currentLevel: Level;
  onChangeLevel: (level: Level) => void;
  isOpen: boolean;
  onClose: () => void;
  completedLessons: Set<string>;
}

const levelLabels: Record<Level, { label: string; color: string; emoji: string }> = {
  1: { label: 'Beginner', color: 'text-green-600 dark:text-green-400', emoji: '🟢' },
  2: { label: 'Intermediate', color: 'text-yellow-600 dark:text-yellow-400', emoji: '🟡' },
  3: { label: 'Advanced', color: 'text-red-600 dark:text-red-400', emoji: '🔴' },
};

export default function Sidebar({
  lessons,
  currentLessonId,
  onSelectLesson,
  currentLevel,
  onChangeLevel,
  isOpen,
  onClose,
  completedLessons,
}: SidebarProps) {
  const filteredLessons = lessons
    .filter((l) => l.level === currentLevel)
    .sort((a, b) => a.order - b.order);

  const progress = filteredLessons.filter((l) => completedLessons.has(l.id)).length;
  const total = filteredLessons.length;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">📘</span>
              <span>TS Learning Hub</span>
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              TypeScript for JS Developers
            </p>
          </div>

          {/* Level Selector */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-1">
              {([1, 2, 3] as Level[]).map((level) => (
                <button
                  key={level}
                  onClick={() => onChangeLevel(level)}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                    currentLevel === level
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="block text-base">{levelLabels[level].emoji}</span>
                  <span className="block mt-0.5">L{level}</span>
                </button>
              ))}
            </div>
            {/* Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progress}/{total}</span>
              </div>
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${total > 0 ? (progress / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lesson List */}
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {filteredLessons.map((lesson) => {
                const isCompleted = completedLessons.has(lesson.id);
                const isCurrent = lesson.id === currentLessonId;

                return (
                  <li key={lesson.id}>
                    <button
                      onClick={() => {
                        onSelectLesson(lesson.id);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-start gap-2 ${
                        isCurrent
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="mt-0.5 flex-shrink-0">
                        {isCompleted ? (
                          <span className="text-green-500">✓</span>
                        ) : lesson.isProject ? (
                          <span>🛠️</span>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-600 text-xs font-mono">
                            {String(lesson.order).padStart(2, '0')}
                          </span>
                        )}
                      </span>
                      <span className="leading-tight">{lesson.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              36 lessons • 3 projects • For JS devs
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
