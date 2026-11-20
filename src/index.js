require('dotenv').config();

const app = require('./app');
const sequelize = require('./db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});

async function start() {
    try{
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Сервер запущен: http://localhost:${PORT}`);
        });
    }catch(error){
        process.exitCode = 1;
    }
}

start();

