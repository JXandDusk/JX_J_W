# Xander Personal Site

A lightweight static personal website designed for long-term growth.

## Sections
- Knowledge
- Thoughts
- Exploration
- Archive

## Local preview
Open `index.html` in your browser.

## Add images later
Put photos in:
`assets/images/`

Example:
`assets/images/hiking/mount-tallac-01.jpg`

Then reference the image in HTML:
```html
<img src="../assets/images/hiking/mount-tallac-01.jpg" alt="Mount Tallac">
```

## GitHub setup
1. Create a new GitHub repository, for example `xander-personal-site`
2. Upload all files from this folder
3. Commit them to the `main` branch

## Netlify setup
1. Sign in to Netlify
2. Choose **Add new site → Import an existing project**
3. Connect GitHub
4. Select your repository
5. Build command: leave blank
6. Publish directory: `.`
7. Deploy

After that, every push to GitHub will automatically update the live website.

## Suggested next folders
You can expand the project like this:

assets/images/
- university/
- hiking/
- travel/
- work/
- thoughts/

pages/
- knowledge-*.html
- thoughts-*.html
- exploration-*.html
