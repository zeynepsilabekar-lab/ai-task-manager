import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2 } from 'lucide-react';

export default function TaskForm({ onSave, currentTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Prompt');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setCategory(currentTask.category);
      setDescription(currentTask.description);
    } else {
      setTitle('');
      setCategory('Prompt');
      setDescription('');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: currentTask ? currentTask.id : Date.now(),
      title,
      category,
      description,
      completed: currentTask ? currentTask.completed : false,
      createdAt: currentTask ? currentTask.createdAt : new Date().toLocaleDateString('tr-TR')
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        {currentTask ? 'Görevi / Promptu Güncelle' : 'Yeni AI Görevi / Prompt Ekle'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Başlık (örn: Midjourney V6 Portre)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="md:col-span-2 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
        >
          <option value="Prompt">AI Prompt</option>
          <option value="Araştırma">Model Araştırması</option>
          <option value="Entegrasyon">API Entegrasyonu</option>
          <option value="Diğer">Diğer</option>
        </select>
      </div>
      <textarea
        placeholder="Açıklama / Prompt Detayı..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm mb-4 h-24 resize-none"
      />
      <div className="flex justify-end gap-2">
        {currentTask && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            İptal
          </button>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm shadow-indigo-200"
        >
          {currentTask ? <CheckCircle2 size={16} /> : <PlusCircle size={16} />}
          {currentTask ? 'Güncellemeyi Kaydet' : 'Listeye Ekle'}
        </button>
      </div>
    </form>
  );
}
