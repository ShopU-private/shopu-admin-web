import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
// UserListResponse type for API response
type UserListResponse = {
  id: string;
  phoneNumber: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastSignedAt?: string;
};
import { useAuth } from '../../contexts/AuthContext';

interface UsersListProps {
  onCreateUser: () => void;
}

const PAGE_SIZE = 20;

const UsersList: React.FC<UsersListProps> = ({ onCreateUser }) => {
  const { fetchWithAuth } = useAuth();
  const [users, setUsers] = useState<UserListResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0); // Start from 1
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<string | null>(null);


useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const url = `/api/v1/users/all/${page}/${PAGE_SIZE}`;
      const data = await fetchWithAuth(
        url, { method: 'GET' });
      console.log(data?.data?.content)
      setUsers(data?.data?.content || []);
      setTotalPages(data?.data?.totalPages || 1);
    } catch (err) {
      console.log("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };
  fetchUsers();
}, [page]);



  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber?.includes(searchTerm))
  );

  
  const getRoleColor = (role: string) => {
    return role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <button
          onClick={onCreateUser}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading users...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Signed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {user.name?.charAt(0) || user.phoneNumber?.slice(0, 2)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name || user.phoneNumber}</div>
                          <div className="text-sm text-gray-500">{user.email || user.phoneNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full  
                       ${getRoleColor(user.role)} `}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800`}>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastSignedAt ? new Date(user.lastSignedAt).toLocaleDateString() : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                          disabled={user.role === 'ADMIN'}
                          onClick={user.role === 'ADMIN' ? () => setPrompt('You are not able to do any activity with this user') : undefined}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          disabled={user.role === 'ADMIN'}
                          onClick={user.role === 'ADMIN' ? () => setPrompt('You are not able to do any activity with this user') : undefined}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Prompt Modal */}
        {prompt && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
              <p className="mb-4 text-gray-800">{prompt}</p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setPrompt(null)}
              >
                OK
              </button>
            </div>
          </div>
        )}
        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-2 p-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page < 1}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page + 1 == totalPages || users.length === 0}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;