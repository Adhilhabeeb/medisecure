// IndividualPage.jsx
import React, { useState, useEffect } from 'react';
import { Shield, Database, FileText, Hospital, Activity, ChevronRight, Lock, Zap, Users, Clock, CheckCircle, Image, Pill, Eye, Plus } from 'lucide-react';
import {connectWallet} from "@/walletconnect/wallectconnect"
import { Typography } from '@mui/material';
const IndividualPage = () => {
  const [scrollY, setScrollY] = useState(0);
const [accountfount, setaccountfount] = useState(false)
  useEffect(() => {


   async  function name(params) {
   let account=await    connectWallet()
   setaccountfount(account)
    }
    name()
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-10 -top-20 -left-20 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute w-96 h-96 bg-cyan-400 rounded-full opacity-10 -bottom-20 -right-20 animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute w-64 h-64 bg-indigo-400 rounded-full opacity-10 top-1/2 left-1/2 animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '2s' }}
          />
        </div>

        {/* Navigation */}
      

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                  🔐 Blockchain Powered      

    
{!accountfount &&  <Typography color="error">
  
  
  
  I think you have no metamask account  plzz create it first </Typography>}
                </span>
              </div>
              <h1 className="text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Secure Medical Data
                </span>
                <br />
                <span className="text-gray-800">on Blockchain</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Revolutionary healthcare platform that ensures your medical records are secure, accessible, and immutable using cutting-edge blockchain technology.
              </p>
              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 group">
                  <span>Get Started</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300">
                  Learn More
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-8 pt-8">
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">10K+</p>
                  <p className="text-gray-600 text-sm">Patients</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">500+</p>
                  <p className="text-gray-600 text-sm">Hospitals</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">99.9%</p>
                  <p className="text-gray-600 text-sm">Uptime</p>
                </div>
              </div>
            </div>

            {/* Animated Card Stack */}
            <div className="relative h-[500px]">
              {[
                { icon: FileText, title: "Blood Test Report", date: "Oct 15, 2024", color: "blue" },
                { icon: Image, title: "X-Ray Scan", date: "Oct 10, 2024", color: "cyan" },
                { icon: Activity, title: "ECG Results", date: "Oct 5, 2024", color: "indigo" }
              ].map((card, i) => (
                <div
                  key={i}
                  className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105 cursor-pointer"
                  style={{
                    transform: `translateY(${i * 30 + scrollY * 0.05}px) translateX(${i * 10}px) rotate(${i * 3 - 3}deg)`,
                    zIndex: 3 - i,
                    opacity: 1 - i * 0.15
                  }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`bg-gradient-to-br from-${card.color}-100 to-${card.color}-200 p-3 rounded-xl`}>
                      <card.icon className={`text-${card.color}-600`} size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{card.title}</h3>
                      <p className="text-sm text-gray-500">{card.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-sm text-gray-600 font-semibold">Blockchain Verified</span>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((line) => (
                      <div 
                        key={line} 
                        className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full" 
                        style={{ width: `${100 - line * 10}%` }} 
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex space-x-2">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg"></div>
                    <div className="h-12 w-12 bg-gray-100 rounded-lg"></div>
                    <div className="h-12 flex-1 bg-gray-100 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for secure medical data management in one comprehensive platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Lock, 
              title: "Blockchain Security", 
              desc: "Your data is encrypted and stored on an immutable blockchain, ensuring maximum security and privacy.",
              color: "blue",
              gradient: "from-blue-500 to-blue-600"
            },
            { 
              icon: Image, 
              title: "Image Storage", 
              desc: "Store X-rays, MRI scans, and medical images securely with blockchain verification.",
              color: "cyan",
              gradient: "from-cyan-500 to-cyan-600"
            },
            { 
              icon: Hospital, 
              title: "Hospital Network", 
              desc: "Connect seamlessly with multiple hospitals and healthcare providers in real-time.",
              color: "indigo",
              gradient: "from-indigo-500 to-indigo-600"
            },
            { 
              icon: FileText, 
              title: "Report Management", 
              desc: "Access all your medical reports from different hospitals in one unified dashboard.",
              color: "blue",
              gradient: "from-blue-500 to-cyan-500"
            },
            { 
              icon: Pill, 
              title: "Medicine Tracking", 
              desc: "Complete medication history with dosage, frequency, and prescription details.",
              color: "cyan",
              gradient: "from-cyan-500 to-blue-500"
            },
            { 
              icon: Users, 
              title: "Multi-Access", 
              desc: "Separate portals for patients and hospitals with role-based access control.",
              color: "indigo",
              gradient: "from-indigo-500 to-purple-500"
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-center mb-4 text-white">How It Works</h2>
          <p className="text-center text-blue-100 text-xl mb-16">Simple, secure, and seamless</p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                icon: Users, 
                title: "Create Account", 
                desc: "Sign up as a patient or hospital with secure authentication",
                number: "01"
              },
              { 
                icon: Hospital, 
                title: "Connect Hospitals", 
                desc: "Hospitals can add you as a patient to their network",
                number: "02"
              },
              { 
                icon: FileText, 
                title: "Upload Records", 
                desc: "Medical reports stored securely on blockchain",
                number: "03"
              },
              { 
                icon: Eye, 
                title: "Access Anywhere", 
                desc: "View all your medical data from any device, anytime",
                number: "04"
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <step.icon className="text-blue-600" size={40} />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-blue-100 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Why Choose MediSecure?
            </h2>
            <div className="space-y-6">
              {[
                "Complete data ownership and privacy control",
                "Instant access to medical history across hospitals",
                "Immutable and tamper-proof records",
                "Secure image storage for scans and reports",
                "Real-time updates from healthcare providers",
                "HIPAA compliant and encrypted"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <p className="text-lg text-gray-700 pt-1">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur">
                  <Shield size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Trusted by Healthcare</h3>
                  <p className="text-blue-100">Industry-leading security</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                  <p className="text-3xl font-bold">256-bit</p>
                  <p className="text-sm text-blue-100">Encryption</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm text-blue-100">Private</p>
                </div>
              </div>
              <p className="text-blue-50 leading-relaxed">
                Built with enterprise-grade security and compliance standards to protect your sensitive medical information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-6">
              Ready to Secure Your Medical Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of patients and hundreds of hospitals using MediSecure to revolutionize healthcare data management
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-12 py-5 rounded-full text-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Get Started Free
              </button>
              <button className="border-2 border-white text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-xl">
                  <Shield className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold text-white">MediSecure</span>
              </div>
              <p className="text-gray-400">Securing healthcare data with blockchain technology</p>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Security", "Pricing", "API"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "HIPAA", "Security"] }
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="text-white font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-blue-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 MediSecure. All rights reserved. Built with ❤️ for better healthcare.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default IndividualPage;  