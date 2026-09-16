import {ReadmeData } from './types';
export function rmgenerator(data: ReadmeData): string {
    const techBadges = data.techstack
        .map((tech: string) => `![${tech}](https://img.shields.io/badge/-${encodeURIComponent(tech)}-333?style=flat-square)`)
        .join(' ')
    const featuresList = data.features
        .filter((f: string) => f.trim() !== '')
        .map((f: string) => `-${f}`)
        .join('\n')
    const installation = data.installationSteps
        .filter((s:string) =>  s.trim() !== '')
        .map((step: string, i: number) => `${i + 1}.${step}`)
        .join('\n')
    return `# ${data.projectTitle || 'Project Title'} 
    > ${data.tagline ||  'A brief summary of the project'}
    ${techBadges ? `### Tech Stack\n${techBadges}\n` : ''}

    ## Overview
    ${data.description || 'Provide a detailed and well elaborated description of your project.'}
    
    ${data.demoUrl ? `[Live Demo](${data.demoUrl})\n` : ''}

    ${featuresList ? `##Key Features \n${featuresList}\n` : ' '}

    ${installation ? `##Installation & Setup\n\`\`\`\`bash\n${installation}\n` : ''}

    ## Author
    - **${data.authorName || 'Your Name'}** - [@${data.githubUsername || 'username'}](https://github.com/data.githubUsername || ' '})

    ## Licensing 
    This project is licensed under the **${data.license}** License 

    `
      
    }

       
    /*
    Line 1, import -> takes the code from the types.ts file and utilieses the interface here.
    Line 2, export -> allows the code from this file rmgenerator.ts to be implicated and used in other files. specifically this rmgenerator function
    Line 4/8/12, map ->
    Line 7/11, filter
    Line 9/13, join ->
    Line 14, return -> 
    || Is used as dynamic fallbacks.
    > is used as a blockquote
    Essentially, 
    */