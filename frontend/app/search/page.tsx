'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Icon, Avatar } from '@/components/ui';
import { useApp } from '@/lib/store';
import { useQuery } from '@/lib/hooks';
import { api } from '@/lib/api';

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export default function SearchPage() {
  const router = useRouter();
  const { setCurrentUserId, cacheUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebouncedValue(searchQuery.trim(), 300);

  const { data: searchResults, loading, error } = useQuery(
    () => api.users.search(debouncedQuery),
    [debouncedQuery]
  );

  const selectUser = (id: string) => {
    setCurrentUserId(id);
    router.push('/dashboard');
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 96px', display: 'flex', flexDirection: 'column', gap: 28, animation: 'fadeUp 0.4s var(--ease-out)' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, letterSpacing: '-0.02em' }}>Search users</span>
      <Input placeholder="Search by username" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {loading && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-tertiary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>Searching…</div>
        )}
        {error && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--accent-left)', fontFamily: 'var(--font-body)', fontSize: 14 }}>Couldn&apos;t load results: {error.message}</div>
        )}
        {!loading && !error && (searchResults ?? []).map((u) => (
          <div key={u.id} onClick={() => { cacheUser(u); selectUser(u.id); }} className="search-card"
            style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', cursor: 'pointer', transition: 'background var(--dur-md) var(--ease-out)' }}>
            <Avatar username={u.username} size={44} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15 }}>{u.username}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>{u.accuracy}% accuracy</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700 }}>{u.score}</span>
            <Icon name="chevron-right" size={18} color="var(--text-tertiary)" />
          </div>
        ))}
        {!loading && !error && searchResults?.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-tertiary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>No athletes match &quot;{searchQuery}&quot;</div>
        )}
      </div>
    </div>
  );
}
