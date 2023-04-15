import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLoginRedux } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Text,
  Button,
  Grid,
  Col,
  Input,
  Row,
  Loading,
  Spacer,
} from "@nextui-org/react";
import { BiHomeAlt } from "@react-icons/all-files/bi/BiHomeAlt";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const { isLogging, auth, account, isError } = useSelector(
    (state) => state.user
  );
  const handleLogin = async () => {
    if (email.length === 0 || password.length === 0) {
      toast.error("Email or password is empty");
      return;
    } else {
      dispatch(handleLoginRedux(email.trim(), password.trim()));
    }
  };
  useEffect(() => {
    if (auth && localStorage.getItem("token")) {
      toast.success("Welcome back " + account.email);
      navigate("/");
    } else if (auth === false && isLogging === false && isError) {
      toast.error("Wrong email or password");
    }
    //eslint-disable-next-line
  }, [auth, isLogging]);

  return (
    <Container fluid>
      <Grid.Container
        justify="center"
        css={{ height: "600px", backgroundImage: "" }}
      >
        <Grid xs={8} sm={3} alignItems="center">
          <Col justify="center" span={12} alignItems="center">
            <Text weight={"bold"} size={70} css={{ textAlign: "center" }}>
              Welcome
            </Text>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              clearable
              bordered
              css={{ width: "100%" }}
              label="Email Address"
              placeholder="eve.holt@reqres.in"
            />
            <Input.Password
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              clearable
              bordered
              css={{ width: "100%" }}
              label="Password"
              placeholder="cityslicka"
            />
            <Row justify="center">
              <Button
                disabled={
                  email.length === 0 || password.length === 0 || isLogging
                }
                bordered
                css={{ textAlign: "center", marginTop: "38px" }}
                auto
                shadow
                color="warning"
              >
                {isLogging ? (
                  <Loading
                    css={{ textAlign: "center", marginTop: "38px" }}
                    color="warning"
                  ></Loading>
                ) : (
                  <div
                    onClick={() => {
                      handleLogin();
                    }}
                  >
                    {" "}
                    Join For Free{" "}
                  </div>
                )}
              </Button>
            </Row>
          </Col>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Login;
