import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactoAdminEmail from '@/emails/ContactoAdmin';
import ContactoUserEmail from '@/emails/ContactoUser';

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Extraer datos del cuerpo de la solicitud
    const body = await req.json();
    const { name, email, phone, subject, artist, message } = body;
    
    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Enviar email al administrador
    const adminEmailResponse = await resend.emails.send({
      from: 'Saints & Sinners Tattoo Madrid <notificaciones@tattoomadrid.com>',
      to: process.env.ADMIN_EMAIL || 'snstattoomadrid@gmail.com',
      subject: `Nuevo mensaje de contacto: ${subject || 'Consulta general'}`,
      react: ContactoAdminEmail({ 
        name, 
        email, 
        phone, 
        subject: subject || 'Consulta general', 
        artist, 
        message 
      }) as React.ReactElement,
    });

    // Enviar email de confirmación al usuario
    const userEmailResponse = await resend.emails.send({
      from: 'Saints & Sinners Tattoo Madrid <notificaciones@tattoomadrid.com>',
      to: email,
      subject: 'Hemos recibido tu mensaje - Saints & Sinners Tattoo Madrid',
      react: ContactoUserEmail({ 
        name, 
        subject: subject || 'Consulta general', 
        message 
      }) as React.ReactElement,
    });

    return NextResponse.json(
      { 
        success: true, 
        adminEmailId: adminEmailResponse.data?.id,
        userEmailId: userEmailResponse.data?.id 
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error al enviar emails de contacto:', error);
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud', 
        details: error instanceof Error ? error.message : 'Error desconocido' 
      },
      { status: 500 }
    );
  }
} 