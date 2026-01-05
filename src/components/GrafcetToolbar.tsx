import React from 'react';
import { useTranslation } from 'react-i18next';

interface GrafcetToolbarProps {
  tool: 'select' | 'step' | 'transition' | 'link';
  onToolChange: (tool: 'select' | 'step' | 'transition' | 'link') => void;
  onDelete: () => void;
  onToggleInitial: () => void;
  canDelete: boolean;
  canToggleInitial: boolean;
}

export default function GrafcetToolbar({
  tool,
  onToolChange,
  onDelete,
  onToggleInitial,
  canDelete,
  canToggleInitial
}: GrafcetToolbarProps) {
  const { t } = useTranslation();

  const tools = [
    {
      id: 'select' as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      label: t('grafcet.select', 'Select'),
      shortcut: 'V'
    },
    {
      id: 'step' as const,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="4" y="6" width="16" height="12" rx="1" strokeWidth="2" />
          <text x="12" y="14" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none">n</text>
        </svg>
      ),
      label: t('grafcet.addStep', 'Add Step'),
      shortcut: 'S'
    },
    {
      id: 'transition' as const,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="4" y1="12" x2="20" y2="12" strokeWidth="3" />
          <line x1="12" y1="4" x2="12" y2="20" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      ),
      label: t('grafcet.addTransition', 'Add Transition'),
      shortcut: 'T'
    },
    {
      id: 'link' as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      label: t('grafcet.link', 'Link'),
      shortcut: 'L'
    }
  ];

  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-800 rounded-lg">
      {/* Tool buttons */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 px-2 mb-1">
          {t('grafcet.tools', 'Tools')}
        </span>
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => onToolChange(t.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
              ${tool === t.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
            title={`${t.label} (${t.shortcut})`}
          >
            {t.icon}
            <span className="flex-1 text-left">{t.label}</span>
            <span className="text-xs text-gray-400">{t.shortcut}</span>
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="border-t border-gray-700 my-2" />

      {/* Actions */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 px-2 mb-1">
          {t('grafcet.actions', 'Actions')}
        </span>

        <button
          onClick={onToggleInitial}
          disabled={!canToggleInitial}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
            ${canToggleInitial
              ? 'bg-yellow-600 text-white hover:bg-yellow-500'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }
          `}
          title={t('grafcet.toggleInitial', 'Toggle Initial Step')}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="2" y="4" width="20" height="16" rx="1" strokeWidth="2" />
            <rect x="5" y="7" width="14" height="10" rx="1" strokeWidth="2" />
          </svg>
          <span>{t('grafcet.initial', 'Initial')}</span>
        </button>

        <button
          onClick={onDelete}
          disabled={!canDelete}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
            ${canDelete
              ? 'bg-red-600 text-white hover:bg-red-500'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }
          `}
          title={t('grafcet.delete', 'Delete (Del)')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>{t('grafcet.delete', 'Delete')}</span>
        </button>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-700 my-2" />

      {/* Legend */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 px-2 mb-1">
          {t('grafcet.legend', 'Legend')}
        </span>

        <div className="px-2 py-1 flex items-center gap-2">
          <div className="w-8 h-5 border-2 border-yellow-500 bg-gray-700 rounded flex items-center justify-center">
            <div className="w-6 h-3 border border-yellow-500 bg-gray-600 rounded-sm" />
          </div>
          <span className="text-xs text-gray-400">{t('grafcet.initialStep', 'Initial Step')}</span>
        </div>

        <div className="px-2 py-1 flex items-center gap-2">
          <div className="w-8 h-5 border-2 border-gray-500 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-300">
            n
          </div>
          <span className="text-xs text-gray-400">{t('grafcet.normalStep', 'Normal Step')}</span>
        </div>

        <div className="px-2 py-1 flex items-center gap-2">
          <div className="w-8 h-5 border-2 border-green-500 bg-green-500/30 rounded flex items-center justify-center text-xs text-white">
            n
          </div>
          <span className="text-xs text-gray-400">{t('grafcet.activeStep', 'Active Step')}</span>
        </div>

        <div className="px-2 py-1 flex items-center gap-2">
          <div className="w-8 h-1.5 bg-gray-500" />
          <span className="text-xs text-gray-400">{t('grafcet.transition', 'Transition')}</span>
        </div>
      </div>
    </div>
  );
}
