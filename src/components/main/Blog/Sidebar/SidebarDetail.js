import React from "react";
import BlogPopular from "./BlogPopular";
import BlogComment from "../BlogDetail/BlogComment";
import BlogContent from "../BlogDetail/BlogContent";
import SidebarCategory from "./SidebarCategory";
import SidebarTag from "./SidebarTag";

function SidebarDetail() {
    return (
        <div className="col-md-10 col-lg-4 p-b-30">
            <div className="p-l-10 p-rl-0-sr991 p-t-70">
                <SidebarCategory />
                <BlogPopular />
                <SidebarTag />
            </div>
        </div>
    )
}

export default SidebarDetail