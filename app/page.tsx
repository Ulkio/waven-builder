import Link from "next/link";
import Hexagon from "./components/Hexagon";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen p-16">
      <Link href="build">
        <Hexagon size={300} content="Créer un build" />
      </Link>
    </main>
  );
}
