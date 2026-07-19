'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { useApp } from '@/lib/store';
import { ApiError } from '@/lib/api-client';

export default function LandingPage() {
  const router = useRouter();
  const { continueAsUser } = useApp();
  const [usernameInput, setUsernameInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onContinue = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await continueAsUser(usernameInput);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server. Try again.');
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: 24, textAlign: 'center', animation: 'fadeUp 0.5s var(--ease-out)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 36, letterSpacing: '0.08em' }}>Y0DA</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,5vw,44px)', letterSpacing: '-0.02em', maxWidth: 600 }}>Train. Measure. Improve.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 360, marginTop: 12 }}>
        <Input placeholder="Enter your username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
        <Button variant="primary" accent="left" size="lg" onClick={onContinue} disabled={submitting} style={{ width: '100%' }}>
          {submitting ? 'Loading…' : 'Continue'}
        </Button>
        {error && <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--accent-left)' }}>{error}</span>}
      </div>
    </div>
  );
}
