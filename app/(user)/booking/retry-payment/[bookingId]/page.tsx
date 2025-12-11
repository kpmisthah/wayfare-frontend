import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";


export default async function RetryPaymentPage({ params }: {
  params: Promise<{ bookingId: string }>;
}) {

  const { bookingId } = await params;

  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/booking/retry-payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      credentials: "include",
      body: JSON.stringify({ bookingId }),
    }
  );

  if (!res.ok) {
    redirect(`/booking/failure?booking_id=${bookingId}&reason=retry_failed`);
  }

  const data = await res.json();
  if (data.url) {
    redirect(data.url);
  }

  redirect(`/booking/failure?booking_id=${bookingId}&reason=no_checkout_url`);
}