export function superfetch(url, options={}) {
  return fetch(url, options)
    .then(response => {
      if (response.status === 401) throw new Error('Unauthorized')
      if (response.status === 404) throw new Error('Not found')
      if (response.status === 202) return
      return response.json()
    })
    .catch((err) => {
      console.error(err);
      throw err
    });
}

export function superRequest(url, method, params={}) {
  return superfetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(params)
  })
}
