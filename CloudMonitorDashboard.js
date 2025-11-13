import React, { useState, useEffect } from 'react';
import { Activity, Server, Database, Cpu, HardDrive, AlertCircle, CheckCircle, TrendingUp, Cloud } from 'lucide-react';

const CloudMonitorDashboard = () => {
  const [metrics, setMetrics] = useState({
    servers: [],
    alerts: [],
    performance: { cpu: 0, memory: 0, disk: 0, network: 0 }
  });

  const [selectedRegion, setSelectedRegion] = useState('us-east-1');
  const [timeRange, setTimeRange] = useState('1h');

  // Simulate real-time data updates
  useEffect(() => {
    const generateMetrics = () => {
      const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-south-1'];
      const statuses = ['healthy', 'warning', 'critical'];
      
      const servers = Array.from({ length: 8 }, (_, i) => ({
        id: `server-${i + 1}`,
        name: `${selectedRegion}-instance-${i + 1}`,
        status: statuses[Math.floor(Math.random() * 3)],
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: `${Math.floor(Math.random() * 720)}h`,
        requests: Math.floor(Math.random() * 10000)
      }));

      const alerts = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        message: [
          'High CPU usage detected',
          'Memory threshold exceeded',
          'Unusual network traffic',
          'Database connection pool exhausted',
          'Disk space running low'
        ][i],
        timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString()
      }));

      const performance = {
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100)
      };

      setMetrics({ servers, alerts, performance });
    };

    generateMetrics();
    const interval = setInterval(generateMetrics, 3000);
    return () => clearInterval(interval);
  }, [selectedRegion, timeRange]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const MetricCard = ({ icon: Icon, title, value, unit, color }) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}{unit}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Cloud Infrastructure Monitor</h1>
                <p className="text-gray-500">Real-time monitoring and analytics dashboard</p>
              </div>
            </div>
            <div className="flex gap-3">
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="us-west-2">US West (Oregon)</option>
                <option value="eu-west-1">EU (Ireland)</option>
                <option value="ap-south-1">Asia Pacific (Mumbai)</option>
              </select>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="5m">Last 5 minutes</option>
                <option value="1h">Last 1 hour</option>
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard icon={Cpu} title="CPU Usage" value={metrics.performance.cpu} unit="%" color="#3b82f6" />
          <MetricCard icon={HardDrive} title="Memory Usage" value={metrics.performance.memory} unit="%" color="#8b5cf6" />
          <MetricCard icon={Database} title="Disk Usage" value={metrics.performance.disk} unit="%" color="#ec4899" />
          <MetricCard icon={Activity} title="Network Traffic" value={metrics.performance.network} unit="%" color="#10b981" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Server Status */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Server className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Server Instances</h2>
              <span className="ml-auto text-sm text-gray-500">Region: {selectedRegion}</span>
            </div>
            <div className="space-y-3">
              {metrics.servers.map((server) => (
                <div key={server.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)} animate-pulse`} />
                      <div>
                        <p className="font-semibold text-gray-800">{server.name}</p>
                        <p className="text-sm text-gray-500">Uptime: {server.uptime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-600">CPU: <span className="font-semibold">{server.cpu}%</span></span>
                        <span className="text-gray-600">RAM: <span className="font-semibold">{server.memory}%</span></span>
                        <span className="text-gray-600">Req/s: <span className="font-semibold">{server.requests}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-bold text-gray-800">Active Alerts</h2>
            </div>
            <div className="space-y-3">
              {metrics.alerts.map((alert) => (
                <div key={alert.id} className={`border-l-4 rounded p-3 ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-800">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                    </div>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                      alert.severity === 'high' ? 'bg-red-200 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              View All Alerts
            </button>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">
              {metrics.servers.filter(s => s.status === 'healthy').length}
            </p>
            <p className="text-gray-500 text-sm">Healthy Instances</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">99.9%</p>
            <p className="text-gray-500 text-sm">Uptime SLA</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Activity className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">
              {metrics.servers.reduce((sum, s) => sum + s.requests, 0).toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">Total Requests/sec</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudMonitorDashboard;
