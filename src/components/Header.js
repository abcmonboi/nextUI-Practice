import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoab from "../assets/images/channels4_profile.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { handleUserLogout } from "../redux/actions/userActions";
const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.account);
  const auth = useSelector(state => state.user.auth);
  const handleLogout = () => {
    if (user && auth === true 
      ) {
      dispatch(handleUserLogout());
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse  id="basic-navbar-nav">
            {( user || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link" activeclassname="active">
                    Home
                  </NavLink>
                
                    <NavLink
                      to="/users"
                      className="nav-link"
                      activeclassname="active"
                    >
                      Manage User
                    </NavLink>
               
                </Nav>
                <Nav>
                  {user?.token && (
                    <span className="nav-link text-white">
                      {"Hello "}
                      {user && user.email.toUpperCase().split("@")[0]}
                    </span>
                  )}
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    {user?.token ? (
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
