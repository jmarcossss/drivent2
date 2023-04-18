import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function findTickets(userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const tickets = await ticketRepository.findTickets();
  return tickets;
}

async function findTicketsTypes() {
  const ticketTypes = await ticketRepository.findTicketsTypes();
  return ticketTypes;
}

type CreateTicketType = { ticketTypeId: number; userId: number };

async function createTicket(ticket: CreateTicketType) {
  const { ticketTypeId, userId } = ticket;
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const response = await ticketRepository.createTicket({ ticketTypeId, enrollmentId: enrollment.id });
  if (!response) {
    throw notFoundError();
  }
  return response;
}

async function getTicketType(ticketTypeId: number) {
  const ticketType = await ticketRepository.findTicketTypeById(ticketTypeId);
  return ticketType;
}

const ticketsService = { createTicket, getTicketType, findTickets, findTicketsTypes };

export default ticketsService;
