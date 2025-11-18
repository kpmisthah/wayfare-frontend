import api from "@/lib/api";
import { Itinerary, Package, PackageData, PackageListing } from "../types/package.type";

export const addPackage = async (data: {
  title: string;
  destination: string;
  description: string;
  highlights: string;
  duration: string;
  picture: File[];
  price: string;
  itinerary:Itinerary[],
  vehicle:string,
  pickup_point:string,
  drop_point:string,
  details:string

}) => {
  
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("destination", data.destination);
    formData.append("description", data.description);
    formData.append("duration", String(data.duration));
    formData.append("price", String(data.price));
    formData.append("highlights", data.highlights)
    formData.append('itinerary',JSON.stringify(data.itinerary))
    formData.append('vehicle',data.vehicle)
    formData.append('pickup_point',data.pickup_point)
    formData.append('drop_point',data.drop_point)
    formData.append('details',data.details)
    data.picture.forEach((photo) => {
      formData.append("photos", photo); 
    });

    console.log("w",data)
   
    const response = await api.post("/agency/add/packages", formData,
      {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    );
    console.log(response.data,'from backend brooo');
    
    return response.data;
  } catch (error) {
    console.log(error)
  }

};


export const fetchPackages = async(page:number=1,limit:number=5)=>{
  try {
    const response = await api.get('/agency/get/packages',{
      params:{page,limit}
    })
    return response.data
  } catch (error) {
    console.log(error);
    
  }
}

export const fetchAgencyProfile = async()=>{
  try {
    const reponse = await api.get('/agency/get/packages')
    return reponse.data
  } catch (error) {
    console.log(error);
    
  }
}

export const updatedPackage = async (updatedPackage:Partial<PackageData>,packageId:string)=>{
  try {
    console.log(updatedPackage,'update package before send to backend and edit packageId',packageId)
    const response = await api.put(`/agency/package/${packageId}`,updatedPackage)
    console.log(response,'response')
    return response.data
  } catch (error) {
    
  }
}
