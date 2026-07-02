"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { titleVariants } from '@/utils/animations';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

const contactChannels = [
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Respuesta inmediata',
    href: `https://wa.me/5493471343991?text=${encodeURIComponent('Hola, me gustaría tener mi página web')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'radevelopment02@gmail.com',
    href: 'mailto:radevelopment02@gmail.com',
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = "w-full bg-brand-dark/60 border border-brand-border rounded-xl p-3.5 text-brand-text-primary placeholder-brand-text-secondary/50 focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-300 outline-none text-sm";
  const labelClass = "block text-xs font-semibold text-brand-text-secondary mb-2 tracking-wide uppercase";

  return (
    <section id="contact" className="relative bg-brand-dark py-24 overflow-hidden">

      {/* Glow ambiental (radial-gradient, sin filtro blur) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,101,0,0.05) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-14"
        >
          <TerminalPrompt command="ssh radev --contacto" />
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-brand-text-secondary text-lg max-w-xl mx-auto">
            Hablemos de tu proyecto. Completa el formulario y te respondo a la brevedad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">

          {/* ═══ IZQUIERDA: CANALES DE CONTACTO ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-brand-surface border border-brand-border rounded-2xl p-5 hover:border-brand-accent/30 hover:bg-[#181818] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/[0.08] flex items-center justify-center text-brand-accent flex-shrink-0 group-hover:bg-brand-accent/15 group-hover:scale-110 transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-brand-text-primary font-bold font-display text-sm">{channel.label}</p>
                    <p className="text-brand-text-secondary text-sm truncate">{channel.value}</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-brand-text-secondary group-hover:text-brand-accent group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                </a>
              );
            })}

            {/* Info extra */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 space-y-4 flex-grow">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-brand-accent flex-shrink-0" />
                <p className="text-brand-text-secondary text-sm">Armstrong, Santa Fe · Argentina</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-brand-accent flex-shrink-0" />
                <p className="text-brand-text-secondary text-sm">Respondo en menos de 24 hs</p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <p className="text-brand-text-primary text-sm font-medium">Disponible para nuevos proyectos</p>
              </div>
            </div>
          </motion.div>

          {/* ═══ DERECHA: FORMULARIO ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 bg-brand-surface border border-brand-border rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>Nombre</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    required placeholder="Tu nombre"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    required placeholder="tu@email.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>Mensaje</label>
                <textarea
                  id="message" name="message" rows={6}
                  value={formData.message} onChange={handleChange}
                  required placeholder="Contame sobre tu proyecto..."
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-brand-accent text-white font-bold py-4 px-8 rounded-xl text-base hover:bg-[#E55A00] hover:shadow-accent-glow hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje →'}
              </button>
            </form>

            {status === 'success' && (
              <p className="mt-5 text-center text-green-400 text-sm font-medium">
                ✓ ¡Mensaje enviado! Me pondré en contacto pronto.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-5 text-center text-red-400 text-sm font-medium">
                Hubo un error al enviar. Por favor intentá de nuevo.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
