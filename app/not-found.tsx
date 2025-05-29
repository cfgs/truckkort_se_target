import Link from "next/link";

export default function NotFound() {
  return (
    <div className="prose prose-lg max-w-xl mx-auto text-center mt-20">
      <h1>404 – Sidan kunde inte hittas</h1>
      <p>
        Tyvärr, sidan du letar efter finns inte.
        <br />
        <Link href="/" className="text-blue-600 underline">
          Gå till startsidan
        </Link>
      </p>
    </div>
  );
}
