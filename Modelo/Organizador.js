import OrganizadorDAO from "../Persistencia/Organizador.js";
//não esqueça do .js no final da importação

export default class Organizador {
    //definição dos atributos privados
    #codigo;
    #nome;

    constructor(codigo=0, nome=''){
        this.#codigo=codigo;
        this.#nome=nome;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            descricao:this.#nome
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const OrgDAO = new OrganizadorDAO();
        await OrgDAO.gravar(this);
    }

    async excluir(){
        const OrgDAO = new OrganizadorDAO();
        await OrgDAO.excluir(this);
    }

    async atualizar(){
        const OrgDAO = new OrganizadorDAO();
        await OrgDAO.atualizar(this);

    }

    async consultar(parametro){
        const OrgDAO = new OrganizadorDAO();
        return await OrgDAO.consultar(parametro);
    }
}