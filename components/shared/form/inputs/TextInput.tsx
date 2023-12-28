"use client";
interface Props {
  placeHolder: string;
  value: string;
  update: (value: string) => void;
  isValid?: boolean;
  invalidMessage?: string;
  label?: string;
  type?: string;
  className?: string;
}
function TextInput({
  value,
  placeHolder,
  update,
  isValid,
  invalidMessage,
  type,
  label,
  className,
}: Props) {
  return (
    <div className="mb-3" key={label + placeHolder} id={type}>
      {label && (
        <label className="">
          <h6 className="">{label}</h6>
        </label>
      )}
      <input
        key={`input key ${label + placeHolder}`}
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-sacbeBrandColor focus:border-sacbeBrandColor block w-full p-2.5 hover:scale-105 duration-200 font-body ${className} ${
          isValid ? "border-green-500" : "border-red-500"
        }`}
        type={type}
        value={value}
        placeholder={placeHolder}
        autoComplete={type}
        onChange={(event) => {
          update(event.target.value);
        }}
      />
      {!isValid && <p className="text-sm text-red-600 ">{invalidMessage}</p>}
    </div>
  );
}

export default TextInput;
