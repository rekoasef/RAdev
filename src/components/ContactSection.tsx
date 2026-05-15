"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { titleVariants, itemVariants } from '@/utils/animations';

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

  const inputClass = "w-full bg-brand-surface border border-brand-border rounded-xl p-3.5 text-brand-text-primary placeholder-brand-text-secondary/50 focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all duration-300 outline-none text-sm";
  const labelClass = "block text-xs font-semibold text-brand-text-secondary mb-2 tracking-wide uppercase";

  return (
    <section id="contact" className="bg-brand-dark py-24">
      <div className="container mx-auto px-6 max-w-xl">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">Contacto</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-brand-text-secondary text-lg">
            Hablemos de tu proyecto. Completa el formulario y te respondo a la brevedad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="bg-brand-surface border border-brand-border rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className={labelClass}>Nombre</label>
              <input
                type="text" id="name" name="name"
                value={formData.name} onChange={handleChange}
                required placeholder="Tu nombre"
                className={inputClass}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                required placeholder="tu@email.com"
                className={inputClass}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className={labelClass}>Mensaje</label>
              <textarea
                id="message" name="message" rows={5}
                value={formData.message} onChange={handleChange}
                required placeholder="Contame sobre tu proyecto..."
                className={inputClass}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-brand-accent text-white font-bold py-4 px-8 rounded-xl text-base hover:bg-[#E55A00] hover:shadow-accent-glow hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje →'}
              </button>
            </motion.div>
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
    </section>
  );
};

export default ContactSection;
