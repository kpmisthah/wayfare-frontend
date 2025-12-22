import { useLogout } from "@/shared/hooks/use-logout";
import { useAuthStore } from "@/store/Auth";
import { Menu, Search, ChevronDown, LogOut, Building2 } from "lucide-react";
import { useState } from "react";

export const Header = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuthStore();
  const { handleLogout } = useLogout()
  {
  }
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
              A
            </div>
            <span className="font-semibold text-gray-800 text-lg hidden sm:block">
              {user?.name}
            </span>
          </div>
        </div>

        {/* Right Section - Search & Profile */}
        <div className="flex items-center gap-3">


          {/* Mobile Search Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-all group"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.name || 'Agency'}&background=random`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="hidden lg:block text-left">
                <p className="text-xs text-gray-500">{user?.name}</p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />

                {/* Dropdown Content */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Agency Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.name || 'Agency'}&background=random`}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {user?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                      <LogOut className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-red-600">Logout</p>
                      <p className="text-xs text-gray-500">
                        Sign out of your account
                      </p>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
