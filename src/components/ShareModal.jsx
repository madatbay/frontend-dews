import { Button, Modal, Text, Textarea } from "@nextui-org/react";
import React from "react";

import { FiSend } from "react-icons/fi";
import { IoImagesOutline } from "react-icons/io5";
import { HiCodeBracketSquare } from "react-icons/hi2";

export default function ShareModal({ visible, closeHandler }) {
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
        />
        <Button.Group flat color="secondary">
          <Button icon={<IoImagesOutline />} />
          <Button icon={<HiCodeBracketSquare />} />
        </Button.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="default" onClick={closeHandler}>
          Cancel
        </Button>
        <Button auto color="success" onClick={closeHandler} iconRight={<FiSend />}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
