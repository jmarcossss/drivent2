import Joi from 'joi';

type CreatePaymentType = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export const createPaymentSchema = Joi.object<CreatePaymentType>({
  ticketId: Joi.number().required(),
  cardData: Joi.object().required(),
});
