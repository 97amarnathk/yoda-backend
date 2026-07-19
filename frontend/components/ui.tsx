'use client';
import React, { CSSProperties } from 'react';
import { Trophy, Zap, Target, Flame, UserRound, Search, ChevronRight, ArrowLeft, CheckCircle2, XCircle, Activity, Scale, TrendingUp } from 'lucide-react';
import { avatarUrl } from '@/lib/data';

const iconMap: Record<string, any> = {
  trophy: Trophy, zap: Zap, target: Target, flame: Flame, 'user-round': UserRound,
  search: Search, 'chevron-right': ChevronRight, 'arrow-left': ArrowLeft,
  'check-circle': CheckCircle2, 'x-circle': XCircle, activity: Activity, scale: Scale, 'trending-up': TrendingUp,
};

export function Icon({ name, size = 20, color = 'currentColor' }: { name: string; size?: number; color?: string }) {
  const Cmp = iconMap[name] || Activity;
  return <Cmp size={size} color={color} strokeWidth={1.75} />;
}

export function Avatar({ username, size = 44 }: { username: string; size?: number }) {
  return (
    <img
      src={avatarUrl(username)}
      alt={username}
      width={size}
      height={size}
      style={{ width: size, height: size, borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface-card-hover)', flexShrink: 0, objectFit: 'cover' }}
    />
  );
}

export function Card({ children, padding = 'var(--space-6)', elevated = false, style }: { children: React.ReactNode; padding?: string | number; elevated?: boolean; style?: CSSProperties }) {
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding, boxShadow: elevated ? 'var(--shadow-elevated)' : 'var(--shadow-card)', ...style }}>
      {children}
    </div>
  );
}

export function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'left' | 'right' }) {
  const map: Record<string, { background: string; color: string }> = {
    neutral: { background: 'var(--ink-700)', color: 'var(--text-secondary)' },
    right: { background: 'var(--accent-right-tint)', color: 'var(--accent-right)' },
    left: { background: 'var(--accent-left-tint)', color: 'var(--accent-left)' },
  };
  const t = map[tone];
  return (
    <span style={{ background: t.background, color: t.color, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: 'var(--tracking-caption, 0.08em)', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {children}
    </span>
  );
}

const sizes = {
  sm: { padding: '8px 16px', font: 'var(--text-body-sm, 13px)', height: 36 },
  md: { padding: '11px 22px', font: 'var(--text-body-md, 15px)', height: 44 },
  lg: { padding: '15px 28px', font: 'var(--text-body-lg, 17px)', height: 52 },
};

export function Button({ children, variant = 'primary', accent = 'right', size = 'md', disabled = false, onClick, style }: { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; accent?: 'left' | 'right'; size?: 'sm' | 'md' | 'lg'; disabled?: boolean; onClick?: () => void; style?: CSSProperties }) {
  const [pressed, setPressed] = React.useState(false);
  const s = sizes[size];
  const variants: Record<string, CSSProperties> = {
    primary: { background: accent === 'left' ? 'var(--accent-left)' : 'var(--accent-right)', color: 'var(--text-on-accent)', border: '1px solid transparent' },
    secondary: { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' },
    ghost: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        ...variants[variant], padding: s.padding, fontSize: s.font, height: s.height, fontFamily: 'var(--font-body)', fontWeight: 600,
        borderRadius: 'var(--radius-pill)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        transform: pressed ? 'scale(0.97)' : 'scale(1)', transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-md) var(--ease-out)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, whiteSpace: 'nowrap', ...style,
      }}
    >
      {children}
    </button>
  );
}

export function Input({ label, placeholder, value, onChange }: { label?: string; placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)' }}>
      {label && <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>}
      <input
        type="text" placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ background: 'var(--surface-card)', border: `1px solid ${focused ? 'var(--border-strong)' : 'var(--border-subtle)'}`, borderRadius: 'var(--radius-md)', padding: '12px 16px', color: 'var(--text-primary)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' }}
      />
    </label>
  );
}
