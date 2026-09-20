export interface ReadmeData { 
projectTitle: string;
description: string;
tagline: string;
demoUrl: string;
techStack: string[];
features: string[];
installationSteps: string[];
authorName: string;
githubUsername: string;
license: "MIT" | "Apache 2.0" | "GPL v3" | "None";
}
/*
Line 1, Export -> allows for later usage in different files. Uses this interface as a base model setting up variables for later on.
*/