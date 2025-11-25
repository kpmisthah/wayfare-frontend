import PaymentFailurePage from "@/modules/user/components/booking/payment-cancel";

export default async function Failure({searchParams}:{searchParams:{booking_id:string}}){
    let bookingId = searchParams.booking_id
    console.log(bookingId,'failure page l booking id kittunof nooks')
    return(
        <>
        <PaymentFailurePage bookingId={bookingId}/>
        </>
    )
}