
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT;
const mongoUrl = process.env.MongoDB_URL

const server = http.createServer(app);

async function mongoConnect() {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error);
    }
}
async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer()