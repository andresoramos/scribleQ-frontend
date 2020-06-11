export const setHeaders = (post, props) => {
  localStorage.setItem("token", post.headers["x-auth-token"]);
  localStorage.setItem("name", post.headers["name-token"]);
  props.setName(localStorage.getItem("name"));
};
