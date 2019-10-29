import React from "react";
import { useParams } from "react-router-dom";
export default function SinglePostPage() {
  const { id } = useParams();
  console.log(id);

  return <div>Single Post Page</div>;
}
