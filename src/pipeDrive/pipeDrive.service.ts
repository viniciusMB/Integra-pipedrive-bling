import { Injectable } from '@nestjs/common';
import { Pipedrive } from 'pipedrive';

@Injectable()
export class PipeDriveService {
  async getDeals() {
    const defaultClient = Pipedrive.ApiClient.instance;
    const apiToken = defaultClient.authentications.api_key;

    apiToken.apiKey = 'c168dff19907f8f4d23c3828d35d9af50fcc8fed';

    const api = new Pipedrive.DealsApi();
    const opts = { status: 'won' };

    const deals = await api.getDeals(opts);
    const cleanedDeals = deals.data;

    /*  Adicionando um valor que sempre será diferente do won_time do último deal,
        assim todos os deals serão salvos no banco (seguindo a lógica do cron.service) */
    cleanedDeals.push({ won_time: 'xxxxxxxxxx xxxxxxxx' });

    return cleanedDeals;
  }
}
