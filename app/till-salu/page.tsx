import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Truckkort.se är till salu",
  description: "Truckkort.se är till salu",
};

const ForSalePage = () => {
  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Dominerande domänpaket till salu –{" "}
          <span className="text-blue-600">truckkort.se</span>,{" "}
          <span className="text-blue-600">truckkort.nu</span> &{" "}
          <span className="text-blue-600">truckkort.com</span>
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Letar du efter en affärsmöjlighet med{" "}
          <strong>stark organisk trafik</strong>,{" "}
          <strong>låg konkurrensbarriär</strong> och{" "}
          <strong>långsiktig avkastning</strong>? Då är det här domänportföljen
          du inte vill missa.
        </p>

        <div className="bg-gray-100 rounded-2xl p-6 mb-10 shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🚛 truckkort.se – det självklara förstahandsvalet
          </h2>
          <p className="text-gray-700">
            Med exakt matchning på ett av de mest sökta utbildningsrelaterade
            begreppen i Sverige – <em>”truckkort”</em> – ger denna domän{" "}
            <strong>maximalt SEO-värde</strong> och omedelbar auktoritet.
            <br />
            Den är kort, tydlig, minnesvärd och perfekt för både annonsering och
            sökmotoroptimering.
          </p>
        </div>

        <div className="bg-white border-l-4 border-blue-500 pl-6 py-4 mb-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            ✅ Kompletteras av:
          </h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              <strong>truckkort.nu</strong> – ger dig möjligheten att säkra
              ytterligare exponering, skapa kampanjsidor eller styra om trafik.
            </li>
            <li>
              <strong>truckkort.com</strong> – stärker varumärkesskyddet globalt
              och öppnar upp för internationell skalning.
            </li>
          </ul>
        </div>

        <p className="text-lg text-gray-700 mb-10">
          Tillsammans bildar dessa tre domäner{" "}
          <strong>
            Sveriges absolut starkaste portfölj inom truckförarutbildning online
          </strong>{" "}
          – ett strategiskt verktyg för dig som vill ta en ledande position på
          marknaden.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Varför investera?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <strong>Hög efterfrågan:</strong> Tusen­tals googlingar varje
              månad på “truckkort” och relaterade termer.
            </li>
            <li>
              <strong>Tydlig nisch:</strong> Truckutbildning är en stabil och
              växande bransch med återkommande behov.
            </li>
            <li>
              <strong>Passiv inkomstmöjlighet:</strong> Perfekt grund för
              leadgenerering, utbildningsplattform eller affiliateverksamhet.
            </li>
            <li>
              <strong>Starkt SEO-försprång:</strong> EMD-domäner (Exact Match
              Domains) ger dig ett naturligt övertag i sökresultaten.
            </li>
          </ul>
        </div>

        <p className="text-xl text-gray-800 font-medium mb-6">
          Det här är inte bara en domän – det är ett{" "}
          <strong>digitalt försprång</strong>, ett{" "}
          <strong>varumärkesfundament</strong> och en{" "}
          <strong>investering i framtiden</strong>.
        </p>

        <div className="bg-blue-600 text-white rounded-xl px-6 py-5 text-center shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Intresserad?</h2>
          <p className="text-lg">
            Kontakta oss för prisförslag och vidare diskussion.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ForSalePage;
