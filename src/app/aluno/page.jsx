"use client"; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import styles from './alunoDashboard.module.css';
import Header from '@/components/Header';

export default function DashboardAluno() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [user, setUser] = useState(null);
  const [atividades, setAtividades] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completionPercent, setCompletionPercent] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Converte o userId para número para evitar erro do Prisma
    const userIdInt = Number(parsedUser.id);
    loadData(userIdInt, token);
  }, []);

  const loadData = async (userId, token) => {
    try {
      // Buscar todas as atividades
      const activitiesRes = await axios.get(`${API_URL}/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Buscar progresso do usuário
      const progressRes = await axios.get(`${API_URL}/progress`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId }, // garante que seja número
      });

      const activitiesData = Array.isArray(activitiesRes.data) ? activitiesRes.data : activitiesRes.data.activities || [];
      const progressData = Array.isArray(progressRes.data) ? progressRes.data : progressRes.data.progress || [];

      setAtividades(activitiesData);
      setProgress(progressData);

      // Calcular progresso geral
      const completedCount = progressData.filter(p => p.status === 'Completed').length;
      const percent = activitiesData.length > 0 ? Math.round((completedCount / activitiesData.length) * 100) : 0;
      setCompletionPercent(percent);

      setLoading(false);
    } catch (err) {
      console.error('Erro ao carregar atividades:', err);
      setAtividades([]);
      setProgress([]);
      setLoading(false);
      if (err.response?.status === 401) {
        localStorage.clear();
        router.push('/');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const getProgressStatus = (activityId) => {
    const prog = progress.find(p => p.activityId === activityId);
    if (!prog) return 'Not_Started';
    return prog.status;
  };

  if (loading) return <p className={styles.loading}>Carregando...</p>;

  return (
    <div className={styles.container}>
      <Header buttonText='Sair' onButtonClick={handleLogout} />
      <header className={styles.header}>
        <div>
          <h1>Bem-vindo(a), {user?.name?.split(' ')[0]} 👋</h1>
          <p>Aprenda brincando com as atividades do dia!</p>
        </div>
      </header>

      {/* Barra de progresso geral do aluno */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${completionPercent}%` }}>
          {completionPercent}%
        </div>
      </div>

      <section className={styles.activities}>
        {atividades.length > 0 ? (
          atividades.map((act) => {
            const status = getProgressStatus(act.id);
            return (
              <Link key={act.id} href={`/aluno/atividade/${act.id}`}>
                <div className={`${styles.card} ${styles[act.type.toLowerCase()]}`}>
                  <h3>{act.title}</h3>
                  <p>{act.description}</p>
                  <span className={styles.level}>{act.difficulty}</span>
                  <div className={`${styles.status} ${styles[status.toLowerCase()]}`}>
                    {status === 'Completed' ? 'Concluída' :
                     status === 'In_Progress' ? 'Em andamento' :
                     'Não iniciada'}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className={styles.noActivities}>
            <p>Nenhuma atividade disponível no momento.</p>
          </div>
        )}
      </section>
    </div>
  );
}
