import React, { useEffect, useState } from "react";
import BlogGridContent from "./BlogGridContent";
import Pagination from "./Pagination";
import SidebarDetail from "../BlogGrid/Sidebar/SidebarDetail";
import { getListNews, getAdvertise } from "../../../services/newServices";
import LoadAnimation from "../../loading/LoadAnimation";
function BlogGridContainer() {


  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {

    async function getNews() {
      setLoading(true)
      try {
        const response = await getListNews()
        setNews(response)

      } catch (error) {
        console.log("err", error);

      } finally {

        setTimeout(
          () => setLoading(false),
          500
        );
      }
    }
    getNews()

    async function getAds() {
      setLoading(true)
      try {
        const response = await getAdvertise()
        setAds(response[0])
        // console.log("ads", response);
      } catch (error) {
        console.log("err", error);

      } finally {

        setTimeout(
          () => setLoading(false),
          500
        );
      }
    }
    getAds()

  }, []);


  return (
    <section className="bg0 p-b-55">
      {loading ? <LoadAnimation /> :
        <div className="container">
          <div className="row justify-content-center" >
            <div style={{ display: "flex" }}>
              <div style={{ marginTop: '2rem', display: "flex", flexWrap: 'wrap', height: '5%' }}>
                {news?.length > 0 && news?.map((item, index) => <BlogGridContent key={index} item={item} />)}
              </div>

              <SidebarDetail data={ads} />
            </div>

            <Pagination />
          </div>
        </div>}

    </section>
  )
}

export default BlogGridContainer