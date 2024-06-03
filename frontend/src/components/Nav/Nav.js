import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';

const NavbarHeader = ({children}) => {
  const {t} = useTranslation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">{t('interface.hexletChat')}</Navbar.Brand>
        {children}
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;