import React, { useEffect, useState } from 'react'
import Title from './Title.js'
import Content from './Content.js'
import Tag from './Tags.js'
import Share from './Share.js';
import Comment from './Comment.js'
import Avd from './Avd.js'
import { getUserData, getAdvertise } from "../../../../services/newServices"

const BlogDetailContent = () => {
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
    <div className="container p-t-82">
      <div className="row justify-content-center" >
        <div className="col-md-10 col-lg-8 p-b-100">
          <div className="p-r-10 p-r-0-sr991">
            <Title />
            <div style={{ display: 'flex', marginTop: '5rem', width: '140%', }}>
              <div>
                <Content />
                <Comment userdata={user} />
              </div>
              <Avd />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailContent;