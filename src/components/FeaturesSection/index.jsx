import styles from "./featuresSection.module.css";
import Image from "next/image";

export default function FeaturesSection() {
    const features = [
        {
            icon: "🎮",
            title: "Aprendizado Gamificado",
            description: "Atividades interativas e divertidas que transformam o aprendizado em uma aventura emocionante."
        },
        {
            icon: "👥",
            title: "Para Professores e Alunos",
            description: "Dashboards específicos para professores acompanharem o progresso e alunos se divertirem aprendendo."
        },
        {
            icon: "📊",
            title: "Relatórios Detalhados",
            description: "Acompanhe o desenvolvimento de cada criança com relatórios completos e insights valiosos."
        },
        {
            icon: "🎯",
            title: "Metodologia Inclusiva",
            description: "Desenvolvido especialmente para crianças com dificuldades de aprendizagem e necessidades especiais."
        },
        {
            icon: "🌟",
            title: "Interface Amigável",
            description: "Design colorido e intuitivo pensado especialmente para o público infantil."
        },
        {
            icon: "📱",
            title: "Acesso Multiplataforma",
            description: "Funciona em computadores, tablets e smartphones para aprender em qualquer lugar."
        }
    ];

    return (
        <section className={styles.featuresSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Por que escolher o Sabiá Educação?</h2>
                <p className={styles.sectionSubtitle}>
                    Nossa plataforma foi desenvolvida com base em pesquisas pedagógicas para oferecer a melhor experiência de aprendizagem
                </p>
                
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
