import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas';
import { createPayment, paymentDone } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);
paymentsRouter.get('/', paymentDone);
paymentsRouter.post('/process', validateBody(createPaymentSchema), createPayment);

export { paymentsRouter };
