import express from 'express';
import cors from 'cors';
import rotaOrganizador from './Rotas/OrganRoutes.js';
import rotaEvento from './Rotas/EventoRoutes.js';
import rotaAutenticacao from './Rotas/AutenticacaoRoutes.js';
import session from 'express-session';
import dotenv from 'dotenv';
import {verificarAutenticacao} from './seguranca/autenticar.js';

dotenv.config();


const host='0.0.0.0';
const porta=3005;

const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 }}));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/organizador',verificarAutenticacao,rotaOrganizador);
app.use('/evento',verificarAutenticacao,rotaEvento);
app.use('/autenticacao',rotaAutenticacao);


app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
