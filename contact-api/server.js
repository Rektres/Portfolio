const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://rektres.github.io';
const MESSAGES_DIR = process.env.MESSAGES_DIR || path.join(__dirname, 'messages');

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: '10kb' }));

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
});

app.post(['/', '/api/contact'], contactLimiter, async (req, res) => {
    const { name, email, message } = req.body ?? {};

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
        return res.status(400).json({ error: 'Campos inválidos.' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
        return res.status(400).json({ error: 'Por favor completa todos los campos.' });
    }

    if (trimmedName.length > 100 || trimmedMessage.length > 5000 || trimmedEmail.length > 150) {
        return res.status(400).json({ error: 'Uno de los campos excede el largo permitido.' });
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
        return res.status(400).json({ error: 'Por favor ingresa un email válido.' });
    }

    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    const dateStr = formatter.format(new Date()).replace(',', 'T').replace(/:/g, '-');
    const sanitizedName = trimmedName.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 50);
    const fileName = `${sanitizedName}_${dateStr}.txt`;
    const filePath = path.join(MESSAGES_DIR, fileName);
    const fechaStr = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
    const content = `Fecha: ${fechaStr}\nNombre: ${trimmedName}\nEmail: ${trimmedEmail}\nMensaje:\n${trimmedMessage}\n`;

    try {
        await fs.mkdir(MESSAGES_DIR, { recursive: true });
        await fs.writeFile(filePath, content, 'utf8');
        return res.status(201).json({ ok: true });
    } catch (err) {
        console.error('Error al guardar el mensaje de contacto:', err);
        return res.status(500).json({ error: 'Error del servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`contact-api escuchando en el puerto ${PORT}`);
});
