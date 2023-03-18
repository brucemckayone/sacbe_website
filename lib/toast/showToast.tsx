import React from "react";
import { toast } from "react-toastify";
import Link from "next/link";
interface params {
  message: string;
  link?: string;
}
function showToast({ message, link }: params) {
  const CustomToastWithLink = () => (
    <div>
      <Link href={link == null ? "#" : link}>{message}</Link>
    </div>
  );
  toast(<CustomToastWithLink />);
}

export default showToast;
