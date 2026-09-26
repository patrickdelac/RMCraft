'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import React, { useEffect, useState } from 'react';
import { ReadmeData } from '../lib/types';
import { rmgenerator } from '../lib/rmgenerator';

type ArrayField = 'techStack' | 'features' | 'installationSteps';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [themeLoaded, setThemeLoaded] = useState(false);
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('rmcraft-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('rmcraft-theme', theme);
  }, [theme, themeLoaded]);

  const handleCopy = async () => {
  const markdownText = rmgenerator(formData);
  await navigator.clipboard.writeText(markdownText);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

const handleDownload = () => {
  const markdownText = rmgenerator(formData);
  const blob = new Blob([markdownText], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'README.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
  

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
    <main className="workspace-shell" data-theme={theme}>
      <div className="workspace-container">
        <header className="workspace-header">
          <a className="brand-lockup" href="#top" aria-label="RMCraft home">
            <span className="brand-mark" aria-hidden="true">rm</span>
            <span className="brand-name">rmcraft</span>
          </a>
          <div className="header-tools">
            <div className="theme-switch" role="group" aria-label="Color theme">
              <button
                type="button"
                className={theme === 'light' ? 'is-active' : ''}
                aria-pressed={theme === 'light'}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
              <button
                type="button"
                className={theme === 'dark' ? 'is-active' : ''}
                aria-pressed={theme === 'dark'}
                onClick={() => setTheme('dark')}
              >
                Dark
              </button>
            </div>
            <div className="live-indicator"><span />Live preview</div>
          </div>
        </header>

        <div className="workspace-grid" id="top">
        
        {/* Left Column: Interactive Form Controls */}
        <div className="editor-panel">
          <div className="panel-intro">
            <span className="eyebrow">README BUILDER</span>
            <h1>Give your project a great first read.</h1>
            <p>Shape the details. Your README takes form as you go.</p>
          </div>
          
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
        {/* Right Column: Live Output Pane & Utility Controls */}
<div className="output-panel">
  <div className="flex items-center justify-between">
    <div className="output-heading">
      <span className="eyebrow">YOUR DOCUMENT</span>
      <h2>README.md</h2>
    </div>
    
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="button button-secondary"
      >
        {copied ? '✓ Copied!' : 'Copy Markdown'}
      </button>

      <button
        type="button"
        onClick={handleDownload}
        className="button button-primary"
      >
        Download README.md
      </button>
    </div>
  </div>

  <div className="markdown-preview">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {rmgenerator(formData)}
    </ReactMarkdown>
  </div>
</div>

        </div>
      </div>
    </main>
  );
}