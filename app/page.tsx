import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";
import Header from "./layout/Header";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen p-16 gap-16 ">
      <Header />

      <Link href="build">
        <Image
          src="/img/hexagon-create-build.png"
          alt="créer un build"
          width={300}
          height={300}
          className="hover:cursor-pointer hover:-translate-y-4 hover:scale-105 transition duration-500 ease-in-out"
        />
      </Link>

      <footer className="py-2 fixed flex text-center bottom-0 px-4">
        <p className="text-xs opacity-50 text-center w-full">
          © 2023 Waven est un jeu vidéo édité par Ankama. ce site est un site non-officiel sans affiliation avec Ankama.
          Certaines illustrations sont la propriété d&apos;Ankama Studio et de Waven - Tous droits réservés
        </p>
      </footer>
      <Analytics />
    </main>
  );
}
