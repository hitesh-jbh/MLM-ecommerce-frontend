// EKYC.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EKYC() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    
    // Contact Information
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Identity Verification
    idType: '',
    idNumber: '',
    idExpiryDate: '',
    
    // Document Uploads
    idFront: null,
    idBack: null,
    selfiePhoto: null,
    addressProof: null,
    
    // Additional Information
    occupation: '',
    annualIncome: '',
    sourceOfFunds: '',
    purposeOfAccount: '',
    
    // Declaration
    termsAccepted: false,
    privacyAccepted: false
  });
  
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic personal details' },
    { id: 2, title: 'Contact Details', description: 'Address and contact info' },
    { id: 3, title: 'ID Verification', description: 'Upload ID documents' },
    { id: 4, title: 'Additional Info', description: 'Financial details' },
    { id: 5, title: 'Review & Submit', description: 'Final verification' }
  ];

  const idTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'drivers_license', label: "Driver's License" },
    { value: 'national_id', label: 'National ID Card' },
    { value: 'voter_id', label: 'Voter ID Card' },
    { value: 'pan_card', label: 'PAN Card' }
  ];

  const countries = [
    { value: 'IN', label: 'India' },
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      if (files && files[0]) {
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));
        
        // Simulate upload progress
        if (name.includes('id') || name.includes('selfie') || name.includes('address')) {
          setUploadProgress(prev => ({
            ...prev,
            [name]: 0
          }));
          
          // Simulate upload progress animation
          const interval = setInterval(() => {
            setUploadProgress(prev => {
              const currentProgress = prev[name] || 0;
              if (currentProgress >= 100) {
                clearInterval(interval);
                return prev;
              }
              return {
                ...prev,
                [name]: currentProgress + 10
              };
            });
          }, 100);
          
          setTimeout(() => {
            clearInterval(interval);
            setUploadProgress(prev => ({
              ...prev,
              [name]: 100
            }));
          }, 1000);
        }
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Please select gender';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        break;
        
      case 2:
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.country) newErrors.country = 'Country is required';
        break;
        
      case 3:
        if (!formData.idType) newErrors.idType = 'ID type is required';
        if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
        if (!formData.idExpiryDate) newErrors.idExpiryDate = 'Expiry date is required';
        if (!formData.idFront) newErrors.idFront = 'Front side of ID is required';
        if (!formData.idBack) newErrors.idBack = 'Back side of ID is required';
        if (!formData.selfiePhoto) newErrors.selfiePhoto = 'Selfie photo is required';
        break;
        
      case 4:
        if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
        if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';
        if (!formData.sourceOfFunds.trim()) newErrors.sourceOfFunds = 'Source of funds is required';
        break;
        
      case 5:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
        if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must accept the privacy policy';
        break;
    }
    
    return newErrors;
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const stepErrors = validateStep(5);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare FormData for file uploads
      const formDataToSend = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // TODO: Replace with your actual API endpoint
      const response = await fetch('https://your-api.com/ekyc/verify', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (response.ok) {
        // Success - redirect or show success message
        navigate('/dashboard'); // Change to your success route
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit eKYC. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFilePreview = (file) => {
    if (!file) return null;
    
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  // Step 1: Personal Information
  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
        <p className="text-sm text-gray-600 mb-6">Please provide your basic personal details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality *
          </label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nationality ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Nationality</option>
            {countries.map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>}
        </div>
      </div>
    </div>
  );

  // Step 2: Contact Information
  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
        <p className="text-sm text-gray-600 mb-6">Your contact and address details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+91 9876543210"
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your complete address"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="City"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/Province
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="State"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Postal Code"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.country ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
        </div>
      </div>
    </div>
  );

  // Step 3: Identity Verification
  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Identity Verification</h3>
        <p className="text-sm text-gray-600 mb-6">Upload your identity documents for verification</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Type *
          </label>
          <select
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.idType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select ID Type</option>
            {idTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.idType && <p className="mt-1 text-sm text-red-600">{errors.idType}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Number *
          </label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.idNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter ID number"
          />
          {errors.idNumber && <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Expiry Date *
          </label>
          <input
            type="date"
            name="idExpiryDate"
            value={formData.idExpiryDate}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.idExpiryDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.idExpiryDate && <p className="mt-1 text-sm text-red-600">{errors.idExpiryDate}</p>}
        </div>
      </div>
      
      {/* Document Upload Section */}
      <div className="space-y-6 pt-4">
        <h4 className="text-md font-semibold text-gray-800">Upload Documents</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* ID Front */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
            <label className="block cursor-pointer">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">Front of ID</p>
                <p className="text-xs text-gray-500 mt-1">Required</p>
                <input
                  type="file"
                  name="idFront"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
            </label>
            {formData.idFront && (
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 truncate">{formData.idFront.name}</p>
                  <span className="text-xs text-green-600">
                    {uploadProgress.idFront === 100 ? '✓ Uploaded' : 'Uploading...'}
                  </span>
                </div>
                {uploadProgress.idFront && uploadProgress.idFront < 100 && (
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.idFront}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
            {errors.idFront && <p className="mt-1 text-xs text-red-600">{errors.idFront}</p>}
          </div>
          
          {/* ID Back */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
            <label className="block cursor-pointer">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">Back of ID</p>
                <p className="text-xs text-gray-500 mt-1">Required</p>
                <input
                  type="file"
                  name="idBack"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
            </label>
            {formData.idBack && (
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 truncate">{formData.idBack.name}</p>
                  <span className="text-xs text-green-600">
                    {uploadProgress.idBack === 100 ? '✓ Uploaded' : 'Uploading...'}
                  </span>
                </div>
                {uploadProgress.idBack && uploadProgress.idBack < 100 && (
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.idBack}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
            {errors.idBack && <p className="mt-1 text-xs text-red-600">{errors.idBack}</p>}
          </div>
          
          {/* Selfie Photo */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
            <label className="block cursor-pointer">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">Selfie Photo</p>
                <p className="text-xs text-gray-500 mt-1">Required</p>
                <input
                  type="file"
                  name="selfiePhoto"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </label>
            {formData.selfiePhoto && (
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 truncate">{formData.selfiePhoto.name}</p>
                  <span className="text-xs text-green-600">
                    {uploadProgress.selfiePhoto === 100 ? '✓ Uploaded' : 'Uploading...'}
                  </span>
                </div>
                {uploadProgress.selfiePhoto && uploadProgress.selfiePhoto < 100 && (
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.selfiePhoto}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
            {errors.selfiePhoto && <p className="mt-1 text-xs text-red-600">{errors.selfiePhoto}</p>}
          </div>
          
          {/* Address Proof */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
            <label className="block cursor-pointer">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">Address Proof</p>
                <p className="text-xs text-gray-500 mt-1">Optional</p>
                <input
                  type="file"
                  name="addressProof"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
            </label>
            {formData.addressProof && (
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 truncate">{formData.addressProof.name}</p>
                  <span className="text-xs text-green-600">
                    {uploadProgress.addressProof === 100 ? '✓ Uploaded' : 'Uploading...'}
                  </span>
                </div>
                {uploadProgress.addressProof && uploadProgress.addressProof < 100 && (
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress.addressProof}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Requirements */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h5 className="text-sm font-semibold text-blue-800 mb-2">Document Requirements:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Clear, high-quality images or scanned copies
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            All four corners visible
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            File size less than 5MB each
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Supported formats: JPG, PNG, PDF
          </li>
        </ul>
      </div>
    </div>
  );

  // Step 4: Additional Information
  const renderStep4 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
        <p className="text-sm text-gray-600 mb-6">Financial details for account verification</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation *
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.occupation ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Software Engineer, Business Owner"
          />
          {errors.occupation && <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Income *
          </label>
          <select
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.annualIncome ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Income Range</option>
            <option value="0-300000">₹0 - ₹3,00,000</option>
            <option value="300001-600000">₹3,00,001 - ₹6,00,000</option>
            <option value="600001-1000000">₹6,00,001 - ₹10,00,000</option>
            <option value="1000001-1500000">₹10,00,001 - ₹15,00,000</option>
            <option value="1500000+">Above ₹15,00,000</option>
          </select>
          {errors.annualIncome && <p className="mt-1 text-sm text-red-600">{errors.annualIncome}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source of Funds *
          </label>
          <select
            name="sourceOfFunds"
            value={formData.sourceOfFunds}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.sourceOfFunds ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Source</option>
            <option value="salary">Salary/Employment</option>
            <option value="business">Business Income</option>
            <option value="investment">Investments</option>
            <option value="inheritance">Inheritance</option>
            <option value="other">Other</option>
          </select>
          {errors.sourceOfFunds && <p className="mt-1 text-sm text-red-600">{errors.sourceOfFunds}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose of Account
          </label>
          <select
            name="purposeOfAccount"
            value={formData.purposeOfAccount}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Purpose</option>
            <option value="personal">Personal Banking</option>
            <option value="business">Business Transactions</option>
            <option value="investment">Investment/Savings</option>
            <option value="loan">Loan Repayment</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Step 5: Review & Submit
  const renderStep5 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Review & Submit</h3>
        <p className="text-sm text-gray-600 mb-6">Review your information and submit for verification</p>
      </div>
      
      {/* Review Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Personal Information</h4>
            <div className="space-y-2">
              <p className="text-sm"><span className="text-gray-600">Name:</span> {formData.fullName || 'Not provided'}</p>
              <p className="text-sm"><span className="text-gray-600">Date of Birth:</span> {formData.dateOfBirth || 'Not provided'}</p>
              <p className="text-sm"><span className="text-gray-600">Gender:</span> {formData.gender || 'Not provided'}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Contact Information</h4>
            <div className="space-y-2">
              <p className="text-sm"><span className="text-gray-600">Email:</span> {formData.email || 'Not provided'}</p>
              <p className="text-sm"><span className="text-gray-600">Phone:</span> {formData.phoneNumber || 'Not provided'}</p>
              <p className="text-sm"><span className="text-gray-600">Address:</span> {formData.address || 'Not provided'}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">ID Verification</h4>
            <div className="space-y-2">
              <p className="text-sm"><span className="text-gray-600">ID Type:</span> {formData.idType || 'Not provided'}</p>
              <p className="text-sm"><span className="text-gray-600">ID Number:</span> {formData.idNumber || 'Not provided'}</p>
              <p className="text-sm"><span className="text-gray-600">Documents:</span> {
                formData.idFront && formData.idBack && formData.selfiePhoto 
                  ? '✓ All uploaded' 
                  : 'Incomplete'
              }</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Additional Information</h4>
            <div className="space-y-2">
              <p className="text-sm"><span className="text-gray-600">Occupation:</span> {formData.occupation || 'Not provided'}</p>
              <p className="text-sm"><span className="text-gray-600">Annual Income:</span> {formData.annualIncome || 'Not provided'}</p>
              <p className="text-sm"><span className="text-gray-600">Source of Funds:</span> {formData.sourceOfFunds || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Declaration */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mt-1 mr-3"
          />
          <label htmlFor="termsAccepted" className="text-sm text-gray-700">
            I hereby declare that the information provided above is true, complete, and accurate to the best of my knowledge. I understand that any false information may lead to rejection of my application.
          </label>
        </div>
        {errors.termsAccepted && <p className="text-sm text-red-600">{errors.termsAccepted}</p>}
        
        <div className="flex items-start">
          <input
            type="checkbox"
            id="privacyAccepted"
            name="privacyAccepted"
            checked={formData.privacyAccepted}
            onChange={handleChange}
            className="mt-1 mr-3"
          />
          <label htmlFor="privacyAccepted" className="text-sm text-gray-700">
            I agree to the Privacy Policy and consent to the collection, processing, and storage of my personal data for KYC verification purposes.
          </label>
        </div>
        {errors.privacyAccepted && <p className="text-sm text-red-600">{errors.privacyAccepted}</p>}
      </div>
      
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}
    </div>
  );

  // Render current step
  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            eKYC Verification
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your Know Your Customer verification to access all features
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 hidden sm:block"></div>
            <div 
              className="absolute left-0 top-1/2 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-300 hidden sm:block"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {/* Steps */}
            <div className="flex justify-between relative">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : currentStep === step.id
                      ? 'bg-white border-blue-600 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="font-semibold text-sm sm:text-base">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center hidden sm:block">
                    <p className={`text-xs font-medium ${
                      currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                  </div>
                  {/* Mobile Step Indicator */}
                  <div className="mt-2 text-center sm:hidden">
                    <p className={`text-xs font-medium ${
                      currentStep === step.id ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      Step {step.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
          {/* Current Step Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {steps[currentStep - 1]?.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.description}
                </p>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {Math.round((currentStep / steps.length) * 100)}% Complete
              </div>
            </div>
          </div>
          
          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            {renderCurrentStep()}
            
            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-12 pt-6 border-t border-gray-200">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous Step
                    </span>
                  </button>
                )}
              </div>
              
              <div>
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md"
                  >
                    Next Step
                    <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Submit eKYC
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        
        {/* Info Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Secure & Encrypted</h3>
            </div>
            <p className="text-sm text-gray-600">Your data is protected with bank-level encryption and secure protocols.</p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Quick Verification</h3>
            </div>
            <p className="text-sm text-gray-600">Most verifications are completed within 24-48 hours.</p>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Dedicated Support</h3>
            </div>
            <p className="text-sm text-gray-600">Our support team is available to help you through the process.</p>
          </div>
        </div> */}
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EKYC;