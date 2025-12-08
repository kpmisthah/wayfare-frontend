import AgencyProfile from "@/modules/user/components/agency/AgencyProfile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetails({ params }: any) {
  const { id } = await params;
  console.log(id, 'from id');

  return (
    <AgencyProfile id={id} />
  );
}


