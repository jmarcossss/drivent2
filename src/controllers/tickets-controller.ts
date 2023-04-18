import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function ticketsDone(_req: AuthenticatedRequest, res: Response) {
  const { userId } = _req as { userId: number };

  try {
    const [tickets] = await ticketsService.ticketsDone(userId);
    if (!tickets) {
      throw new Error();
    }
    res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function ticketsDoneAuth(_req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketsService.ticketsDoneAuth();
    res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function createTicket(_req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = _req.body as { ticketTypeId: number };
  const { userId } = _req as { userId: number };

  try {
    const response = await ticketsService.createTicket({ ticketTypeId, userId });
    const typeResponse = await ticketsService.getTicketType(ticketTypeId);
    res.status(httpStatus.CREATED).send({ ...response, TicketType: { ...typeResponse } });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({});
  }
}
