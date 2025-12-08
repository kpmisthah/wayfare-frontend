import {
  Download,
  Edit,
  Eye,
  Filter,
  Search,
  Trash2,
  Save,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
// import { userActions } from "../../hooks/user-management/use-user-actions";
import { EditUserDialog } from "./Edit-User-Dialog";
import { useUsers } from "../../hooks/user-management/use-user-management";
import debounce from "lodash.debounce";
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
    totalPage,
    blockModalOpen,
    setBlockModalOpen,
    userToBlock,
    setUserToBlock,
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
              <Button
                variant="outline"
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button
                className="flex items-center gap-2 flex-1 sm:flex-none"
                onClick={() => {
                  const headers = ["Name", "Email", "Status"];
                  const csvContent = [
                    headers.join(","),
                    ...users.map(user => [
                      `"${user.name}"`,
                      `"${user.email}"`,
                      user.isBlock ? "Inactive" : "Active"
                    ].join(","))
                  ].join("\n");

                  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                  const link = document.createElement("a");
                  if (link.download !== undefined) {
                    const url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", "users_export.csv");
                    link.style.visibility = "hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
              >
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Profile
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      user profile
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          user.isBlock === false ? "default" : "destructive"
                        }
                      >
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
                          onClick={() => {
                            setUserToBlock(user);
                            setBlockModalOpen(true);
                          }}
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
                    <Badge
                      variant={
                        user.isBlock === false ? "default" : "destructive"
                      }
                    >
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
                      onClick={() => {
                        setUserToBlock(user);
                        setBlockModalOpen(true);
                      }}
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
              <p className="text-gray-500">
                No users found matching your search.
              </p>
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
            variant="outline"
          >
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
      {/* Block/Unblock Confirmation Modal */}
      {blockModalOpen && userToBlock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {userToBlock.isBlock ? "Unblock" : "Block"} User
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to{" "}
              <span className="font-medium">
                {userToBlock.isBlock ? "unblock" : "block"}
              </span>{" "}
              this user?
            </p>
            <div className="mt-4">
              <p className="font-medium text-sm">{userToBlock.name}</p>
              <p className="text-xs text-gray-500">{userToBlock.email}</p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setBlockModalOpen(false);
                  setUserToBlock(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant={userToBlock.isBlock ? "default" : "destructive"}
                size="sm"
                onClick={() => {
                  handleToggleBlockUser(userToBlock);
                  setBlockModalOpen(false);
                  setUserToBlock(null);
                }}
              >
                Yes, Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
