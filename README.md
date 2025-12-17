# brightkez

Static HTML/CSS site for Brightkeyz Infrastructure.

Deployment
- Push to the `main` branch; GitHub Actions will deploy to GitHub Pages.

Expected live URL (after successful deploy):
https://superbhel7-ship-it.github.io/brightkez/

How to trigger manually:
```bash
git add .github/workflows/pages.yml .nojekyll README.md
git commit -m "Add GitHub Pages deploy workflow"
git push origin main
```
# brightkez

Push to the `main` branch; GitHub Actions will deploy the site to GitHub Pages.

Live URL (after a successful deploy):
https://superbhel7-ship-it.github.io/brightkez/

How to trigger:
1. git add .github/workflows/deploy-pages.yml README.md
2. git commit -m "Add GitHub Pages deploy workflow"
3. git push origin main

Deploy to Vercel
-----------------

This project is a static site and can be deployed to Vercel quickly.

Quick (CLI) deploy:

```bash
# install Vercel CLI if needed
npm i -g vercel

# log in (interactive) or use `VERCEL_TOKEN` env var for non-interactive auth
vercel login

# run the interactive deploy from project root
vercel

# to deploy directly to production
vercel --prod
```

Automatic deploy via GitHub:

- Go to https://vercel.com and import the GitHub repository `superbhel7-ship-it/brightkez`.
- For a static site no build command is required; Vercel will use the files in the repository root.

If you want me to run the deploy from this environment, I can do that — either interactively (I will open a browser for `vercel login`) or non-interactively if you provide a `VERCEL_TOKEN`. Which do you prefer?