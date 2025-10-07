import React from "react";
import styles from "./register.module.css";

export default function RegisterForm({
  form,
  setForm,
  handleRegister,
  loading = false,
}) {
  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <div className={styles.fieldGroup}>
        <h3>Dados de Acesso</h3>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={form.username}
          className={styles.input}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          className={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <h3>Informações Pessoais</h3>
        <input
          type="text"
          placeholder="Nome completo"
          value={form.name}
          className={styles.input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={loading}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={form.email}
          className={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading}
          required
        />
        
        <div className={styles.selectContainer}>
          <label className={styles.selectLabel}>Qual é o seu papel?</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className={styles.select}
            disabled={loading}
          >
            <option value="Aluno">Sou estudante</option>
            <option value="Professor">Sou professor(a)</option>
            <option value="Pai">Sou responsável</option>
          </select>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <h3>Conte um pouco sobre você (opcional)</h3>
        <textarea
          placeholder="Escreva uma breve apresentação sobre você, seus interesses ou experiência..."
          value={form.bio}
          className={styles.textarea}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          disabled={loading}
        />
      </div>

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Criando sua conta..." : "Criar minha conta"}
      </button>
    </form>
  );
}
