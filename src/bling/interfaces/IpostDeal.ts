export interface IPostDeal {
  pedido: {
    numero: number;
    cliente: {
      id: number;
      nome: string;
      email: string;
    };
    volumes: {
      volume: {
        servico: string;
      };
    };

    parcela: {
      vlr: number;
    };

    item: {
      qtde: number;
      vlr_unit: number;
      codigo: number;
      descricao: string;
      un: string;
    };
  };
}
