export default function superfetch(url) {
  return fetch(url)
    .then(response => response.json())
    .catch((err) => {
      console.error(err);
      throw err
    });
}
