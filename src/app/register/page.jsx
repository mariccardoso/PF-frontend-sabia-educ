"use client";
import { useState } from "react";
import styles from "./register.module.css";
import Image from "next/image";
import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "Aluno", // padrão
    bio: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!form.email || !form.password || !form.name || !form.username) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Resposta da API:", response.data);

      if (response.status === 201 || response.status === 200) {
        setSuccess("Cadastro realizado com sucesso!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError("Erro inesperado ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro no registro:", err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === "ERR_NETWORK") {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.main}>
        <div className={styles.leftSection}>
          <div className={styles.presentationContent}>
            <Image
              src="/images/12.png"
              alt="Logo da Sabia Educ"
              width={120}
              height={150}
              className={styles.logo}
            />
            <h1 className={styles.presentationTitle}>
              Bem-vindo à Sabia Educ
            </h1>
            <p className={styles.presentationSubtitle}>
              A plataforma educacional que conecta estudantes, professores e responsáveis 
              em uma jornada de aprendizado colaborativa e inovadora.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <span className={styles.featureText}>
                  Conteúdo personalizado para seu perfil
                </span>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <span className={styles.featureText}>
                  Acompanhamento do progresso em tempo real
                </span>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <span className={styles.featureText}>
                  Comunidade colaborativa de aprendizado
                </span>
              </div>
              
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <span className={styles.featureText}>
                  Recursos interativos e gamificados
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.formContainer}>
            <h2 className={styles.welcome}>Crie sua conta</h2>

            <RegisterForm
              form={form}
              setForm={setForm}
              handleRegister={handleRegister}
              loading={loading}
            />

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}

            <div className={styles.registerLink}>
              Já tem uma conta? <Link href="/login">Entrar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
