import { LayoutDashboard, MapPin, Package, User, Wallet, X, Sparkles } from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, gradient: 'from-blue-500 to-indigo-600' },
    { id: 'packages', label: 'Packages', icon: Package, gradient: 'from-purple-500 to-pink-600' },
    { id: 'AgencyWallet', label: 'Wallet', icon: Wallet, gradient: 'from-green-500 to-emerald-600' },
    { id: 'profile', label: 'Profile', icon: User, gradient: 'from-orange-500 to-red-600' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-50 to-white shadow-2xl transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out border-r border-gray-100`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Wanderly</span>
              <p className="text-xs text-gray-500">Agency Portal</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6 space-y-3">
        <div className="flex items-center gap-2 px-2 mb-4">
          <Sparkles className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Menu</span>
        </div>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full group relative overflow-hidden rounded-xl text-left transition-all duration-300 ${isActive
                  ? 'bg-white shadow-lg scale-105'
                  : 'hover:bg-white/50 hover:shadow-md hover:scale-102'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-4 px-5 py-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                    ? `bg-gradient-to-br ${item.gradient} shadow-md`
                    : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                  <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`} />
                </div>
                <div className="flex-1">
                  <span className={`font-semibold text-base transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                    }`}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Need Help?</p>
              <p className="text-xs text-gray-600">Contact Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
