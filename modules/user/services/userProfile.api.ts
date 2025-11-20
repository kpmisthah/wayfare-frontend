import api from "@/lib/api";

export const getUserProfile = async ()=>{
    try {
      let response
        response = await api.get('/user/me')
        console.log(typeof response.data,'ithannaLleeeee myraa');
        
        if(response.data == ''){
          console.log("ivide verundo");
          
          response = await api.get('/auth/me')
        }
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export const uploadUserProfileImage = async (file: File,type:'profile'|'banner') => {
  const formData = new FormData();
  formData.append('file', file); 
  formData.append('type',type)

  try {
    const response = await api.post('/user/upload-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data,'response from cloudinary')
    
    return response.data; 
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

export const updateProfileImage = async(imageUrl:string)=>{
  try {
    const reponse = await api.put('/user/update-profile-image',imageUrl) 
    return reponse.data
  } catch (error) {
    console.log(error);
    
  }
}

export const updateProfile = async(data:{name:string,email:string,phone:string,location:string})=>{
  try {
    console.log(data,'front end kittundo nokka');
    
    const response = await api.put('/user/update-profile',data)
    return response.data
  } catch (error) {
    console.log(error);
    
  }
 
}

export const getUserBooking = async(page=1,limit=1)=>{
  try {
  const response = await api.get(`/booking/user?page=${page}&limit=${limit}`)
  console.log(response.data,'response data in getUserBooking');
  return response.data
  } catch (error) {
    console.log(error,'error');
    
  }
}

export const bookingCancel= async(id:string)=>{
  try {
    console.log(id,'iddddddd in userProfile api booking id')
    const response = await api.post(`/booking/cancel/${id}`)
    console.log(response.data,'in CancelBooking');
    return response.data
    
  } catch (error) {
    console.log(error);
    
  }
}

export const changePassword = async(data:{oldPassword:string,newPassword:string})=>{
  try {
    const response = await api.patch('/auth/change-password',data)
    return response.data
  } catch (error) {
    console.log(error);
    
  }
} 
