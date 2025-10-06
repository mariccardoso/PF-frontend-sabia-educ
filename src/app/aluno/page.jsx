"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import styles from './alunoDashboard.module.css';

export default function DashboardAluno() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Busca atividades do backend autenticado
    axios
      .get('http://localhost:5000/activities', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('Resposta das atividades:', res.data);
        // Garantir que sempre seja um array
        const activitiesData = Array.isArray(res.data) ? res.data : res.data.activities || [];
        setAtividades(activitiesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar atividades:', err);
        setAtividades([]); // Definir como array vazio em caso de erro
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.clear();
          router.push('/');
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) return <p className={styles.loading}>Carregando...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Bem-vindo(a), {user?.name?.split(' ')[0]} 👋</h1>
          <p>Aprenda brincando com as atividades do dia!</p>
        </div>
        <button onClick={handleLogout} className={styles.logout}>
          Sair
        </button>
      </header>

      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>

      <section className={styles.activities}>
        {Array.isArray(atividades) && atividades.length > 0 ? (
          atividades.map((act) => (
            <Link key={act.id} href={`/aluno/atividade/${act.id}`}>
              <div className={`${styles.card} ${styles[act.type.toLowerCase()]}`}>
                <h3>{act.title}</h3>
                <p>{act.description}</p>
                <span className={styles.level}>{act.difficulty}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.noActivities}>
            <p>Nenhuma atividade disponível no momento.</p>
          </div>
        )}
      </section>
    </div>
  );
}
