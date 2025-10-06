"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import styles from "./professorDashboard.module.css";

export default function DashboardProfessor() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalActivities: 0,
    completedActivities: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);

  // Inicialização e verificação de autenticação
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "Professor") {
      router.push("/");
      return;
    }

    setUser(parsedUser);
    loadDashboardData(token);
  }, []);

  // Função para carregar todos os dados do dashboard
  const loadDashboardData = async (token) => {
    try {
      // Carregar alunos
      const studentsRes = await axios.get(`${API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { role: "Aluno" },
      });

      // Carregar atividades
      const activitiesRes = await axios.get(`${API_URL}/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Carregar progresso
      const progressRes = await axios.get(`${API_URL}/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Normalizar dados
      const studentsData = Array.isArray(studentsRes.data)
        ? studentsRes.data
        : studentsRes.data.users || [];
      const activitiesData = Array.isArray(activitiesRes.data)
        ? activitiesRes.data
        : activitiesRes.data.activities || [];
      const progressData = Array.isArray(progressRes.data)
        ? progressRes.data
        : progressRes.data.progress || [];

      setStudents(studentsData);
      setActivities(activitiesData);
      setProgress(progressData);

      // Estatísticas
      const completedCount = progressData.filter(
        (p) => p.status === "Completed"
      ).length;
      const totalScore = progressData.reduce(
        (sum, p) => sum + (p.score || 0),
        0
      );
      const avgScore =
        progressData.length > 0 ? (totalScore / progressData.length).toFixed(1) : 0;

      setStats({
        totalStudents: studentsData.length,
        totalActivities: activitiesData.length,
        completedActivities: completedCount,
        averageScore: avgScore,
      });

      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setLoading(false);
      if (err.response?.status === 401) {
        localStorage.clear();
        router.push("/");
      }
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  // Ícones por tipo de atividade
  const getActivityTypeIcon = (type) => {
    switch (type) {
      case "Quiz":
        return "🧩";
      case "MemoryGame":
        return "🧠";
      case "Drag_and_Drop":
        return "🎯";
      default:
        return "📚";
    }
  };

  // Cores por status de progresso
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return styles.completed;
      case "In_Progress":
        return styles.inProgress;
      case "Not_Started":
        return styles.notStarted;
      default:
        return "";
    }
  };

  if (loading) return <p className={styles.loading}>Carregando dashboard...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Olá, {user?.name?.split(" ")[0]} 👩‍🏫</h1>
          <p>Acompanhe o progresso dos seus alunos</p>
        </div>
        <button onClick={handleLogout} className={styles.logout}>
          Sair
        </button>
      </header>

      {/* Cards de Estatísticas */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statInfo}>
            <h3>{stats.totalStudents}</h3>
            <p>Alunos</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statInfo}>
            <h3>{stats.totalActivities}</h3>
            <p>Atividades</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <h3>{stats.completedActivities}</h3>
            <p>Concluídas</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statInfo}>
            <h3>{stats.averageScore}%</h3>
            <p>Média Geral</p>
          </div>
        </div>
      </div>

      <div className={styles.dashboardContent}>
        {/* Lista de Alunos */}
        <section className={styles.studentsSection}>
          <h2>👥 Meus Alunos</h2>
          <div className={styles.studentsList}>
            {students.length > 0 ? (
              students.map((student) => {
                const studentProgress = progress.filter(
                  (p) => p.userId === student.id
                );
                const completedCount = studentProgress.filter(
                  (p) => p.status === "Completed"
                ).length;
                const progressPercent =
                  studentProgress.length > 0
                    ? Math.round((completedCount / studentProgress.length) * 100)
                    : 0;

                return (
                  <Link key={student.id} href={`/professor/aluno/${student.id}`}>
                    <div className={styles.studentCard}>
                      <div className={styles.studentAvatar}>
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.studentInfo}>
                        <h4>{student.name}</h4>
                        <p>{student.bio || "Sem descrição"}</p>
                        <div className={styles.studentProgress}>
                          <span>Progresso: {progressPercent}%</span>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className={styles.noData}>
                <p>Nenhum aluno cadastrado ainda.</p>
              </div>
            )}
          </div>
        </section>

        {/* Lista de Atividades */}
        <section className={styles.activitiesSection}>
          <h2>📚 Atividades Disponíveis</h2>
          <div className={styles.activitiesList}>
            {activities.length > 0 ? (
              activities.map((activity) => {
                const activityProgress = progress.filter(
                  (p) => p.activityId === activity.id
                );
                const completedCount = activityProgress.filter(
                  (p) => p.status === "Completed"
                ).length;

                return (
                  <div key={activity.id} className={styles.activityCard}>
                    <div className={styles.activityIcon}>
                      {getActivityTypeIcon(activity.type)}
                    </div>
                    <div className={styles.activityInfo}>
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <div className={styles.activityMeta}>
                        <span className={styles.difficulty}>
                          {activity.difficulty}
                        </span>
                        <span className={styles.completions}>
                          {completedCount} alunos concluíram
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.noData}>
                <p>Nenhuma atividade disponível.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Progresso Recente */}
      <section className={styles.recentProgress}>
        <h2>📈 Atividades Recentes</h2>
        <div className={styles.progressList}>
          {progress.length > 0 ? (
            progress
              .slice(-5)
              .reverse()
              .map((item, index) => {
                const student = students.find((s) => s.id === item.userId);
                const activity = activities.find(
                  (a) => a.id === item.activityId
                );

                if (!student || !activity) return null;

                return (
                  <div
                    key={`progress-${item.id || index}-${item.userId}-${item.activityId}`}
                    className={styles.progressItem}
                  >
                    <div className={styles.progressStudent}>
                      <div className={styles.miniAvatar}>
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{student.name}</span>
                    </div>
                    <div className={styles.progressActivity}>
                      <span>
                        {getActivityTypeIcon(activity.type)} {activity.title}
                      </span>
                    </div>
                    <div
                      className={`${styles.progressStatus} ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status === "Completed"
                        ? "Concluído"
                        : item.status === "In_Progress"
                        ? "Em andamento"
                        : "Não iniciado"}
                    </div>
                    <div className={styles.progressScore}>{item.score || 0}%</div>
                  </div>
                );
              })
          ) : (
            <div className={styles.noData}>
              <p>Nenhum progresso registrado ainda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
