import React,{useState} from "react";
import { Modal,Button,Text,Badge } from "@nextui-org/react";
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
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <>
      {/* <Modal
      closeButton
      open={show}
        // backdrop="static"
        // keyboard={false}
        // onClose={handleClose}
      >
        <Modal.Header >
          <Modal.Title>
          <Text id="modal-title" size={18}>⚠️ Warning
          </Text>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5> Are you sure you want to delete this user?</h5>
          <span>
            User: <b>{userInfo?.first_name}</b>
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
      </Modal> */}
        <Modal
        closeButton
        aria-labelledby="modal-title"
        open={show}
        onClose={handleClose}
        aria-label="Modal Example"
      >
        <Modal.Header
        aria-label="Modal Header"
        >
          <Text id="modal-title" size={18}>
          
            <Text b size={18}>
            ⚠️ Cảnh báo
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body
        aria-label="Modal Body"
        >
          <h5> Bạn có chắc chắn muốn xóa người dùng này không?</h5>
          <Badge  size={"xl"} >
            User: <b>{userInfo?.first_name}</b>
          </Badge>
          <br />
          Hành động này không thể hoàn tác.
        
        </Modal.Body>
        <Modal.Footer>
          <Button  aria-label="Close" auto flat color="" onPress={handleClose}>
           Ẩn
          </Button>
          <Button disabled={isLoading}  color={"warning"} aria-label="Confirm" auto onPress={confirmDelete}>
           Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
