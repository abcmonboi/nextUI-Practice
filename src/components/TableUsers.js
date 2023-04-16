import { useEffect, useState } from "react";
import { fetchAllUsers } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
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
  Table,
  Card,
  Tooltip,
  User,
  Badge,
} from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { BsFiletypeCsv } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";

import background from "../assets/images/bg-landscape.avif";

const TableUsers = (props) => {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [mode, setMode] = useState();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  // const [sortBy, setSortBy] = useState("asc");
  // const [sortByName, setSortByName] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [dataExport, setDataExport] = useState([]);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "first_name",
      label: "First name",
    },
    {
      key: "last_name",
      label: "Last name",
    },
    {
      key: "actions",
      label: "Action",
    },
  ];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    //call api
    setIsShowLoading(true);
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setTotalPages(res.total_pages);
      setUsers(res.data);
    }
    setIsShowLoading(false);
  };
  const handlePageClick = (e) => {
    setIsShowLoading(true);
    setCurrentPage(e);
    getUsers(e);
  };
  const handleUpdateUsers = (user) => {
    if (mode === "edit") {
      let newUsers = users.map((item) => {
        if (item.id === user.id) {
          return user;
        }
        return item;
      });
      setUsers(newUsers);
    } else if (mode === "create") {
      setUsers([user, ...users]);
    } else if (mode === "delete") {
      let newUsers = users.filter((item) => item.id !== user.id);
      setUsers(newUsers);
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);

    if (e.target.value !== "") {
      let newUsers = users.filter((item) => {
        return item.email.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setUsers(newUsers);
    } else {
      getUsers(1);
    }
  };
  const getUsersExport = (event, done) => {
    let result = [];
    if (users.length > 0 && users) {
      result.push(["ID", "Email", "First name", "Last name"]);
      users.map((item) => {
        return result.push([
          item.id,
          item.email,
          item.first_name,
          item.last_name,
        ]);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0 && Object.keys(rawCSV[0]).length === 3) {
            if (rawCSV[0]) {
              if (
                Object.keys(rawCSV[0])[0] !== "Email" &&
                Object.keys(rawCSV[0])[1] !== "First name" &&
                Object.keys(rawCSV[0])[2] !== "Last name"
              ) {
                toast.error("File Header is not valid");
              } else {
                let result = [];
                // eslint-disable-next-line
                rawCSV.map((item, index) => {
                  if (index > 0 && Object.keys(item).length === 3) {
                    let obj = {};
                    obj.id = index;
                    obj.email = item.Email;
                    obj.first_name = item["First name"];
                    obj.last_name = item["Last name"];
                    result.push(obj);
                  }
                });
                setUsers(result);
              }
            } else {
              toast.error("File is not valid");
            }
          } else {
            toast.error("File Header is not valid or File is empty");
          }
        },
      });
    } else {
      toast.error("File is not CSV");
    }
  };
  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton
                  onClick={() => {
                    setMode("edit");
                    setIsShowModalAddNew(true);
                    setUserInfo(user);
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => {
                  setIsShowModalDelete(true);
                  setUserInfo(user);
                  setMode("delete");
                }}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  useEffect(() => {
    let rowArray = [];
    users.map((item, index) => {
      rowArray.push({
        key: index + 1,
        id: item.id,
        email: item.email,
        first_name: item.first_name,
        last_name: item.last_name,
      });
    });
    setRows(rowArray);
  }, [users]);

  return (
    <>
      <>
        <Grid.Container
          justify="center"
          css={{
            height: "100vh",
            backgroundImage: `url(${background})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            width: "100%",
          }}
        >
          <Grid xs={12} sm={8} alignitems="center">
            <Col
              css={{
                marginTop: "100px",
              }}
              justify="center"
              span={12}
              alignitems="center"
            >
              <Card>
                <Card.Header>
                  <Col
                    css={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text b h4>
                      Danh sách người dùng
                    </Text>
                    <div>
                      <div
                        style={{
                          display: "inline-block",
                          marginRight: "10px",
                        }}
                      >
                        <Button auto color="primary">
                          <label htmlFor="import-csv">
                            <BsFiletypeCsv color="#ffffff" />
                            {" Nhập CSV"}
                          </label>
                          <input
                            onChange={(e) => {
                              handleImportCSV(e);
                            }}
                            id="import-csv"
                            type="file"
                            hidden
                          />
                        </Button>
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          marginRight: "10px",
                        }}
                      >
                        <Button auto color="success">
                          <CSVLink
                            data={dataExport}
                            filename={"my-file.csv"}
                            style={{
                              textDecoration: "none",
                              color: "#fff",
                            }}
                            target="_blank"
                            asyncOnClick={true}
                            onClick={getUsersExport}
                          >
                            <BsFiletypeCsv color="#ffffff" />

                            {" Xuất CSV"}
                          </CSVLink>
                        </Button>
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                        }}
                      >
                        <Button auto color="warning">
                          <div
                            onClick={() => {
                              setMode("create");
                              setIsShowModalAddNew(true);
                            }}
                          >
                            <AiFillFileAdd color="#ffffff" />
                            {" Thêm mới"}
                          </div>
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$10" }}>
                  {users && !isShowLoading ? (
                    <Table
                      shadow={false}
                      color="secondary"
                      aria-label="Example pagination  table"
                      css={{
                        height: "auto",
                        minWidth: "100%",
                      }}
           
                    >
                      <Table.Header columns={columns}>
                        {(column) => (
                          <Table.Column   key={column?.key}>
                            {column?.label}
                          </Table.Column>
                        )}
                      </Table.Header>

                      <Table.Body items={rows}>
                        {(item) => (
                          <Table.Row key={item.key}>
                            {(columnKey) => (
                              <Table.Cell>
                                {renderCell(item, columnKey)}
                              </Table.Cell>
                            )}
                          </Table.Row>
                        )}
                      </Table.Body>

                      <Table.Pagination
                        initialPage={1}
                        total={totalPages}
                        color="warning"
                        shadow
                        noMargin
                        rowsPerPage={6}
                        onPageChange={handlePageClick}
                        page={currentPage}
                      />
                    </Table>
                  ) : (
                    <Loading color={"warning"} />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Grid>
        </Grid.Container>
        <ModalConfirm
          show={isShowModalDelete}
          handleClose={() => {
            setIsShowModalDelete(false);
            setMode("");
            setUserInfo({});
          }}
          handleUpdateUsers={handleUpdateUsers}
          mode={mode}
          userInfo={userInfo}
        />
        <ModalAddNew
          show={isShowModalAddNew}
          handleClose={() => {
            setIsShowModalAddNew(false);
            setMode("");
            setUserInfo({});
          }}
          handleUpdateUsers={handleUpdateUsers}
          mode={mode}
          userInfo={userInfo}
        />
      </>
    </>
  );
};

export default TableUsers;
