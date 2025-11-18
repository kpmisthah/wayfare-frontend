import BookingPage from "@/modules/user/components/booking/booking";


export default async function bookingPackage({params}:{params:{id:string}}){
    const {id} = params
    console.log(id,'in paramsssss booking');
    
    return(
        <BookingPage id={id}/>
    )
}