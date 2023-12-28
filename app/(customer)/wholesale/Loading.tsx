import ImageHeaderLoader from "@/components/shared/loaders/ImageHeaderLoader";
import TextLoader from "@/components/shared/loaders/TextLoader";
export default function WholesaleLoading() {
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
