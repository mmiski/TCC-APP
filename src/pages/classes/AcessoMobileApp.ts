

export class AcessoMobileApp{
    
        constructor(public usuarioKey: string = "", 
                    public clienteKey: string = "",
                    public tipoUsuario: number = 0,
                    public codigo: string = "",
                    public ultimoAcesso: string= "",
                    public dispositivoUltimoAcesso: string = "",
                    public $key: string = ""){}
    }