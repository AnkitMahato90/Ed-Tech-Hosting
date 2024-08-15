export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-richblack-900 bg-transparent" : "bg-[#2B84EA]"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-richblack-900"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
