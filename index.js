import express from 'express';
import cors from 'cors';
import rotaOrganizador from './Rotas/OrganRoutes.js';
import rotaEvento from './Rotas/EventoRoutes.js';

const host='0.0.0.0';
const porta=3001;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/organizador',rotaOrganizador);
app.use('/evento',rotaEvento);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
