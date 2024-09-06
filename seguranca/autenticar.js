import {assinar, verificarAssinatura} from '../seguranca/funcoesJWT.js'

export default function login (req,resp){

    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === 'admin' && senha === 'admin') {

        req.session.usuario = usuario;

        resp.status(200).json({
            status: true,
            mensagem: 'Login efetuado com sucesso',
            token: assinar(usuario)
        })
     }
    else {
        resp.status(401).json({
            status: false,
            mensagem: 'Usúario ou senha inválido'})
    }
}

export  function logout (req,res){

    req.session.destroy();

}

export function verificarAutenticacao(req, resp, next) {

    const token = req.headers['Authorization'];
    let tokenVerificado = undefined;
    if (!token) {
        tokenVerificado = verificarAssinatura(token);
        if(tokenVerificado != undefined && tokenVerificado.usuario == req.session.usuario){
            next();}

            else {
                resp.status(401).json({
                    status: false,
                    mensagem: 'Acesso não autorizado!'
                })
    }}

    else{
        resp.status(401).json({
            status: false,
            mensagem: 'Acesso não autorizado!'})
        
    }
}
