const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json()); // чтобы принимать JSON

// Роут для отправки письма
app.post('/send-mail', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Необходимы поля to, subject и text' });
    }

    try {
        // Настройка транспортера (пример для Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'твояпочта@gmail.com',
                pass: 'пароль_или_app_password'
            }
        });

        // Письмо
        const mailOptions = {
            from: 'твояпочта@gmail.com',
            to,
            subject,
            text
        };

        // Отправка
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Письмо отправлено' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при отправке письма' });
    }
});

// app.listen(3000, () => console.log('Server running on port 3000'));