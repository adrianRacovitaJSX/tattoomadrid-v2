import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ReservaAdminEmail from '@/emails/ReservaAdmin';
import ReservaUserEmail from '@/emails/ReservaUser';

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      phone, 
      artist, 
      tattooDescription, 
      size, 
      placement,
      style,
      references,
      appointmentDate,
      availability
    } = body;

    // Validar los campos obligatorios
    if (!name || !email || !phone || !tattooDescription || !size || !placement || !style || !availability) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Enviar email al administrador
    const adminEmailResponse = await resend.emails.send({
      from: 'Saints & Sinners Tattoo Madrid <notificaciones@tattoomadrid.com>',
      to: process.env.ADMIN_EMAIL || 'snstattoomadrid@gmail.com',
      subject: `Nueva solicitud de reserva de ${name}`,
      react: ReservaAdminEmail({ 
        name, 
        email, 
        phone, 
        artist, 
        tattooDescription, 
        size, 
        placement,
        style,
        references: references || '',
        appointmentDate: appointmentDate || '',
        availability
      }) as React.ReactElement,
    });

    // Enviar email de confirmación al usuario
    const userEmailResponse = await resend.emails.send({
      from: 'Saints & Sinners Tattoo Madrid <notificaciones@tattoomadrid.com>',
      to: email,
      subject: 'Hemos recibido tu solicitud de reserva - Saints & Sinners Tattoo Madrid',
      react: ReservaUserEmail({ 
        name,
        tattooDescription,
        size,
        placement,
        style,
        appointmentDate
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
  } catch (error) {
    console.error('Error al enviar emails de reserva:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

// Configurar el límite del tamaño del cuerpo de la solicitud
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Límite de tamaño para las imágenes
    },
  },
}; 