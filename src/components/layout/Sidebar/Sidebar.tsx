import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, FileText, MessageSquare, LogOut, X, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/organizations', label: 'Organizations', icon: <Building2 size={20} /> },
    { path: '/documents', label: 'Documents', icon: <FileText size={20} /> },
    { path: '/chat', label: 'Chat', icon: <MessageSquare size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`w-[260px] h-screen bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl shadow-slate-200/50' : '-translate-x-full'} md:translate-x-0`}>
      <div className="h-[76px] flex items-center justify-between px-6 border-b border-slate-200/60 bg-white/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-400 text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-primary/20 ring-1 ring-white/50">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">Org Assistant</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-lg transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="px-4 py-8 flex-grow overflow-y-auto">
        <ul className="list-none flex flex-col gap-3 m-0 p-0">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3.5 font-medium transition-all duration-300 group ${isActive
                    ? 'bg-primary text-white rounded-2xl shadow-md shadow-primary/25'
                    : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 rounded-2xl'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`transition-transform duration-300 ${!isActive ? 'group-hover:scale-110 group-hover:text-primary' : ''}`}>
                      {item.icon}
                    </div>
                    <span className="text-[15px]">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200/60 bg-slate-50/50">
        <button onClick={handleLogout} className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-slate-600 font-medium w-full border border-slate-200 bg-white shadow-sm cursor-pointer transition-all hover:bg-error hover:text-white hover:border-error hover:shadow-md hover:shadow-error/20 group">
          <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
