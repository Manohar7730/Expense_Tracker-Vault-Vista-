import { NavbarContainer, LogoImage, Title } from "../styles/Navbar";
import VaultVista from "../assets/images/Vault.png";

function Navbar() {
  return (
    <NavbarContainer>
      <a href="/" style={{ width: "30px", height: "100%" }}>
        <LogoImage src={VaultVista} alt="Logo" />
      </a>
      <Title>Vault Vista</Title>
    </NavbarContainer>
  );
}

export default Navbar;
