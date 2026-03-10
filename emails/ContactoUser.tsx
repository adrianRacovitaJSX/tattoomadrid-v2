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

interface ContactoUserEmailProps {
  name: string;
  subject: string;
  message: string;
}

export const ContactoUserEmail: React.FC<ContactoUserEmailProps> = ({
  name,
  subject,
  message
}) => {
  const previewText = `Hemos recibido tu mensaje - Saints & Sinners Tattoo Madrid`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Hemos recibido tu mensaje</Heading>
          
          <Text style={paragraph}>Hola {name},</Text>
          <Text style={paragraph}>
            Gracias por contactar con Saints & Sinners Tattoo Madrid. Hemos recibido tu mensaje correctamente.
          </Text>
          <Text style={paragraph}>
            Nos pondremos en contacto contigo lo antes posible para responder a tu consulta sobre: "{subject}".
          </Text>
          
          <Heading as="h3" style={subheading}>Resumen de tu mensaje:</Heading>
          <Section style={messageSection}>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Text style={paragraph}>Si tienes alguna otra pregunta, no dudes en contactarnos:</Text>
          
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

export default ContactoUserEmail;

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

const messageSection = {
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  marginBottom: '20px',
};

const messageText = {
  fontSize: '14px',
  color: '#555',
  margin: '0',
  lineHeight: '1.6',
  whiteSpace: 'pre-line',
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