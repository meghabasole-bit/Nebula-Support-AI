import React, { useState } from 'react';
import { BotConfig } from '../types';
import { ChatWidget } from '../components/ChatWidget';
import { Save, RefreshCw, Palette, MessageSquare, FileText, User } from 'lucide-react';

interface ConfiguratorProps {
  config: BotConfig;
  onSave: (newConfig: BotConfig) => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({ config, onSave }) => {
  const [localConfig, setLocalConfig] = useState<BotConfig>(config);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof BotConfig, value: string) => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(localConfig);
    setIsDirty(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      {/* Left Panel: Settings */}
      <div className="w-1/2 h-full overflow-y-auto border-r border-slate-200 bg-white p-8">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Agent Configuration</h1>
                <p className="text-slate-500 mt-1">Customize your AI agent's behavior and appearance.</p>
            </div>
            <button 
                onClick={handleSave}
                disabled={!isDirty}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isDirty 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
            >
                <Save size={18} />
                <span>Save Changes</span>
            </button>
        </div>

        <div className="space-y-8">
            {/* Identity Section */}
            <section className="space-y-4">
                <h2 className="text-sm uppercase tracking-wider text-slate-500 font-semibold flex items-center">
                    <User size={16} className="mr-2" /> Identity
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Agent Name</label>
                        <input 
                            type="text" 
                            value={localConfig.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full p-3 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Company Name</label>
                        <input 
                            type="text" 
                            value={localConfig.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                            className="w-full p-3 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                        />
                    </div>
                </div>
            </section>

            <hr className="border-slate-100" />

            {/* Appearance Section */}
            <section className="space-y-4">
                <h2 className="text-sm uppercase tracking-wider text-slate-500 font-semibold flex items-center">
                    <Palette size={16} className="mr-2" /> Appearance
                </h2>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Brand Color (Hex)</label>
                    <div className="flex items-center space-x-4">
                        <input 
                            type="color" 
                            value={localConfig.primaryColor}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                        />
                        <input 
                            type="text"
                            value={localConfig.primaryColor}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            className="flex-1 p-3 text-slate-900 border border-slate-200 rounded-lg font-mono text-sm uppercase"
                        />
                    </div>
                </div>
            </section>

            <hr className="border-slate-100" />

            {/* Behavior Section */}
            <section className="space-y-4">
                <h2 className="text-sm uppercase tracking-wider text-slate-500 font-semibold flex items-center">
                    <MessageSquare size={16} className="mr-2" /> Behavior
                </h2>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Welcome Message</label>
                    <textarea 
                        value={localConfig.welcomeMessage}
                        onChange={(e) => handleChange('welcomeMessage', e.target.value)}
                        rows={2}
                        className="w-full p-3 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none resize-none"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-700">System Instructions</label>
                        <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Gemini 2.5 Flash</span>
                    </div>
                    <p className="text-xs text-slate-500">Define how the AI should behave, what it knows, and its tone of voice.</p>
                    <textarea 
                        value={localConfig.systemInstruction}
                        onChange={(e) => handleChange('systemInstruction', e.target.value)}
                        rows={10}
                        className="w-full p-3 text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none font-mono text-sm leading-relaxed"
                    />
                </div>
            </section>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="w-1/2 h-full bg-slate-100 relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 pattern-grid opacity-5 pointer-events-none"></div>
        
        <div className="mb-8 text-center">
            <h2 className="text-lg font-semibold text-slate-700">Live Preview</h2>
            <p className="text-slate-500 text-sm">This is how the widget appears on your site</p>
        </div>

        {/* Simulated Website Background */}
        <div className="w-[90%] h-[80%] bg-white rounded-xl shadow-xl border border-slate-200 relative overflow-hidden">
            {/* Fake Header */}
            <div className="h-16 border-b border-slate-100 flex items-center px-6 justify-between">
                <div className="w-24 h-6 bg-slate-200 rounded"></div>
                <div className="flex space-x-4">
                    <div className="w-16 h-4 bg-slate-100 rounded"></div>
                    <div className="w-16 h-4 bg-slate-100 rounded"></div>
                    <div className="w-16 h-4 bg-slate-100 rounded"></div>
                </div>
            </div>
            {/* Fake Hero */}
            <div className="p-8">
                <div className="w-2/3 h-10 bg-slate-100 rounded mb-4"></div>
                <div className="w-1/2 h-4 bg-slate-50 rounded mb-2"></div>
                <div className="w-1/3 h-4 bg-slate-50 rounded"></div>
            </div>

            {/* Actual Functional Widget */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="pointer-events-auto h-full w-full relative">
                    <ChatWidget config={localConfig} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};