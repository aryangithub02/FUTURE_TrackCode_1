import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/api/feedback');
      setFeedbacks(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Failed to load feedbacks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const username = sessionStorage.getItem('admin_username');
      const password = sessionStorage.getItem('admin_password');
      
      if (username === 'admin' && password === 'admin@aryan') {
        setIsAuthenticated(true);
        fetchFeedbacks();
      } else {
        navigate('/login', { state: { from: location }, replace: true });
      }
      setAuthChecked(true);
    };
    
    checkAuth();
  }, [navigate, location]);
  
  if (!authChecked) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return null; // Will be redirected by the effect
  }

  const showNotification = (message, type = 'error') => {
    if (type === 'error') setError(message);
    else setSuccess(message);
  };

  // Mark feedback as read LOCALLY
  const markAsRead = (id) => {
    setFeedbacks(prev =>
      prev.map(fb => fb._id === id ? { ...fb, status: 'read' } : fb)
    );

    if (selectedFeedback && selectedFeedback._id === id) {
      setSelectedFeedback({ ...selectedFeedback, status: 'read' });
    }

    showNotification('Feedback marked as read!', 'success');
  };

  // Filtering + Searching
  const filteredFeedbacks = feedbacks.filter(fb => {
    if (filter !== 'all' && fb.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        (fb.name && fb.name.toLowerCase().includes(term)) ||
        (fb.email && fb.email.toLowerCase().includes(term)) ||
        (fb.message && fb.message.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusCounts = {
    all: feedbacks.length,
    new: feedbacks.filter(fb => fb.status === 'new').length,
    read: feedbacks.filter(fb => fb.status === 'read').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-600">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-6">
      {/* Notifications */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-md">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}
      
      {success && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 max-w-md">
          <span className="block sm:inline">{success}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccess(null)}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Feedback Dashboard</h1>
          <p className="text-gray-600">Manage and review user feedback submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-500">Total Feedback</h3>
            <p className="text-2xl font-bold text-gray-800">{statusCounts.all}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500">New</h3>
            <p className="text-2xl font-bold text-gray-800">{statusCounts.new}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-gray-500">
            <h3 className="text-sm font-medium text-gray-500">Read</h3>
            <p className="text-2xl font-bold text-gray-800">{statusCounts.read}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {['all', 'new', 'read'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? status === 'new' ? 'bg-blue-100 text-blue-800'
                        : status === 'read' ? 'bg-gray-100 text-gray-800'
                        : 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full md:w-64 transition-colors"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredFeedbacks.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No feedback found</h3>
              <p className="text-gray-500">Try changing your filters or search term</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredFeedbacks.map(fb => (
                <div
                  key={fb._id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
                  onClick={() => {
                    setSelectedFeedback(fb);
                    if (fb.status === 'new') markAsRead(fb._id);
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{fb.name || 'Anonymous'}</h3>
                      <p className="text-sm text-gray-600">{fb.email || 'No email provided'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fb.status || 'new')}`}>
                        {fb.status || 'new'}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(fb.createdAt)}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2 line-clamp-2">{fb.message}</p>
                  <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {fb.status === 'new' && (
                      <button
                        onClick={e => { e.stopPropagation(); markAsRead(fb._id); }}
                        className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback Detail Modal */}
        {selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedFeedback.name || 'Anonymous'}</h2>
                    <p className="text-gray-600">{selectedFeedback.email || 'No email provided'}</p>
                  </div>
                  <button onClick={() => setSelectedFeedback(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center mt-4 space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedFeedback.status || 'new')}`}>
                    {selectedFeedback.status || 'new'}
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(selectedFeedback.createdAt)}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Feedback Message</h3>
                <p className="text-gray-800 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{selectedFeedback.message}</p>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  {selectedFeedback.status === 'new' && (
                    <button
                      onClick={() => { markAsRead(selectedFeedback._id); setSelectedFeedback(null); }}
                      className="px-4 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
