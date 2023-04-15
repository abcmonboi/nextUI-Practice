import React from "react";
import TableUsers from "../components/TableUsers";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
  const {account} = useSelector((state) => state.user);
  const {auth} = useSelector((state) => state.user);

  return (
    <>
      {account && auth ? (
        <Container>
          <TableUsers />
        </Container>
      ) : (
        <>
          <h1>Not authorized</h1>
        </>
      )}
    </>
  );
};

export default PrivateRoute;
