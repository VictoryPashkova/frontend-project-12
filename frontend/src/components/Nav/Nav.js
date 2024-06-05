import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';

const NavbarHeader = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">{t('interface.hexletChat')}</Navbar.Brand>
        {children}
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
