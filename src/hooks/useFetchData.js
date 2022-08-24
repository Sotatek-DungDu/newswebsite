import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData(url, option) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true); //loader khởi tạo phải bằng false vì khi vào trang không được load luôn 

  useEffect(() => {
    axios
      .get(url,option)
      .then((response) => {
        setData(response.data);
        setLoader(false)
      })
      .catch((error) => console.log(error));
    // .finally(() => setLoader(false))
  }, [url]);
  return [data, loader];
}

export default useFetchData;
