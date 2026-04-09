"use client";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      console.log("logout data >>> ", data);
      setUser(null);
      router.push("/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <nav className="w-full z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <Image src={"/uptrix-logo_3.svg"} width={88} height={25} />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-(--gray) hover:text-(--primary) transition-colors"
            >
              Product
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-primary text-(--gray) hover:text-(--primary)"
            >
              Features
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-(--gray) hover:text-(--primary) transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-(--gray) hover:text-(--primary) transition-colors"
            >
              Docs
            </Link>
            {}
            {user && !loading ? (
              <button
                type="button"
                onClick={handleLogout}
                className="bg-(--primary) text-bg-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Logout
              </button>
            ) : (
              !loading && (
                <div className="space-x-3">
                  <Link
                    href={"/register"}
                    className="bg-(--primary) text-bg-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href={"/login"}
                    className="bg-[#10B77F1A] text-bg-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors text-white"
                  >
                    Login
                  </Link>
                </div>
              )
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-dark border-b border-white/5 px-4 pt-2 pb-6 flex flex-col gap-4">
          <Link href="/" className="text-lg font-medium text-gray-400">
            Product
          </Link>
          <Link href="/" className="text-lg font-medium text-primary">
            Features
          </Link>
          <Link href="/" className="text-lg font-medium text-gray-400">
            Pricing
          </Link>
          <Link href="/" className="text-lg font-medium text-gray-400">
            Docs
          </Link>
          {user ? (
            <button
              type="button"
              className="bg-(--primary) text-bg-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-3">
              <Link
                href={"/register"}
                className="bg-(--primary) text-bg-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href={"/login"}
                className="bg-[#10B77F1A] text-bg-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors text-white"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
