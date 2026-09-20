'use client';

import React, { useState } from 'react';
import { ReadmeData } from '../lib/types';
import { rmgenerator } from '../lib/rmgenerator';

type ArrayField = 'techStack' | 'features' | 'installationSteps';

export default function Home() {
  const [formData, setFormData] = useState<ReadmeData>({
    projectTitle: '',
    tagline: '',
    description: '',
    demoUrl: '',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    features: [' '],
    installationSteps: ['npm install', 'npm run dev'],
    authorName: '',
    githubUsername: '',
    license: 'MIT',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ReadmeData) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: ArrayField, index: number, value: string) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev: ReadmeData) => ({ ...prev, [field]: updatedArray }));
  };

  const addArrayItem = (field: ArrayField) => {
    setFormData((prev: ReadmeData) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field: ArrayField, index: number) => {
  const currentArray = formData[field] as string[];
  if (currentArray.length === 1) return;
  
  const updatedArray = currentArray.filter((_: string, i: number) => i !== index);
  setFormData((prev) => ({ ...prev, [field]: updatedArray }));
};

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Interactive Form Controls */}
        <div className="space-y-6 bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h1 className="text-2xl font-bold text-sky-400">RMCraft Generator</h1>
          
          {/* Project Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-200">Project Details</h2>
            
            <input
              type="text"
              name="projectTitle"
              placeholder="Project Title"
              value={formData.projectTitle}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
            />

            <input
              type="text"
              name="tagline"
              placeholder="Tagline / Short Summary"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
            />

            <textarea
              name="description"
              placeholder="Detailed Description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
            />

            <input
              type="text"
              name="demoUrl"
              placeholder="Live Demo URL (optional)"
              value={formData.demoUrl}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Dynamic List: Tech Stack */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-200">Tech Stack</h2>
            {formData.techStack.map((tech: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Tech #${index + 1}`}
                  value={tech}
                  onChange={(e) => handleArrayChange('techStack', index, e.target.value)}
                  className="flex-1 p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('techStack', index)}
                  className="px-3 py-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('techStack')}
              className="mt-2 text-sm text-sky-400 hover:underline"
            >
              + Add Tech
            </button>
          </div>

          {/* Dynamic List: Features */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-200">Features</h2>
            {formData.features.map((feature: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Feature #${index + 1}`}
                  value={feature}
                  onChange={(e) => handleArrayChange('features', index, e.target.value)}
                  className="flex-1 p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('features', index)}
                  className="px-3 py-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('features')}
              className="mt-2 text-sm text-sky-400 hover:underline"
            >
              + Add Feature
            </button>
          </div>

          {/* Dynamic List: Installation Steps */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-200">Installation Steps</h2>
            {formData.installationSteps.map((step: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Step #${index + 1}`}
                  value={step}
                  onChange={(e) => handleArrayChange('installationSteps', index, e.target.value)}
                  className="flex-1 p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('installationSteps', index)}
                  className="px-3 py-2 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('installationSteps')}
              className="mt-2 text-sm text-sky-400 hover:underline"
            >
              + Add Step
            </button>
          </div>

          {/* Author & License */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-200">Author & License</h2>
            
            <input
              type="text"
              name="authorName"
              placeholder="Author Name"
              value={formData.authorName}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
            />

            <input
              type="text"
              name="githubUsername"
              placeholder="GitHub Username"
              value={formData.githubUsername}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
            />

            <select
              name="license"
              value={formData.license}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:border-sky-500"
            >
              <option value="MIT">MIT</option>
              <option value="Apache-2.0">Apache 2.0</option>
              <option value="GPL-3.0">GPL 3.0</option>
              <option value="BSD-3-Clause">BSD 3-Clause</option>
              <option value="Unlicense">Unlicense</option>
            </select>
          </div>
        </div>

        {/* Right Column: Live Output Pane */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
          <h2 className="text-lg font-semibold text-slate-200">Markdown Output</h2>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-md overflow-x-auto text-sm font-mono text-slate-300 whitespace-pre-wrap">
            {rmgenerator(formData)}
          </pre>
        </div>

      </div>
    </main>
  );
}