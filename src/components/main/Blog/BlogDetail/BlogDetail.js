import React, { useEffect, useState } from 'react';
import BlogContent from "./BlogContent"
import BlogComment from "./BlogComment"
import SidebarDetail from "../Sidebar/SidebarDetail";
import Header from "../../Header/Header";
import Footer from "../../Footer";
import Address from "../../Address";
import { getUserData, getAdvertise } from "../../../../services/newServices"
function BlogDetail() {

    const [user, setUser] = useState();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await getUserData()
                setUser(response)
            } catch (error) {
                console.log("err", error);
            }
        }
        getUser()
    }, [])

    return (
        <div className="animsition">
            <div className="container">
                <div className="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
                </div>
            </div>
            <section className="bg0 p-b-140 p-t-10">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-8 p-b-30">
                            <div className="p-r-10 p-r-0-sr991">
                                <BlogContent />
                                <BlogComment userdata={user} />
                            </div>
                        </div>
                        <SidebarDetail />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default BlogDetail