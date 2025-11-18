import { AgencyStatus } from "@/modules/admin/types/agency.status.enum";

export interface Agency {
    id:string;
    status:AgencyStatus;
    address:string;
    ownerName:string;
    websiteUrl:string;
    description:string;
    user:{
        name:string;
        email:string;
        verified:boolean;
        image:string
    }
}