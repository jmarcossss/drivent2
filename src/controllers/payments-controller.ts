import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
// import { badRequestError } from '@/errors';

export async function findPayments(_req: AuthenticatedRequest, res: Response) {
  const { userId } = _req as { userId: number };
  const ticketId = Number(_req.query.ticketId);

  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const [payments] = await paymentsService.findPayments({ userId, ticketId });
    res.status(httpStatus.OK).send(payments);
  } catch (error) {
    switch (error.name) {
      case 'BadRequestError':
        res.sendStatus(httpStatus.BAD_REQUEST);
        break;
      case 'NotFoundError':
        res.sendStatus(httpStatus.NOT_FOUND);
        break;
      case 'UnauthorizedError':
        res.sendStatus(httpStatus.UNAUTHORIZED);
        break;
      default:
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export type PaymentInfoType = {
  ticketId: number;
  cardData: { issuer: string; number: number; name: string; expirationDate: Date; cvv: number };
};

export async function createPayment(_req: AuthenticatedRequest, res: Response) {
  const paymentInfo = _req.body as PaymentInfoType;
  const { userId } = _req as { userId: number };

  try {
    const payment = await paymentsService.createPayment({ paymentInfo, userId });
    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    switch (error.name) {
      case 'NotFoundError':
        res.sendStatus(httpStatus.NOT_FOUND);
        break;
      case 'UnauthorizedError':
        res.sendStatus(httpStatus.UNAUTHORIZED);
        break;
      default:
        console.log(error);
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
