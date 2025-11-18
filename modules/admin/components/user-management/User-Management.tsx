import { Download, Edit, Eye, Filter, Search, Trash2, Save, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
// import { userActions } from "../../hooks/user-management/use-user-actions";
import { EditUserDialog } from "./Edit-User-Dialog";
import { useUsers } from "../../hooks/user-management/use-user-management";
import debounce from "lodash.debounce"
import { useMemo } from "react";
const UserManagement = () => {
  const {
    editingUser,
    editDialogOpen,
    handleEditUser,
    handleSaveUser,
    searchTerm,
    setSearchTerm,
    // filteredUsers,
    setEditDialogOpen,
    setEditingUser,
    handleToggleBlockUser,
    users,
    page,
    setPage,
    totalPage
  } = useUsers();
    const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 500), 
    [setSearchTerm]
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">User Management</CardTitle>
          
          {/* Mobile-first responsive header controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                defaultValue={searchTerm}
                onChange={(e) => debouncedSearch(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex gap-2 sm:gap-4">
              <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button className="flex items-center gap-2 flex-1 sm:flex-none">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Profile</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">user profile</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant={user.isBlock === false ? "default" : "destructive"}>
                        {user.isBlock === false ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                        variant={user.isBlock ? "default" : "destructive"}
                        size="sm"
                        onClick={() => handleToggleBlockUser(user)}
                        >
                          {user.isBlock ? "Unblock" : "Block"}
                          </Button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {users.map((user) => (
              <Card key={user.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">user.profile</p>
                    </div>
                    <Badge variant={user.isBlock === false ? "default" : "destructive"}>
                      {user.isBlock === false ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">{user.email}</p>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-2"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                    variant={user.isBlock ? "default" : "destructive"}
                    size="sm"
                    onClick={() => handleToggleBlockUser(user)}
                    >
                    {user.isBlock ? "Unblock" : "Block"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {users.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found matching your search.</p>
            </div>
          )}
        </CardContent>
        <div className="flex justify-between items-center mt-6">
          <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          variant="outline"
          >
            Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPage}
              </span>
              <Button
              disabled={page === totalPage}
              onClick={() => setPage(page + 1)}
              variant="outline">
                Next
                </Button>
                </div>
      </Card>

      {/* Your existing dialogs */}
      <EditUserDialog
        user={editingUser}
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveUser}
      />


    </div>
  );
};

export default UserManagement;