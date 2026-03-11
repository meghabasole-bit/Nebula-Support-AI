import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, ExternalLink, Code, Bot, Sparkles } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label, external = false }: any) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        target={external ? "_blank" : undefined}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all mb-1 group ${
          isActive 
            ? 'bg-indigo-50 text-indigo-600 font-medium' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
        <span>{label}</span>
        {external && <ExternalLink size={14} className="ml-auto opacity-50 group-hover:opacity-100" />}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10 flex flex-col">
        <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-2 text-indigo-600">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                    <Bot size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">Nebula</span>
            </div>
        </div>
        
        <nav className="p-4 mt-4 flex-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">Platform</div>
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/configure" icon={Settings} label="Configure Agent" />
            
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4 mt-8">Deployment</div>
            <NavItem to="/demo" icon={ExternalLink} label="View Live Demo" external />
            <NavItem to="/integration" icon={Code} label="Integration Code" />

            <div className="mt-8 mx-4 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white text-center relative overflow-hidden">
                <div className="relative z-10">
                    <Sparkles size={20} className="mx-auto mb-2 text-indigo-200" />
                    <h4 className="font-bold text-sm">Upgrade to Pro</h4>
                    <p className="text-xs text-indigo-100 mt-1 mb-3">Get unlimited conversations and custom domains.</p>
                    <button className="text-xs bg-white text-indigo-600 font-bold py-1.5 px-3 rounded-lg shadow-sm hover:bg-indigo-50 transition">
                        Upgrade Now
                    </button>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
                <div className="absolute bottom-0 -left-4 w-12 h-12 bg-white opacity-10 rounded-full"></div>
            </div>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
             <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition">
                <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm border border-indigo-200">
                    JS
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">John Smith</p>
                    <p className="text-xs text-slate-500 truncate">john@nebulacorp.com</p>
                </div>
             </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 bg-slate-50 min-h-screen">
        {children}
      </main>
    </div>
  );
};