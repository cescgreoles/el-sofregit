import { FaUtensils, FaShareAlt, FaUserFriends, FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="text-center mb-8 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800">El Sofregit</h1>
        <p className="mt-4 text-lg text-gray-600">
          Descobreix un món de receptes delicioses i saludables. La nostra
          pàgina et permetrà registrar-te, crear el teu perfil i compartir les
          teves creacions culinàries amb altres amants de la cuina.
        </p>
      </header>

      <main className="space-y-8">
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Sobre Nosaltres
          </h2>
          <p className="mt-4 text-gray-600">
            A Receptes Gourmet, volem fomentar la passió per la cuina. La nostra
            plataforma t&apos;ofereix l&apos;oportunitat de penjar les teves
            receptes, veure les creacions d&apos;altres usuaris i inspirar-te
            per cuinar plats deliciosos a casa.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Funcionalitats
          </h2>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center text-gray-600">
              <FaUtensils className="text-yellow-500 mr-2" />
              Crear i gestionar el teu perfil de cuiner.
            </li>
            <li className="flex items-center text-gray-600">
              <FaShareAlt className="text-yellow-500 mr-2" />
              Penjar les teves receptes i compartir-les amb la comunitat.
            </li>
            <li className="flex items-center text-gray-600">
              <FaUserFriends className="text-yellow-500 mr-2" />
              Explorar receptes d&apos;altres usuaris i agafar idees.
            </li>
            <li className="flex items-center text-gray-600">
              <FaStar className="text-yellow-500 mr-2" />
              Guardar les teves receptes preferides.
            </li>
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Uneix-te a Nosaltres!
          </h2>
          <p className="mt-4 text-gray-600">
            Registra&apos;t avui mateix i comença a explorar el món de les
            receptes. És gratis i ràpid!
          </p>
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition-all duration-300">
            Registra&apos;t Ara
          </button>
        </section>
      </main>

      <footer className="text-center mt-8 text-black-500">
        <p>&copy; 2024 El Sofregit. Tots els drets reservats.</p>
      </footer>
    </div>
  );
}
