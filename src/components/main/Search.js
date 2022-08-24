import React from "react";

function Search() {
    return(
        <div className="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6">
            <input className="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Search" />
            <button className="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
              <i className="zmdi zmdi-search" />
            </button>
        </div>
    )
}

export default Search