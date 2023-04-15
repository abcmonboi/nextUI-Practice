import React from "react";
import TableUsers from "../components/TableUsers";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
  const {account} = useSelector((state) => state.user);
  const {auth} = useSelector((state) => state.user);

  return (
    <>
      {account && auth ? (
        <>
          <TableUsers />
        </>
      ) : (
        <>
          <h1>Not authorized</h1>
        </>
      )}
    </>
  );
};

export default PrivateRoute;
