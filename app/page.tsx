import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";
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
      <Analytics />
    </main>
  );
}
