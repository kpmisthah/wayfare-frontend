"use client";
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
} from "lucide-react";

import { useAgencyProfile } from "../../hooks/use-agency-profile";
import { useUserProfile } from "@/modules/user/hooks/use-userprofile";
import { useAuthStore } from "@/store/Auth";

const ReadOnlyField = ({ label, icon: Icon, value, note }: any) => (
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

const EditableInput = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
}: any) => (
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

const EditableTextarea = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows = 3,
}: any) => (
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
          className="relative px-8 py-12 text-white flex items-center space-x-6 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: user?.bannerImage
              ? `url(${user.bannerImage})`
              : "linear-gradient(to right, #2563EB, #7C3AED)", 
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center overflow-hidden">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Avatar"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
            {/* Avatar Upload Button */}
            <button
              className="absolute bottom-0 right-0 bg-blue-600 text-white px-2 py-1 rounded"
              onClick={() => avatarInputRef.current?.click()}
            >
              Change Avatar
            </button>
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {profileData?.name || "Agency Name"}
            </h2>
            <p className="text-blue-100 mt-2">Travel Agency</p>
          </div>

          {/* Banner Upload Button */}
          <button
            className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Banner
          </button>
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
                <div>{profileData?.address}</div>
                {profileData?.websiteUrl && (
                  <a
                    href={profileData.websiteUrl}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {profileData.websiteUrl}
                  </a>
                )}
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
                <div>{profileData?.ownerName}</div>
                <div>{profileData?.licenseNumber}</div>
                <p>{profileData?.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
