import styles from "./statsSection.module.css";

export default function StatsSection() {
    const stats = [
        {
            number: "95%",
            label: "Taxa de Aproveitamento",
            description: "Das crianças que usam nossa plataforma mostram melhora significativa na leitura"
        },
        {
            number: "500+",
            label: "Atividades Disponíveis",
            description: "Exercícios gamificados para diferentes níveis de aprendizagem"
        },
        {
            number: "1000+",
            label: "Crianças Atendidas",
            description: "Estudantes já beneficiados pela nossa metodologia inclusiva"
        },
        {
            number: "24/7",
            label: "Disponibilidade",
            description: "Plataforma online disponível a qualquer hora e lugar"
        }
    ];

    return (
        <section className={styles.statsSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Resultados que Fazem a Diferença</h2>
                <p className={styles.sectionSubtitle}>
                    Nossos números mostram o impacto real na educação infantil
                </p>
                
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statNumber}>{stat.number}</div>
                            <h3 className={styles.statLabel}>{stat.label}</h3>
                            <p className={styles.statDescription}>{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
