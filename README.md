# geo.data.gouv.fr [![CircleCI](https://circleci.com/gh/etalab/geo.data.gouv.fr/tree/master.svg?style=svg)](https://circleci.com/gh/etalab/geo.data.gouv.fr/tree/master)

Trouvez facilement les données géographiques dont vous avez besoin

[![codecov](https://codecov.io/gh/etalab/geo.data.gouv.fr/branch/master/graph/badge.svg)](https://codecov.io/gh/etalab/geo.data.gouv.fr)

## Présentation

Interface du site [geo.data.gouv.fr](https://geo.data.gouv.fr) basée sur les API de la [plateforme Inspire](https://github.com/inspireteam) et développée par la mission [Etalab](https://github.com/etalab).

Ce projet _front_ utilise [React](https://facebook.github.io/react/) et [Webpack](https://webpack.js.org/).

## Contribuer au code

### Prérequis

* [Node.js](https://nodejs.org/en/) >= 6
* [yarn](https://yarnpkg.com) (mais ça fonctionne aussi avec npm)

### Installation des dépendances

```bash
yarn
```

### Développement

```bash
yarn start # Lance le serveur de développement
```

### Tests

```bash
yarn test
```

### Déploiement sur GitHub Pages

```bash
yarn build
yarn deploy
```

### Génération de Changelog

La génération de changelog pour chaque tag sur GitHub se fait à l’aide de [`lerna-changelog`](https://github.com/lerna/lerna-changelog).

```bash
GITHUB_AUTH=… yarn lerna-changelog
```

Pour générer le changelog que pour le dernier tag, utiliser l’option `--tag-from` avec comme argument le précédent tag.

Par exemple:

```bash
GITHUB_AUTH=… yarn lerna-changelog --tag-from v2.2.1
````

Le jeton d’authentification GitHub passé à l’aide de la variable d’environnement `GITHUB_AUTH` doit avoir le scope `public_repo`.


## Mainteneurs principaux

[Jérôme Desboeufs](https://github.com/jdesboeufs) et [Théophile Merlière](https://github.com/tmerlier)

Ce projet est largement ouvert aux contributions.

## License

MIT
