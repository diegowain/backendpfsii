import Organizador from "../Modelo/Organizador.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class OrganizadorDAO{

    constructor() {
        this.init();
    }
    
    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS organizador(
                    org_codigo INT NOT NULL AUTO_INCREMENT,
                    org_nome VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_organizador PRIMARY KEY(org_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }
    async gravar(organizador){
        if (organizador instanceof Organizador){
            const sql = "INSERT INTO organizador(org_nome) VALUES(?)"; 
            const parametros = [organizador.nome];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            organizador.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(organizador){
        if (organizador instanceof Organizador){
            const sql = "UPDATE organizador SET org_nome = ? WHERE org_codigo = ?"; 
            const parametros = [organizador.nome, organizador.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(organizador){
        if (organizador instanceof Organizador){
            const sql = "DELETE FROM organizador WHERE org_codigo = ?"; 
            const parametros = [organizador.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da categoria
            sql='SELECT * FROM organizador WHERE org_codigo = ? order by org_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM organizador WHERE org_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaOrganizadores = [];
        for (const registro of registros){
            const organizador = new Organizador(registro.org_codigo,registro.org_nome);
            listaOrganizadores.push(organizador);
        }
        return listaOrganizadores;
    }
}