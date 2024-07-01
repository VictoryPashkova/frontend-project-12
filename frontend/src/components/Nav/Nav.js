import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';

const NavbarHeader = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <Navbar.Brand href={routes.home()}>{t('interface.hexletChat')}</Navbar.Brand>
        {children}
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
