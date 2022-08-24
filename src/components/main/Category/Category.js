import React from "react";
import Category_PageHeading from './Category_PageHeading'
import Category_PostImages from './Category_PostImages'
import Category_ItemPost from './Category_ItemPost'
import Category_Sidebar from './Category_Sidebar'
import Header from "../Header/Header";
import Footer from "../Footer";
import Address from "../Address";


function Category() {
    return (
        <React.Fragment>
            {/* <Address /> */}
            {/* <Category_PageHeading /> */}
            <Category_PostImages />
            <section className="bg0 p-t-110 p-b-25">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* <Category_ItemPost /> */}
                        {/* <Category_Sidebar /> */}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Category