import { useState } from "react";
import { AxiosError } from "axios";
import { changePassword } from "@/modules/user/services/userProfile.api";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { TabsContent } from "@/shared/components/ui/tabs";
import Modal from "@/shared/components/common/Modal";
import {
  Shield,
  Lock,
  Info,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

type Errors = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validate password rules
  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    return errors;
  };

  // Calculate password strength
  const passwordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    const validationErrors = validatePassword(password);
    if (validationErrors.length === 0)
      return { strength: 100, label: "Strong", color: "bg-green-500" };
    if (validationErrors.length <= 2)
      return { strength: 60, label: "Medium", color: "bg-yellow-500" };
    return { strength: 30, label: "Weak", color: "bg-red-500" };
  };

  const strength = passwordStrength(newPassword);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!oldPassword) newErrors.currentPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (validatePassword(newPassword).length > 0)
      newErrors.newPassword = "Password doesn't meet requirements";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      const result = await changePassword({ oldPassword, newPassword });
      if (result.message === "Old password is incorrect") {
        setErrors(prev => ({ ...prev, currentPassword: "Old password is incorrect" }));
      } else {
        setSuccessMessage("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const msg = err.response?.data?.message || "Old password is incorrect ";
      setErrors(prev => ({ ...prev, currentPassword: msg }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <TabsContent value="settings" className="space-y-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-500">Manage your account security settings</p>
        </div>

        {/* Security Card */}
        <Card className="border-l-4 border-l-blue-500 shadow-lg">
          <CardHeader className="pb-4 flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Security Settings</CardTitle>
              <CardDescription className="mt-1">
                Keep your account secure and protected
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Update your password regularly to keep your account secure. Choose a strong password with at least 8 characters.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                    <Info className="h-3 w-3" />
                    <span>Last changed: Never</span>
                  </div>
                </div>
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all px-6"
                onClick={() => setIsModalOpen(true)}
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-gray-500 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Password Security Tips</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Use a mix of uppercase, lowercase, numbers, and symbols</li>
                  <li>Avoid using personal information or common words</li>
                  <li>Don't reuse passwords across different accounts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Change Password"
          subtitle="Update your password to keep your account secure"
          size="md"
        >
          {successMessage ? (
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{successMessage}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.currentPassword ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" /> {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.newPassword ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {newPassword && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Password strength:</span>
                      <span
                        className={`font-medium ${strength.label === "Strong"
                          ? "text-green-600"
                          : strength.label === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                          }`}
                      >
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.strength}%` }}
                      />
                    </div>
                  </div>
                )}
                {errors.newPassword && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" /> {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" /> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </TabsContent>
  );
};
