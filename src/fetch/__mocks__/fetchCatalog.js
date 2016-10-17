import catalog from '../__test__/catalog.json'

function fetchCatalog(catalogId) {
  if (!catalogId) {
    return Promise.reject(new Error('catalogId is required'))
  } else {
    return new Promise( (resolve, reject) => {
      if (catalogId === '1') {
        resolve(catalog)
      } else {
        reject(new Error('Catalog not found'));
      };
    })
  }
}


module.exports = fetchCatalog;
