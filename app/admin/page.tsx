"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/types";
import initialProjects from "@/data/projects.json";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { updateProjects } from "@/app/actions";
import { Copy, Plus, Save, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>(initialProjects as Project[]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        const result = await updateProjects(projects);
        setIsSaving(false);

        if (result.success) {
            setMessage({ type: 'success', text: 'Changes saved to GitHub! Rebuild triggered.' });
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to save.' });
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure?")) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleSaveProject = (formProject: Project) => {
        if (projects.find(p => p.id === formProject.id)) {
            setProjects(projects.map(p => p.id === formProject.id ? formProject : p));
        } else {
            setProjects([...projects, formProject]);
        }
        setEditingProject(null);
    };

    return (
        <div className="min-h-screen bg-black p-8 pb-32">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold font-display text-white">Project Admin</h1>
                    <NeonButton onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Push Changes"} <Save className="w-4 h-4" />
                    </NeonButton>
                </div>

                {message && (
                    <div className={`mb-8 p-4 rounded bg-white/10 border ${message.type === 'success' ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* List Configuration */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-300">Existing Projects</h2>
                            <button onClick={() => setEditingProject({
                                id: Date.now().toString(),
                                name: "",
                                category: "web",
                                description: "",
                                techStack: [],
                                monthsWorked: "",
                                githubLink: "",
                                featured: true
                            } as Project)} className="p-2 bg-white/10 rounded-full hover:bg-neon-cyan/20 text-neon-cyan">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {projects.map(project => (
                                <GlassCard key={project.id} className="p-4 flex items-center justify-between group">
                                    <div>
                                        <h3 className="font-bold">{project.name}</h3>
                                        <span className="text-xs uppercase text-gray-500">{project.category}</span>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setEditingProject(project)} className="p-2 hover:bg-white/10 rounded">Edit</button>
                                        <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="sticky top-8">
                        <AnimatePresence>
                            {editingProject && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <GlassCard className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold">
                                                {projects.find(p => p.id === editingProject.id) ? "Edit Project" : "New Project"}
                                            </h3>
                                            <button onClick={() => setEditingProject(null)}><X className="w-5 h-5 text-gray-500 hover:text-white" /></button>
                                        </div>

                                        <ProjectForm project={editingProject} onSave={handleSaveProject} />
                                    </GlassCard>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ProjectForm = ({ project, onSave }: { project: Project, onSave: (p: Project) => void }) => {
    const [formData, setFormData] = useState(project);

    const handleChange = (field: keyof Project, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (value: string) => {
        setFormData(prev => ({ ...prev, techStack: value.split(',').map(s => s.trim()) }));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Name</label>
                <input
                    className="w-full bg-black/30 border border-white/10 rounded p-2 text-white placeholder-gray-600"
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Category</label>
                    <select
                        className="w-full bg-black/30 border border-white/10 rounded p-2 text-white"
                        value={formData.category}
                        onChange={e => handleChange('category', e.target.value as ProjectCategory)}
                    >
                        <option value="web">Web Project</option>
                        <option value="ai-ml">AI / ML Project</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Months Worked</label>
                    <input
                        className="w-full bg-black/30 border border-white/10 rounded p-2 text-white"
                        value={formData.monthsWorked || ''}
                        onChange={e => handleChange('monthsWorked', e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Description</label>
                <textarea
                    className="w-full bg-black/30 border border-white/10 rounded p-2 text-white h-24"
                    value={formData.description}
                    onChange={e => handleChange('description', e.target.value)}
                />
            </div>

            <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Tech Stack (comma separated)</label>
                <input
                    className="w-full bg-black/30 border border-white/10 rounded p-2 text-white"
                    value={formData.techStack.join(', ')}
                    onChange={e => handleArrayChange(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">GitHub Link</label>
                    <input
                        className="w-full bg-black/30 border border-white/10 rounded p-2 text-white"
                        value={formData.githubLink || ''}
                        onChange={e => handleChange('githubLink', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Hosted Link</label>
                    <input
                        className="w-full bg-black/30 border border-white/10 rounded p-2 text-white"
                        value={formData.hostedLink || ''}
                        onChange={e => handleChange('hostedLink', e.target.value)}
                    />
                </div>
            </div>

            <NeonButton onClick={() => onSave(formData)} className="w-full justify-center mt-4">
                Save Project
            </NeonButton>
        </div>
    );
};
