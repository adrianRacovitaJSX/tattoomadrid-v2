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

interface ReservaAdminEmailProps {
  name: string;
  email: string;
  phone: string;
  artist?: string;
  tattooDescription: string;
  size: string;
  placement: string;
  style: string;
  references: string;
  appointmentDate: string;
  availability: string;
}

export const ReservaAdminEmail: React.FC<ReservaAdminEmailProps> = ({
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
}) => {
  const previewText = `Nueva solicitud de reserva de ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nueva solicitud de reserva</Heading>
          
          <Text style={paragraph}>
            Has recibido una nueva solicitud de reserva a través del formulario web.
          </Text>
          
          <Heading as="h3" style={subheading}>Datos del cliente:</Heading>
          <Section style={detailsSection}>
            <Row style={detailRow}>
              <Column style={detailLabel}>Nombre:</Column>
              <Column style={detailValue}>{name}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Email:</Column>
              <Column style={detailValue}>
                <Link href={`mailto:${email}`} style={link}>{email}</Link>
              </Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Teléfono:</Column>
              <Column style={detailValue}>{phone}</Column>
            </Row>
            {artist && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Artista preferido:</Column>
                <Column style={detailValue}>{artist}</Column>
              </Row>
            )}
          </Section>
          
          <Heading as="h3" style={subheading}>Detalles del tatuaje:</Heading>
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
            <Row style={detailRow}>
              <Column style={detailLabel}>Referencias:</Column>
              <Column style={detailValue}>{references || "No proporcionadas"}</Column>
            </Row>
          </Section>
          
          <Heading as="h3" style={subheading}>Información de cita:</Heading>
          <Section style={detailsSection}>
            <Row style={detailRow}>
              <Column style={detailLabel}>Fecha preferida:</Column>
              <Column style={detailValue}>{appointmentDate || "No especificada"}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Disponibilidad:</Column>
              <Column style={detailValue}>{availability}</Column>
            </Row>
          </Section>
          
          <Text style={actionText}>
            Contacta con el cliente lo antes posible para confirmar los detalles de la reserva.
          </Text>
          
          <Hr style={divider} />
          
          <Text style={footer}>
            Este mensaje ha sido enviado desde el formulario de reserva en <Link style={footerLink} href="https://www.tattoomadrid.com">www.tattoomadrid.com</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ReservaAdminEmail;

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

const subheading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  margin: '24px 0 8px',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#333',
  margin: '16px 0',
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

const link = {
  color: '#be8f52',
  textDecoration: 'none',
};

const actionText = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#333',
  margin: '24px 0',
  padding: '12px',
  backgroundColor: '#fef9e7',
  borderRadius: '4px',
  borderLeft: '4px solid #be8f52',
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