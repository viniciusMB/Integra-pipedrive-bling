import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DealOnBling } from './DealOnBling';
import { CreateDealsOnBlingDto } from './dto/create-deals-on-bling.dto';

@Injectable()
export class DealsOnBlingService {
  constructor(
    @InjectModel('DealOnBling')
    private readonly dealOnBlingModel: Model<DealOnBling>,
  ) {}

  async create(createDealsOnBlingDto: CreateDealsOnBlingDto) {
    const createdDealOnBling = new this.dealOnBlingModel(createDealsOnBlingDto);
    return await createdDealOnBling.save();
  }

  async findAll() {
    return await this.dealOnBlingModel.find().exec();
  }

  async findByID(id: number) {
    return await this.dealOnBlingModel.findOne({ 'pedido.numero': id }).exec();
  }

  async remove(wonDay: string) {
    return await this.dealOnBlingModel.deleteOne({ wonDay: wonDay }).exec();
  }
}
