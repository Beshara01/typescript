import { useState, useEffect, useMemo } from 'react';
import { Level, Lesson } from './data/types';
import { level1Lessons } from './data/level1';
import { level2Lessons } from './data/level2';
import { level3Lessons } from './data/level3';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';

const allLessons: Lesson[] = [...level1Lessons, ...level2Lessons, ...level3Lessons];

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}

export default function App() {
  const [currentLevel, setCurrentLevel] = useLocalStorage<Level>('ts-hub-level', 1);
  const [currentLessonId, setCurrentLessonId] = useLocalStorage<string>('ts-hub-lesson', 'what-is-typescript');
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>('ts-hub-completed', []);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('ts-hub-dark', false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const completedSet = useMemo(() => new Set(completedLessons), [completedLessons]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Get current lesson
  const currentLesson = allLessons.find((l) => l.id === currentLessonId) || allLessons[0];

  // Get lessons for current level
  const levelLessons = allLessons
    .filter((l) => l.level === currentLevel)
    .sort((a, b) => a.order - b.order);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allLessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.content.toLowerCase().includes(q)
        )
    );
  }, [searchQuery]);

  // Navigate to next/prev lesson
  const currentIndex = levelLessons.findIndex((l) => l.id === currentLessonId);
  const prevLesson = currentIndex > 0 ? levelLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < levelLessons.length - 1 ? levelLessons[currentIndex + 1] : null;

  const toggleComplete = () => {
    setCompletedLessons((prev) =>
      prev.includes(currentLessonId)
        ? prev.filter((id) => id !== currentLessonId)
        : [...prev, currentLessonId]
    );
  };

  const handleLevelChange = (level: Level) => {
    setCurrentLevel(level);
    const firstLesson = allLessons.find((l) => l.level === level);
    if (firstLesson) {
      setCurrentLessonId(firstLesson.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-30 flex items-center px-4 gap-3">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearch(true);
              }}
              onFocus={() => setShowSearch(true)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-300 dark:focus:border-blue-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            />
          </div>

          {/* Search results dropdown */}
          {showSearch && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
              {searchResults.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                  No results found
                </div>
              ) : (
                searchResults.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLessonId(lesson.id);
                      setCurrentLevel(lesson.level);
                      setSearchQuery('');
                      setShowSearch(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        lesson.level === 1 ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                        lesson.level === 2 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        L{lesson.level}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {lesson.title}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {lesson.description}
                    </p>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </header>

      {/* Click outside to close search */}
      {showSearch && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => { setShowSearch(false); setSearchQuery(''); }}
        />
      )}

      <div className="flex pt-14">
        {/* Sidebar */}
        <Sidebar
          lessons={allLessons}
          currentLessonId={currentLessonId}
          onSelectLesson={setCurrentLessonId}
          currentLevel={currentLevel}
          onChangeLevel={handleLevelChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          completedLessons={completedSet}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="p-6 lg:p-10">
            <LessonView lesson={currentLesson} />

            {/* Navigation */}
            <div className="max-w-4xl mx-auto mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                {prevLesson ? (
                  <button
                    onClick={() => setCurrentLessonId(prevLesson.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>{prevLesson.title}</span>
                  </button>
                ) : (
                  <div />
                )}

                {/* Mark complete */}
                <button
                  onClick={toggleComplete}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    completedSet.has(currentLessonId)
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {completedSet.has(currentLessonId) ? '✓ Completed' : 'Mark Complete'}
                </button>

                {nextLesson ? (
                  <button
                    onClick={() => setCurrentLessonId(nextLesson.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <span>{nextLesson.title}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
