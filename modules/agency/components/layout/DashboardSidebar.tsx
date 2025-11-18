import { BarChart3, CalendarDays, LayoutDashboard, MapPin, Package, Plus, User, X } from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'packages', label: 'Package Management', icon: Package },
    { id: 'bookings', label: 'Booking Management', icon: CalendarDays },
    { id: 'add-package', label: 'Add New Package', icon: Plus },
    { id: 'analytics', label: 'Analytics & Feedback', icon: BarChart3 },
    { id: 'profile', label: 'Agency Profile', icon: User },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">TravelPro</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden p-1 rounded-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
