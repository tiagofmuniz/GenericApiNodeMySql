// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crudController from './crudController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/bec_users', crudController('bec_users'));
app.use('/aluno', crudController('aluno'));
app.use('/bec_usermeta', crudController('bec_usermeta'));
app.use('/progresso', crudController('progresso'));
app.use('/bec_posts', crudController('bec_posts'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});