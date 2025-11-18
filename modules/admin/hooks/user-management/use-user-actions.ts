// "use client"
// import { useUsers } from "./use-user-management";
// import { User } from "../../types/user.type";
// import { useState } from "react";

// export const userActions = ()=>{
    // const {
    //   update,
    //   users,
    //   setUsers,
    //   page,
    //   setPage,
    //   totalPage,
    //   search,
    //   setSearch
    // } = useUsers()
    // const [editingUser, setEditingUser] = useState<User>();
    // const [editDialogOpen, setEditDialogOpen] = useState(false);
  //   const handleEditUser = (user:User) => {
  //   setEditingUser(user);
  //   setEditDialogOpen(true);
  // };

  // const handleSaveUser = async (updatedData:Partial<User>) => {
  //   try {
  //     await update(editingUser?.id!, updatedData);
  //     setUsers((prev)=>
  //       prev.map((user)=>
  //         user.id == editingUser?.id?{...user,...updatedData}:user
  //       )
  //     )
  //   } catch (error) {
      
  //   }
  // };

  // const handleToggleBlockUser = async(user:User) => {
  //   const updateStatus = !user.isBlock
  //   try {
  //     await update(user.id,{isBlock:updateStatus})
  //     setUsers((prev)=>
  //       prev.map((u)=>
  //         u.id == user.id?{...u,isBlock:updateStatus}:u
  //       )
  //     )
  //   } catch (error) {
  //      console.error("Failed to update user block status", error);
  //   }
  // };

  //   return {
  //   editingUser,
  //   editDialogOpen,
  //   searchTerm:search,
  //   setSearchTerm:setSearch,
  //   setEditDialogOpen,
  //   handleEditUser,
  //   handleSaveUser,
  //   setEditingUser,
  //   handleToggleBlockUser,
  //   users,
  //   page,
  //   setPage,
  //   totalPage
  // };
  // }

