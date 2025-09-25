import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../../types/user';

const UserDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = (location.state as { userData?: User })?.userData;

  console.log("hii hlo yup hola")
  if (!userData) {
    return <div className="p-8 text-center text-gray-500">User not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">User Details</h1>
      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="ml-2 text-gray-900">{userData.name || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="ml-2 text-gray-900">{userData.email || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Phone Number:</span>
          <span className="ml-2 text-gray-900">{userData.phoneNumber || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">WhatsApp Number:</span>
          <span className="ml-2 text-gray-900">{userData.whatsappNumber || '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Total Orders:</span>
          <span className="ml-2 text-gray-900">{userData.orderIds?.length ?? 0}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Last Signin:</span>
          <span className="ml-2 text-gray-900">{userData.lastSignedAt ? new Date(userData.lastSignedAt).toLocaleString() : '-'}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Created Date:</span>
          <span className="ml-2 text-gray-900">{userData.createdAt ? new Date(userData.createdAt).toLocaleString() : '-'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
