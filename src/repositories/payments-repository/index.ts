import { prisma } from '@/config';
import { PaymentInfoType } from '@/controllers';

async function findPayments() {
  const payments = await prisma.payment.findMany();
  return payments;
}

async function createPayment({ ticketId, cardData, value }: PaymentInfoType & { value: number }) {
  const payment = await prisma.payment.create({
    data: {
      ticketId,
      cardIssuer: cardData.issuer,
      cardLastDigits: String(cardData.number).slice(-4),
      value: value,
    },
  });

  return payment;
}

const paymentsRepository = { findPayments, createPayment };

export default paymentsRepository;
