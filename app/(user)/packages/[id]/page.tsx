import PackageDetails from "@/modules/user/components/agency/PackageDetails";

export default async function PackageDetailsComponent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <PackageDetails id={id} />
    )
}