import React from "react";

function Pagination({ setState, page, numPosts, limit }) {
  return (
    <section>
      {page > 1 && (
        <button onClick={() => setState({ page: page - 1 })}>Prev</button>
      )}
      {Math.ceil(numPosts / limit) > page && (
        <button onClick={() => setState({ page: page + 1 })}>Next</button>
      )}
    </section>
  );
}

export default Pagination;
