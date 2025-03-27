// src/components/DemoPage/CompanyInfoForm.tsx
import React, {useState} from 'react';

const CompanyInfoForm: React.FC = () => {
    const [companyName, setCompanyName] = useState('');
	  const [companyUrl, setCompanyUrl] = useState('');

    const handleCompanyInfoSubmit = () => {
      console.log("Company Name:", companyName);
      console.log("Company URL:", companyUrl);
    };

  return (
    <div className="company-info flex flex-col items-center mb-10 w-full max-w-md">
        <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2 font-source-sans">Company Name:</label>
        <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-black font-source-sans"
            placeholder="Enter company name"
        />

        <label htmlFor="companyUrl" className="block text-sm font-medium text-white mt-4 mb-2 font-source-sans">Company URL:</label>
        <input
            type="text"
            id="companyUrl"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-black font-source-sans"
            placeholder="Enter company URL"
        />
        <button onClick={handleCompanyInfoSubmit} className="mt-6 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 font-source-sans">
            Submit Company Info
        </button>
    </div>
  )
}

export default CompanyInfoForm;