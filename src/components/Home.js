import React, { Fragment } from "react";
import { Text, Col, Grid, Button } from "@nextui-org/react";
import background from "../assets/images/bg-landscape.avif";
import { useSelector } from "react-redux";
import InfoCard from "./InfoCard";
const Home = () => {
  const user  = useSelector(state => state.user.account);
  return (
    <Fragment>
      <Grid.Container
        justify="center"
        css={{
          height: "600px",
          backgroundImage: `url(${background})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <Grid xs={12} md={8} lg={6} xl={4} alignItems="center">
          <Col css={{ width: "100%" }}>
            <Text weight="bold" size={70} css={{ textAlign: "center" }}>
              {user?.email ? "Welcome" : "Produce by"}
            </Text>
            <Text weight="bold" size={70} css={{ textAlign: "center" }}>
              {user?.email ? user?.email.split("@")[0] : "ABboy"}
            </Text>
            <Button
              size="md"
              shadow
              color="gradient"
              css={{ width: "100%", marginTop: "10px" }}
            >
              Let's Cook Together
            </Button>
          </Col>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2}>
        <Grid xs={12} md={6} lg={4}>
          <InfoCard />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <InfoCard />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <InfoCard />
        </Grid>
      </Grid.Container>
    </Fragment>
  );
};

export default Home;
