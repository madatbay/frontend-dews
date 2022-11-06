import { Button, Modal, Text } from "@nextui-org/react";
import React, { useState } from "react";

import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

export default function DeletePostModal({ visible, closeHandler, id }) {
  const [error, setError] = useState();
  const { deletePost } = useApi();

  let navigate = useNavigate();

  const handleDeletePost = () => {
    deletePost(id)
      .then((res) => {
        closeHandler();
        navigate("/?refresh=True");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <Modal closeButton blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Body>
        <Text>
          Are you sure to{" "}
          <Text b color="error">
            delete
          </Text>{" "}
          selected post?
        </Text>
        {error &&
          Object.keys(error).map((key) => (
            <span key={key}>
              <Text color="error" key={key} className="text-center">
                {key}: {error[key].toString()}
              </Text>
            </span>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button auto light color="default" onPress={closeHandler}>
          Cancel
        </Button>
        <Button auto color="error" onPress={handleDeletePost}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
