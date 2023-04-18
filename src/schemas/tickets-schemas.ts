import Joi from 'joi';

const ticketTypeIdSchema = Joi.number().required();

export const createTicketSchema = Joi.object<{ ticketTypeId: number }>({
  ticketTypeId: ticketTypeIdSchema,
});
