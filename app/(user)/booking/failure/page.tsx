import PaymentFailurePage from "@/modules/user/components/booking/payment-cancel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Failure({ searchParams }: {searchParams:{booking_id:string}}) {
    const { booking_id: bookingId } = await searchParams
    console.log(bookingId, 'failure page l booking id kittunof nooks')
    return (
        <>
            <PaymentFailurePage bookingId={bookingId} />
        </>
    )
}