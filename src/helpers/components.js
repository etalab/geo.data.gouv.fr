import { makeCancelable, cancelAll } from '../helpers/promises';

export function cancelAllPromises(component) {
  if (!component.cancelablePromises) return;
  return cancelAll(component.cancelablePromises);
}

export function waitDataAndSetState(dataPromise, component, stateName) {
  const cancelablePromise = makeCancelable(dataPromise);

  if (!component.cancelablePromises) component.cancelablePromises = []
  component.cancelablePromises.push(cancelablePromise)

  return cancelablePromise.promise
    .then(data => {
      const update = {};
      update[stateName] = data;
      component.setState(update);
    })
    .catch(err => {
      if (err.isCanceled) return;
      if (!component.state.errors.includes(err.message)) {
        const errors = [...component.state.errors, err.message]
        component.setState({ errors })
      }
    });
}
