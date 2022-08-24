import React, { useEffect, useState } from 'react'
import BlogContent from "./BlogContent";
import BlogTag from "./BlogTag";
import BlogShare from "./BlogShare";
import BlogComment from "./BlogComment";
import { getUserData, getAdvertise } from "../../../../services/newServices"
function BlogContainer() {
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
        <section className="bg0 p-b-140 p-t-10">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8 p-b-30">
                        <div className="p-r-10 p-r-0-sr991">
                            {/*Blog detail here*/}
                            <BlogContent />
                            {/*Blog tag here*/}
                            <BlogTag />
                            {/*Blog share here*/}
                            <BlogShare />
                            {/*Blog comment here*/}
                            <BlogComment userdata={user} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogContainer