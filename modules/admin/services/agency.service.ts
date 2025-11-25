import api from "@/lib/api";
export const getAgencies = async ()=>{
    try {
        const response = await api.get('/admin/agencies',{
            // params:{page,limit,search}
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

export const approvalAgencies = async (id:string,action:string,reason?:string) =>{
    try {
        const response = await api.patch(`/agency/${id}`,{action,reason})
        return response.data
    } catch (error) {
        console.log(error);
        throw error
        
    }
}



export const updateAgencies = async (agencyId:string) =>{
    try {
        const response = await api.patch(`/agency/profile/${agencyId}`)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
        
    }
}



