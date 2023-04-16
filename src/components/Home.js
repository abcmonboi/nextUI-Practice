import React, { Fragment } from "react";
import { Spacer, Text, Col, Grid, Button, Table, Row } from "@nextui-org/react";
import background from "../assets/images/bg-landscape.avif";
import { useSelector } from "react-redux";
import InfoCard from "./InfoCard";
import _222 from "../assets/images/222.jpg";
import A2 from "../assets/images/A2.jpg";
import okkkkkk from "../assets/images/okkkkk.jpg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.account);

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
              {user?.email ? "Chào mừng trở lại" : "Xin chào "}
            </Text>
            <Text
              color="success"
              weight="bold"
              size={62}
              css={{ textAlign: "center" }}
            >
              {user?.email
                ? user?.email.split("@")[0].toUpperCase()
                : "Nhà tuyển dụng"}
            </Text>
            {!user && (
              <Button
                size="lg"
                auto
                shadow
                color="warning"
                css={{ width: "100%", marginTop: "10px" }}
                onClick={() => navigate("/login")}
              >
                Dùng thử ngay
              </Button>
            )}
          </Col>
        </Grid>
      </Grid.Container>
      <Grid.Container
        justify="center"
        css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}
      >
        <Text
          css={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            mb: "$4",
            width: "100%",
          }}
          h2
        >
          Mô tả về website
        </Text>
        <Text
          css={{
            textAlign: "center",
            width: "100%",
          }}
          size="$xl"
        >
          - UI ReactJS / UX NextUI. <br />
          Website được dựng ra với mục đích giúp cho nhà tuyển dụng có thể dễ
          dàng tìm kiếm được ứng viên phù hợp với yêu cầu của mình qua các chức
          năng cơ bản ứng viên đã thực hiện sau đây.
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          - Gọi API thực qua <a href="https://reqres.in/"> reqres.in</a>.
          Website với data ảo nhưng response trả về thật hỗ trợ phương thức
          GET/POST/PUT/DELETE. <br />
          - Đăng nhập bằng tài khoản email "eve.holt@reqres.in" và password là
          "cityslicka" do gọi API để đăng nhập. Sau khi đăng nhập sẽ lưu token
          api trả về và lưu vào localStorge cũng như redux. <br />
          - Đăng xuất sẽ xóa token trong localStorge và redux và chuyển về trang
          đăng nhập. <br />
          - Khi đăng nhập thành công sẽ chuyển về trang chủ và hiển thị email
          của tài khoản đã đăng nhập lưu trong redux. <br />- Đăng nhập thành
          công có thể xem thông tin phần quản lý người dùng. <br />
          - Nếu vào phần quản lý người dùng mà chưa đăng nhập sẽ hiện trang
          thông báo lỗi. <br />- Tại trang quản lý người dùng có thể thực hiện
          các chức năng sau: <br />
          + Hiện tất cả thông tin người dùng được trả về từ API <br />
          + Tìm kiếm người dùng qua email <br />
          + CRUD, do API không lưu vào data thực nên một số chức năng k <br />
          + Xuất file CSV với thông tin các người dùng trên trang thông qua
          CSVLink. <br />
          + Thêm file CSV với định dạng phải đúng yêu cầu theo mẫu :
          <Spacer y={1} />
          <Row justify="center">
          <table
            aria-label="Example table with static content"
            css={{
              height: "auto",
              minWidth: "100%",
              border:"1px solid #ecedee",
              width: "100%",
            }}
          >
            <tr>
              <th style={{
                width: "80px",
                float : "left",
              }} >Email</th>
              <th  style={{
                width: "100px",
              }}>First Name</th>
              <th  style={{
                width: "100px",
                float : "left",
              }}>Last Name</th>
            </tr>
            <tr>
              <td> Email 1</td>
              <td>Họ 1</td>
              <td>Tên 1</td>
            </tr>
            <tr>
              <td> Email 2</td>
              <td>Họ 2</td>
              <td>Tên 2</td>
            </tr>
            <tr>
              <td> Email 3</td>
              <td>Họ 3</td>
              <td>Tên 3</td>
            </tr>
            <tr>
              <td> Email 4</td>
              <td>Họ 4</td>
              <td>Tên 4</td>
            </tr>
          </table>
          </Row>
          <Spacer y={1} />
        </Text>
        <Spacer y={1} />

        <Text
          b
          css={{
            textAlign: "center",
            width: "100%",
          }}
          size="$lg"
        >
          Trên đây là một số chức năng cơ bản của website. Cảm ơn nhà tuyển dụng
          đã xem.
          <br />
          <Text size="$xl">
            Lê Nhữ Bắc <br />
            Web Developer
          </Text>
        </Text>
      </Grid.Container>
      <Grid.Container gap={2}>
        <Grid xs={12} md={6} lg={4}>
          {InfoCard(A2)}
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {InfoCard(okkkkkk)}
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {InfoCard(_222)}
        </Grid>
      </Grid.Container>
    </Fragment>
  );
};

export default Home;
