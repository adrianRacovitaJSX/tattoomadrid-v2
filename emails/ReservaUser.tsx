import React from 'react';
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Section,
  Hr,
  Heading,
  Link,
  Row,
  Column
} from '@react-email/components';

interface ReservaUserEmailProps {
  name: string;
  tattooDescription: string;
  size: string;
  placement: string;
  style: string;
  appointmentDate?: string;
}

export const ReservaUserEmail: React.FC<ReservaUserEmailProps> = ({
  name,
  tattooDescription,
  size,
  placement,
  style,
  appointmentDate,
}) => {
  const previewText = `Confirmación de solicitud de reserva - Saints & Sinners Tattoo Madrid`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Hemos recibido tu solicitud de reserva</Heading>
          
          <Text style={paragraph}>Hola {name},</Text>
          <Text style={paragraph}>
            Gracias por elegir Saints & Sinners Tattoo Madrid. Hemos recibido tu solicitud de reserva correctamente.
          </Text>
          <Text style={paragraph}>
            En breve nos pondremos en contacto contigo para confirmar los detalles y fijar una fecha para tu tatuaje.
          </Text>
          
          <Heading as="h3" style={subheading}>Resumen de tu solicitud:</Heading>
          <Section style={detailsSection}>
            <Row style={detailRow}>
              <Column style={detailLabel}>Descripción:</Column>
              <Column style={detailValue}>{tattooDescription}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Tamaño:</Column>
              <Column style={detailValue}>{size}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Ubicación:</Column>
              <Column style={detailValue}>{placement}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Estilo:</Column>
              <Column style={detailValue}>{style}</Column>
            </Row>
            {appointmentDate && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Fecha preferida:</Column>
                <Column style={detailValue}>{appointmentDate}</Column>
              </Row>
            )}
          </Section>
          
          <Section style={noticeSection}>
            <Text style={noticeText}>
              Por favor, ten en cuenta que esta es solo una solicitud. Tu reserva no estará confirmada hasta que te contactemos y acordemos todos los detalles.
            </Text>
          </Section>
          
          <Text style={paragraph}>
            Si tienes alguna pregunta o necesitas modificar tu solicitud, no dudes en contactarnos:
          </Text>
          
          <Section style={contactSection}>
            <Row>
              <Column>
                <Text style={contactItem}>📍 Calle Hermanos Gómez 5 Local 1, 28017 Madrid</Text>
                <Text style={contactItem}>📞 +34 603 21 13 18</Text>
                <Text style={contactItem}>✉️ snstattoomadrid@gmail.com</Text>
              </Column>
            </Row>
          </Section>
          
          <Text style={paragraph}>
            Un saludo,<br />
            El equipo de Saints & Sinners Tattoo Madrid
          </Text>
          
          <Hr style={divider} />
          
          <Text style={footer}>
            Este es un email automático, por favor no respondas a este mensaje.
          </Text>
          
          <Text style={footer}>
            <Link style={footerLink} href="https://www.tattoomadrid.com">www.tattoomadrid.com</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ReservaUserEmail;

// Estilos
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#be8f52',
  padding: '0 0 10px',
  borderBottom: '2px solid #be8f52',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#333',
  margin: '16px 0',
};

const subheading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  margin: '24px 0 8px',
};

const detailsSection = {
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  padding: '16px',
  marginBottom: '20px',
};

const detailRow = {
  marginBottom: '8px',
};

const detailLabel = {
  fontWeight: '600',
  width: '140px',
  paddingRight: '12px',
  fontSize: '14px',
  color: '#555',
  verticalAlign: 'top',
};

const detailValue = {
  fontSize: '14px',
  color: '#333',
  whiteSpace: 'pre-line' as const,
};

const noticeSection = {
  backgroundColor: '#fef9e7',
  borderRadius: '4px',
  borderLeft: '4px solid #be8f52',
  padding: '16px',
  marginBottom: '20px',
};

const noticeText = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#333',
  margin: '0',
};

const contactSection = {
  marginTop: '16px',
  marginBottom: '24px',
};

const contactItem = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#333',
  margin: '4px 0',
};

const divider = {
  borderTop: '1px solid #e1e1e1',
  margin: '32px 0 16px',
};

const footer = {
  fontSize: '12px',
  color: '#777',
  margin: '8px 0',
  textAlign: 'center' as const,
};

const footerLink = {
  color: '#be8f52',
  textDecoration: 'none',
}; 