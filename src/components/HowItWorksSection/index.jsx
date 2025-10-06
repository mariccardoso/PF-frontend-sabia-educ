import styles from "./howItWorksSection.module.css";
import Link from "next/link";

export default function HowItWorksSection() {
    const steps = [
        {
            number: "01",
            title: "Faça seu Cadastro",
            description: "Crie sua conta como professor ou aluno e acesse nossa plataforma completa",
            icon: "👤"
        },
        {
            number: "02", 
            title: "Escolha as Atividades",
            description: "Navegue por centenas de exercícios organizados por nível de dificuldade",
            icon: "📚"
        },
        {
            number: "03",
            title: "Aprenda Brincando",
            description: "Complete as atividades gamificadas e acompanhe seu progresso em tempo real",
            icon: "🎮"
        },
        {
            number: "04",
            title: "Acompanhe o Desenvolvimento",
            description: "Professores podem visualizar relatórios detalhados do progresso dos alunos",
            icon: "📊"
        }
    ];

    return (
        <section className={styles.howItWorksSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Como Funciona</h2>
                <p className={styles.sectionSubtitle}>
                    Em apenas 4 passos simples, você já estará aproveitando toda a plataforma
                </p>
                
                <div className={styles.stepsContainer}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.stepCard}>
                            <div className={styles.stepNumber}>{step.number}</div>
                            <div className={styles.stepIcon}>{step.icon}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className={styles.stepArrow}>→</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.ctaContainer}>
                    <h3 className={styles.ctaTitle}>Pronto para começar?</h3>
                    <p className={styles.ctaSubtitle}>
                        Junte-se a milhares de educadores e estudantes que já transformaram o aprendizado
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/login" className={styles.primaryButton}>
                            Começar Agora
                        </Link>
                        <Link href="/sobre" className={styles.secondaryButton}>
                            Saiba Mais
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
