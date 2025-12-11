import {
  Edit,
  Save,
  X,
  User,
  Mail,
  Phone,
  FileText,
  Globe,
  MapPin,
  Plus,
  Building,
  CreditCard,
  UserCheck,
  ArrowRight,
  Camera,
} from "lucide-react";

import { useAgencyProfile } from "../../hooks/use-agency-profile";
import { useUserProfile } from "@/modules/user/hooks/use-userprofile";
import { useAuthStore } from "@/store/Auth";
import { LucideIcon } from "lucide-react";
interface ReadOnlyFieldProps {
  label: string;
  icon: LucideIcon;
  value: string | undefined;
  note?: string;
}

const ReadOnlyField = ({ label, icon: Icon, value, note }: ReadOnlyFieldProps) => (
  <div className="group">
    <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
      <Icon className="w-4 h-4 mr-2 text-blue-600" />
      {label}
      {note && (
        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          {note}
        </span>
      )}
    </label>
    <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-800">{value}</div>
  </div>
);

interface EditableInputProps {
  label: string;
  icon: LucideIcon;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const EditableInput = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
}: EditableInputProps) => (
  <div className="group">
    <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
      <Icon className="w-4 h-4 mr-2 text-blue-600" />
      {label}
      {required && <span className="ml-2 text-red-500 text-xs">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    />
  </div>
);

interface EditableTextareaProps {
  label: string;
  icon: LucideIcon;
  name: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

const EditableTextarea = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows = 3,
}: EditableTextareaProps) => (
  <div className="group">
    <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
      <Icon className="w-4 h-4 mr-2 text-purple-600" />
      {label}
      {required && <span className="ml-2 text-red-500 text-xs">*</span>}
    </label>
    <textarea
      name={name}
      value={value || ""}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
    />
  </div>
);


export default function AgencyProfile() {
  const {
    profileData,
    profileExists,
    isCreating,
    setIsCreating,
    isEditing,
    handleInputChange,
    handleCreateProfile,
    handleEditProfile,
    handleSaveEdit,
    handleCancel,
  } = useAgencyProfile();
  const {
    fileInputRef,
    avatarInputRef,
    handleBannerUpload,
    handleAvatarUpload,
    isUploadingAvatar,
    isUploadingBanner,
  } = useUserProfile();
  const { user } = useAuthStore();

  if (!profileExists && !isCreating) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white text-center">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mx-auto mb-6">
              <Building className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Your Agency Profile
            </h2>
            <p className="text-blue-100 text-lg">
              Let’s set up your profile to attract more customers
            </p>
          </div>

          <div className="p-8 text-center space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-700 mb-4">
                Your Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>{profileData?.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>{profileData?.phone}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl mx-auto text-lg font-medium"
            >
              <Plus className="w-6 h-6" />
              <span>Create Agency Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleBannerUpload}
        className="hidden"
      />
      <input
        type="file"
        ref={avatarInputRef}
        onChange={handleAvatarUpload}
        className="hidden"
      />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agency Profile</h1>
          <p className="text-gray-600 mt-2">
            {isCreating
              ? "Create your agency profile"
              : "Manage your agency information"}
          </p>
        </div>

        {!isCreating && !isEditing ? (
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
          >
            <Edit className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            <button
              onClick={isCreating ? handleCreateProfile : handleSaveEdit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg"
            >
              <Save className="w-5 h-5" />
              <span>{isCreating ? "Create Profile" : "Save Changes"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {/* Banner section*/}
        {/* Banner section */}
        <div
          className="relative h-64 md:h-80 w-full overflow-hidden"
          style={{
            backgroundImage: user?.bannerImage || profileData?.bannerImage
              ? `url(${user?.bannerImage || profileData?.bannerImage})`
              : "linear-gradient(to right, #2563EB, #7C3AED)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Banner Upload Loader */}
          {isUploadingBanner && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {/* Banner Upload Button - Top Right */}
          <button
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-white/30 flex items-center space-x-2 group"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingBanner}
          >
            <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{isUploadingBanner ? "Uploading..." : "Change Cover"}</span>
          </button>

          {/* Profile Info Container - Bottom Left */}
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row items-end md:items-center space-y-4 md:space-y-0 md:space-x-6">

            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white relative">
                {user?.profileImage || profileData?.profileImage ? (
                  <img
                    src={user?.profileImage || profileData?.profileImage}
                    alt="Agency Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <User className="w-16 h-16" />
                  </div>
                )}

                {/* Avatar Loader */}
                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}

                {/* Avatar Upload Hover Overlay */}
                <div
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer z-10"
                  onClick={() => !isUploadingAvatar && avatarInputRef.current?.click()}
                >
                  <div className="text-white flex flex-col items-center">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">Edit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Name and Tagline */}
            <div className="mb-2 text-white drop-shadow-md">
              <h2 className="text-3xl font-bold tracking-tight">
                {profileData?.name || user?.name || "Agency Name"}
              </h2>
              <p className="text-blue-100 text-lg opacity-90 font-medium flex items-center mt-1">
                <Building className="w-4 h-4 mr-2" />
                Trusted Travel Partner
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b pb-2">
              Contact Information
            </h3>
            <ReadOnlyField
              label="Email Address"
              icon={Mail}
              value={profileData?.email}
              note="Auto-filled"
            />
            <ReadOnlyField
              label="Phone Number"
              icon={Phone}
              value={profileData?.phone}
              note="Auto-filled"
            />

            {isCreating || isEditing ? (
              <>
                <EditableTextarea
                  label="Address"
                  icon={MapPin}
                  name="address"
                  value={profileData?.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your business address"
                />
                <EditableInput
                  label="Website"
                  icon={Globe}
                  name="websiteUrl"
                  value={profileData?.websiteUrl}
                  onChange={handleInputChange}
                  type="url"
                  placeholder="https://youragency.com"
                />
              </>
            ) : (
              <>
                <ReadOnlyField
                  label="Address"
                  icon={MapPin}
                  value={profileData?.address}
                />
                <div className="group">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    <Globe className="w-4 h-4 mr-2 text-blue-600" />
                    Website
                  </label>
                  <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-800">
                    {profileData?.websiteUrl ? (
                      <a
                        href={profileData.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {profileData.websiteUrl}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    ) : (
                      <span className="text-gray-400">Not provided</span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Business Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b pb-2">
              Business Information
            </h3>
            {isCreating || isEditing ? (
              <>
                <EditableInput
                  label="Owner Name"
                  icon={UserCheck}
                  name="ownerName"
                  value={profileData?.ownerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter owner's full name"
                />
                <EditableInput
                  label="License Number"
                  icon={CreditCard}
                  name="licenseNumber"
                  value={profileData?.licenseNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter license number"
                />
                <EditableTextarea
                  label="Description"
                  icon={FileText}
                  name="description"
                  value={profileData?.description}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  placeholder="Describe your agency and services"
                />
              </>
            ) : (
              <>
                <ReadOnlyField
                  label="Owner Name"
                  icon={UserCheck}
                  value={profileData?.ownerName}
                />
                <ReadOnlyField
                  label="License Number"
                  icon={CreditCard}
                  value={profileData?.licenseNumber}
                />
                <div className="group">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    <FileText className="w-4 h-4 mr-2 text-purple-600" />
                    Description
                  </label>
                  <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[100px]">
                    {profileData?.description}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
