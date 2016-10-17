import metrics from '../__test__/metrics.json'

function fetchMetrics(catalogId) {
  if (!catalogId) {
    throw new Error('catalogId is required')
  } else {
    return new Promise( (resolve, reject) => {
      if (catalogId === '1') {
        resolve(metrics)
      } else {
        reject(new Error('Metrics not found'));
      };
    })
  }
}


module.exports = fetchMetrics;
