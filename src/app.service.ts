import { Injectable } from '@nestjs/common';
import * as pipedrive from 'pipedrive';

@Injectable()
export class AppService {
  getHello(): string {
    const defaultClient = pipedrive.ApiClient.instance;
    const apiToken = defaultClient.authentications.api_key;

    apiToken.apiKey = 'c168dff19907f8f4d23c3828d35d9af50fcc8fed';

    return 'Hello World!';
  }
}
