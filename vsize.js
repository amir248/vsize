const express = require('express');
const app = express();

const PORT = 3000;

// статика (css, js, картинки)
app.use(express.static('public'));
// говорим что используем EJS
app.set('view engine', 'ejs');

// папка с шаблонами
app.set('views', './views');

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
// app.get('/', (req, res) => {
//     res.send('Vsize Express Server работает 🚀');
// });

// пример API
app.get('/api/status', (req, res) => {
    res.json({
        status: 'ok',
        server: 'vsize',
        time: new Date()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
