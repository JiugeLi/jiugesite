import React, { useState, useEffect } from 'react';
import { Website } from '@/types';
import { X, Globe, ImageIcon, Link as LinkIcon, FileText, Check, Loader2 } from 'lucide-react';

interface WebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Website>) => void;
  initialData?: Website | null;
  groupId: number;
}

export default function WebsiteModal({ isOpen, onClose, onSubmit, initialData, groupId }: WebsiteModalProps) {
  const [formData, setFormData] = useState<Partial<Website>>({
    name: '',
    url: '',
    description: '',
    logo_url: '',
    logo_type: 'default',
    sort_order: 0,
  });
  const [loadingLogo, setLoadingLogo] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        url: '',
        description: '',
        logo_url: '',
        logo_type: 'default',
        sort_order: 0,
        group_id: groupId,
      });
    }
  }, [initialData, isOpen, groupId]);

  if (!isOpen) return null;

  const fetchLogo = async () => {
    if (!formData.url) return;
    setLoadingLogo(true);
    try {
      const res = await fetch('/api/websites/fetch-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formData.url }),
      });
      const data = await res.json();
      if (data.logoUrl) {
        setFormData((prev) => ({ ...prev, logo_url: data.logoUrl, logo_type: 'auto' }));
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    } finally {
      setLoadingLogo(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, group_id: groupId });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800">
            {initialData ? 'Edit Website' : 'Add Website'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Globe size={16} className="text-slate-400" />
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                placeholder="Website Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <LinkIcon size={16} className="text-slate-400" />
                URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                  placeholder="https://example.com"
                  required
                  onBlur={() => {
                    if (formData.url && !formData.logo_url) fetchLogo();
                  }}
                />
                <button
                  type="button"
                  onClick={fetchLogo}
                  disabled={loadingLogo || !formData.url}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
                >
                  {loadingLogo ? <Loader2 size={18} className="animate-spin" /> : 'Fetch Logo'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <ImageIcon size={16} className="text-slate-400" />
                Logo URL
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400"
                  placeholder="https://example.com/logo.png"
                />
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {formData.logo_url ? (
                    <img src={formData.logo_url} alt="Preview" className="w-8 h-8 object-contain" />
                  ) : (
                    <Globe className="text-slate-300" size={20} />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FileText size={16} className="text-slate-400" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400 min-h-[100px] resize-none"
                placeholder="Optional description..."
              />
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <Check size={16} />
            Save Website
          </button>
        </div>
      </div>
    </div>
  );
}
