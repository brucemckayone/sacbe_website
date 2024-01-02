type BulletPointType = {
  name: string;
  effect: string;
  ref?: React.MutableRefObject<null> | undefined;
};

type IBulletPointsProps = {
  bulletPoints: BulletPointType[];
};

export const BulletPoints: React.FC<IBulletPointsProps> = ({
  bulletPoints,
}) => {
  return (
    <div className="border border-dashed bg-white p-2 rounded-lg  ">
      <ul className="list-disc space-y-2">
        {bulletPoints.map((point, index) => (
          <li
            ref={point.ref}
            key={index}
            className="flex items-start space-x-2"
          >
            <span className="text-primary border  items-center h-6 w-6 text-center bg-sacbeBrandColor/40 rounded-full mt-1 md:mt-3">
              {index + 1}
            </span>
            <p className="flex-1 md:my-2">
              <span className="font-bold md:text-xl">{point.name}</span>:{" "}
              {point.effect}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
