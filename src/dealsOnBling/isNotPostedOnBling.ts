import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BlingController } from 'src/bling/bling.controller';
import { BlingService } from 'src/bling/bling.service';
import { IPostDeal } from 'src/bling/interfaces/IpostDeal';
import { DealsService } from 'src/deals/deals.service';
import { CreateDealDto } from 'src/deals/dto/create-deal.dto';
import { UpdateDealDto } from 'src/deals/dto/update-deal.dto';

@Injectable()
export class isNotPostedOnBling {
  constructor(
    @Inject(forwardRef(() => DealsService))
    private readonly dealService: DealsService,
    @Inject(forwardRef(() => BlingService))
    private readonly blingService: BlingService,
    @Inject(forwardRef(() => BlingController))
    private readonly blingController: BlingController,
  ) {}
  async execute(wonDay: string, deal) {
    // Se o deal não existir no banco vai retornar null
    const response = await this.dealService.findByDate(wonDay);

    const postDealDto: IPostDeal = this.blingController.FormatPostDeal(deal);

    // Precisamos esperar um pouco para não bater o limite de requisições :/
    const waitFor = (delay) =>
      new Promise((resolve) => setTimeout(resolve, delay));

    await waitFor(2000);

    // Agora sim faremos a requisição
    const dealPostedOnBling = await this.blingService.postDeal(postDealDto);
    console.log(dealPostedOnBling);

    // Insere um deal no banco
    if (!response) {
      try {
        const createDealDto: CreateDealDto = {
          totalValue: deal.value,
          wonDay: wonDay,
        };

        return this.dealService.create(createDealDto);
      } catch (error) {
        console.log(error.code);
      }
    }
    // Faz update de um deal existente

    const updateDealDto: UpdateDealDto = {
      totalValue: response.totalValue + deal.value,
      wonDay: wonDay,
    };

    return this.dealService.updateTotalValue(updateDealDto);
  }
}
