import ImageHeaderLoader from "@/components/loaders/ImageHeaderLoader";
import TextLoader from "@/components/loaders/TextLoader";
export default function AboutLoader() {
  return (
    <div>
      <ImageHeaderLoader />
      <div className="grid grid-cols-1 place-content-center place-items-center">
        <TextLoader />
        <TextLoader />
        <TextLoader />
        <TextLoader />
      </div>
    </div>
  );
}
