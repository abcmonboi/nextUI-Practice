import React from "react";
import {AiFillFacebook} from "react-icons/ai";
import { Card, Text, Row, Col, Button } from "@nextui-org/react";
const InfoCard = (srcImage) => {
  return (
    <Card css={{ w: "100%", h: "400px" }} variant isPressable>
      <Card.Header css={{ position: "absolute", top: "0" }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            Web Developer
          </Text>
          <Text f4="true" color="white">
            Lê Nhữ Bắc
          </Text>
        </Col>
      </Card.Header>
      <Card.Image src={srcImage} width="100%" height="100%" objectFit="cover" />
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={12}>
              lenhubac1999@gmail.com
            </Text>
            <Text color="#000" size={12}>
              Available
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button flat auto rounded color="warning">
                <a
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  href="https://www.facebook.com/abboypd"
                >
                  <div
                    style={{
                      display: "flex",
                      alignitems: "center",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <AiFillFacebook />
                  {"Connect"}
                  </div>
                </a>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default InfoCard;
