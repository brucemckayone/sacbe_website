"use client";
export function PurchaseTypeTabs(props: any) {
  return (
    <div className="flex flex-row justify-between text-surface bg-onSecondaryContainer rounded-t-lg">
      <button
        onClick={() => {
          props.setIsOnOff(true);
        }}
        className={`basis-1/2 text-center  h-[55px] rounded-tl-lg duration-300 ${
          !props.isOnOff
            ? "bg-surface border-2 text-onSecondaryContainer border-onSecondaryContainer"
            : "bg-onSecondaryContainer hover:bg-onTertiaryContainerdrop-shadow-lg tracking-widest"
        }`}
      >
        <h5>ONE-TIME</h5>
      </button>

      <button
        onClick={() => {
          props.setIsOnOff(false);
        }}
        className={`relative basis-1/2 text-center h-[55px] rounded-tr-lg duration-300 ${
          props.isOnOff
            ? "bg-surface border-2 text-onSecondaryContainer border-onSecondaryContainer"
            : "bg-onSecondaryContainer hover:bg-onTertiaryContainer drop-shadow-lg tracking-widest "
        }`}
      >
        <h5>SUBSCRIBE</h5>
        <div
          className={`absolute text-recommendedGreen right-0 top-0 rounded-tr-md rounded-bl-md ${
            props.isOnOff ? "bg-onPrimaryContainer" : "bg-recommendedGreen/30"
          }`}
        >
          <p className="text-xs px-0.5  md:px-1 md:py-0.5">20% Off</p>
        </div>
      </button>
    </div>
  );
}
