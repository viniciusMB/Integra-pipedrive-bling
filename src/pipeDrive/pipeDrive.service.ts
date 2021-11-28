import { Injectable } from '@nestjs/common';
import * as Pipedrive from 'pipedrive';

@Injectable()
export class PipeDriveService {
  async getDeals() {
    const defaultClient = Pipedrive.ApiClient.instance;
    const apiToken = defaultClient.authentications.api_key;

    apiToken.apiKey = process.env.PIPEDRIVE_API_KEY;

    const api = new Pipedrive.DealsApi();
    const opts = { status: 'won' };

    const deals = await api.getDeals(opts);
    const cleanedDeals = deals.data;

    return cleanedDeals;
  }
}
