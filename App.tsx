import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Configurator } from './pages/Configurator';
import { EmbeddedDemo } from './pages/EmbeddedDemo';
import { Integration } from './pages/Integration';
import { BotConfig } from './types';

// Initial default configuration
const defaultConfig: BotConfig = {
  id: 'bot_123',
  name: 'Nebula Assistant',
  companyName: 'Nebula Corp',
  primaryColor: '#4f46e5', // Indigo 600
  welcomeMessage: 'Hi there! 👋 How can I help you today?',
  systemInstruction: `You are a customer support agent for a tech company. 
Your goal is to answer questions about pricing, features, and troubleshooting.
Pricing: Basic is $10/mo, Pro is $29/mo, Enterprise is custom.
Features: AI Chat, Analytics, 24/7 Uptime.
Troubleshooting: Tell them to restart the router first.
  `,
};

function App() {
  const [botConfig, setBotConfig] = useState<BotConfig>(defaultConfig);

  return (
    <Router>
      <Routes>
        {/* SaaS Platform Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/configure"
          element={
            <Layout>
              <Configurator 
                config={botConfig} 
                onSave={(newConfig) => setBotConfig(newConfig)} 
              />
            </Layout>
          }
        />
        <Route
          path="/integration"
          element={
            <Layout>
              <Integration config={botConfig} />
            </Layout>
          }
        />

        {/* Standalone Demo Route (Simulates a client website) */}
        <Route
          path="/demo"
          element={<EmbeddedDemo config={botConfig} />}
        />
      </Routes>
    </Router>
  );
}

export default App;