'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui';
import { StatCards } from '@/components/StatCards';
import { Heatmap } from '@/components/Heatmap';
import { ProgressCharts } from '@/components/ProgressCharts';
import { RecentSessions } from '@/components/RecentSessions';
import { useApp, useCurrentUser } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const { currentUserId } = useApp();
  const { user, loading, error } = useCurrentUser();

  useEffect(() => {
    if (!currentUserId) router.replace('/');
  }, [currentUserId, router]);

  if (!currentUserId) return null;

  if (loading) {
    return (
      <div style={{ maxWidth: 'var(--container-desktop)', margin: '0 auto', padding: '96px 24px', textAlign: 'center', color: 'var(--text-tertiary)', fontFamily: 'var(--font-body)' }}>
        Loading profile…
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ maxWidth: 'var(--container-desktop)', margin: '0 auto', padding: '96px 24px', textAlign: 'center', color: 'var(--text-tertiary)', fontFamily: 'var(--font-body)' }}>
        Couldn&apos;t load this profile{error ? `: ${error.message}` : '.'}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 'var(--container-desktop)', margin: '0 auto', padding: '40px 24px 96px', display: 'flex', flexDirection: 'column', gap: 56, animation: 'fadeUp 0.4s var(--ease-out)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Avatar username={user.username} size={72} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, letterSpacing: '-0.02em' }}>{user.username}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)' }}>{user.streak}-day streak · {user.sessionCount} sessions logged</div>
        </div>
      </div>

      <StatCards user={user} />
      <Heatmap user={user} />
      <ProgressCharts user={user} />
      <RecentSessions user={user} />
    </div>
  );
}
