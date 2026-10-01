const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON bodies and expose them through req.body.
app.use(express.json());

const articles = [
  { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
  { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
  { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
];

const users = [
  { id: 1, name: 'Aya', email: 'aya@example.com' },
  { id: 2, name: 'Ali', email: 'ali@example.com' },
  { id: 3, name: 'Omar', email: 'omar@example.com' }
];

let nextId = 4;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, I am the blog API' });
});

// GET /api/articles
// GET /api/articles?author=Aya
app.get('/api/articles', (req, res) => {
  const { author } = req.query;
  const result = author
    ? articles.filter((article) => article.author === author)
    : articles;

  res.json({ total: result.length, articles: result });
});

app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find((item) => item.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} introuvable` });
  }

  return res.json(article);
});

app.post('/api/articles', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      error: 'Title and author are required'
    });
  }

  const newArticle = { id: nextId, title, author };
  nextId += 1;
  articles.push(newArticle);

  return res.status(201).json({
    message: 'Article created',
    article: newArticle
  });
});

// Exercise 1.1
app.get('/about', (req, res) => {
  res.json({
    application: 'Blog API',
    student: 'Ferdaous',
    version: '1.0.0'
  });
});

// Exercise 1.2 and bonus 1.5
app.get('/api/users', (req, res) => {
  const { name } = req.query;
  const result = name
    ? users.filter((user) => user.name === name)
    : users;

  res.json(result);
});

// Exercise 1.3
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ error: `User ${id} not found` });
  }

  return res.json(user);
});

// Exercise 1.4
app.post('/contact', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      error: 'Email and message are required'
    });
  }

  return res.status(200).json({
    message: 'Thank you, your message has been received'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
