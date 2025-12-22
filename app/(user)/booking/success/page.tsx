
import PaymentSuccessPage from "@/modules/user/components/booking/payment-success"
import { cookies } from "next/headers";

export default async function Success({ searchParams }: { searchParams: Promise<{ booking_id: string; payment_method: string }> }) {
  const cookieStore = await cookies()
  const cookieString = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join(';')
  const { booking_id: bookingId, payment_method } = await searchParams
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}/my-booking`, {
    headers: {
      Cookie: cookieString
    },
    cache: 'no-store',
    credentials: 'include'
  })
  const booking = await res.json()
  return (
    <>
      <PaymentSuccessPage booking={booking} paymentMethod={payment_method} />
    </>
  )
}
