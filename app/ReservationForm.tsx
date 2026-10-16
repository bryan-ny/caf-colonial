
"use client";

import { useState, type FormEvent } from "react";

export default function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
      guests: Number(data.get("guests")),
      notes: String(data.get("notes") ?? ""),
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ?? "Não foi possível realizar a reserva."
        );
      }

      setSuccess(true);
      setMessage(
        `Reserva confirmada! Código: ${result.id}`
      );
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Erro inesperado. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h3>Reserve sua experiência</h3>
      <p>Preencha os dados para consultar a disponibilidade.</p>

      <label htmlFor="name">Nome completo</label>
      <input
        id="name"
        name="name"
        required
        minLength={2}
        maxLength={100}
        autoComplete="name"
        placeholder="Seu nome"
      />

      <div className="form-row">
        <div>
          <label htmlFor="phone">WhatsApp</label>
          <input
            id="phone"
            name="phone"
            required
            maxLength={20}
            autoComplete="tel"
            placeholder="DDD + telefone"
          />
        </div>

        <div>
          <label htmlFor="guests">Pessoas</label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="15"
            defaultValue="2"
            required
          />
        </div>
      </div>

      <label htmlFor="email">E-mail (opcional)</label>
      <input
        id="email"
        name="email"
        type="email"
        maxLength={254}
        autoComplete="email"
        placeholder="voce@exemplo.com"
      />

      <div className="form-row">
        <div>
          <label htmlFor="date">Data</label>
          <input
            id="date"
            name="date"
            type="date"
            required
          />
        </div>

        <div>
          <label htmlFor="time">Horário</label>
          <input
            id="time"
            name="time"
            type="time"
            required
          />
        </div>
      </div>

      <label htmlFor="notes">Observações (opcional)</label>
      <textarea
        id="notes"
        name="notes"
        maxLength={500}
        rows={3}
        placeholder="Alguma informação para nossa equipe?"
      />

      <button
        type="submit"
        className="button-primary submit-button"
        disabled={loading}
      >
        {loading ? "Verificando disponibilidade..." : "Confirmar reserva"}
      </button>

      {message && (
        <p
          className={success ? "form-success" : "form-error"}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}

      <small>
        A confirmação será exibida somente após o registro
        bem-sucedido da reserva.
      </small>
    </form>
  );
}
