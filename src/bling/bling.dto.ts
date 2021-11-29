import { Injectable } from '@nestjs/common';
import { IPostDeal } from './interfaces/IpostDeal';

@Injectable()
export class BlingDto {
  FormatPostDeal(deal: any): IPostDeal {
    const postDealDto: IPostDeal = {
      pedido: {
        numero: deal.id,
        cliente: {
          id: deal.user_id.id,
          nome: deal.user_id.name,
          email: deal.user_id.email,
        },
        volumes: {
          volume: {
            servico: 'Mandou chegou',
          },
        },
        parcela: {
          vlr: deal.value,
        },
        item: {
          qtde: 1,
          vlr_unit: deal.value,
          codigo: 2,
          descricao: 'produto postado por vinicius :)',
          un: '1',
        },
      },
    };

    return postDealDto;
  }
}
