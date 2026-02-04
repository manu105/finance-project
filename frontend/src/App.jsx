import { useState } from 'react';
import { fetchSecure, loginUser, registerUser } from './api.js';

const initialForm = { username: '', password: '' };

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    await handleAuth(registerUser);
  };

  const handleLogin = async () => {
    await handleAuth(loginUser);
  };

  const handleAuth = async (fn) => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const data = await fn(form);
      setToken(data.token);
      setMessage('Authenticated successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSecure = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const data = await fetchSecure(token);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Finance Platform</h1>
        <p>React + Spring Boot + MySQL + JWT starter</p>
      </header>

      <section className="card">
        <h2>Authentication</h2>
        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="jane.doe"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </label>
        <div className="actions">
          <button onClick={handleRegister} disabled={loading}>
            Register
          </button>
          <button onClick={handleLogin} disabled={loading}>
            Login
          </button>
        </div>
      </section>

      <section className="card">
        <h2>JWT Token</h2>
        <textarea
          readOnly
          value={token}
          placeholder="Token appears here after login/register"
        />
        <button onClick={handleSecure} disabled={!token || loading}>
          Call Secure Endpoint
        </button>
      </section>

      <section className="status">
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </section>
    </div>
  );
}
