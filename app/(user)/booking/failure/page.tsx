import PaymentFailurePage from "@/modules/user/components/booking/payment-cancel";


export default async function Failure({ searchParams }: { searchParams: Promise<{ booking_id: string }> }) {
    const { booking_id: bookingId } = await searchParams
    return (
        <>
            <PaymentFailurePage bookingId={bookingId} />
        </>
    )
}