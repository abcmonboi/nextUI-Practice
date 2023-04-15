import {
  Navbar,
  Dropdown,
  Avatar,
  Text,
  Button,
  Image,
  Spacer,
} from "@nextui-org/react";
import { Layout } from "../components/Layout";
import React, { useEffect } from "react";
import logoab from "../assets/images/channels4_profile.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleUserLogout } from "../redux/actions/userActions";
import { useState } from "react";
const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.account);
  const auth = useSelector((state) => state.user.auth);
  const [location,setLocation] = useState(window.location.pathname);
  const handleLogout = () => {
    if (user && auth === true) {
      dispatch(handleUserLogout());
      toast.success("Logout successfully");
      navigate("/login");
    }
  };
useEffect(() => {
  setLocation(window.location.pathname);
},[window.location.pathname])
  return (
    <>
      {/* <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          
          <Navbar.Collapse id="basic-navbar-nav">
            {(user || window.location.pathname === "/") && (
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
      </Navbar> */}
      <Layout>
        <Navbar
          maxWidth
          height={"60px"}
          variant={"sticky"}
          containerCss={{
            backgroundColor: "transparent",

            bgBlur: (value) => ({
              bf: 'saturate(100%) blur(2px)',
              bg: value
            }),
          }}
          css={{
            bgBlur: (value) => ({
              bf: 'saturate(100%) blur(2px)',
              bg: value
            }),
            backgroundColor: "transparent",
            borderBottom: "1px solid #2c2c2c",
          }}
        >
          <Navbar.Brand>
            <NavLink to="/">
              <Image
                css={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                }}
                src={logoab}
              ></Image>
            </NavLink>
            <Spacer x={0.5} />
            <Text b color="inherit" hideIn="xs">
              Developer
            </Text>
          </Navbar.Brand>
          <Navbar.Content
            hideIn="xs"
            variant={"underline-rounded"}
            activeColor={"warning"}
          >
            <Navbar.Link onClick={() => navigate("/")} isActive={location ==="/"}>Home</Navbar.Link>
            <Navbar.Link onClick={() => navigate("/user")} isActive={location ==="/user"}>
              Manage User
            </Navbar.Link>
          </Navbar.Content>
          <Navbar.Content></Navbar.Content>

          <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
            {user?.token ? (
             
              <Dropdown placement="bottom-right">
                
                <Navbar.Item>
             
                  <Dropdown.Trigger>
                   
                    <Avatar
                      bordered
                      as="button"
                      color="warning"
                      size="md"
                      src={logoab}
                    />
                  </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu aria-label="User menu actions" color="secondary">
                  <Dropdown.Item
                    key="profile"
                    css={{ height: "$18" }}
                    textValue="Profile"
                  >
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {user && user.email.split("@")[0]}
                    </Text>
                  </Dropdown.Item>

                  <Dropdown.Item
                    textValue="warning"
                    key="logout"
                    withDivider
                    color="warning"
                  >
                    <div onClick={() => handleLogout()}>Log Out</div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Navbar.Item>
                  <Button
                    auto
                    color={"warning"}
                    // as={Link}
                    onPress={() => navigate("/login")}
                  >

                    Login

                  </Button>
                </Navbar.Item>
              </>
            )}
          </Navbar.Content>
        </Navbar>
      </Layout>
    </>
  );
};

export default Header;
