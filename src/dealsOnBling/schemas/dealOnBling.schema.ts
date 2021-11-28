import * as mongoose from 'mongoose';

export const DealOnBlingSchema = new mongoose.Schema({
  pedido: {
    numero: Number,
    cliente: {
      id: Number,
      nome: String,
      email: String,
    },

    volumes: {
      volume: {
        servico: String,
      },
    },

    parcela: {
      vlr: Number,
    },

    item: {
      qtde: Number,
      vlr_unit: Number,
      codigo: Number,
      descricao: String,
      un: String,
    },
  },
});
