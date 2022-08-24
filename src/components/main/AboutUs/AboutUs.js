import React from "react";
import About_PageHeading from './About_PageHeading'
import About_Content from "./About_Content";
import About_Popular from "./About_Popular";
import Address from '../Address'
import Header from "../Header/Header";
import Footer from "../Footer";

function AboutUs() {
    return (
        <React.Fragment>
            <Header />
            <Address />
            <About_PageHeading />
            <section class="bg0 p-b-110">
                <div class="container">
                    <div class="row justify-content-center">
                        <About_Content />
                        <About_Popular />
                    </div>
                </div>
            </section>
            <Footer />
        </React.Fragment>
    )
}

export default AboutUs