"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./atividade.module.css";

const API_URL = "http://localhost:5000";

export default function ActivityClient({ activityId }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!storedUser || !token) {
      router.push("/");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    loadActivityData(parsedUser.id, token);
  }, [activityId]);

  const loadActivityData = async (userIdRaw, token) => {
    try {
      const userId = Number(userIdRaw);
      console.log("Carregando dados da atividade:", { userId, activityId });

      // Buscar atividade
      const activityRes = await axios.get(`${API_URL}/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Atividade carregada:", activityRes.data);
      setActivity(activityRes.data);

      // Buscar progresso do usuário
      const progressRes = await axios.get(`${API_URL}/progress`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId, activityId: Number(activityId) },
      });
      
      console.log("Resposta do progresso:", progressRes.data);

      let prog = null;
      if (Array.isArray(progressRes.data)) {
        prog = progressRes.data.find(p => 
          p.userId === userId && p.activityId === Number(activityId)
        );
      } else if (progressRes.data.progress && Array.isArray(progressRes.data.progress)) {
        prog = progressRes.data.progress.find(p => 
          p.userId === userId && p.activityId === Number(activityId)
        );
      }

      console.log("Progresso encontrado:", prog);

      // Se não existe, cria com In_Progress
      if (!prog) {
        try {
          console.log("Criando novo progresso inicial...");
          const newProgRes = await axios.post(
            `${API_URL}/progress`,
            { 
              userId, 
              activityId: Number(activityId), 
              status: "In_Progress",
              score: 0
            },
            { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }
          );
          prog = newProgRes.data;
          console.log("Novo progresso criado:", prog);
        } catch (createErr) {
          console.error("Erro ao criar progresso inicial:", createErr);
          console.error("Response:", createErr.response?.data);
        }
      }

      setProgress(prog);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar atividade:", err);
      console.error("Response status:", err.response?.status);
      console.error("Response data:", err.response?.data);
      setLoading(false);
      
      if (err.response?.status === 401) {
        localStorage.clear();
        router.push("/");
      }
    }
  };

  const handleComplete = async () => {
    if (!user || !activity || !progress) {
      alert("Dados incompletos. Tente recarregar a página.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      router.push("/");
      return;
    }

    // Validar score
    const finalScore = Math.max(0, Math.min(100, Number(score) || 0));
    setSaving(true);
    
    try {
      console.log("Tentando atualizar progresso:", {
        progressId: progress.id,
        progressObj: progress,
        userId: user.id,
        activityId: activity.id,
        status: "Completed",
        score: finalScore,
        url: `${API_URL}/progress/${progress.id}`
      });

      // Testar se o endpoint existe primeiro
      try {
        const testRes = await axios.get(`${API_URL}/progress/${progress.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Progresso encontrado no servidor:", testRes.data);
      } catch (testErr) {
        console.log("Erro ao buscar progresso específico:", testErr.response?.status);
        if (testErr.response?.status === 404) {
          throw new Error("Progress not found, will create new one");
        }
      }

      const updated = await axios.put(
        `${API_URL}/progress/${progress.id}`,
        { 
          status: "Completed", 
          score: finalScore
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      console.log("Progresso atualizado com sucesso:", updated.data);
      setProgress(updated.data);
      alert(`🎉 Parabéns! Atividade concluída com ${finalScore}% de aproveitamento!`);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/aluno');
      }, 2000);
      
    } catch (err) {
      console.error("Erro completo:", err);
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);
      console.error("Request config:", err.config);
      
      if (err.response?.status === 401) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.clear();
        router.push("/");
      } else if (err.response?.status === 404) {
        alert("Progresso não encontrado. Tentando criar novo registro...");
        await createNewProgress(finalScore, token);
      } else if (err.response?.status === 500) {
        console.log("Erro 500 no PUT, tentando PATCH...");
        try {
          const patchUpdated = await axios.patch(
            `${API_URL}/progress/${progress.id}`,
            { 
              status: "Completed", 
              score: finalScore
            },
            { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }
          );
          console.log("PATCH funcionou:", patchUpdated.data);
          setProgress(patchUpdated.data);
          alert(`🎉 Parabéns! Atividade concluída com ${finalScore}% de aproveitamento!`);
          setTimeout(() => {
            router.push('/aluno');
          }, 2000);
        } catch (patchErr) {
          console.log("PATCH também falhou:", patchErr.response?.data);
          console.log("Tentando PUT apenas com score...");
          try {
            const scoreOnly = await axios.put(
              `${API_URL}/progress/${progress.id}`,
              { score: finalScore },
              { 
                headers: { 
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                } 
              }
            );
            console.log("PUT apenas com score funcionou:", scoreOnly.data);
            setProgress(scoreOnly.data);
            alert(`✅ Pontuação salva: ${finalScore}%`);
            setTimeout(() => {
              router.push('/aluno');
            }, 2000);
          } catch (scoreErr) {
            console.log("PUT apenas com score falhou, criando novo progresso...");
            await createNewProgress(finalScore, token);
          }
        }
      } else if (err.message === "Progress not found, will create new one") {
        console.log("Progresso não existe, criando novo...");
        await createNewProgress(finalScore, token);
      } else {
        alert("Erro ao salvar progresso. Tente novamente.");
      }
    } finally {
      setSaving(false);
    }
  };

  const createNewProgress = async (finalScore, token) => {
    try {
      console.log("Criando novo progresso:", {
        userId: Number(user.id),
        activityId: Number(activity.id),
        status: "Completed",
        score: finalScore
      });

      const newProgress = await axios.post(
        `${API_URL}/progress`,
        {
          userId: Number(user.id),
          activityId: Number(activity.id),
          status: "Completed",
          score: finalScore
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Novo progresso criado:", newProgress.data);
      setProgress(newProgress.data);
      alert(`🎉 Atividade concluída com sucesso! Pontuação: ${finalScore}%`);
      
      setTimeout(() => {
        router.push('/aluno');
      }, 2000);
      
    } catch (createErr) {
      console.error("Erro ao criar novo progresso:", createErr);
      console.error("Detalhes do erro:", createErr.response?.data);
      console.error("Status do erro:", createErr.response?.status);
      
      // Se o POST falhar com 500, tentar apenas com dados mínimos (sem userId)
      if (createErr.response?.status === 500) {
        try {
          console.log("POST falhou, tentando sem userId...");
          const minimalProgress = await axios.post(
            `${API_URL}/progress`,
            {
              activityId: Number(activity.id),
              status: "Completed",
              score: finalScore
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          
          console.log("Progresso criado sem userId:", minimalProgress.data);
          setProgress(minimalProgress.data);
          alert(`✅ Atividade registrada como concluída! Pontuação: ${finalScore}%`);
          
          setTimeout(() => {
            router.push('/aluno');
          }, 2000);
          
        } catch (minimalErr) {
          console.error("Criação mínima também falhou:", minimalErr);
          console.error("Detalhes erro mínimo:", minimalErr.response?.data);
          alert("Não foi possível salvar o progresso. Entre em contato com o suporte.");
        }
      } else {
        alert("Não foi possível salvar o progresso. Entre em contato com o suporte.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.loading}>Carregando atividade...</p>;
  if (!activity) return <p className={styles.error}>Atividade não encontrada</p>;

  const getActivityIcon = (type) => {
    switch (type) {
      case 'Quiz': return '🧩';
      case 'MemoryGame': return '🧠';
      case 'Drag_and_Drop': return '🎯';
      default: return '📚';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return styles.completed;
      case 'In_Progress': return styles.inProgress;
      case 'Not_Started': return styles.notStarted;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      {/* Cabeçalho da atividade */}
      <header className={styles.header}>
        <div className={styles.activityIcon}>
          {getActivityIcon(activity.type)}
        </div>
        <div className={styles.activityInfo}>
          <h1>{activity.title}</h1>
          <p>{activity.description}</p>
          <span className={styles.difficulty}>{activity.difficulty}</span>
        </div>
      </header>

      {/* Status atual */}
      <div className={styles.statusCard}>
        <h3>Status da Atividade</h3>
        <div className={`${styles.statusBadge} ${getStatusColor(progress?.status || 'Not_Started')}`}>
          <span className={styles.statusIcon}>
            {progress?.status === 'Completed' ? '✅' : 
             progress?.status === 'In_Progress' ? '🔄' : '⏳'}
          </span>
          <span className={styles.statusText}>
            {progress?.status === 'Completed' ? 'Concluído' : 
             progress?.status === 'In_Progress' ? 'Em andamento' : 'Não iniciado'}
          </span>
          {progress?.status === 'Completed' && progress?.score && (
            <span className={styles.scoreDisplay}>
              Nota: {progress.score}%
            </span>
          )}
        </div>
      </div>

      {/* Área da atividade */}
      <div className={styles.activityBox}>
        {activity.type === "Quiz" && (
          <div className={styles.quiz}>
            <h3>📝 Questionário Interativo</h3>
            <p>Responda as questões para testar seus conhecimentos!</p>
            
            <div className={styles.quizSection}>
              <div className={styles.questionCard}>
                <p className={styles.question}>Qual é a cor do sol? ☀️</p>
                <div className={styles.options}>
                  <button className={styles.option}>🟡 Amarelo</button>
                  <button className={styles.option}>🔵 Azul</button>
                  <button className={styles.option}>🔴 Vermelho</button>
                  <button className={styles.option}>🟢 Verde</button>
                </div>
              </div>
            </div>

            <div className={styles.scoreInput}>
              <label>Pontuação obtida:</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Digite sua nota (0-100)"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className={styles.scoreField}
              />
            </div>
          </div>
        )}

        {activity.type === "MemoryGame" && (
          <div className={styles.memory}>
            <h3>🧠 Jogo da Memória</h3>
            <p>Encontre os pares iguais para completar o desafio!</p>
            
            <div className={styles.memoryGrid}>
              <div className={styles.memoryCard}>🍎</div>
              <div className={styles.memoryCard}>🍌</div>
              <div className={styles.memoryCard}>🍎</div>
              <div className={styles.memoryCard}>🍌</div>
              <div className={styles.memoryCard}>🍓</div>
              <div className={styles.memoryCard}>🍓</div>
            </div>

            <div className={styles.scoreInput}>
              <label>Pontuação obtida:</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Digite sua nota (0-100)"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className={styles.scoreField}
              />
            </div>
          </div>
        )}

        {activity.type === "Drag_and_Drop" && (
          <div className={styles.dragdrop}>
            <h3>🎯 Arrastar e Soltar</h3>
            <p>Arraste os elementos para a posição correta!</p>
            
            <div className={styles.dragArea}>
              <div className={styles.dragItems}>
                <div className={styles.dragItem}>🌅 Manhã</div>
                <div className={styles.dragItem}>🌞 Tarde</div>
                <div className={styles.dragItem}>🌙 Noite</div>
              </div>
              
              <div className={styles.dropZones}>
                <div className={styles.dropZone}>1º</div>
                <div className={styles.dropZone}>2º</div>
                <div className={styles.dropZone}>3º</div>
              </div>
            </div>

            <div className={styles.scoreInput}>
              <label>Pontuação obtida:</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Digite sua nota (0-100)"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className={styles.scoreField}
              />
            </div>
          </div>
        )}
      </div>

      {/* Botão de conclusão */}
      <div className={styles.actionArea}>
        <button 
          onClick={handleComplete} 
          className={styles.completeBtn}
          disabled={progress?.status === 'Completed' || saving}
        >
          {saving ? '💾 Salvando...' : 
           progress?.status === 'Completed' ? '✅ Já Concluído!' : 
           '🎉 Finalizar Atividade'}
        </button>
      </div>
    </div>
  );
}
