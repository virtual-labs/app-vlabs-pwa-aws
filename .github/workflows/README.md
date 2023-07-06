# GitHub Actions Workflow Continuous Deployment pipeline for Virtual Labs PWA

In this repository, we have set up a GitHub Actions workflow that automates the process of building the PWA application and deploying it to GitHub Pages.

## What's Inside?

The workflow is defined in a file named `deployment-script.yml`, located in the `.github/workflows` directory of the repository.

## How Does It Work?

This workflow springs into action whenever we push changes to the `main` branch. Here's a step-by-step rundown of what it does:

1. **Checks Out the Code**: It pulls the latest code from the repository. This is akin to doing a `git clone` locally.

2. **Sets Up Node.js**: Since Node.js is required to build the app, the workflow sets up the Node.js environment.

3. **Navigates to the 'homepage' Directory**: The app's code resides in the `homepage` directory, so the workflow changes to that directory.

4. **Installs Dependencies**: It runs `npm install` to install all the necessary dependencies required for the build process.

5. **Builds the Application**: The application is built by executing `npm run build`.

6. **Configures Git**: Git is configured with user information to prepare for the commit.

7. **Creates a New Orphan Branch**: A new orphan branch named `gh-pages` is created for the GitHub Pages deployment.

8. **Adds Build Files to Git**: The build files are added to Git and moved to the root directory.

9. **Commits the Changes**: The changes are committed with a message containing the link to the GitHub Pages site.

10. **Pushes to GitHub Pages**: Finally, the changes are pushed to the `gh-pages` branch.

## How to Use This Workflow?

If you want to use this workflow in your own project, you can copy the `main.yml` file to the `.github/workflows` directory in your repository. Make sure to have the necessary build scripts in your `package.json` and configure GitHub Pages in your repository settings to use the `gh-pages` branch.
