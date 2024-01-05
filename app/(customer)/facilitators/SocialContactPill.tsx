import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

export function SocialContactPill(props: {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  email?: string;
  whatsapp?: string;
}) {
  return (
    <div className="flex justify-around gap-3 items-center rounded-full bg-onPrimary px-3 mt-2 mr-5 drop-shadow h-9">
      {props.instagram && (
        <Link href={props.instagram}>
          <FaInstagram className="w-5 h-5" />
        </Link>
      )}
      {props.facebook && (
        <Link href={props.facebook}>
          <FaFacebook className="w-5 h-5" />
        </Link>
      )}
      {props.twitter && (
        <Link href={props.twitter}>
          <FaTwitter className="w-5 h-5" />
        </Link>
      )}
      {props.email && (
        <Link href={`mailto:${props.email}`}>
          <FaEnvelope className="w-5 h-5" />
        </Link>
      )}
      {props.email && (
        <Link href={`https://wa.me/${props.whatsapp}`}>
          <FaWhatsapp className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}
