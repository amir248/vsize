require('dotenv').config();
// mailer.js
const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Роут для отправки письма
router.post('/send-mail', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Необходимы поля to, subject и text' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // можно заменить на любой SMTP
            auth: {
                user: 'chikchicly@gmail.com',
                pass: process.env.SECRET_PASS
            }
        });

        const mailOptions = { from: 'chikchicly@gmail.com', to, subject, text };
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Письмо отправлено' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при отправке письма' });
    }
});

module.exports = router;