import PackageDetails from "@/modules/user/components/agency/PackageDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PackageDetailsComponent({ params }: any) {
    const { id } = await params
    return (
        <PackageDetails id={id} />
    )
}