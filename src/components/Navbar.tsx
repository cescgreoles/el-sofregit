"use client";

import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../server/config.firebase";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { FaUtensils, FaUser, FaHome } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLogout = () => signOut(auth);

  const isActive = (path: string) => pathname === path;

  const closeForms = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  return (
    <nav className="bg-white p-4 text-black shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          <span className="text-black italic text-xl font-bold">
            El Sofregit
          </span>
        </Link>

        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              href="/"
              className={`hover:text-yellow-500 ${
                isActive("/") ? "text-yellow-500 font-semibold" : "text-black"
              }`}
            >
              <FaHome className="inline-block mr-1" /> Inici
            </Link>
          </li>
          <li>
            <Link
              href="/recipes"
              className={`hover:text-yellow-500 ${
                isActive("/recipes")
                  ? "text-yellow-500 font-semibold"
                  : "text-black"
              }`}
            >
              <FaUtensils className="inline-block mr-1" /> Receptes
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                href="/profile"
                className={`hover:text-yellow-500 ${
                  isActive("/perfil")
                    ? "text-yellow-500 font-semibold"
                    : "text-black"
                }`}
              >
                <FaUser className="inline-block mr-1" /> Perfil
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden md:flex space-x-4">
          {!isAuthenticated ? (
            <>
              <Button
                onClick={() => setShowLoginForm(true)}
                className="bg-black text-white hover:bg-opacity-80"
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
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </Button>
          )}
        </div>

        <Button className="md:hidden text-black" onClick={toggleMenu}>
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
        <div className="md:hidden text-black">
          <ul className="flex flex-col items-center space-y-2 py-4">
            <li>
              <Link
                href="/"
                className={`hover:text-yellow-500 ${
                  isActive("/") ? "text-yellow-500 font-semibold" : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Inici
              </Link>
            </li>
            <li>
              <Link
                href="/recipes"
                className={`hover:text-yellow-500 ${
                  isActive("/recipes")
                    ? "text-yellow-500 font-semibold"
                    : "text-black"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Receptes
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  href="/profile"
                  className={`hover:text-yellow-500 ${
                    isActive("/perfil")
                      ? "text-yellow-500 font-semibold"
                      : "text-black"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Perfil
                </Link>
              </li>
            )}
            {!isAuthenticated ? (
              <>
                <li>
                  <Button
                    onClick={() => {
                      setShowLoginForm(true);
                      setMenuOpen(false);
                    }}
                    className="bg-black text-white hover:bg-opacity-80"
                  >
                    Iniciar Sessió
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      setShowRegisterForm(true);
                      setMenuOpen(false);
                    }}
                    className="bg-black text-white hover:bg-opacity-80"
                  >
                    Registrar-se
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}

      {(showLoginForm || showRegisterForm) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {showLoginForm && (
              <LoginForm
                onClose={() => {
                  setShowLoginForm(false);
                  closeForms();
                }}
              />
            )}
            {showRegisterForm && (
              <RegisterForm
                onClose={() => {
                  setShowRegisterForm(false);
                  closeForms();
                }}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
