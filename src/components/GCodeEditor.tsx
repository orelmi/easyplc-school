import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  errors?: { line: number; message: string }[];
  currentLine?: number;
  readOnly?: boolean;
}

// Simple syntax highlighting for G-Code
function highlightGCode(code: string, errors: { line: number; message: string }[], currentLine?: number): JSX.Element[] {
  const lines = code.split('\n');

  return lines.map((line, index) => {
    const lineNumber = index + 1;
    const hasError = errors.some(e => e.line === lineNumber);
    const isCurrentLine = currentLine === lineNumber;

    // Tokenize and highlight
    const highlighted = line
      // Comments
      .replace(/(\([^)]*\)|;.*$)/g, '<span class="text-gray-500 italic">$1</span>')
      // G codes
      .replace(/\b(G\d+\.?\d*)/gi, '<span class="text-blue-400 font-semibold">$1</span>')
      // M codes
      .replace(/\b(M\d+)/gi, '<span class="text-purple-400 font-semibold">$1</span>')
      // Axis coordinates
      .replace(/\b([XYZIJK])([+-]?\d*\.?\d+)/gi, '<span class="text-green-400">$1</span><span class="text-yellow-300">$2</span>')
      // Feed rate and spindle speed
      .replace(/\b([FS])(\d+\.?\d*)/gi, '<span class="text-orange-400">$1</span><span class="text-yellow-300">$2</span>')
      // Tool number
      .replace(/\b(T)(\d+)/gi, '<span class="text-pink-400">$1</span><span class="text-yellow-300">$2</span>');

    return (
      <div
        key={index}
        className={`flex ${hasError ? 'bg-red-900/30' : ''} ${isCurrentLine ? 'bg-blue-900/40' : ''}`}
      >
        <span className="select-none text-gray-500 w-10 text-right pr-3 border-r border-gray-700 mr-3">
          {lineNumber}
        </span>
        <span
          className="flex-1"
          dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }}
        />
      </div>
    );
  });
}

export default function GCodeEditor({
  value,
  onChange,
  onRun,
  errors = [],
  currentLine,
  readOnly = false
}: GCodeEditorProps) {
  const { t } = useTranslation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync scroll between textarea and highlight overlay
  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Handle tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      // Restore cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }

    // Run on Ctrl+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && onRun) {
      e.preventDefault();
      onRun();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">
            {t('simulator.editor', 'G-Code Editor')}
          </span>
          {errors.length > 0 && (
            <span className="px-2 py-0.5 text-xs bg-red-600 text-white rounded-full">
              {errors.length} {t('simulator.errors', 'errors')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Ctrl+Enter {t('simulator.toRun', 'to run')}</span>
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 overflow-hidden">
        {/* Syntax highlighted overlay */}
        <div
          ref={highlightRef}
          className="absolute inset-0 overflow-auto font-mono text-sm leading-6 p-4 pointer-events-none whitespace-pre"
          aria-hidden="true"
        >
          {highlightGCode(value, errors, currentLine)}
        </div>

        {/* Actual textarea (transparent text, visible caret) */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={readOnly}
          spellCheck={false}
          className={`
            absolute inset-0 w-full h-full resize-none font-mono text-sm leading-6 p-4
            bg-transparent text-transparent caret-white
            focus:outline-none
            ${readOnly ? 'cursor-not-allowed' : ''}
          `}
          style={{
            paddingLeft: '4rem',
            caretColor: 'white'
          }}
          placeholder={t('simulator.placeholder', 'Enter your G-Code here...')}
        />
      </div>

      {/* Error list */}
      {errors.length > 0 && (
        <div className="max-h-24 overflow-y-auto bg-red-900/20 border-t border-red-800">
          {errors.map((error, index) => (
            <div
              key={index}
              className="px-4 py-1 text-sm text-red-300 hover:bg-red-900/30 cursor-pointer"
              onClick={() => {
                // Scroll to error line
                if (textareaRef.current) {
                  const lines = value.split('\n');
                  let charIndex = 0;
                  for (let i = 0; i < error.line - 1; i++) {
                    charIndex += lines[i].length + 1;
                  }
                  textareaRef.current.focus();
                  textareaRef.current.setSelectionRange(charIndex, charIndex + lines[error.line - 1].length);
                }
              }}
            >
              <span className="font-semibold">Line {error.line}:</span> {error.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
