import BookingPage from "@/modules/user/components/booking/booking";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function bookingPackage({ params }: any) {
    const { id } = await params
    console.log(id, 'in paramsssss booking');

    return (
        <BookingPage id={id} />
    )
}