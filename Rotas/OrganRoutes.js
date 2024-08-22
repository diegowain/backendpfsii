import { Router } from "express";
import OrganizadorController from "../Controle/OrganizadorController.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const orgController = new OrganizadorController();
const rotaOrganizador= new Router();

rotaOrganizador
.get('/',orgController.consultar)
.get('/:termo', orgController.consultar)
.post('/',orgController.gravar)
.patch('/',orgController.atualizar)
.put('/',orgController.atualizar)
.delete('/',orgController.excluir);

export default rotaOrganizador;