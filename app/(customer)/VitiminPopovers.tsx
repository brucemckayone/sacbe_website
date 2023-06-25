"use client";
import SlideInUp from "@/components/animations/slide_in_up";
import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function VitiminPill(props: { name: string; popover: string }) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <SlideInUp animiation="animate-zoom_in">
      <Popover opened={opened}>
        <Popover.Target>
          <div
            onMouseEnter={open}
            onMouseLeave={close}
            className=" my-2 mx-1 px-3 py-2 rounded-full drop-shadow-md bg-surface hover:scale-105 hover:bg-primaryContainer hover:drop-shadow-2xl duration-700"
          >
            <p>{props.name}</p>
          </div>
        </Popover.Target>
        <Popover.Dropdown
          sx={{
            pointerEvents: "none",
          }}
          className="m-10"
        >
          <div id="dropdown">
            <p className="w-72">{props.popover}</p>
          </div>
        </Popover.Dropdown>
      </Popover>
    </SlideInUp>
  );
}
