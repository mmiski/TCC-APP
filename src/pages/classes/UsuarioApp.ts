export class UsuarioApp{
    constructor(public nome: string = "", 
    public cpf: string = "",
    public dataNascimento: string ="",
    public telefone: string = "",
    public $key: string = "",
    public tipoUsuario: number = 0,
    public email: string = ""){}
  }