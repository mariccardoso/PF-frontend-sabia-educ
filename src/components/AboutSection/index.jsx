import styles from "./aboutSection.module.css";

export default function AboutSection() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.container}>
                <div className={styles.contentGrid}>
                    <div className={styles.textContent}>
                        <h2 className={styles.sectionTitle}>Nossa Metodologia</h2>
                        <p className={styles.sectionSubtitle}>
                            O Sabiá Educação foi desenvolvido com base em pesquisas científicas sobre 
                            alfabetização e inclusão educacional.
                        </p>
                        
                        <div className={styles.methodologyPoints}>
                            <div className={styles.methodologyPoint}>
                                <div className={styles.pointIcon}>🧠</div>
                                <div className={styles.pointContent}>
                                    <h3>Neuroaprendizagem</h3>
                                    <p>Atividades baseadas em como o cérebro processa informações de leitura e escrita</p>
                                </div>
                            </div>
                            
                            <div className={styles.methodologyPoint}>
                                <div className={styles.pointIcon}>🎨</div>
                                <div className={styles.pointContent}>
                                    <h3>Design Inclusivo</h3>
                                    <p>Interface adaptada para crianças com dislexia, TDAH e outras necessidades especiais</p>
                                </div>
                            </div>
                            
                            <div className={styles.methodologyPoint}>
                                <div className={styles.pointIcon}>🎯</div>
                                <div className={styles.pointContent}>
                                    <h3>Personalização</h3>
                                    <p>Algoritmo que adapta a dificuldade conforme o progresso individual de cada criança</p>
                                </div>
                            </div>
                            
                            <div className={styles.methodologyPoint}>
                                <div className={styles.pointIcon}>📈</div>
                                <div className={styles.pointContent}>
                                    <h3>Acompanhamento Real</h3>
                                    <p>Métricas detalhadas que ajudam educadores a identificar dificuldades específicas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.visualContent}>
                        <div className={styles.achievementCard}>
                            <h3 className={styles.achievementTitle}>Reconhecimentos</h3>
                            <div className={styles.achievements}>
                                <div className={styles.achievement}>
                                    <span className={styles.achievementIcon}>🏆</span>
                                    <span>Prêmio Inovação Educacional 2024</span>
                                </div>
                                <div className={styles.achievement}>
                                    <span className={styles.achievementIcon}>🎓</span>
                                    <span>Aprovado pela Universidade de São Paulo</span>
                                </div>
                                <div className={styles.achievement}>
                                    <span className={styles.achievementIcon}>✅</span>
                                    <span>Certificado pelo MEC</span>
                                </div>
                                <div className={styles.achievement}>
                                    <span className={styles.achievementIcon}>🌟</span>
                                    <span>5 estrelas no Google Play</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.testimonialCard}>
                            <h3 className={styles.testimonialTitle}>Depoimento</h3>
                            <blockquote className={styles.testimonialQuote}>
                                "Em apenas 3 meses usando o Sabiá, minha filha que tinha dificuldades 
                                para ler agora devora livros! A plataforma realmente funciona."
                            </blockquote>
                            <div className={styles.testimonialAuthor}>
                                - Maria Silva, mãe da Ana (7 anos)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
