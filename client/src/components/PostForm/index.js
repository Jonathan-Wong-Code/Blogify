import React, { useReducer } from "react";
import { useMutation } from "react-router-dom";

import reducer from "../../reducers";

function PostForm() {
  const [{ title, body }, setState] = useReducer(reducer, {
    title: "",
    body: ""
  });
}

export default PostForm;
