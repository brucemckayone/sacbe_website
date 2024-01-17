"use client";
import { useState } from "react";
import { Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useUser } from "@/components/shared/auth/UserProvider";
import TextInput from "@/components/shared/form/inputs/TextInput";
import api from "@/lib/apiSchema/apiSchema";
import toast from "react-hot-toast";
import { isAfterJan3rd530 } from "./bookingSelection";

export default function JoinWaitlistButton() {
  const buttonstyle =
    "py-2 px-6 bg-sacbeBrandColor/80 rounded-lg  text-center shadow-md font-bold border col-span-full w-full";

  const { user } = useUser();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [opened, { close, open }] = useDisclosure(false);

  const handleJoinWaitlist = async () => {
    if (!validateEmail(email)) {
      setIsValid(false);

      return;
    }
    setIsValid(true);
    setLoading(true);
    try {
      await api.training.waitlist.post({ data: { email } });
      toast.success("You have been added to the waitlist");
    } catch (error) {
      toast.error("Failed to join waitlist");
    } finally {
      setLoading(false);
      close();
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (status === "loading") return <Loader className=" w-full m-auto" />;

  if (isAfterJan3rd530())
    return (
      <button
        onClick={() => {
          scrollBy({ top: 1000, behavior: "smooth" });
        }}
        className={buttonstyle}
      >
        {" "}
        Discover Training
      </button>
    );

  if (!user || (status === "unauthenticated" && !isAfterJan3rd530()))
    return (
      <>
        <Modal opened={opened} onClose={close} title="Join Waitlist" size="md">
          <div>
            <TextInput
              label="Email"
              value={email}
              update={setEmail}
              placeHolder={"Enter Email..."}
              isValid={isValid}
              invalidMessage={"Please enter a valid email"}
              type="email"
            />
            <button
              className={buttonstyle}
              onClick={handleJoinWaitlist}
              disabled={loading}
            >
              {loading ? "Joining..." : "Join Waitlist"}
            </button>
          </div>
        </Modal>
        <button className={buttonstyle} onClick={open} disabled={loading}>
          {loading ? "Joining..." : "Join Waitlist"}
        </button>
      </>
    );
  else if (user.email)
    return (
      <button
        onClick={async () => {
          try {
            await api.training.waitlist.post({ data: { email: user.email } });
            toast.success("You have been added to the waitlist");
          } catch (error) {
            toast.error("Failed to join waitlist");
          } finally {
            setLoading(false);
          }
        }}
        className={buttonstyle}
        disabled={loading}
      >
        {loading ? "Joining..." : "Join Waitlist"}
      </button>
    );

  return <> </>;
}
