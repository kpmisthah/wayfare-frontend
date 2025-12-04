import { AgencyStatus } from "./agency.status.enum";
import { TabOption } from "./tab.type";
export interface Agency {
  id: string;
  address: string | null;
  licenseNumber: string;
  ownerName: string;
  websiteUrl: string;
  description: string;
  reason:string
  status:AgencyStatus
  user: {
    id:string
    name: string;
    email: string;
    isVerified: boolean;
    image: string;
    phone:string
    isBlock:boolean
  };
}

export interface AgencyRequest {
  id: string;
  name: string;
  email: string;
}