import React from "react";
import "../styles/layout.style.css";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return <div className="layout-style">{props.children}</div>;
};

export default Layout;
