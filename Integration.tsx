import React, { useState } from 'react';
import { BotConfig } from '../types';
import { Check, Copy, Terminal, AlertCircle, Globe, Shield, Server } from 'lucide-react';

interface IntegrationProps {
  config: BotConfig;
}

export const Integration: React.FC<IntegrationProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);

  // Generate the embed code based on the current configuration
  const embedCode = `<!-- NebulaSupport AI Widget -->
<script>
  window.nebulaSettings = {
    botId: "${config.id}",
    theme: "${config.primaryColor}"
  };
</script>
<script src="https://cdn.nebulasupport.ai/widget/v1.js" async></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900">Integration & Deployment</h1>
        <p className="text-slate-500 mt-2">Deploy your AI agent to production securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: The Code */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Terminal size={18} className="text-slate-500" />
                        <h3 className="font-medium text-slate-700">JavaScript Snippet</h3>
                    </div>
                    <button 
                        onClick={handleCopy}
                        className={`flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
                            copied 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                </div>
                <div className="p-0 bg-slate-900 overflow-x-auto group relative">
                    <pre className="p-6 text-sm font-mono leading-relaxed">
                        <code className="text-slate-300">
                            <span className="text-slate-500">&lt;!-- NebulaSupport AI Widget --&gt;</span>{'\n'}
                            <span className="text-pink-400">&lt;script&gt;</span>{'\n'}
                            {'  '}window.<span className="text-blue-300">nebulaSettings</span> = {'{'}{'\n'}
                            {'    '}botId: <span className="text-amber-300">"{config.id}"</span>,{'\n'}
                            {'    '}theme: <span className="text-amber-300">"{config.primaryColor}"</span>{'\n'}
                            {'  '}{'}'};{'\n'}
                            <span className="text-pink-400">&lt;/script&gt;</span>{'\n'}
                            <span className="text-pink-400">&lt;script</span> <span className="text-green-400">src</span>=<span className="text-amber-300">"https://cdn.nebulasupport.ai/widget/v1.js"</span> <span className="text-green-400">async</span><span className="text-pink-400">&gt;&lt;/script&gt;</span>
                        </code>
                    </pre>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
             <h3 className="text-lg font-semibold text-slate-900 mb-4">How to Install</h3>
             <ol className="space-y-4 list-decimal list-inside text-slate-600">
                <li className="pl-2">
                    <span className="font-medium text-slate-900">Copy the code snippet</span> above.
                </li>
                <li className="pl-2">
                    Paste it into your website's HTML, ideally just before the closing <code className="bg-slate-100 px-1 py-0.5 rounded text-xs border border-slate-200">&lt;/body&gt;</code> tag.
                </li>
                <li className="pl-2">
                    <span className="font-medium text-slate-900">Whitelisting:</span> Ensure your website domain is added to the authorized domains list in Settings.
                </li>
             </ol>
            </div>
        </div>

        {/* Right Column: Deployment Info */}
        <div className="space-y-6">
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                <div className="flex items-center space-x-2 text-indigo-800 font-semibold mb-2">
                    <Server size={18} />
                    <h3>Backend Architecture</h3>
                </div>
                <p className="text-indigo-700 text-sm leading-relaxed">
                    For security, the widget connects to our API Proxy, not Google directly. This keeps your API keys hidden from the public.
                </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                    <Shield size={18} className="mr-2 text-slate-400" />
                    Security Checklist
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start space-x-3 text-sm text-slate-600">
                        <div className="mt-0.5 w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span>API Keys are stored server-side</span>
                    </li>
                    <li className="flex items-start space-x-3 text-sm text-slate-600">
                        <div className="mt-0.5 w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span>CORS restricts usage to your domains</span>
                    </li>
                    <li className="flex items-start space-x-3 text-sm text-slate-600">
                        <div className="mt-0.5 w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                        </div>
                        <span>Rate limiting enabled</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                    <Globe size={18} className="mr-2 text-slate-400" />
                    Authorized Domains
                </h3>
                <p className="text-xs text-slate-500 mb-3">Only these domains can load your widget.</p>
                
                <div className="space-y-2">
                    <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded border border-slate-100 text-sm">
                        <span className="text-slate-700">example.com</span>
                        <span className="text-green-600 text-xs font-medium">Active</span>
                    </div>
                     <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded border border-slate-100 text-sm">
                        <span className="text-slate-700">localhost:3000</span>
                        <span className="text-green-600 text-xs font-medium">Dev</span>
                    </div>
                    <button className="w-full mt-2 py-2 border border-dashed border-slate-300 rounded text-sm text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition">
                        + Add Domain
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};