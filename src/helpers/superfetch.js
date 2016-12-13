export default function superfetch(url, options={}) {
  return fetch(url, options)
    .then(response => {
      if (response.status === 401) throw new Error('Unauthorized')
      return response.json()
    })
    .catch((err) => {
      console.error(err);
      throw err
    });
}
