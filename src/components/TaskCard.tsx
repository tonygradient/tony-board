'use client';

import { useDraggable } from '@dnd-kit/core';
import type { Task } from '@/app/page';

type Props = {
  task: Task;
  onClick: () => void;
  isDragging?: boolean;
};

// Tag colors — TONY Board design system
const tagColors: Record<string, { bg: string; text: string }> = {
  // Technical/code → blue
  coding: { bg: 'rgba(42, 78, 239, 0.15)', text: '#93b4ff' },
  workflow: { bg: 'rgba(42, 78, 239, 0.15)', text: '#93b4ff' },
  research: { bg: 'rgba(42, 78, 239, 0.15)', text: '#93b4ff' },
  
  // Priority/urgent → orange
  polymarket: { bg: 'rgba(239, 120, 71, 0.15)', text: '#ffb088' },
  stravix: { bg: 'rgba(239, 120, 71, 0.15)', text: '#ffb088' },
  
  // Success → green
  feature: { bg: 'rgba(34, 197, 94, 0.15)', text: '#86efac' },
  
  // Error → red
  bug: { bg: 'rgba(239, 68, 68, 0.15)', text: '#fca5a5' },
  
  // General → neutral
  learnings: { bg: 'rgba(113, 113, 122, 0.15)', text: '#d4d4d8' },
  'side-projects': { bg: 'rgba(113, 113, 122, 0.15)', text: '#d4d4d8' },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  // Gradient work categories
  Strategy: { bg: 'rgba(42, 78, 239, 0.15)', text: '#93b4ff' },
  Sales: { bg: 'rgba(239, 120, 71, 0.15)', text: '#ffb088' },
  Marketing: { bg: 'rgba(239, 120, 71, 0.15)', text: '#ffb088' },
  Product: { bg: 'rgba(42, 78, 239, 0.15)', text: '#93b4ff' },
  Content: { bg: 'rgba(113, 113, 122, 0.15)', text: '#d4d4d8' },
  Operations: { bg: 'rgba(113, 113, 122, 0.15)', text: '#d4d4d8' },
  Inbox: { bg: 'rgba(113, 113, 122, 0.15)', text: '#a1a1aa' },
};

function getPriorityDisplay(level: number): { label: string; className: string } {
  switch (level) {
    case 4:
      return { label: '🔥', className: 'priority-4' };
    case 3:
      return { label: '3', className: 'priority-3' };
    case 2:
      return { label: '2', className: 'priority-2' };
    default:
      return { label: '1', className: 'priority-1' };
  }
}

function formatDueDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Overdue';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 7) return `${diffDays}d`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function cleanTitle(title: string): string {
  // Remove common prefixes like "Review: ", "Fix: ", etc.
  return title.replace(/^(Review|Fix|Add|Update|Create|Build|Implement|Write|Research|Test):\s*/i, '');
}

export default function TaskCard({ task, onClick, isDragging }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const priority = getPriorityDisplay(task.priority_level || 2);
  const tags = task.tags || [];
  const categoryColor = categoryColors[task.category] || categoryColors.Inbox;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`task-card p-3 cursor-grab active:cursor-grabbing ${isDragging ? 'dragging' : ''}`}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('[data-no-click]')) onClick();
      }}
    >
      {/* Notification dot for unread activity */}
      {task.has_unread && <div className="notification-dot" />}

      {/* Title */}
      <h3 
        className="text-sm font-medium leading-snug mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {cleanTitle(task.title)}
      </h3>

      {/* Tags row */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        {/* Category as primary tag */}
        <span
          className="tag-pill"
          style={{ background: categoryColor.bg, color: categoryColor.text }}
        >
          {task.category}
        </span>
        
        {/* Additional tags */}
        {tags.slice(0, 2).map((tag) => {
          const color = tagColors[tag.toLowerCase()] || { bg: 'rgba(113, 113, 122, 0.15)', text: '#d4d4d8' };
          return (
            <span
              key={tag}
              className="tag-pill"
              style={{ background: color.bg, color: color.text }}
            >
              {tag}
            </span>
          );
        })}
        {tags.length > 2 && (
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            +{tags.length - 2}
          </span>
        )}
      </div>

      {/* Meta row: Priority + Due Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Priority badge */}
          <span className={`priority-badge ${priority.className}`}>
            {priority.label}
          </span>
        </div>

        {/* Due date */}
        {task.due_date && (
          <span 
            className="text-[10px] flex items-center gap-1"
            style={{ 
              color: new Date(task.due_date) < new Date() 
                ? 'var(--danger)' 
                : 'var(--text-muted)' 
            }}
          >
            📅 {formatDueDate(task.due_date)}
          </span>
        )}
      </div>
    </div>
  );
}
