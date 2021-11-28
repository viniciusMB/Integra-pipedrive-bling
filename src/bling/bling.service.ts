import { forwardRef, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { DealsOnBlingService } from 'src/dealsOnBling/dealsOnbling.service';
import { CreateDealsOnBlingDto } from 'src/dealsOnBling/dto/create-deals-on-bling.dto';
import { create } from 'xmlbuilder2';

import { IPostDeal } from './interfaces/IpostDeal';

@Injectable()
export class BlingService {
  constructor(
    @Inject(forwardRef(() => DealsOnBlingService))
    private readonly dealsOnBlingService: DealsOnBlingService,
  ) {}

  async postDeal(postDeal: IPostDeal) {
    const doc = create({ version: '1.0', encoding: 'UTF8' }, postDeal);
    const xml = String(doc.end({ prettyPrint: true }));
    try {
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
      const createDealsOnBlingDto: CreateDealsOnBlingDto = postDeal;
      const created = await this.dealsOnBlingService.create(
        createDealsOnBlingDto,
      );
      const formatedResponse = [response.statusText, created];
      return formatedResponse;
    } catch (error) {
      console.log(error.statusText);
    }
  }

  async getDealByID(id: number) {
    try {
      const dealOnBling = await this.dealsOnBlingService.findByID(id);
      console.log(dealOnBling);
      return dealOnBling;
    } catch (e) {
      console.log(e);
    }
  }
}
