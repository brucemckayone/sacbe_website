"use client";
import React from "react";
import { Modal, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
interface ShippingModalInterface {
  isOpen: boolean;
  onClose: () => void;
}
function ShippingModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
}

export default ShippingModal;
