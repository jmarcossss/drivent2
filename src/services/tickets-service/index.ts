import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function findTickets(userId: number) {
  const { id: enrollmentId } = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) throw notFoundError();
  return await ticketRepository.findTickets();
}

async function findTicketsTypes() {
  return await ticketRepository.findTicketsTypes();
}

type CreateTicketType = {
  ticketTypeId: number;
  userId: number;
};

async function createTicket(ticket: CreateTicketType) {
  const { ticketTypeId, userId } = ticket;
  const { id: enrollmentId } = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollmentId) throw notFoundError();
  const response = await ticketRepository.createTicket({ ticketTypeId, enrollmentId });
  if (!response) throw notFoundError();
  return response;
}

async function getTicketType(ticketTypeId: number) {
  return await ticketRepository.findTicketTypeById(ticketTypeId);
}

const ticketsService = {
  createTicket,
  getTicketType,
  findTickets,
  findTicketsTypes,
};

export default ticketsService;
