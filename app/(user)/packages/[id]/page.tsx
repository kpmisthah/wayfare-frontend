import PackageDetails from "@/modules/user/components/agency/PackageDetails";

export default async function PackageDetailsComponent({params}:any) {
    const{id} = params
    return(
        <PackageDetails id={id} />
    )
}