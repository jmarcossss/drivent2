import { Router } from 'express';
import { createTicket, findTickets, findTicketsTypes } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/', findTickets);
ticketsRouter.get('/types', findTicketsTypes);
ticketsRouter.post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
