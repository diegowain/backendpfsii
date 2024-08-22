import Evento from '../Modelo/Evento.js';
import conectar from './conexao.js';

export default class EventoDAO {

    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS evento(
                 event_codigo INT NOT NULL AUTO_INCREMENT,
                 codigo INT PRIMARY KEY,  
                 titulo VARCHAR(100) NOT NULL,  
                 local VARCHAR(100) NOT NULL,   
                 data DATE NOT NULL,            
                 hora TIME NOT NULL,            
                 capacidade INT NOT NUL
                CONSTRAINT pk_evento PRIMARY KEY(event_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }


    async gravar(evento) {
        if (evento instanceof Evento) {
            const sql = `INSERT INTO evento(titulo, local, data, hora, capacidade)
                VALUES(?,?,?,?,?)`;
            const parametros = [evento.titulo, evento.local, evento.data, evento.hora, evento.capacidade];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            evento.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(evento) {
        if (evento instanceof Evento) {
            const sql = `UPDATE evento SET event_titulo = ?, event_local = ?, event_data = ?,
             event_hora = ?, event_capacidade = ?
            WHERE event_codigo = ?`;
            const parametros = [evento.nome, evento.local, evento.data, evento.hora, evento.capacidade, evento.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(evento) {
        if (evento instanceof Evento) {
            const sql = `DELETE FROM evento WHERE event_codigo = ?`;
            const parametros = [evento.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaEventos = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do produto
            const sql = `SELECT e.event_codigo, e.event_titulo, e.event_local, e.event_data,e.event_hora, 
            e.event_capacidade
              FROM evento e 
              WHERE e.event_codigo = ?
              ORDER BY e.event_nome               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const evento = new Evento(registro.event_codigo,registro.event_titulo,registro.event_local,
                                            registro.event_data, registro.event_hora, registro.event_capacidade
                                            );
                listaEventos.push(evento);
            }
        }
        else
        {
            //consulta pela descrição do produto
            const sql = `SELECT e.event_codigo, e.event_titulo, e.event_local, e.event_data,e.event_hora,
                         e.event_capacidade
                         FROM evento e  
                         WHERE e.event_nome like ?
                         ORDER BY e.event_nome`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const evento = new Evento(registro.event_codigo,registro.event_titulo,registro.event_local,
                    registro.event_data, registro.event_hora, registro.event_capacidade
                                            );
                listaEventos.push(evento);
            }
        }

        return listaEventos;
    }
}