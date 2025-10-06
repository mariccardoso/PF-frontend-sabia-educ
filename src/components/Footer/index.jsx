import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerLogo}>Sabiá Educação</h3>
                        <p className={styles.footerDescription}>
                            Plataforma digital inclusiva voltada para auxiliar crianças e jovens na alfabetização, 
                            tornando o aprendizado divertido e acessível.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialLink}>📧</a>
                            <a href="#" className={styles.socialLink}>📱</a>
                            <a href="#" className={styles.socialLink}>🌐</a>
                        </div>
                    </div>
                    
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>Navegação</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/" className={styles.footerLink}>Início</Link></li>
                            <li><Link href="/login" className={styles.footerLink}>Login</Link></li>
                            <li><Link href="/sobre" className={styles.footerLink}>Sobre</Link></li>
                            <li><Link href="/contato" className={styles.footerLink}>Contato</Link></li>
                        </ul>
                    </div>
                    
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>Para Educadores</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/professor" className={styles.footerLink}>Dashboard Professor</Link></li>
                            <li><Link href="/relatorios" className={styles.footerLink}>Relatórios</Link></li>
                            <li><Link href="/metodologia" className={styles.footerLink}>Metodologia</Link></li>
                            <li><Link href="/suporte" className={styles.footerLink}>Suporte</Link></li>
                        </ul>
                    </div>
                    
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>Contato</h4>
                        <div className={styles.contactInfo}>
                            <p>📧 contato@sabiaeducacao.com.br</p>
                            <p>📱 (11) 99999-9999</p>
                            <p>🏢 São Paulo, Brasil</p>
                        </div>
                    </div>
                </div>
                
                <div className={styles.footerBottom}>
                    <div className={styles.footerBottomContent}>
                        <p>&copy; 2024 Sabiá Educação. Todos os direitos reservados.</p>
                        <div className={styles.footerBottomLinks}>
                            <Link href="/privacidade" className={styles.footerBottomLink}>Privacidade</Link>
                            <Link href="/termos" className={styles.footerBottomLink}>Termos de Uso</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
