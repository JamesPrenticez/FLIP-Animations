import React from "react";

export default function GridContainer({ children }) {
  return <ul className="grid grid-cols-4 gap-4 p-4">{children}</ul>;
}
