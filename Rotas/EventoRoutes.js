import { Router } from "express";
import EventoController from "../Controle/EventoController.js";

const eventController = new EventoController();
const rotaEvento = new Router();

rotaEvento
.get('/', eventController.consultar)
.get('/:termo', eventController.consultar)
.post('/', eventController.gravar)
.patch('/', eventController.atualizar)
.put('/', eventController.atualizar)
.delete('/', eventController.excluir);

export default rotaEvento;