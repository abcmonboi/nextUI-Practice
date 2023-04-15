import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import AppRouters from "./routers/AppRouters";
import { Container } from "@nextui-org/react";
import { useDispatch,useSelector } from "react-redux";
function App() {
  const { loginContext } = useContext(UserContext);

  //eslint-disable-next-line
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const { dataUserRedux } = useSelector((state) => state.user?.account);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container
          fluid
          css={{
            backgroundColor: "#000000",
            margin: "0",
            padding: "0",
          }}
        >
          <AppRouters />
        </Container>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
