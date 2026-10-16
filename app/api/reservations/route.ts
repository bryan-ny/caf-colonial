
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const reservationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(20),
  email: z.union([
    z.literal(""),
    z.string().email().max(254),
  ]).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  guests: z.number().int().min(1).max(15),
  notes: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = reservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Verifique os dados preenchidos." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // O formulário envia horário local de Campo Largo.
    // Esta versão usa o fuso America/Sao_Paulo.
    const dateTime = new Date(
      `${data.date}T${data.time}:00-03:00`
    );

    if (Number.isNaN(dateTime.getTime())) {
      return NextResponse.json(
        { error: "Data ou horário inválido." },
        { status: 400 }
      );
    }

    if (dateTime.getTime() <= Date.now()) {
      return NextResponse.json(
        { error: "Escolha uma data e horário futuros." },
        { status: 400 }
      );
    }

    const settings = await prisma.siteSettings.findUnique({
      where: { id: 1 },
    });

    if (!settings) {
      return NextResponse.json(
        { error: "As reservas ainda não foram configuradas." },
        { status: 503 }
      );
    }

    if (data.guests > settings.maxGuestsPerBooking) {
      return NextResponse.json(
        { error: "A quantidade de pessoas excede o limite por reserva." },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(
      async (tx) => {
        const reservations = await tx.reservation.findMany({
          where: {
            dateTime,
            status: "CONFIRMED",
          },
          select: { guests: true },
        });

        const occupied = reservations.reduce(
          (total, reservation) => total + reservation.guests,
          0
        );

        if (
          occupied + data.guests >
          settings.capacityPerSlot
        ) {
          throw new Error("SLOT_UNAVAILABLE");
        }

        return tx.reservation.create({
          data: {
            name: data.name,
            phone: data.phone,
            email: data.email || null,
            dateTime,
            guests: data.guests,
            notes: data.notes || null,
            status: "CONFIRMED",
          },
          select: {
            id: true,
            dateTime: true,
            guests: true,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return NextResponse.json(
      {
        id: result.id,
        dateTime: result.dateTime,
        guests: result.guests,
        status: "CONFIRMED",
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "SLOT_UNAVAILABLE"
    ) {
      return NextResponse.json(
        { error: "Esse horário não possui capacidade disponível." },
        { status: 409 }
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2034"
    ) {
      return NextResponse.json(
        { error: "Houve uma disputa por disponibilidade. Tente novamente." },
        { status: 409 }
      );
    }

    console.error("Erro ao processar reserva.");

    return NextResponse.json(
      { error: "Não foi possível concluir a reserva." },
      { status: 500 }
    );
  }
}
