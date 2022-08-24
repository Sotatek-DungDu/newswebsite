import React from "react";
import Search from './Search'

function Address() {
    return(
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
		  
                    <Search />
        
				</div>
		</div>
    )
}

export default Address