import Link from "next/link";
import Hexagon from "./components/Hexagon";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen p-16 gap-16">
      <Link href="build">
        <Hexagon size={250} content="Créer un build" />
      </Link>
      <Link href="import-build">
        <Hexagon size={250} content="Importer un build" />
      </Link>
    </main>
  );
}
