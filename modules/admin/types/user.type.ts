export interface User {
  profileImage: string | undefined;
  bannerImage: string|undefined;
  id: string;
  location:string
  name: string;
  phone:string
  email: string;
  isBlock: boolean; 
  isVerified:boolean
}

interface PreferenceTag {
  id:string;
  name:string
}