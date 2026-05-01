const express = require('express');
const app = express();
const pool = require('./modules/db');

const PORT = 3000;

// импортируем email.js модуль
const mailerRouter = require('./modules/email');
app.use(express.json()); // чтобы работал req.body
app.use('/api', mailerRouter); // теперь /api/send-mail работает

// статика (css, js, картинки)
app.use(express.static('public'));
// говорим что используем EJS
app.set('view engine', 'ejs');

// папка с шаблонами
app.set('views', './views');


app.get('/article/:url', async (req, res) => {
  const { url } = req.params; // получаем параметр из URL
  try {
    // Получаем статью по url
    const result = await pool.query(
      'SELECT * FROM articles WHERE url = $1',
      [url] // обязательно массив параметров для защиты от SQL-инъекций
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Статья не найдена');
    }

    const article = result.rows[0];
    res.render('article', { article });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при подключении к базе данных');
  }
});
app.get('/articles', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT title, description, url FROM articles ORDER BY id DESC'
    );

    res.render('articles', { articles: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка базы данных');
  }
});

app.get('/search', (req, res) => {
    res.render('search');
});
// главная страница
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/projects', (req, res) => {
    res.render('projects');
});
app.get('/prices', (req, res) => {
    res.render('prices');
});
app.get('/map', (req, res) => {
    res.render('map');
});
app.get('/articles', (req, res) =>{
  res.render('articles');
});
// app.get('/', (req, res) => {
//     res.send('Vsize Express Server работает 🚀');
// });
app.get('/custom-cabinet-furniture', (req, res)=>{
    res.render('postOne',{});
});
app.get('/thank-you', (req, res) => {
    res.set('X-Robots-Tag', 'noindex, nofollow');
    res.render('thank-you');
});
app.get('/custom-made-kitchens',(req, res)=>{
  res.render('custom-made-kitchens');
});
// 404 middleware — ставим после всех маршрутов
app.use((req, res, next) => {
  res.status(404).render('404',{}); // ставим HTTP статус 404
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
