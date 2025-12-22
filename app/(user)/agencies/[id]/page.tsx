import AgencyProfile from "@/modules/user/components/agency/AgencyProfile";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AgencyProfile id={id} />
  );
}


