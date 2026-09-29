import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// La API Key se lee automáticamente desde tu archivo .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

// Escapa el texto del usuario antes de interpolarlo en el HTML del mail.
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    // Validación simple para asegurarse de que los campos no están vacíos
    if (!name || !email || !message) {
      return new NextResponse('Faltan campos requeridos en el formulario.', { status: 400 });
    }

    // Envío del correo usando la configuración de Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['radevelopment02@gmail.com'], // Tu email de destino
      subject: `Nuevo Mensaje de Contacto de ${name.replace(/[\r\n]+/g, ' ')}`,
      replyTo: email, // Permite responder directamente al cliente
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Nuevo mensaje desde tu Portfolio</h2>
          <hr>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 1em; margin: 0;">
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </blockquote>
        </div>
      `,
    });

    // Si el correo se envía con éxito, responde con los datos
    return NextResponse.json(data);

  } catch (error) {
    // Si hay algún error en el proceso, se captura aquí
    console.error("Error en la API de contacto:", error);
    return NextResponse.json({ error: 'Hubo un error al enviar el mensaje.' }, { status: 500 });
  }
}