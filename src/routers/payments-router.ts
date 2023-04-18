import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas';
import { createPayment, findPayments } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', findPayments);
paymentsRouter.post('/process', validateBody(createPaymentSchema), createPayment);

export { paymentsRouter };
