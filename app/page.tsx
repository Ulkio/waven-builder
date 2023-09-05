import Link from "next/link";
import Image from "next/image";
import Header from "./layout/Header";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center gap-16 p-16 ">
      <Header />

      <Link href="build">
        <Image
          src="/img/hexagon-create-build.png"
          alt="créer un build"
          width={300}
          height={300}
          className="transition duration-500 ease-in-out hover:-translate-y-4 hover:scale-105 hover:cursor-pointer"
        />
      </Link>

      <footer className="fixed bottom-0 flex px-4 py-2 text-center">
        <p className="w-full text-center text-xs opacity-50">
          © 2023 Waven est un jeu vidéo édité par Ankama. ce site est un site
          non-officiel sans affiliation avec Ankama. Certaines illustrations
          sont la propriété d&apos;Ankama Studio et de Waven - Tous droits
          réservés
        </p>
      </footer>
    </main>
  );
}
