import React from "react";
import ItemBlog from "./ItemBlog";
import BlogList_PageHeading from './BlogList_PageHeading'
import BlogList_SideBar from './BlogList_SideBar'
import Header from "../Header/Header";
import Address from "../Address";
import Footer from "../Footer";
function BlogList() {
    return (
        <React.Fragment>
            <BlogList_PageHeading />
            <section className="bg0 p-b-55">
                <div className="container">
                    <div className="row justify-content-center">
                        <ItemBlog />
                        <BlogList_SideBar />
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default BlogList