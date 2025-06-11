"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { titleVariants, containerVariants, itemVariants } from '@/utils/animations';

const ContactSection = () => {
  // Estados para manejar los datos del formulario y el estado del envío
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Esta línea es la que previene que la página se recargue
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
        setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-brand-surface/30 py-20">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <motion.h2 variants={titleVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-3xl md:text-4xl font-bold text-brand-text-primary mb-4">
          ¿Listo para empezar?
        </motion.h2>
        <motion.p variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-brand-text-secondary mb-8 text-lg">
          Hablemos de tu proyecto. Completa el formulario y me pondré en contacto contigo a la brevedad.
        </motion.p>
        
        {/* El 'onSubmit' aquí es el que llama a nuestra función */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary mb-1">Nombre</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-brand-surface border border-gray-600 rounded-md p-3 text-brand-text-primary focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-brand-text-secondary mb-1">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-brand-surface border border-gray-600 rounded-md p-3 text-brand-text-primary focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-brand-text-secondary mb-1">Mensaje</label>
            <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full bg-brand-surface border border-gray-600 rounded-md p-3 text-brand-text-primary focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-all"></textarea>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <button type="submit" disabled={status === 'submitting'} className="bg-brand-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </motion.div>
        </form>

        {status === 'success' && <p className="mt-4 text-green-400">¡Mensaje enviado con éxito! Gracias por contactarme.</p>}
        {status === 'error' && <p className="mt-4 text-red-400">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>}
      </div>
    </section>
  );
};

export default ContactSection;