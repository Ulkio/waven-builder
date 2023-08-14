import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen p-16 gap-16 ">
      <Link href="build">
        <Image
          src="/img/hexagon-create-build.png"
          alt="créer un build"
          width={300}
          height={300}
          className="hover:cursor-pointer hover:-translate-y-4 transition duration-200 ease-in-out"
        />
      </Link>
      <Link
        href={{
          pathname: "build",
          query: { import: true },
        }}>
        <Image
          src="/img/hexagon-import-build.png"
          alt="importer un build"
          width={300}
          height={300}
          className="hover:cursor-pointer hover:-translate-y-4 transition duration-200 ease-in-out"
        />
      </Link>
      <footer className="py-2 fixed flex text-center  w-1/2 bottom-0">
        <p className="text-xs opacity-50">
          © 2023 Waven est un jeu vidéo édité par Ankama. ce site est un site non-officiel sans affiliation avec Ankama.
          Certaines illustrations sont la propriété d&apos;Ankama Studio et de Waven - Tous droits réservés
        </p>
      </footer>
    </main>
  );
}
