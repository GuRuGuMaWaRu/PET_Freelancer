import React from "react";

const getChildId = (children: React.ReactNode): string | undefined => {
  const child = React.Children.only(children) as React.ReactElement;

  if ("id" in child?.props) {
    return child.props.id;
  }
};

export { getChildId };
