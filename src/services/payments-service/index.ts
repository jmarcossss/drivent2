import { notFoundError, unauthorizedError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import { PaymentInfoType } from '@/controllers';

type FindPaymentsType = { userId: number; ticketId: number };

async function findPayments({ userId, ticketId }: FindPaymentsType) {
  const [ticket, enrollment] = await Promise.all([
    ticketRepository.findTicketById(ticketId),
    enrollmentRepository.findEnrollmentById(userId),
  ]);

  if (!ticket || !enrollment) throw notFoundError();
  if (enrollment.userId !== userId) throw unauthorizedError();

  const payments = await paymentsRepository.findPayments();
  return payments;
}

type CreatePaymentType = {
  paymentInfo: PaymentInfoType;
  userId: number;
};

async function createPayment({ paymentInfo, userId }: CreatePaymentType) {
  const { ticketId, cardData } = paymentInfo;
  const ticket = await ticketRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const [ticketType, enrollment] = await Promise.all([
    ticketRepository.findTicketTypeById(ticket.ticketTypeId),
    enrollmentRepository.findEnrollmentById(ticket.enrollmentId),
  ]);

  if (!enrollment) throw notFoundError();
  if (enrollment.userId !== userId) throw unauthorizedError();

  await ticketRepository.updateTicketById(ticketId);

  const payment = await paymentsRepository.createPayment({ ticketId, cardData, value: ticketType.price });
  return payment;
}

const paymentsService = { findPayments, createPayment };

export default paymentsService;
