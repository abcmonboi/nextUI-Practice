import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { useEffect } from "react";
import AppRouters from "./routers/AppRouters";
import { Container } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/userActions";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.auth);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
    //eslint-disable-next-line
  }, [auth]);

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
