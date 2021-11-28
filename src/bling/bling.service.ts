import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { create } from 'xmlbuilder2';

import { IPostDeal } from './interfaces/IpostDeal';

@Injectable()
export class BlingService {
  async postDeal(postDeal: IPostDeal) {
    const doc = create({ version: '1.0', encoding: 'UTF8' }, postDeal);
    const xml = String(doc.end({ prettyPrint: true }));

    const response = await axios.post(
      'https://bling.com.br/Api/v2/pedido/json/',
      null,
      {
        params: {
          apikey: process.env.BLING_API_KEY,
          xml,
        },
      },
    );
    return response.statusText;
  }
}
