import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoab from "../assets/images/channels4_profile.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);
  const handleLogout = () => {
    if (user && user.auth === true) {
      logout();
      toast.success("Logout successfully");
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            {" "}
            <NavLink to="/" className="nav-link">
              <img
                src={logoab}
                style={{
                  marginRight: "10px",
                  borderRadius: "50%",
                }}
                alt="logo"
                width="40"
                height="40"
                className="d-inline-block"
              ></img>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle hidden={!user?.auth}  aria-controls="basic-navbar-nav" />
          <Navbar.Collapse  id="basic-navbar-nav">
            {(user.auth || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link" activeclassname="active">
                    Home
                  </NavLink>
                  {user && user.email && (
                    <NavLink
                      to="/users"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Manage User
                    </NavLink>
                  )}
                </Nav>
                <Nav>
                  {user && user.email && (
                    <span className="nav-link text-white">
                      {"Hello "}
                      {user && user.email.toUpperCase().split("@")[0]}
                    </span>
                  )}
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <>
                        <NavDropdown.Item onClick={() => handleLogout()}>
                          Logout
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <NavDropdown.Item onClick={() => navigate("/login")}>
                        Login
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
