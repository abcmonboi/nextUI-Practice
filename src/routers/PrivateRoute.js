import React from "react";
import TableUsers from "../components/TableUsers";
import { Container,Grid,Text,Button,Col,Row } from "@nextui-org/react";
import { useSelector } from "react-redux";
import background from "../assets/images/bg-landscape.avif";
import { useNavigate } from "react-router-dom";
const PrivateRoute = () => {
  const {account} = useSelector((state) => state.user);
  const {auth} = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      {account && auth ? (
        <>
          <TableUsers />
        </>
      ) : (
        <Container fluid>
      <Grid.Container
        justify="center"
        css={{
          height: "80vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <Grid xs={8} sm={4} alignitems="center">
        <Col css={{ width: "100%" }}>
          <Text weight="bold" size={70} css={{ textAlign: "center" }}>Yêu cầu đăng nhập
          </Text>
          <Row justify="center">
          <Button
              size="lg"
              auto
              shadow
              color="warning"
              css={{ marginTop: "10px" }}
              onClick={() => navigate("/login")}
            >
              Đăng nhập ngay
            </Button>
            </Row>
          </Col>
        </Grid>
      </Grid.Container>
    </Container>
      )}
    </>
  );
};

export default PrivateRoute;
