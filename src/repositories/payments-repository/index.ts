import { prisma } from '@/config';
import { PaymentInfoType } from '@/controllers';

async function findPayments() {
  return await prisma.payment.findMany();
}

async function createPayment({ ticketId, cardData, value }: PaymentInfoType & { value: number }) {
  return await prisma.payment.create({
    data: {
      ticketId,
      cardIssuer: cardData.issuer,
      cardLastDigits: String(cardData.number).slice(-4),
      value: value,
    },
  });
}

const paymentsRepository = {
  findPayments,
  createPayment,
};

export default paymentsRepository;
