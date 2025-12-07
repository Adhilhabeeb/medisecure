# 🌟 Medisecure

![Solidity](https://img.shields.io/badge/Solidity-0.8.0-orange) 
![Next.js](https://img.shields.io/badge/Next.js-13-black) 
![License](https://img.shields.io/badge/License-MIT-blue)

**Medisecure** is a **decentralized healthcare DApp** built using **Solidity** and **Next.js**. It securely manages medical records on the blockchain while providing advanced features like **AI-powered chatbot**, **voice-to-text recognition**, and **real-time notifications** for doctors and patients.

---

## 📌 Table of Contents
- [Overview](#overview)  
- [Features](#features)  
- [Technologies](#technologies)  
- [Architecture](#architecture)  
- [Getting Started](#getting-started)  
- [Smart Contracts](#smart-contracts)  
- [Frontend](#frontend)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  

---

## 💡 Overview

Medisecure provides a **secure, transparent, and efficient** system for healthcare data management. Patients, doctors, and hospitals can safely **store, share, and access medical records**. Advanced features improve usability:

- **AI-powered chatbot** using GEMEI API  
- **Voice-to-text recognition** for hands-free interactions  
- **Real-time notifications** via Knock to share patient reports between doctors  

---

## ✨ Features

- **Blockchain Security**: Patient data stored on Ethereum blockchain for immutability  
- **Decentralized Access Control**: Only authorized users can access medical records  
- **AI Chatbot**: Provides automated assistance and health-related responses  
- **Voice-to-Text**: Patients and doctors can input data using audio  
- **Real-time Notifications**: Instantly notify doctors about patient reports  
- **Smart Contract Automation**: Handles permissions, record creation, and logging  
- **User-friendly Interface**: Built with Next.js and React  

---

## 🛠 Technologies

| Layer               | Technology / Library            |
|--------------------|--------------------------------|
| Frontend           | Next.js, React, CSS/SCSS       |
| Blockchain         | Solidity, Ethereum             |
| Smart Contracts    | Hardhat / Truffle              |
| Web3 Integration   | Ethers.js / Web3.js            |
| AI & Chatbot       | GEMEI API                       |
| Real-time Messaging| Knock API                       |
| Database (Optional)| Off-chain storage if needed     |

---

## 🏗 Architecture

1. **Smart Contracts**: Deployed on Ethereum testnet, handling patients, doctors, and medical records.  
2. **Frontend (Next.js)**: Wallet-based authentication (MetaMask), dashboards for patients/doctors, record management, and chatbot interactions.  
3. **GEMEI API**: Converts voice to text, interacts with AI chatbot for queries and assistance.  
4. **Knock API**: Sends real-time notifications to doctors when a patient report is shared or updated.  
5. **Integration**: Frontend interacts with smart contracts and APIs seamlessly for a full DApp experience.  

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18.x  
- NPM or Yarn  
- MetaMask wallet  
- Hardhat or Truffle for contracts  

---

## 📝 Smart Contracts

Core contracts manage:

- Patient registration & authentication  
- Doctor registration & access control  
- Medical record creation, retrieval, sharing  
- Event logging for transparency  

Contracts are written in **Solidity** and deployed on Ethereum testnet (Goerli recommended for testing).

---

## 🌐 Frontend

Frontend provides:

- Wallet connection for authentication  
- Dashboards for patients and doctors  
- Submit/view medical records  
- Interact with AI chatbot (GEMEI)  
- Real-time notifications (Knock)  

---

## 💻 Installation

1. Clone repository:  
```bash
git clone https://github.com/<your-username>/medisecure.git
cd medisecure
