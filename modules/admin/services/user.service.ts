import api from "@/lib/api";
import { User } from "../types/user.type";

export const getUser = async (
    page:number=1,
    limit:number=5,
    search:string =''
) =>{
    try {
        const response = await api.get('/users',{
            params:{page,limit,search}
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateUser = async (id:string,updateData:Partial<User>)=>{
    try {
        const response = await api.patch(`/users/${id}`,updateData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteUser = async(id:string,updateData:Partial<User>)=>{
    try {
        const response = await api.put(`/users/${id}`,updateData)
        return response.data
    } catch (error) {
        throw error
    }
}