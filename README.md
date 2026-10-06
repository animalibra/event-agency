# Only You Would

A static English-language site for a founder-led personal events and journeys agency in Spain. The design combines the bold second visual direction with **The Spark → The Twist → The Story** from the third.

## Run locally

No build step or dependencies are required. Start the included local server:

```bash
npm run dev
```

Open `http://127.0.0.1:4173`.

## Before publishing

1. Confirm the public contact email and founder name in `index.html` and `script.js`.
2. The images in `assets/` are generated editorial concepts, not past client work. Replace them with your own photographs whenever you have suitable images and permission from the people pictured.
3. Review the English copy, business scope and service commitments with the founder.
4. Check the chosen name, domain and relevant trademarks in Spain/EU before launch.

## Publish with GitHub Pages

1. Create a GitHub repository and push these files to its default branch.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select the default branch and **/(root)**, then save.

The site uses relative asset paths and works at either a user domain or a repository subpath. `.nojekyll` keeps the static files served as-is. There is no backend or tracking script. The Bricolage Grotesque and Anton fonts are loaded from Google Fonts; system fallbacks are used when offline.

## Interaction

Click or keyboard-activate the photograph in the first section to reveal the next candid frame with a brief flash **inside the photograph**. It also cycles through five frames automatically while visible. All photographs in the later sections are static, with distinct scenes and a wider range of ages. Automatic motion and the flash stop when the visitor requests reduced motion.

**Start a Conversation** opens the built-in Idea Desk. Visitors can type freely or use an optional starter. The guided replies run in the browser with no account, API key or server. After the first message, visitors can open a prewritten email to Natalia or copy their idea. Nothing is submitted or stored by the site; the visitor must send the email from their own mail app. The mobile menu supports keyboard activation and Escape to close.
