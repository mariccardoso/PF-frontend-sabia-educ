import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";

export default function Header({buttonText = "Login", buttonHref = "/login"}) {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Image
                src="/images/SabiaLogo.png"
                alt="Sabiá Educação logo"
                className={styles.logoImage}
                width={180}
                height={60}
                priority
            />
        </div>
        <Link href={buttonHref} className={styles.loginButton}>{buttonText}</Link>
    </header>
  );
}
