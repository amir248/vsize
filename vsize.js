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

// папка с шаблонами !!! views
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
app.get('/gallery',(req, res)=>{
  res.render('gallery');
});
app.get('/gallery2',(req, res)=>{
  res.render('gallery2');
});
app.get('/custom-kitchens',(req, res)=>{
	res.render('custom-kitchens');
});
app.get('/privacy', (req, res)=>{
  res.render('privacy');
});
app.get('/custom-kitchen', (req, res) => {
    res.render('custom-kitchen', {
        pageTitle: "Кухни на заказ в Москве — Создайте свою идеальную кухню",
        pageSubtitle: "Индивидуальные решения, современный дизайн и удобная сборка под ключ",
        pageDescription: "Закажите кухню на заказ в Москве по индивидуальному проекту. Широкий выбор материалов, встроенная техника, доставка и сборка под ключ.",
        features: [
            "Более 500 реализованных проектов",
            "Работаем с МДФ, ЛДСП, массивом дерева",
            "3D-дизайн проекта бесплатно",
            "Доставка и сборка в удобное время",
            "Гарантия качества и материалов"
        ],
        gallery: [
            { img: "/images/kitchen1.jpg", alt: "Современная кухня" },
            { img: "/images/kitchen2.jpg", alt: "Классическая кухня" },
            { img: "/images/kitchen3.jpg", alt: "Угловая кухня" }
        ],
        materials: [
            { title: "МДФ", desc: "экономно и красиво" },
            { title: "ЛДСП", desc: "долговечно и практично" },
            { title: "Массив дерева", desc: "премиум качество" },
            { title: "Дополнительно", desc: "стекло, металл, камень, декоративные элементы" }
        ],
        steps: [
            { number: 1, title: "Замер и консультация", desc: "бесплатно приезжаем на объект" },
            { number: 2, title: "Дизайн-проект в 3D", desc: "визуализация вашей кухни" },
            { number: 3, title: "Производство и согласование", desc: "индивидуальный подход" },
            { number: 4, title: "Доставка и сборка", desc: "аккуратно и быстро" },
            { number: 5, title: "Гарантия и поддержка", desc: "ваша кухня будет служить долго" }
        ],
        reviews: [
            { name: "Алексей", city: "Москва", text: "Отличная кухня, сделали всё по проекту, быстро и качественно." },
            { name: "Марина", city: "Москва", text: "Очень довольна сборкой и дизайном. Рекомендую!" }
        ],
        faq: [
            { question: "Сколько стоит кухня на заказ?", answer: "Цена зависит от площади, материалов и сложности проекта. Рассчитаем индивидуально." },
            { question: "Как долго делают кухню под ключ?", answer: "Средний срок — 3-6 недель, зависит от проекта." },
            { question: "Можно ли заказать маленькую кухню?", answer: "Да, мы делаем кухни любого размера и планировки." },
            { question: "Что входит в сборку и доставку?", answer: "Сборка мебели, установка фурнитуры, подключение техники, уборка после установки." }
        ],
        contact: {
            phone: "+74951234567",
            email: "info@vsize.ru",
            address: "Москва, ул. Примерная, д. 1"
        }
    });
});
// 404 middleware — ставим после всех маршрутов
app.use((req, res, next) => {
  res.status(404).render('404',{}); // ставим HTTP статус 404
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
