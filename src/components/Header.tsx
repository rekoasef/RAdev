"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 group">
    <span className="text-brand-accent font-mono text-lg font-bold">&lt;/&gt;</span>
    <span className="text-xl font-display font-bold text-white">
      RA<span className="text-brand-accent">dev</span>
      <span className="text-brand-text-secondary font-normal">.tech</span>
    </span>
  </Link>
);

const navItems = [
  { label: 'Servicios', selector: '#services' },
  { label: 'Método', selector: '#methodology' },
  { label: 'Proyectos', selector: '#projects' },
  { label: 'Stack', selector: '#tech-stack' },
];

const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (selector: string) => {
    if (pathname === '/') {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/${selector}`);
    }
    onLinkClick?.();
  };

  return (
    <>
      {navItems.map((item) => (
        <motion.li
          key={item.label}
          variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        >
          <button
            onClick={() => handleNavigation(item.selector)}
            className="text-brand-text-secondary hover:text-white transition-colors duration-300 cursor-pointer text-sm font-medium"
          >
            {item.label}
          </button>
        </motion.li>
      ))}
      <motion.li variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
        <button
          onClick={() => handleNavigation('#contact')}
          className="bg-brand-accent text-white py-2 px-5 rounded-lg text-sm font-bold hover:bg-[#E55A00] hover:shadow-accent-glow-sm transition-all duration-300"
        >
          Contactar
        </button>
      </motion.li>
    </>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-30 border-b transition-all duration-500 ${
        scrolled
          ? 'bg-brand-dark/90 backdrop-blur-md border-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      {/* Barra de progreso de lectura */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-brand-accent to-[#FF9350]"
      />
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop nav */}
        <motion.ul
          className="hidden md:flex items-center gap-7"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
          }}
        >
          <NavLinks />
        </motion.ul>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Abrir menú" className="text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-brand-dark z-40"
            >
              <div className="container mx-auto px-6 h-full flex flex-col">
                <div className="flex justify-between items-center py-4">
                  <Logo />
                  <button onClick={toggleMenu} aria-label="Cerrar menú">
                    <X className="text-white w-7 h-7" />
                  </button>
                </div>
                <motion.ul
                  className="flex flex-col items-center justify-center flex-grow gap-8 text-xl"
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                >
                  <NavLinks onLinkClick={toggleMenu} />
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
