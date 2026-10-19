# Projet MERN - TP1, TP2 et TP3

Projet réalisé par Ferdaous Ben Taleb dans le cadre du cours MERN Stack.

Le projet contient une API REST Express pour gérer des utilisateurs et des articles. Les données sont enregistrées dans MongoDB avec Mongoose.

Le [compte rendu du TP3](./Compte_rendu_TP3_Ferdaous_Ben_Taleb.pdf) est aussi disponible dans ce dépôt.

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine du projet :

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/blogDB
```

## Lancement

```bash
npm run dev
```

Le serveur est disponible sur `http://localhost:3000`.

## Routes principales

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `DELETE /api/users/:id`
- `GET /api/articles`
- `GET /api/articles/:id`
- `POST /api/articles`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`

Le projet vérifie aussi les emails dupliqués, les identifiants MongoDB incorrects et la suppression d'un auteur qui possède déjà un article.
