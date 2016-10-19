import { makeCancelable, cancelAll } from '../helpers/promises';

export function cancelAllPromises(component) {
  if (!component.cancelablePromises) return;
  return cancelAll(component.cancelablePromises);
}

export function waitForDataAndSetState(dataPromise, component, stateName) {
  const cancelablePromise = makeCancelable(dataPromise
    .then(data => {
      const update = {};
      update[stateName] = data;
      if (!component._calledComponentWillUnmount) component.setState(update);
    })
    .catch(err => {
      if (!component.state.errors.includes(err.message)) {
        const errors = [...component.state.errors, err.message]
        if (!component._calledComponentWillUnmount) component.setState({ errors })
      }
      throw err
    })
  )
  if (!component.cancelablePromises) component.cancelablePromises = []

  component.cancelablePromises.push(cancelablePromise)
  return cancelablePromise
}
