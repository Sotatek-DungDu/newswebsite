import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Tìm kiếm"
          className="me-2"
          aria-label="Search"
          onFocus={() => navigate("/admin/search")}
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
      </Form>
    </>
  );
}

export default Search;
