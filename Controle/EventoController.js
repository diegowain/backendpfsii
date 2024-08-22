import Evento from "../Modelo/Evento.js";

export default class EventoController {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const titulo = dados.titulo;
            const local = dados.local;
            const data = dados.data;
            const hora = dados.hora;
            const capacidade = dados.capacidade;

            if (capacidade >= 0) {
                const evento = new Evento(0, titulo, local,
                    data, hora, capacidade
                );
                //resolver a promise
                evento.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": evento.codigo,
                        "mensagem": "Evento registrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar evento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do evento segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um evento!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const titulo = dados.titulo;
            const local = dados.local;
            const data = dados.data;
            const hora = dados.hora;
            const capacidade = dados.capacidade;
            if (capacidade >= 0) {
                const evento = new Evento(codigo, nome, local,
                    data, hora, capacidade);
                //resolver a promise
                evento.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Evento atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o evento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do evento segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um evento!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const evento = new Evento(codigo);
                //resolver a promise
                evento.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Evento excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o evento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do evento!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um evento"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const evento = new Evento();
            evento.consultar(termo).then((listaEventos) => {
                resposta.json(
                    {
                        status: true,
                        listaEventos
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os eventos: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar eventos!"
            });
        }
    }
}