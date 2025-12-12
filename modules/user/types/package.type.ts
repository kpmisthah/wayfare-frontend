export interface Package {
    id:string
    title:string;
    destination:string
    description:string
    highlights:string
    duration:string
    picture:string[]
    price:string
    itinerary:itinerary[]
    vehicle:string
    pickup_point:string
    drop_point:string
    details:string
}
export interface itinerary{
    day:string
    activities:string
    meals:string
    accommodation:string
    
}
export interface PackagesResponse {
  data: Package[]
  total: number
  totalPages: number
}

export interface PackageCardProps {
  id: string;
  title: string;
  image: string[0];   
  duration: string;
  destination: string;
  price: string;       
  highlights: string;  
}