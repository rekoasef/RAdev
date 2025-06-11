"use client";
import React from 'react';
import { motion } from 'framer-motion';
// NUEVO: Importamos el icono directamente de la librería 'react-icons'
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    const phoneNumber = "5493471343991";
    const message = "Hola, me gustaría tener mi página web";
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2, ease: "backOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        >
            {/* NUEVO: Usamos el componente del icono importado. Mucho más limpio y seguro. */}
            <FaWhatsapp size={28} />
        </motion.a>
    );
};

export default WhatsAppButton;