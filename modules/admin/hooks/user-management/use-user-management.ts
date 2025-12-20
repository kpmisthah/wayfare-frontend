"use client"
import { useEffect, useState } from "react";
import { User } from "../../types/user.type";
import { getUser, updateUser, deleteUser } from "../../services/user.service";
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const limit = 3;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [editingUser, setEditingUser] = useState<User>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditDialogOpen(true);
  };

  const handleSaveUser = async (updatedData: Partial<User>) => {
    try {
      await update(editingUser?.id!, updatedData);
      setUsers((prev) =>
        prev.map((user) =>
          user.id == editingUser?.id ? { ...user, ...updatedData } : user
        )
      )
    } catch (error) {

    }
  };
  const handleToggleBlockUser = async (user: User) => {
    const updateStatus = !user.isBlock
    console.log(updateStatus, 'updatestatus')
    try {
      await update(user.id, { isBlock: updateStatus })
      setUsers((prev) =>
        prev.map((u) =>
          u.id == user.id ? { ...u, isBlock: updateStatus } : u
        )
      )
    } catch (error) {
      console.error("Failed to update user block status", error);
    }
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await getUser(page, limit, searchTerm);
      setUsers(res.data);
      setTotalPage(res.totalPages)
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [page, searchTerm]);
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const update = async (id: string, updateData: Partial<User>) => {
    try {
      console.log(updateData, 'update data in hook')
      let result = await updateUser(id, updateData);
      console.log(result, 'updated user result')
      setUsers((prevUser) =>
        prevUser.map((user) =>
          user.id == id ? { ...updateData, ...user } : user
        )
      );
    } catch (error) {
      throw error;
    }
  };

  const remove = async (id: string, updateData: Partial<User>) => {
    try {
      await deleteUser(id, updateData);
      setUsers((prevUser) =>
        prevUser.map((user) =>
          user.id == id ? { ...user, ...updateData } : user
        )
      );
    } catch (error) { }
  };

  return {
    users,
    update,
    remove,
    setUsers,
    page,
    limit,
    searchTerm,
    setPage,
    totalPage,
    setSearchTerm,
    editingUser,
    editDialogOpen,
    setEditDialogOpen,
    handleEditUser,
    handleSaveUser,
    setEditingUser,
    handleToggleBlockUser,
    blockModalOpen,
    setBlockModalOpen,
    userToBlock,
    setUserToBlock,
    isLoading,
  };
};
