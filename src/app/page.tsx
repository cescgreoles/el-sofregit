"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaUtensils, FaShareAlt, FaUserFriends, FaStar } from "react-icons/fa";
import RegisterForm from "../components/RegisterForm";

export default function Home() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const closeForms = () => {
    setShowRegisterForm(false);
  };

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
            A El Sofregit, volem fomentar la passió per la cuina. La nostra
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
          <div className="p-3">
            <Button
              onClick={() => setShowRegisterForm(true)}
              className="bg-black text-white hover:bg-opacity-80"
            >
              Registrar-se
            </Button>
          </div>
        </section>
      </main>

      {showRegisterForm && <RegisterForm onClose={closeForms} />}
    </div>
  );
}
