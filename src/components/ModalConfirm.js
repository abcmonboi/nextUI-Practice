import React,{useState} from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalConfirm = (props) => {
  const { handleClose, show, userInfo, handleUpdateUsers } = props;
  const [isLoading, setIsLoading] = useState(false);
  const confirmDelete = async () => {
    setIsLoading(true);
    await deleteUser(userInfo.id).then((res) => {
      if (res.statusCode === 204) {
        handleClose();
        toast("🚨 Delete User Successfully", {
          draggable: true,
          progress: undefined,
        });
        handleUpdateUsers(userInfo);
        setIsLoading(false);
      } else {
        toast.error("🦄 Wow error");
        setIsLoading(false);
      }
    });
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
          <Modal.Title>⚠️ Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5> Are you sure you want to delete this user?</h5>
          <span>
            User: <b>{userInfo.first_name}</b>
          </span>
          <br />
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={isLoading} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={isLoading} variant="danger" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
