import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('ai_tasks');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "LLM Veri Seti Hazırla",
        category: "Araştırma",
        description: "HuggingFace üzerinden Türkçe instruction veri setlerini filtrele.",
        completed: false,
        createdAt: new Date().toLocaleDateString('tr-TR')
      }
    ];
  });

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('ai_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      setEditingTask(null);
    } else {
      setTasks([task, ...tasks]);
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-md shadow-indigo-200">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">AI Task & Prompt Manager</h1>
            <p className="text-sm text-slate-500">React + Tailwind CSS + LocalStorage CRUD Projesi</p>
          </div>
        </header>

        <main>
          <TaskForm
            onSave={handleSave}
            currentTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onEdit={(task) => setEditingTask(task)}
            onToggleStatus={handleToggleStatus}
          />
        </main>
      </div>
    </div>
  );
}
