import EventoDAO from "../Persistencia/Evento.js";

export default class Evento{
    #codigo;
    #titulo;
    #local;
    #data;
    #hora;
    #capacidade;


    constructor(codigo=0,titulo=""
                ){
        this.#codigo=codigo;
        this.#titulo=titulo;
        this.#local=local;
        this.#data=data;
        this.#hora=hora;
        this.#capacidade=capacidade;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get titulo(){
        return this.#titulo;
    }

    set titulo(novoTitulo){
        this.#titulo=novoTitulo;
    }

    get local(){
        return this.#local;
    }

    set local(novoLocal){
        this.#local = novoLocal
    }

    get data(){
        return this.#data;
    }
    
    set data(novaData){
        this.#data = novaData
    }

    get hora(){
        return this.#hora;
    }

    set hora(novaHora){
        this.#hora = novaHora;
    }

    get capacidade(){
        return this.#capacidade;
    }

    set capacidade(novaCapacidade){
        this.#capacidade = novaCapacidade;
    }


    toJSON(){
        return {
            codigo:this.#codigo,
            titulo:this.#titulo,
            local:this.#local,
            data:this.#data,
            hora:this.#hora,
            capacidade:this.#capacidade,
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const eventDAO = new EventoDAO();
        await eventDAO.gravar(this);
     }
 
     async excluir(){
        const eventDAO = new EventoDAO();
        await eventDAO.excluir(this);
     }
 
     async alterar(){
        const eventDAO = new EventoDAO();
        await eventDAO.atualizar(this);
     }
 
     async consultar(termo){
        const eventDAO = new EventoDAO();
        return await eventDAO.consultar(termo);
     }

}