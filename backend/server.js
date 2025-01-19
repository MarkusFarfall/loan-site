const express = require('express');
const path = require('path'); // Импортируем модуль path для работы с путями
const app = express();
const port = 3000;

// Разрешаем CORS (если нужно)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Разрешаем запросы с любого источника
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
// Маршрут для корневого пути
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html')); // Отправляем HTML-файл
});

// Маршрут для обработки заявок
app.post('/api/loan', (req, res) => {
    const { amount, days } = req.body;
    console.log(`Получена заявка: ${amount} рублей на ${days} дней`);
    res.json({ success: true });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});