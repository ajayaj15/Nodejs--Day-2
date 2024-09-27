import express from 'express';
import controller from './src/contoller/index.js';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(controller)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});