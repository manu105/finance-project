export async function registerUser(payload) {
  return request('/api/auth/register', payload);
}

export async function loginUser(payload) {
  return request('/api/auth/login', payload);
}

export async function fetchSecure(token) {
  return request('/api/secure', undefined, token);
}

async function request(path, body, token) {
  const response = await fetch(path, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(data || response.statusText);
  }

  return data;
}
