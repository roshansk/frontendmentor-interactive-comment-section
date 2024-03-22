function timeAgo(isoTimestamp) {
  const now = new Date();
  const timestamp = new Date(isoTimestamp);

  const seconds = Math.floor((now - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years + `${years > 1 ? " years ago" : " year ago"}`;
  } else if (months > 0) {
    return months + `${months > 1 ? " months ago" : " month ago"}`;
  } else if (weeks > 0) {
    return weeks + `${weeks > 1 ? " weeks ago" : " week ago"}`;
  } else if (days > 0) {
    return days + `${days > 1 ? " days ago" : " day ago"}`;
  } else if (hours > 0) {
    return hours + `${hours > 1 ? " hours ago" : " hour ago"}`;
  } else if (minutes > 0) {
    return minutes + `${minutes > 1 ? "mins ago" : " min ago"}`;
  } else {
    return (seconds || "0") + "s ago";
  }
}

module.exports = {
  timeAgo,
};
