import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deal } from './Deal';

@Injectable()
export class DealsService {
  constructor(
    @InjectModel('Deal')
    private readonly dealModel: Model<Deal>,
  ) {}

  async create(createDealDto: CreateDealDto) {
    const createdDeal = new this.dealModel(createDealDto);
    return await createdDeal.save();
  }

  async findAll() {
    return await this.dealModel.find().exec();
  }

  async findByDate(date: string) {
    return this.dealModel.findOne({ wonDay: date });
  }

  async updateTotalValue(updateDealDto: UpdateDealDto) {
    await this.dealModel
      .updateOne(
        { wonDay: updateDealDto.wonDay },
        { totalValue: updateDealDto.totalValue },
      )
      .exec();

    return this.findByDate(updateDealDto.wonDay);
  }

  async remove(wonDay: string) {
    return await this.dealModel.deleteOne({ wonDay: wonDay }).exec();
  }
}
