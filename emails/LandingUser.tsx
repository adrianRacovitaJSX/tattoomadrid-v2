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
} from '@react-email/components';

interface LandingUserEmailProps {
  name: string;
}

export const LandingUserEmail: React.FC<LandingUserEmailProps> = ({ name }) => {
  return (
    <Html>
      <Head />
      <Preview>Hemos recibido tu consulta, {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>¡Gracias, {name}!</Heading>

          <Section style={section}>
            <Text style={text}>
              Hemos recibido tu solicitud de consulta gratuita en Saints &amp; Sinners by Gamboa.
            </Text>
            <Text style={text}>
              Te contactaremos <strong>en menos de 2 horas</strong> para confirmar la cita y resolver cualquier duda.
            </Text>
            <Text style={text}>
              Si tienes fotos de referencia o ideas, puedes responder a este email con ellas. Nos ayudarán a preparar la consulta.
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            Saints &amp; Sinners by Gamboa · Ciudad Lineal, Madrid
          </Text>
          <Text style={footer}>
            @saintsandsinnersmadrid
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default LandingUserEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = { margin: '0 auto', padding: '20px 0 48px', maxWidth: '600px' };

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#be8f52',
  padding: '0 0 10px',
  borderBottom: '2px solid #be8f52',
};

const section = { padding: '16px', marginTop: '20px' };
const text = { fontSize: '15px', color: '#333', lineHeight: '1.7', margin: '0 0 14px' };
const divider = { borderTop: '1px solid #e1e1e1', margin: '32px 0 16px' };
const footer = { fontSize: '12px', color: '#777', margin: '4px 0', textAlign: 'center' as const };
