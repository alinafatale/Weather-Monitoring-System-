import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, FileText } from 'lucide-react';

interface ReportsProps {
  selectedZone: string;
}

interface Report {
  id: string;
  title: string;
  description: string;
  reportType: string;
  createdDate: string;
  status: string;
}

const generateMockReports = (): Report[] => {
  return [
    {
      id: 'RPT001',
      title: 'Weekly Temperature Analysis',
      description: 'Summary of temperature trends for the week',
      reportType: 'Temperature',
      createdDate: '2024-12-20',
      status: 'Completed',
    },
    {
      id: 'RPT002',
      title: 'Monthly Rainfall Report',
      description: 'Total rainfall measurement and patterns',
      reportType: 'Rainfall',
      createdDate: '2024-12-18',
      status: 'Completed',
    },
    {
      id: 'RPT003',
      title: 'Humidity Alert Summary',
      description: 'Analysis of humidity levels exceeding thresholds',
      reportType: 'Humidity',
      createdDate: '2024-12-15',
      status: 'In Progress',
    },
  ];
};

export function Reports({ selectedZone }: ReportsProps) {
  const [reports, setReports] = useState<Report[]>(generateMockReports());
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Report>>({});

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      description: '',
      reportType: 'Temperature',
      createdDate: new Date().toISOString().split('T')[0],
      status: 'In Progress',
    });
  };

  const handleEdit = (report: Report) => {
    setEditingId(report.id);
    setFormData(report);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    if (isCreating) {
      const newId = `RPT${String(reports.length + 1).padStart(3, '0')}`;
      setReports([{ ...formData, id: newId } as Report, ...reports]);
      setIsCreating(false);
    } else if (editingId) {
      setReports(reports.map(r => r.id === editingId ? { ...formData } as Report : r));
      setEditingId(null);
    }
    setFormData({});
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof Report, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-gray-900">Weather Reports</h2>
        </div>
        <button
          onClick={handleCreate}
          disabled={isCreating || editingId !== null}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Create Report
        </button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="mb-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h3 className="text-gray-900 mb-4">New Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter report title"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Report Type</label>
              <select
                value={formData.reportType || 'Temperature'}
                onChange={(e) => handleInputChange('reportType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="Temperature">Temperature</option>
                <option value="Humidity">Humidity</option>
                <option value="Rainfall">Rainfall</option>
                <option value="General">General</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                value={formData.status || 'In Progress'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Created Date</label>
              <input
                type="date"
                value={formData.createdDate || ''}
                onChange={(e) => handleInputChange('createdDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              rows={3}
              placeholder="Enter report description"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <Save className="w-5 h-5" />
              Save Report
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`border-2 rounded-lg p-5 transition ${
              editingId === report.id
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {editingId === report.id ? (
              // Edit Mode
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Report Type</label>
                    <select
                      value={formData.reportType || ''}
                      onChange={(e) => handleInputChange('reportType', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="Temperature">Temperature</option>
                      <option value="Humidity">Humidity</option>
                      <option value="Rainfall">Rainfall</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Created Date</label>
                    <input
                      type="date"
                      value={formData.createdDate || ''}
                      onChange={(e) => handleInputChange('createdDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{report.title}</h3>
                      <span className="text-gray-500">#{report.id}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{report.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(report)}
                      disabled={isCreating || editingId !== null}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      disabled={isCreating || editingId !== null}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Type:</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {report.reportType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        report.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : report.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-700">{report.createdDate}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No reports yet. Create your first report to get started!</p>
        </div>
      )}
    </div>
  );
}
