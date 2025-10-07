"use client";
import { useState } from 'react';
import styles from './login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import LoginForm from '@/components/loginForm';
import Link from 'next/link';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.email || !form.password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/login', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Resposta da API:', response.data);

      const { token, userExists } = response.data;

      if (!token || !userExists) {
        throw new Error('Erro: resposta da API incompleta.');
      }

      // Salvar token e usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userExists));

      // Redirecionar de acordo com o papel do usuário
      const role = userExists.role?.toLowerCase();

      if (role === 'aluno') {
        router.push('/aluno/');
      } else if (role === 'professor' || role === 'pai') {
        router.push('/professor/');
      } else {
        router.push('/');
      }

    } catch (err) {
      console.error('Erro no login:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === 'ERR_NETWORK') {
        setError('Erro de conexão. Verifique se o servidor está rodando.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header buttonText='Conheça a Sabiá' buttonHref='/' />
      <Image
        src="/images/11.png"
        alt="mascote"
        width={150}
        height={180}
        className={styles.mascote}
      />

      <h2 className={styles.welcome}>Preencha os campos para acessar sua conta</h2>

      <LoginForm
        form={form}
        setForm={setForm}
        handleLogin={handleLogin}
        loading={loading}
      />

      {error && <p className={styles.error}>{error}</p>}

      <h3 className={styles.registerLink}>
        Não tem uma conta? <Link href="/register">Cadastre-se</Link>
      </h3>
    </div>
  );
}
