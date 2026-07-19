'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './ui';

export function Nav() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const profileActive = pathname === '/dashboard' || pathname.startsWith('/session');
  const searchActive = pathname === '/search';
  const profileColor = profileActive ? 'var(--accent-right)' : 'var(--text-tertiary)';
  const searchColor = searchActive ? 'var(--accent-right)' : 'var(--text-tertiary)';

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'var(--surface-overlay)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <Link href="/dashboard" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, letterSpacing: '0.08em', textDecoration: 'none', color: 'var(--text-primary)' }}>Y0DA</Link>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
          <Icon name="user-round" size={18} color={profileColor} />
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: profileColor }}>My profile</span>
        </Link>
        <Link href="/search" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
          <Icon name="search" size={18} color={searchColor} />
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: searchColor }}>Search users</span>
        </Link>
      </div>
    </div>
  );
}
