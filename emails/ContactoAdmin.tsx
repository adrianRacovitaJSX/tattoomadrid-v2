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
  Heading
} from '@react-email/components';

interface ContactoAdminEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  artist?: string;
  message: string;
}

export const ContactoAdminEmail: React.FC<ContactoAdminEmailProps> = ({
  name,
  email,
  phone,
  subject,
  artist,
  message
}) => {
  const previewText = `Nuevo mensaje de contacto: ${subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nuevo mensaje de contacto</Heading>
          
          <Section style={section}>
            <Text style={infoLabel}>Nombre:</Text>
            <Text style={infoValue}>{name}</Text>
            
            <Text style={infoLabel}>Email:</Text>
            <Text style={infoValue}>{email}</Text>
            
            {phone && (
              <>
                <Text style={infoLabel}>Teléfono:</Text>
                <Text style={infoValue}>{phone}</Text>
              </>
            )}
            
            <Text style={infoLabel}>Asunto:</Text>
            <Text style={infoValue}>{subject}</Text>
            
            {artist && (
              <>
                <Text style={infoLabel}>Artista seleccionado:</Text>
                <Text style={infoValue}>{artist}</Text>
              </>
            )}
          </Section>
          
          <Heading as="h3" style={messageHeading}>Mensaje:</Heading>
          <Section style={messageSection}>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Hr style={divider} />
          
          <Text style={footer}>
            Este mensaje fue enviado desde el formulario de contacto de Saints & Sinners Tattoo Madrid.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactoAdminEmail;

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

const section = {
  padding: '16px',
  backgroundColor: '#f8f8f8',
  borderRadius: '4px',
  marginTop: '20px',
};

const infoLabel = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#333',
  margin: '8px 0 2px',
};

const infoValue = {
  fontSize: '14px',
  color: '#555',
  margin: '0 0 10px',
  lineHeight: '1.4',
};

const messageHeading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  margin: '24px 0 8px',
};

const messageSection = {
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
};

const messageText = {
  fontSize: '14px',
  color: '#555',
  margin: '0',
  lineHeight: '1.6',
  whiteSpace: 'pre-line',
};

const divider = {
  borderTop: '1px solid #e1e1e1',
  margin: '32px 0 16px',
};

const footer = {
  fontSize: '12px',
  color: '#777',
  margin: '0',
  textAlign: 'center' as const,
}; 