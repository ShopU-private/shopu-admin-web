import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Gift,
  Ticket,
  CreditCard,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    {
      icon: Gift,
      label: 'Offers',
      path: '/offers',
      submenu: [
        { icon: Ticket, label: 'Coupons', path: '/offers/coupons' },
        { icon: CreditCard, label: 'Gift Vouchers', path: '/offers/gift-vouchers' }
      ]
    }
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className={`bg-slate-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} min-h-screen fixed left-0 top-0 z-30`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => (
          <div key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActiveRoute(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {isOpen && (
                <>
                  <span className="ml-3 flex-1">{item.label}</span>
                  {item.submenu && <ChevronRight className="w-4 h-4" />}
                </>
              )}
            </Link>
            
            {item.submenu && isOpen && isActiveRoute(item.path) && (
              <div className="ml-8 mt-1 space-y-1">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`flex items-center px-4 py-2 mx-2 rounded-lg text-sm transition-colors ${
                      location.pathname === subItem.path
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <subItem.icon className="w-4 h-4" />
                    <span className="ml-3">{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;