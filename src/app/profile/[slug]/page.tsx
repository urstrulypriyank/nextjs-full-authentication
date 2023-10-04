import React from "react";

const DynamicRoute = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <div>DynamicRoute | {slug}</div>;
};

export default DynamicRoute;
