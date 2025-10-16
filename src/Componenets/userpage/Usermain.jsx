import { useState } from "react";
import { Mail, Phone, Activity, Hospital, Pill, MapPin, Plus, Eye, ChevronDown, ChevronUp, Download } from "lucide-react"; // adjust icons as needed

const UserHomePage = ({ 
  user,
  hospitals = [], // optional default
  medicines = []  // optional default
}) => {
  const [activeHospital, setActiveHospital] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const totalReports = hospitals.reduce((sum, h) => sum + (h.reportsCount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Profile Card */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-2xl transform hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex space-x-6 items-center">
                <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center text-4xl font-bold text-blue-600 shadow-xl">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                  <p className="text-blue-100 mb-4">User ID: {user.id}</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center space-x-2">
                      <Mail size={16} />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center space-x-2">
                      <Phone size={16} />
                      <span className="text-sm">{user.contactnum}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold">{hospitals.length}</p>
                  <p className="text-sm text-blue-100">Connected Hospitals</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{totalReports}</p>
                  <p className="text-sm text-blue-100">Total Reports</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">{medicines.length}</p>
                  <p className="text-sm text-blue-100">Active Medications</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-2 flex space-x-2">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'hospitals', label: 'Hospitals', icon: Hospital },
            { id: 'medicines', label: 'Medications', icon: Pill }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
                  <Activity className="mr-3 text-blue-600" size={28} />
                  Recent Activity
                </h3>
                {hospitals.length === 0 ? (
                  <p className="text-gray-500">No hospitals connected yet.</p>
                ) : (
                  hospitals.slice(0, 3).map((hospital) => (
                    <div key={hospital.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl mb-2">
                      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-xl">
                        <Hospital className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{hospital.name}</p>
                        <p className="text-sm text-gray-500">{hospital.department || "N/A"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Last Visit</p>
                        <p className="text-sm font-semibold text-gray-700">{hospital.lastVisit || "N/A"}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserHomePage;
