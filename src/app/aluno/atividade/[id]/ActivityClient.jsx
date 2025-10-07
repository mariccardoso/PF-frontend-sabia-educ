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
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    loadActivity(parsedUser.id, token);
  }, [activityId]);

  // 🔹 Carregar atividade e progresso
  const loadActivity = async (userId, token) => {
    try {
      const [activityRes, progressRes] = await Promise.all([
        axios.get(`${API_URL}/activities/${activityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId, activityId: Number(activityId) },
        }),
      ]);

      setActivity(activityRes.data);

      let prog = Array.isArray(progressRes.data)
        ? progressRes.data.find(
            (p) =>
              p.userId === userId && p.activityId === Number(activityId)
          )
        : null;

      if (!prog) {
        const newProg = await axios.post(
          `${API_URL}/progress`,
          {
            userId,
            activityId: Number(activityId),
            status: "In_Progress",
            score: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        prog = newProg.data;
      }

      setProgress(prog);
    } catch (error) {
      console.error("Erro ao carregar atividade:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Quando o aluno escolhe uma resposta
  const handleAnswer = async (isCorrect) => {
    setSelected(isCorrect ? "right" : "wrong");
    setFeedback(isCorrect ? "Acertou! 🎉" : "Tente novamente 💪");

    const finalScore = isCorrect ? 100 : 0;
    const token = localStorage.getItem("token");

    try {
      setSaving(true);
      const updated = await axios.put(
        `${API_URL}/progress/${progress.id}`,
        {
          status: "Completed",
          score: finalScore,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProgress(updated.data);

      if (isCorrect) {
        setTimeout(() => router.push("/aluno"), 2500);
      }
    } catch (err) {
      console.error("Erro ao salvar progresso:", err);
      alert("Erro ao salvar. Verifique o backend.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.loading}>Carregando atividade...</p>;
  if (!activity) return <p className={styles.error}>Atividade não encontrada.</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{activity.title}</h1>
        <p>{activity.description}</p>
      </header>

      {/* QUIZ SIMPLES */}
      {activity.type === "Quiz" && (
        <div className={styles.quiz}>
          <h3>🧩 Escolha a resposta correta:</h3>
          <p className={styles.question}>Qual desses é um animal marinho?</p>
          <div className={styles.options}>
            <button
              onClick={() => handleAnswer(false)}
              disabled={saving || selected}
              className={
                selected === "wrong" ? styles.wrong : ""
              }
            >
              🐔 Galinha
            </button>
            <button
              onClick={() => handleAnswer(true)}
              disabled={saving || selected}
              className={
                selected === "right" ? styles.right : ""
              }
            >
              🐬 Golfinho
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={saving || selected}
              className={
                selected === "wrong" ? styles.wrong : ""
              }
            >
              🐈 Gato
            </button>
          </div>

          {feedback && (
            <p
              className={`${styles.feedback} ${
                selected === "right" ? styles.success : styles.errorFeedback
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      )}

      {/* Outras atividades desativadas por enquanto */}
      {activity.type !== "Quiz" && (
        <p className={styles.comingSoon}>
          🧠 Este tipo de atividade ainda está sendo configurado.
        </p>
      )}
    </div>
  );
}
