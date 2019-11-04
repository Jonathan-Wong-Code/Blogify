import React from "react";

function Pagination({ setState, page }) {
  return (
    <section>
      {page > 1 && (
        <button onClick={() => setState({ page: page - 1 })}>Prev</button>
      )}
      <button onClick={() => setState({ page: page + 1 })}>Next</button>
    </section>
  );
}

export default Pagination;
