"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./atividade.module.css";
import { motion } from "framer-motion";

export default function Atividade() {
  const { id } = useParams(); // ✅ pega o id dinamicamente da URL
  const router = useRouter();
  const [atividade, setAtividade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(60);
  const [completed, setCompleted] = useState(false);

  // Carrega dados da atividade
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    if (id) {
      axios
        .get(`http://localhost:5000/activities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAtividade(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar atividade:", err);
          setLoading(false);
        });
    }
  }, [id]);

  // Timer simples
  useEffect(() => {
    if (timer > 0 && !completed) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, completed]);

  const handleAnswer = (correct) => {
    if (correct) {
      setFeedback("Acertou! 🎉");
      new Audio("/sounds/success.mp3").play();
    } else {
      setFeedback("Tente novamente 💪");
      new Audio("/sounds/error.mp3").play();
    }

    if (correct) {
      setCompleted(true);
      setTimeout(() => router.push("/aluno/"), 2500);
    }
  };

  if (loading) return <p className={styles.loading}>Carregando atividade...</p>;
  if (!atividade) return <p className={styles.error}>Atividade não encontrada.</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{atividade.title}</h1>
        <p>{atividade.description}</p>
      </header>

      <div className={styles.timer}>
        Tempo restante: <span>{timer}s</span>
      </div>

      <motion.div
        className={styles.activityBox}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {atividade.type === "Quiz" && (
          <div className={styles.quiz}>
            <p>Qual dessas é uma fruta?</p>
            <div className={styles.options}>
              <button onClick={() => handleAnswer(true)}>🍎 Maçã</button>
              <button onClick={() => handleAnswer(false)}>🚗 Carro</button>
              <button onClick={() => handleAnswer(false)}>🐶 Cachorro</button>
            </div>
          </div>
        )}

        {atividade.type === "MemoryGame" && (
          <div className={styles.memory}>
            <p>Combine os pares iguais!</p>
            <div className={styles.memoryGrid}>
              <div>🍓</div>
              <div>🍓</div>
              <div>🍌</div>
              <div>🍌</div>
            </div>
            <button onClick={() => handleAnswer(true)}>Concluí</button>
          </div>
        )}

        {atividade.type === "Drag_and_Drop" && (
          <div className={styles.dragdrop}>
            <p>Arraste as figuras para a sequência correta!</p>
            <div className={styles.dragBox}>
              <span>☀️</span>
              <span>🍽️</span>
              <span>🌙</span>
            </div>
            <button onClick={() => handleAnswer(true)}>Enviar resposta</button>
          </div>
        )}
      </motion.div>

      {feedback && (
        <motion.div
          className={`${styles.feedback} ${
            feedback.includes("Acertou") ? styles.success : styles.errorFeedback
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {feedback}
        </motion.div>
      )}
    </div>
  );
}