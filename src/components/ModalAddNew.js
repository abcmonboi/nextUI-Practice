import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { postCreateUser, putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { handleClose, show, handleUpdateUsers, mode, userInfo } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setName(userInfo?.first_name);
    setJob(userInfo?.job);
  }, [userInfo]);
  const handleSaveUser = async () => {
    setIsLoading(true);
    if (mode === "edit") {
      await putUpdateUser(name, job).then((res) => {
        if (res) {
          handleClose();
          setName("");
          setJob("");
          toast("☘️ Update User Successfully", {
            draggable: true,
            progress: undefined,
          });

          handleUpdateUsers({
            id: userInfo.id,
            first_name: res.name,
            job: res.job,
          });
          setIsLoading(false);
        } else {
          toast.error("🦄 Wow error");
          setIsLoading(false);
        }
      });
    } else if (mode === "create") {
      await postCreateUser(name, job).then((res) => {
        if (res && res.id) {
          handleClose();
          setName("");
          setJob("");
          toast("☘️ Create User Successfully", {
            draggable: true,
            progress: undefined,
          });

          handleUpdateUsers({
            id: res.id,
            first_name: res.name,
            job: res.job,
          });
          setIsLoading(false);
        } else {
          toast.error("🦄 Wow error");
          setIsLoading(false);
        }
      });
    }
  };
  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{mode ? "Edit User" : "Create User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Job
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={job || ""}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={isLoading}
            variant="danger"
            onClick={handleSaveUser}
       
          >
            {mode==="edit" && "Update"}
            {mode==="create" && "Create"}
            
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
