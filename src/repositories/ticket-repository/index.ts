import { prisma } from '@/config';

async function findTickets() {
  const tickets = await prisma.ticket.findMany({
    include: { TicketType: true },
  });
  return tickets;
}

async function findTicketById(ticketId: number) {
  const ticket = await prisma.ticket.findFirst({ where: { id: ticketId } });
  return ticket;
}

async function findTicketsTypes() {
  const ticketTypes = await prisma.ticketType.findMany();
  return ticketTypes;
}

async function findTicketTypeById(ticketTypeId: number) {
  const ticketType = await prisma.ticketType.findFirst({ where: { id: ticketTypeId } });
  return ticketType;
}

type CreateTicketType = { ticketTypeId: number; enrollmentId: number };

async function createTicket(ticket: CreateTicketType) {
  const createdTicket = await prisma.ticket.create({ data: { ...ticket, status: 'RESERVED' } });
  return createdTicket;
}

async function updateTicketById(ticketId: number) {
  const updatedTicket = await prisma.ticket.update({ where: { id: ticketId }, data: { status: 'PAID' } });
  return updatedTicket;
}

const ticketRepository = {
  findTickets,
  findTicketById,
  findTicketsTypes,
  findTicketTypeById,
  createTicket,
  updateTicketById,
};

export default ticketRepository;
