"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../page.module.css';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'Aluno' 
  });
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Implementar lógica de registro aqui
    console.log('Registro:', form);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>Sabiá 🌿</h1>
      <p className={styles.subtitle}>Criar nova conta</p>

      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          placeholder="Nome completo"
          value={form.name}
          className={styles.input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          className={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <select 
          value={form.role} 
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className={styles.input}
        >
          <option value="Aluno">Aluno</option>
          <option value="Professor">Professor</option>
        </select>
        
        {error && <p className={styles.error}>{error}</p>}
        
        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>

      <p className={styles.registerLink}>
        Já tem uma conta? <Link href="/">Faça login</Link>
      </p>

      <footer className={styles.footer}>© 2025 Sabiá Educação Infantil</footer>
    </div>
  );
}
