export function makeCancelable(promise) {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then((val) =>
        hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
      )
      .catch((error) =>
        hasCanceled_ ? reject({isCanceled: true}) : reject(error)
      );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
}

export function acceptNotFound(promise) {
  return promise.catch(err => {
    if (err.message === 'Not found') return
    throw err
  });
}

export function cancelAll(promises) {
  promises.map(promise => promise.cancel());
}
