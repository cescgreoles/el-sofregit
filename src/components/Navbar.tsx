"use client";

import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../server/config.firebase";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => signOut(auth);

  return (
    <nav className="bg-black bg-opacity-70 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white italic text-xl font-bold">
          El Sofregit
        </Link>

        <ul className="hidden md:flex space-x-6 text-white">
          <li>
            <Link href="/">Inici</Link>
          </li>
          <li>
            <Link href="/recipes">Receptes</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link href="/perfil">Perfil</Link>
            </li>
          )}
        </ul>

        <div className="hidden md:flex space-x-4">
          {!isAuthenticated ? (
            <>
              <Button
                onClick={() => setShowLoginForm(true)}
                className="bg-black bg-opacity-70"
              >
                Iniciar Sessió
              </Button>
              <Button onClick={() => setShowRegisterForm(true)}>
                Registrar-se
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Logout
            </Button>
          )}
        </div>

        <Button className="md:hidden text-white" onClick={toggleMenu}>
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </Button>
      </div>

      {menuOpen && (
        <div className="md:hidden  text-white">
          <ul className="flex flex-col items-center space-y-2 py-4">
            <li>
              <Link href="/">Inici</Link>
            </li>
            <li>
              <Link href="/receptes">Receptes</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link href="/perfil">Perfil</Link>
              </li>
            )}
            {!isAuthenticated ? (
              <>
                <li>
                  <Button
                    onClick={() => setShowLoginForm(true)}
                    className="bg-black bg-opacity-70"
                  >
                    Iniciar Sessió
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => setShowRegisterForm(true)}
                    className="bg-black bg-opacity-70"
                  >
                    Registrar-se
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button onClick={handleLogout} className="">
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}

      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
      {showRegisterForm && (
        <RegisterForm onClose={() => setShowRegisterForm(false)} />
      )}
    </nav>
  );
};

export default Navbar;
