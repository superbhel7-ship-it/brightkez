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