const Button = (props: any) => {
  const {
    onClick,
    children,
    disabled,
    className = "text-white bg-indigo-600 hover:bg-indigo-700",
    variant = "purple",
    hoverable = true,
    ...rest
  } = props;

  const variants: any = {
    purple: `text-white bg-indigo-600 ${
      hoverable ? "hover:bg-indigo-700" : ""
    }`,
    red: `text-white bg-red-600 ${hoverable ? "hover:bg-red-700" : ""}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      hoverable ? "hover:bg-indigo-200" : ""
    }`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium mr-8 ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
