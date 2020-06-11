import axios from "axios";
export const authPost = async (props, payload) => {
  try {
    const post = await axios.post("http://localhost:5000/api/users", payload);
    return post;
  } catch {
    props.history.push("/");
  }
};
