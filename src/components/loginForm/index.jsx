import React from 'react';
import styles from './form.module.css';


export default function LoginForm({ form, setForm, handleLogin, loading = false }) {

    return (
        <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          className={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={loading}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
     );
}