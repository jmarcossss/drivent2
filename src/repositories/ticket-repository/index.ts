import { prisma } from '@/config';

async function findTickets() {
  return await prisma.ticket.findMany({
    include: {
      TicketType: true,
    },
  });
}

async function findTicketById(ticketId: number) {
  return await prisma.ticket.findFirst({ where: { id: ticketId } });
}

async function findTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function findTicketTypeById(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({ where: { id: ticketTypeId } });
}

type CreateTicketType = { ticketTypeId: number; enrollmentId: number };

async function createTicket(ticket: CreateTicketType) {
  return await prisma.ticket.create({
    data: {
      ...ticket,
      status: 'RESERVED',
    },
  });
}

async function updateTicketById(ticketId: number) {
  return await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'PAID',
    },
  });
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
