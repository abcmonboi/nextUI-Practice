import React, { useEffect, useState } from "react";
import { postCreateUser, putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";
import { Modal, Button, Text, Input } from "@nextui-org/react";

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
        closeButton
        aria-labelledby="modal-title"
        open={show}
        onClose={handleClose}
        aria-label="Modal Example"
      >
        <Modal.Header aria-label="Modal Header">
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Thêm người dùng mới
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body aria-label="Modal Body">
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Tên"
            label="Tên"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            placeholder="Công việc"
            label="Công việc"
            value={job || ""}
            onChange={(e) => setJob(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button aria-label="Close" auto flat color="" onPress={handleClose}>
            Ẩn
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleSaveUser}
            color={"warning"}
            aria-label="Confirm"
            auto
            onPress={handleClose}
          >
            {mode === "edit" && "Cập nhật"}
            {mode === "create" && "Tạo mới"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
