# geo.data.gouv.fr [![CircleCI](https://circleci.com/gh/etalab/geo.data.gouv.fr/tree/master.svg?style=svg)](https://circleci.com/gh/etalab/geo.data.gouv.fr/tree/master)

> Trouvez facilement les données géographiques dont vous avez besoin

[![Last Release](https://badgen.net/github/release/etalab/geo.data.gouv.fr/stable)](https://github.com/etalab/geo.data.gouv.fr/releases)
[![codecov](https://badgen.net/codecov/c/github/etalab/geo.data.gouv.fr)](https://codecov.io/gh/etalab/geo.data.gouv.fr)
[![XO code style](https://badgen.net/badge/code%20style/XO/cyan)](https://github.com/xojs/xo)

## Présentation

Interface du site [geo.data.gouv.fr](https://geo.data.gouv.fr) basée sur les API de la [plateforme Inspire](https://github.com/inspireteam) et développée par la mission [Etalab](https://github.com/etalab).

Ce projet _front_ est basé sur [Next.js](https://github.com/zeit/next.js), il utilise [React](https://reactjs.org).

## Contribuer au code

### Prérequis

* [Node.js](https://nodejs.org/en/) >= 8
* [yarn](https://yarnpkg.com) (mais ça fonctionne aussi avec npm)

### Installation des dépendances

```bash
yarn
```

### Développement

Afin de configurer le projet correctement, il est conseillé de créer un fichier `.env` avec les variables d’environnement nécessaires à l’application.

`.env` permet de persister les variables d’environnement de développement dans un fichier plutôt que de les définir dans le shell, mais les deux fonctionnent. Cela fonctionne avec [dotenv](https://github.com/motdotla/dotenv) et [next-runtime-dotenv](https://github.com/tusbar/next-runtime-dotenv).

Un fichier d’example existe : `.env.example`. Pour obtenir une configuration de base :

```bash
cp .env.sample .env
```

Enfin, lancer le serveur de développement avec :

```bash
yarn dev
```

### Tests

```bash
yarn test
```

### Génération des bundles de production

```bash
yarn build
```

### Lancer le serveur en mode production

Il utilisera les bundles générés par `yarn build`.

```bash
yarn start
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

La génération du changelog et la création de releases GitHub sont automatisées par CircleCI à chaque publication de tag.

## Docker

Une image est disponible sur le hub docker :

[![Docker Pulls](https://badgen.net/docker/pulls/geodatagouv/geo.data.gouv.fr?icon=docker)](https://hub.docker.com/r/geodatagouv/geo.data.gouv.fr)

```bash
$ docker pull geodatagouv/geo.data.gouv.fr:latest
```

## Mainteneurs principaux

[Jérôme Desboeufs](https://github.com/jdesboeufs), [Théophile Merlière](https://github.com/tmerlier) et [Bertrand Marron](https://github.com/tusbar)

Ce projet est largement ouvert aux contributions.

## License

MIT

## Divers

```
    ╚⊙ ⊙╝
  ╚═(███)═╝
 ╚═(███)═╝
╚═(███)═╝
 ╚═(███)═╝
  ╚═(███)═╝
   ╚═(███)═╝
```
