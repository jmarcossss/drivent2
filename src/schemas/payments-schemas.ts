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

const ticketIdSchema = Joi.number().required();
const cardDataSchema = Joi.object().required();

export const createPaymentSchema = Joi.object<CreatePaymentType>({
  ticketId: ticketIdSchema,
  cardData: cardDataSchema,
});
