"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/form" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white border-b border-gray-200 shadow-sm"
          : "bg-white/95 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-sm font-black">C</span>
            </div>
            <span className="text-black font-bold text-xl tracking-tight">
              Chat<span className="text-gray-400">pro</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-black rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-black rounded-full group-hover:w-4 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <a
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-black rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  Profile
                </a>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all duration-200 hover:border-gray-400"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="px-5 py-2 text-sm font-semibold text-white rounded-lg bg-black hover:bg-gray-800 shadow-sm transition-all duration-200 hover:scale-105"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 text-black"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="flex flex-col gap-1.5 w-5"
            >
              <motion.span
                variants={{
                  open: { rotate: 45, y: 8 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-full bg-black rounded-full origin-center"
              />
              <motion.span
                variants={{
                  open: { opacity: 0, scaleX: 0 },
                  closed: { opacity: 1, scaleX: 1 },
                }}
                transition={{ duration: 0.2 }}
                className="block h-0.5 w-full bg-black rounded-full"
              />
              <motion.span
                variants={{
                  open: { rotate: -45, y: -8 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-full bg-black rounded-full origin-center"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:text-black rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="pt-2 border-t border-gray-100 space-y-1">
                {session ? (
                  <>
                    <motion.a
                      href="/profile"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.06 }}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-black rounded-xl hover:bg-gray-100 transition-all duration-200"
                    >
                      <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                        {session.user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      Profile
                    </motion.a>
                    <motion.button
                      onClick={() => signOut()}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + 1) * 0.06 }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:text-black rounded-xl hover:bg-gray-100 transition-all duration-200"
                    >
                      Sign Out
                    </motion.button>
                  </>
                ) : (
                  <motion.a
                    href="/login"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.06 }}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center mx-2 px-4 py-3 text-sm font-semibold text-white rounded-xl bg-black hover:bg-gray-800 transition-all duration-200"
                  >
                    Login
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
