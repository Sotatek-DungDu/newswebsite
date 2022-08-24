import React from 'react';

const Search = () => {
  return (
    <div className="container">
      <div className="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
        <div className="f2-s-1 p-r-30 m-tb-6">
          <a href="index.html" className="breadcrumb-item f1-s-3 cl9">
            Home
          </a>

          <a href="blog-list-01.html" className="breadcrumb-item f1-s-3 cl9">
            Blog
          </a>

          <span className="breadcrumb-item f1-s-3 cl9">
            Nulla non interdum metus non laoreet nisi tellus eget aliquam lorem pellentesque
          </span>
        </div>

        <div className="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6">
          <input className="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Search" />
          <button className="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
            <i className="zmdi zmdi-search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;