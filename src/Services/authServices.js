import axios from "axios";
export const authPost = async (props, payload) => {
  try {
    const post = await axios.post("/api/users", payload);
    return post;
  } catch {
    props.history.push("/");
  }
};
