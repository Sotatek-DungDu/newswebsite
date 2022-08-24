import axios from "axios";

const PostData = async (url, newData) => {
  try {
    await axios.post(url, newData);
  } catch (error) {
    console.log(error);
  }
};

export default PostData;
