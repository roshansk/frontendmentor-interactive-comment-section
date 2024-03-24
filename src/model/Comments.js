import data from "../assets/data.json";
export function getLocalComments() {
  const existingComments = localStorage.getItem("comments");

  if (!existingComments) {
    localStorage.setItem("comments", JSON.stringify(data.comments));
    return data.comments;
  }

  return JSON.parse(existingComments);
}

export function setLocalComments(comments) {
  localStorage.setItem("comments", JSON.stringify(comments));
  return comments;
}

export function getCurrentUser() {
  const existingUser = localStorage.getItem("currentUser");
  if (!existingUser) {
    localStorage.setItem("currentUser", JSON.stringify(data.currentUser));
    return JSON.parse(data.currentUser);
  }
  return JSON.parse(existingUser);
}
