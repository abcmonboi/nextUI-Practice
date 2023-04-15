import React from "react";
import TableUsers from "../components/TableUsers";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);

  if(user && !user.auth){
    return <>
      <h1>Not authorized</h1>
    </>
  }
  return (
    <>
      <Container>
      <TableUsers />
      </Container>
    </>
  );
};

export default PrivateRoute;
