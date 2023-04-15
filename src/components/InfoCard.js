import React from "react";
import { Card, Text, Row, Col, Button } from "@nextui-org/react";
import inforImages from "../assets/images/i.o.jpg";
const InfoCard = () => {
  return (
    <Card>
      <Card.Header css={{ position: "absolute", top: "0" }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            AB Programming
          </Text>
          <Text f4="true" color="white">
            ReactJS
          </Text>
        </Col>
      </Card.Header>
      <Card.Image src={inforImages} />
      <Card.Footer
        isBlurred
        css={{ position: "absolute", bgBlur: "0f111466", bottom: 0 }}
      >
        <Row justify="space-between">
            <Col>
                <Text size={18} color="#d1d1d1">
                    100 Song
                </Text>
            </Col>
            <Col>
            <Row justify="flex-end">
                <Button auto rounded size="sm" color="gradient" >
                  <Text css={{color:"inherit"}}
                  size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Let't Cooking
                  </Text>
                </Button>

            </Row>
            </Col>
        </Row>
      </Card.Footer>
    </Card>
    
  );
};

export default InfoCard;
