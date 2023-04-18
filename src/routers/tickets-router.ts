import { Router } from 'express';
import { createTicket, ticketsDone, ticketsDoneAuth } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/', ticketsDone);
ticketsRouter.get('/types', ticketsDoneAuth);
ticketsRouter.post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
