export const contract2 ="0x28C49b535052b07322AA327dfF75680AE6236283"
   export const contractABI2=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			}
		],
		"name": "Addhospital",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "blood",
				"type": "string"
			},
			{
				"internalType": "uint104",
				"name": "age",
				"type": "uint104"
			},
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			}
		],
		"name": "addpatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "medicine",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imagedatastr",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctername",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "docterspecilist",
				"type": "string"
			}
		],
		"name": "addreports",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newadminadd",
				"type": "address"
			}
		],
		"name": "changadmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "uint168",
				"name": "phnum",
				"type": "uint168"
			}
		],
		"name": "createpatientaccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			}
		],
		"name": "pausehospital",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "deployedadmincontctaddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Admincontrsct",
		"outputs": [
			{
				"internalType": "contract iAdmin",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allpatientshospital",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint104",
				"name": "age",
				"type": "uint104"
			},
			{
				"internalType": "string",
				"name": "bloodgroup",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getadminofcontract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			}
		],
		"name": "getallpatientsinhospital",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint104",
						"name": "age",
						"type": "uint104"
					},
					{
						"internalType": "string",
						"name": "bloodgroup",
						"type": "string"
					}
				],
				"internalType": "struct Twitter.Host[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getpatientdetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint104",
						"name": "age",
						"type": "uint104"
					},
					{
						"internalType": "string",
						"name": "bloodgroup",
						"type": "string"
					}
				],
				"internalType": "struct Twitter.Host",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getreports",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "doctername",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "docspecilist",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imagedata",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medicine",
						"type": "string"
					}
				],
				"internalType": "struct Twitter.Datereported[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			}
		],
		"name": "getuseremial",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "Hospitalscurrentworking",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "patients",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint104",
				"name": "age",
				"type": "uint104"
			},
			{
				"internalType": "string",
				"name": "bloodgroup",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Reports",
		"outputs": [
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctername",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "docspecilist",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imagedata",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "medicine",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "uint168",
				"name": "phnum",
				"type": "uint168"
			},
			{
				"internalType": "string",
				"name": "hospitalname",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
