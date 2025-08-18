import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

const phoneRegex = /^[6-9]\d{9}$/;

interface CreateUserProps {
  onBack: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    role: 'user',
    status: 'active',
    flat: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    landMark: '',
    receiverName: '',
    addressPhoneNumber: '',
    addressType: 'HOME'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // 50 chars max for most fields
    const fields50 = [
      'name', 'email', 'flat', 'city', 'state', 'pinCode', 'landMark', 'receiverName'
    ];
    fields50.forEach((field) => {
      if (
        formData[field as keyof typeof formData] &&
        String(formData[field as keyof typeof formData]).length > 50
      ) {
        newErrors[field] = 'Maximum 50 characters allowed';
      }
    });

    // Street: 80 chars max
    if (formData.street && formData.street.length > 80) {
      newErrors.street = 'Maximum 80 characters allowed';
    }

    // Phone number validation
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter valid 10-digit phone number';
    }
    if (!phoneRegex.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'Enter valid 10-digit WhatsApp number';
    }
    if (!phoneRegex.test(formData.addressPhoneNumber)) {
      newErrors.addressPhoneNumber = 'Enter valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Creating user:', formData);
      setIsLoading(false);
      onBack();
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
                required
              />
              {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
                required
              />
              {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                required
              />
              {errors.phoneNumber && <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>}
            </div>
            {/* WhatsApp Number */}
            <div>
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                maxLength={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter WhatsApp number"
                required
              />
              {errors.whatsappNumber && <div className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</div>}
            </div>
            {/* ...existing role and status fields... */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Address Section */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Flat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flat no/house no/house name *
                </label>
                <input
                  type="text"
                  name="flat"
                  value={formData.flat}
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Flat/House No/Name"
                  required
                />
                {errors.flat && <div className="text-red-500 text-xs mt-1">{errors.flat}</div>}
              </div>
              {/* Street */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  maxLength={80}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Street"
                  required
                />
                {errors.street && <div className="text-red-500 text-xs mt-1">{errors.street}</div>}
              </div>
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                  required
                />
                {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
              </div>
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="State"
                  required
                />
                {errors.state && <div className="text-red-500 text-xs mt-1">{errors.state}</div>}
              </div>
              {/* Pin Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pin Code *
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Pin Code"
                  required
                />
                {errors.pinCode && <div className="text-red-500 text-xs mt-1">{errors.pinCode}</div>}
              </div>
              {/* Land Mark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Land Mark
                </label>
                <input
                  type="text"
                  name="landMark"
                  value={formData.landMark}
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Land Mark (optional)"
                />
                {errors.landMark && <div className="text-red-500 text-xs mt-1">{errors.landMark}</div>}
              </div>
              {/* Receiver Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver Name *
                </label>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Receiver Name"
                  required
                />
                {errors.receiverName && <div className="text-red-500 text-xs mt-1">{errors.receiverName}</div>}
              </div>
              {/* Address Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="addressPhoneNumber"
                  value={formData.addressPhoneNumber}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                  required
                />
                {errors.addressPhoneNumber && <div className="text-red-500 text-xs mt-1">{errors.addressPhoneNumber}</div>}
              </div>
              {/* Address Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type *
                </label>
                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="HOME">Home</option>
                  <option value="WORK">Work</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Creating...' : 'Create User'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;