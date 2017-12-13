export class AreaAtuacao{
    
        constructor(public veiculoKey: string = "", 
                    public motoristaKey = "",
                    public rotaPassageiroKey = "",
                    //0-resposta, 1-sim, 2-não, 3-não aviso
                    public utilizo: boolean = true,
                    public dataHoraResp: string = "",
                    public diaSemana: string = ""){}
    }