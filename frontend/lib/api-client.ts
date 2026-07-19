export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    });
  } catch (err) {
    throw new ApiError(0, err instanceof Error ? err.message : 'Network request failed');
  }

  const text = await res.text();
  const body: unknown = text ? JSON.parse(text) : undefined;

  if (!res.ok) {
    const message = (body && typeof body === 'object' && 'message' in body && typeof (body as any).message === 'string')
      ? (body as any).message
      : res.statusText;
    throw new ApiError(res.status, message, body);
  }

  return body as T;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) => request<T>(path, { ...init, method: 'GET' }),
  post: <T>(path: string, data?: unknown, init?: RequestInit) =>
    request<T>(path, { ...init, method: 'POST', body: data !== undefined ? JSON.stringify(data) : undefined }),
};
