import styles from "./heroSection.module.css";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Aprender a ler é difícil. Nós fazemos ser divertido!</h1>
                <p className={styles.heroSubtitle}>Sabiá Educação é uma plataforma digital inclusiva voltada para auxiliar crianças e jovens na alfabetização.</p>
                <Link href="/login" className={styles.ctaButton}>Comece Agora</Link>
            </div>
            <div className={styles.heroIlustration}>
                <Image
                    src="/images/hero-image.png"
                    alt="Imagem ilustrativa de crianças aprendendo"
                    width={550}
                    height={350}
                    priority
                />
                </div>
                <div className={styles.hillTopImageContainer}>
                    <Image
                        src="/images/topHill.png"
                        alt="Imagem de transição para prox section"
                        width={1500}
                        height={150}
                        className={styles.hillBottomImage}
                        priority
                    />
                    <div className={styles.hillBottomImageOverlay}>
                        <Image
                            src="/images/bottomHill.png"
                            alt="Imagem de transição para prox section"
                            width={1500}
                            height={200}
                            className={styles.hillBottomImage}
                            priority
                        /> 
                    </div>
            </div>
        </section>
    );
}
