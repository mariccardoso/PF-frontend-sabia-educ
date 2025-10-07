"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './alunoDetalhes.module.css';

export default function AlunoDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [progress, setProgress] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || user.role !== 'Professor') {
      router.push('/');
      return;
    }

    loadStudentData(token);
  }, [id]);

  const loadStudentData = async (token) => {
    try {
      // Carregar dados do aluno
      const studentRes = await axios.get(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Carregar progresso do aluno
      const progressRes = await axios.get(`http://localhost:5000/progress/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Carregar todas as atividades
      const activitiesRes = await axios.get('http://localhost:5000/activities', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudent(studentRes.data);
      setProgress(Array.isArray(progressRes.data) ? progressRes.data : progressRes.data.progress || []);
      setActivities(Array.isArray(activitiesRes.data) ? activitiesRes.data : activitiesRes.data.activities || []);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao carregar dados do aluno:', err);
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return '✅';
      case 'In_Progress': return '🔄';
      case 'Not_Started': return '⏳';
      default: return '❓';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Completed': return 'Concluído';
      case 'In_Progress': return 'Em andamento';
      case 'Not_Started': return 'Não iniciado';
      default: return 'Desconhecido';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return styles.excellentScore;
    if (score >= 60) return styles.goodScore;
    if (score >= 40) return styles.averageScore;
    return styles.poorScore;
  };

  const calculateOverallProgress = () => {
    if (progress.length === 0) return 0;
    const completed = progress.filter(p => p.status === 'Completed').length;
    return Math.round((completed / progress.length) * 100);
  };

  const calculateAverageScore = () => {
    const completedProgress = progress.filter(p => p.status === 'Completed' && p.score > 0);
    if (completedProgress.length === 0) return 0;
    const total = completedProgress.reduce((sum, p) => sum + p.score, 0);
    return Math.round(total / completedProgress.length);
  };

  if (loading) return <p className={styles.loading}>Carregando dados do aluno...</p>;
  if (!student) return <p className={styles.error}>Aluno não encontrado.</p>;

  return (
    <div className={styles.container}>
      {/* Cabeçalho com info do aluno */}
      <header className={styles.header}>
        <Link href="/professor" className={styles.backButton}>
          ← Voltar
        </Link>
        <div className={styles.studentHeader}>
          <div className={styles.studentAvatar}>
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.studentInfo}>
            <h1>{student.name}</h1>
            <p>{student.bio || 'Sem descrição disponível'}</p>
            <span className={styles.email}>{student.email}</span>
          </div>
        </div>
      </header>

      {/* Cards de estatísticas do aluno */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statInfo}>
            <h3>{calculateOverallProgress()}%</h3>
            <p>Progresso Geral</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statInfo}>
            <h3>{calculateAverageScore()}%</h3>
            <p>Média de Notas</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <h3>{progress.filter(p => p.status === 'Completed').length}</h3>
            <p>Atividades Concluídas</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statInfo}>
            <h3>{progress.length}</h3>
            <p>Total de Atividades</p>
          </div>
        </div>
      </div>

      {/* Barra de progresso geral */}
      <div className={styles.overallProgress}>
        <h3>Progresso Geral do Aluno</h3>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${calculateOverallProgress()}%` }}
          ></div>
        </div>
        <span>{calculateOverallProgress()}% concluído</span>
      </div>

      {/* Lista detalhada de atividades */}
      <section className={styles.activitiesSection}>
        <h2>📝 Detalhamento por Atividade</h2>
        <div className={styles.activitiesList}>
          {activities.map((activity) => {
            const activityProgress = progress.find(p => p.activityId === activity.id);
            
            return (
              <div key={activity.id} className={styles.activityCard}>
                <div className={styles.activityHeader}>
                  <div className={styles.activityIcon}>
                    {activity.type === 'Quiz' ? '🧩' : 
                     activity.type === 'MemoryGame' ? '🧠' : '🎯'}
                  </div>
                  <div className={styles.activityInfo}>
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className={styles.difficulty}>{activity.difficulty}</span>
                  </div>
                </div>
                
                <div className={styles.activityProgress}>
                  <div className={styles.statusBadge}>
                    {getStatusIcon(activityProgress?.status || 'Not_Started')}
                    <span>{getStatusText(activityProgress?.status || 'Not_Started')}</span>
                  </div>
                  
                  {activityProgress?.status === 'Completed' && (
                    <div className={`${styles.scoreBadge} ${getScoreColor(activityProgress.score || 0)}`}>
                      {activityProgress.score || 0}%
                    </div>
                  )}
                  
                  {activityProgress?.completedAt && (
                    <div className={styles.completedDate}>
                      Concluído em: {new Date(activityProgress.completedAt).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Seção de observações/notas */}
      <section className={styles.notesSection}>
        <h2>📋 Observações Pedagógicas</h2>
        <div className={styles.notesCard}>
          <p><strong>Perfil do Aluno:</strong> {student.bio || 'Nenhuma informação adicional disponível.'}</p>
          
          <div className={styles.recommendations}>
            <h4>💡 Recomendações:</h4>
            <ul>
              {calculateAverageScore() >= 80 && (
                <li>Aluno com excelente desempenho! Considere atividades mais desafiadoras.</li>
              )}
              {calculateAverageScore() < 60 && (
                <li>Aluno pode se beneficiar de revisões e apoio adicional.</li>
              )}
              {progress.filter(p => p.status === 'In_Progress').length > 2 && (
                <li>Muitas atividades em andamento. Considere orientar para finalizar uma por vez.</li>
              )}
              {progress.filter(p => p.status === 'Not_Started').length === 0 && (
                <li>Aluno engajado! Todas as atividades foram iniciadas.</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
