"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./atividade.module.css";

const API_URL = "http://localhost:5000";

// Função para gerar perguntas default de acordo com o tema
const defaultQuestions = (title) => {
  title = title.toLowerCase();

  if (title.includes("animais")) {
    return [
      {
        question: "Qual desses é um animal marinho?",
        options: [
          { text: "🐔 Galinha", correct: false },
          { text: "🐬 Golfinho", correct: true },
          { text: "🐈 Gato", correct: false },
        ],
      },
      {
        question: "Qual desses voa?",
        options: [
          { text: "🦅 Águia", correct: true },
          { text: "🐄 Vaca", correct: false },
          { text: "🐍 Cobra", correct: false },
        ],
      },
    ];
  } else if (title.includes("cores")) {
    return [
      {
        question: "Qual dessas cores é primária?",
        options: [
          { text: "Verde", correct: false },
          { text: "Vermelho", correct: true },
          { text: "Rosa", correct: false },
        ],
      },
      {
        question: "Qual dessas cores se mistura para fazer laranja?",
        options: [
          { text: "Azul + Vermelho", correct: false },
          { text: "Vermelho + Amarelo", correct: true },
          { text: "Amarelo + Verde", correct: false },
        ],
      },
    ];
  } else if (title.includes("frutas")) {
    return [
      {
        question: "Qual fruta é vermelha?",
        options: [
          { text: "🍎 Maçã", correct: true },
          { text: "🍌 Banana", correct: false },
          { text: "🍇 Uva", correct: false },
        ],
      },
      {
        question: "Qual fruta é amarela?",
        options: [
          { text: "🍌 Banana", correct: true },
          { text: "🍎 Maçã", correct: false },
          { text: "🍇 Uva", correct: false },
        ],
      },
    ];
  } else if (title.includes("palavras")) {
    return [
      {
        question: "Qual palavra corresponde à imagem da 🐶?",
        options: [
          { text: "Cachorro", correct: true },
          { text: "Gato", correct: false },
          { text: "Peixe", correct: false },
        ],
      },
      {
        question: "Qual palavra corresponde à imagem da 🍎?",
        options: [
          { text: "Maçã", correct: true },
          { text: "Banana", correct: false },
          { text: "Laranja", correct: false },
        ],
      },
    ];
  } else if (title.includes("organizando")) {
    return [
      {
        question: "Qual atividade deve ser feita primeiro?",
        options: [
          { text: "Escovar os dentes", correct: false },
          { text: "Acordar", correct: true },
          { text: "Ir à escola", correct: false },
        ],
      },
      {
        question: "O que deve vir depois de acordar?",
        options: [
          { text: "Ir à escola", correct: false },
          { text: "Escovar os dentes", correct: true },
          { text: "Tomar banho", correct: false },
        ],
      },
    ];
  } else if (title.includes("montando")) {
    return [
      {
        question: "O que acontece primeiro em uma história de um dia na fazenda?",
        options: [
          { text: "O sol nasce", correct: true },
          { text: "Os animais vão dormir", correct: false },
          { text: "O almoço é servido", correct: false },
        ],
      },
      {
        question: "O que acontece por último?",
        options: [
          { text: "O sol nasce", correct: false },
          { text: "Os animais vão dormir", correct: true },
          { text: "O café da manhã", correct: false },
        ],
      },
    ];
  } else {
    return [
      {
        question: "Qual é a resposta correta?",
        options: [
          { text: "Opção 1", correct: false },
          { text: "Opção 2", correct: true },
          { text: "Opção 3", correct: false },
        ],
      },
    ];
  }
};

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

      const act = { ...activityRes.data };

      // Garante perguntas coerentes com o tema
      if (!act.questions || act.questions.length === 0) {
        act.questions = defaultQuestions(act.title);
      }

      setActivity(act);

      let prog = Array.isArray(progressRes.data)
        ? progressRes.data.find(
            (p) => p.userId === userId && p.activityId === Number(activityId)
          )
        : null;

      if (!prog) {
        const newProgRes = await axios.post(
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
        prog = newProgRes.data.progress || newProgRes.data;
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

  const handleAnswer = async (isCorrect) => {
    if (!progress?.id) {
      alert("Erro: progresso não inicializado corretamente.");
      return;
    }

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
          completedAt: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProgress(updated.data.progress || updated.data);

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

      {activity.questions.map((q, index) => (
        <div key={index} className={styles.quiz}>
          <h3>🧩 Pergunta {index + 1}</h3>
          <p className={styles.question}>{q.question}</p>
          <div className={styles.options}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.correct)}
                disabled={saving || selected}
                className={
                  selected === "right" && opt.correct
                    ? styles.right
                    : selected === "wrong" && !opt.correct
                    ? styles.wrong
                    : ""
                }
              >
                {opt.text}
              </button>
            ))}
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
      ))}
    </div>
  );
}
