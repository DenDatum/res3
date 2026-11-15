const path = require('path');
const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const bcrypt = require('bcrypt'); 

const app = express();
const users = []; 

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('home', {
        title: 'Главная страница',
        users: users,
        user: req.session.user
    });
});

app.get('/users', (req, res) => {
    if(!req.session.user){
        return this.removeAllListeners.redirect('/login');

    }
    res.render('users', {
        title:'Список пользователей',
        users: users,
        currentUser: req.session.users
    });
});

app.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Регистрация',
        error: null
    });
});


app.post('/registration', async (req, res) => {

    const { username, email, password, passConf } = req.body;

    const userExists = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
        return res.render('registration', {
            title: 'Регистрация',
            error: 'Пользователь с таким email уже существует.'
        });
    }

    if (password !== passConf) {
        return res.render('registration', {
            title: 'Регистрация',
            error: 'Пароли не совпадают.'
        });
    }

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (error) {
        return res.render('registration', { title: 'Регистрация', error: 'Ошибка при регистрации.' });
    }
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Вход',
        error: null
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;


    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        return res.render('login', {
            title: 'Вход',
            error: 'Неверный email или пароль.'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.render('login', {
            title: 'Вход',
            error: 'Неверный email или пароль.'
        });
    }

    req.session.user = {
        username: user.username,
        email: user.email
    };

    res.redirect('/');
});


app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = app;