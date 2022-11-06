import { Button, Modal, Text, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

import { FiSend } from "react-icons/fi";
import { IoImagesOutline } from "react-icons/io5";
import { HiCodeBracketSquare } from "react-icons/hi2";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

export default function ShareModal({ visible, closeHandler }) {
  const [content, setContent] = useState();
  const [error, setError] = useState();
  const { createPost } = useApi();

  let navigate = useNavigate();

  const handleCreatePost = () => {
    createPost({ content })
      .then((res) => {
        closeHandler();
        navigate("/?refresh=True");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <Modal closeButton blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text id="modal-title" size={24}>
          Share in{" "}
          <Text b size={24} color="primary">
            dews.io
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Textarea
          clearable
          bordered
          fullWidth
          shadow={false}
          color="primary"
          size="lg"
          minRows={4}
          label="Inspiring content:"
          placeholder="Type your idea..."
          onChange={(e) => setContent(e.target.value)}
        />
        <Button.Group flat color="secondary">
          <Button icon={<IoImagesOutline />} />
          <Button icon={<HiCodeBracketSquare />} />
        </Button.Group>
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
        <Button auto color="success" onPress={handleCreatePost} disabled={!content} iconRight={<FiSend />}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
