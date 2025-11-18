import AgencyProfile from "@/modules/user/components/agency/AgencyProfile";

export default async function ProductDetails({ params }:any) {
  const { id } = params; 
  console.log(id,'from id');
  
  return (
    <AgencyProfile id={id} />
  );
}


