import { ReadmeData } from './types';

export function rmgenerator(data: ReadmeData): string {
    const techBadges = data.techStack
        .filter((tech) => tech.trim() !== '')
        .map((tech) => `![${tech}](https://img.shields.io/badge/-${encodeURIComponent(tech)}-333?style=flat-square)`)
        .join(' ');
    const featuresList = data.features
        .filter((feature) => feature.trim() !== '')
        .map((feature) => `- ${feature}`)
        .join('\n');
    const installation = data.installationSteps
        .filter((step) => step.trim() !== '')
        .map((step, index) => `${index + 1}. ${step}`)
        .join('\n');

    return [
        `# ${data.projectTitle || 'Project Title'}\n\n> ${data.tagline || 'A brief summary of the project'}`,
        techBadges ? `## Tech Stack\n\n${techBadges}` : '',
        `## Overview\n\n${data.description || 'Provide a detailed and well elaborated description of your project.'}`,
        data.demoUrl ? `[Live Demo](${data.demoUrl})` : '',
        featuresList ? `## Key Features\n\n${featuresList}` : '',
        installation ? `## Installation & Setup\n\n\`\`\`bash\n${installation}\n\`\`\`` : '',
        `## Author\n\n- **${data.authorName || 'Your Name'}** - [@${data.githubUsername || 'username'}](https://github.com/${data.githubUsername || 'username'})`,
        `## License\n\nThis project is licensed under the **${data.license}** license.`,
    ].filter(Boolean).join('\n\n') + '\n';
}

       
    /*
    Line 1, import -> takes the code from the types.ts file and utilieses the interface here.
    Line 2, export -> allows the code from this file rmgenerator.ts to be implicated and used in other files. specifically this rmgenerator function
    Line 4/8/12, map -> loops over each item in the array and transforms it into a formatted string
    Line 7/11, filter -> removes empty strings and/or blank inputs from the array. Such that these inputs are not rendered into the markdown
    Line 9/13, join -> Combines all items in a array into a single string 
    Line 14, return -> Returns the final ReadMe / Markdown template
    || Is used as dynamic fallbacks.
    > Is used as a blockquote
    Essentially, this file uses a function to take in data entered by a user through a form, cleans up the datat, and stores it into lists and formatted texts allowing for display or easy access.
    */  