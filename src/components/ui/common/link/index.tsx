import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const ActiveLink = (props: any) => {
  const { children, activeLinkClass, ...restProps } = props;
  const { pathname } = useRouter();
  let className = children?.props?.className || "";

  if (pathname === props?.href) {
    className = `${className} ${activeLinkClass || "text-indigo-600"} `;
  }

  return (
    <Link {...restProps}>{React.cloneElement(children, { className })}</Link>
  );
};

export default ActiveLink;
