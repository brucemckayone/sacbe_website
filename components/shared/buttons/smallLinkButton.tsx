import Link from "next/link";

interface Props {
  text: string;
  className?: string;
  link: string;
  isPrimary?: boolean;
}

const SmallLinkButton: React.FC<Props> = ({
  link,
  className = "",
  isPrimary = true,
  text,
}) => {
  return (
    <Link href={link}>
      <button
        className={`${className} small-button duration-500 ${
          isPrimary ? "bg-sacbeBrandColor" : " bg-onPrimary/50"
        } py-1 px-3 my-2 rounded-lg border-black hover:bg-onPrimaryContainer hover:text-onPrimary border-2`}
      >
        {text}
      </button>
    </Link>
  );
};

export default SmallLinkButton;
