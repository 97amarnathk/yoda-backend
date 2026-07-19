import { apiClient } from './api-client';
import { UserData, SessionData, HeatCell } from './types';

export interface CreateUserPayload {
  username: string;
}

export type SessionWithOwner = SessionData & { userId: string };

const demoSessions: SessionData[] = [
  {
    id: 'demo-session-10',
    date: '2026-07-19',
    dateLabel: 'Jul 19',
    fullDateLabel: 'Sunday, July 19, 2026',
    punches: 42,
    timeline: [
      { hand: 'LEFT', time: 312, success: true },
      { hand: 'RIGHT', time: 284, success: true },
      { hand: 'LEFT', time: 338, success: true },
      { hand: 'RIGHT', time: 271, success: true },
      { hand: 'LEFT', time: 0, success: false },
      { hand: 'RIGHT', time: 266, success: true },
      { hand: 'LEFT', time: 318, success: true },
      { hand: 'RIGHT', time: 259, success: true },
      { hand: 'LEFT', time: 305, success: true },
      { hand: 'RIGHT', time: 275, success: true },
    ],
    longestStreak: 8,
    accuracy: 90,
    median: 292,
    fastest: 259,
    score: 81,
  },
  {
    id: 'demo-session-9',
    date: '2026-07-18',
    dateLabel: 'Jul 18',
    fullDateLabel: 'Saturday, July 18, 2026',
    punches: 38,
    timeline: [
      { hand: 'RIGHT', time: 302, success: true },
      { hand: 'LEFT', time: 326, success: true },
      { hand: 'RIGHT', time: 291, success: true },
      { hand: 'LEFT', time: 347, success: true },
      { hand: 'RIGHT', time: 287, success: true },
    ],
    longestStreak: 7,
    accuracy: 92,
    median: 302,
    fastest: 287,
    score: 78,
  },
  {
    id: 'demo-session-8',
    date: '2026-07-17',
    dateLabel: 'Jul 17',
    fullDateLabel: 'Friday, July 17, 2026',
    punches: 35,
    timeline: [
      { hand: 'LEFT', time: 344, success: true },
      { hand: 'RIGHT', time: 301, success: true },
      { hand: 'LEFT', time: 0, success: false },
      { hand: 'RIGHT', time: 295, success: true },
      { hand: 'LEFT', time: 331, success: true },
    ],
    longestStreak: 5,
    accuracy: 86,
    median: 316,
    fastest: 295,
    score: 72,
  },
];

const demoHeatmap: HeatCell[] = Array.from({ length: 35 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 6, 1 + i));
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const day = date.getUTCDate();
  const count = [0, 1, 0, 2, 3, 0, 1][i % 7];
  return {
    date: date.toISOString().slice(0, 10),
    label: `${month} ${day}`,
    count,
  };
});

const demoUser: UserData = {
  id: 'demo',
  username: 'demo',
  sessions: demoSessions,
  score: 81,
  accuracy: 90,
  medianReaction: 292,
  sessionCount: demoSessions.length,
  heatmap: demoHeatmap,
  streak: 3,
};

async function getUserData(id: string): Promise<UserData> {
  if (id === 'demo') {
    return demoUser;
  }
  return apiClient.get<UserData>(`/users/${encodeURIComponent(id)}`);
}

async function createUser(payload: CreateUserPayload): Promise<UserData> {
  if (payload.username.trim().toLowerCase() === 'demo') {
    return demoUser;
  }
  return apiClient.post<UserData>('/users', payload);
}

async function searchUsers(query: string): Promise<UserData[]> {
  if ('demo'.includes(query.trim().toLowerCase())) {
    return [demoUser];
  }
  return apiClient.get<UserData[]>(`/users?q=${encodeURIComponent(query)}`);
}

async function getSessionData(id: string): Promise<SessionWithOwner> {
  const session = demoSessions.find((s) => s.id === id);
  if (session) {
    return { ...session, userId: demoUser.id };
  }
  return apiClient.get<SessionWithOwner>(`/sessions/${encodeURIComponent(id)}`);
}

export const api = {
  users: {
    get: (id: string) => getUserData(id),
    search: (query: string) => searchUsers(query),
    create: (payload: CreateUserPayload) => createUser(payload),
  },
  sessions: {
    get: (id: string) => getSessionData(id),
  },
};
