# Ritu Tourist Taxi Service — website

## Latest update
- **Light/dark mode** — a toggle switch in the top bar (always visible, desktop and mobile) flips the whole site between light and dark. The choice is remembered on the visitor's device for their next visit.
- Third vehicle option is now simply **Innova Crysta** (dropped the Mahindra XUV700 photo and naming) with a real photo in the fleet card, form, and WhatsApp/email messages.
- The About text in the footer is now three short sentences instead of four paragraphs.
- "Delhi" was changed to "Delhi NCR" throughout the site's copy (hero, badges, counters, headings) to match your actual service area.
- **Mobile navigation** — added a hamburger menu; previously the nav links just disappeared below 900px with no way to open them. Also fixed a bug where tapping a link in that menu could land you one section short of where you tapped.
- Full responsive pass: tested at 360–1440px wide with zero horizontal-scroll bugs, tighter spacing on small phones, and the booking form's date fields stack to one-per-row on narrow screens instead of being cramped side by side.
- The booking date is a **From Date** / **To Date** range. Car Fleet cards have a "Popular"/"Premium" badge. Booking button shows a car-driving-along-a-road animation while sending; the confirmation popup has a short confetti burst. Footer columns are evenly spaced with the proprietor's name in the copyright line.
- **⚠️ If you already set up your EmailJS template:** it needs `{{from_date}}` and `{{to_date}}` instead of `{{date}}` — see `emailjs-template.txt`.


React (Vite) website in `client/`, small Express API in `server/` (optional).

## What the booking form does
When a customer taps **Book & Send on WhatsApp**:
1. **Email** — the details are emailed to `ritu.tourist.taxi@gmail.com` (via EmailJS, see step 1 below).
2. **WhatsApp** — a chat with **+91 75684 89188** opens with the details already typed in.
   The customer must tap **Send** in WhatsApp. (WhatsApp does not allow a website to send a message by itself.)
3. **Server copy (optional)** — only if you set `VITE_API_URL`. By default nothing is stored anywhere except your inbox and WhatsApp.

All business details (phone, WhatsApp, email, Instagram) are in **`client/src/config.js`**.

---

## 1. Turn on email (one-time, free)
1. Sign up at https://www.emailjs.com and log in.
2. **Email Services → Add New Service → Gmail** → connect `ritu.tourist.taxi@gmail.com`. Copy the **Service ID**.
3. **Email Templates → Create New Template**. Copy the settings and HTML from `emailjs-template.txt`. Copy the **Template ID**.
4. **Account → General** → copy your **Public Key**.
5. In **Vercel → your project → Settings → Environment Variables** add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   Then **Redeploy** (env vars only apply to new builds).
6. In EmailJS **Account → Security**, use the options there to limit who can use your key (allowed domain / reCAPTCHA, if offered on your plan).
7. Test with a real booking and check the inbox (and spam folder the first time).

Until step 5 is done, the form still works — it just sends WhatsApp only.

## 2. Secure the server (Render)
In **Render → your service → Environment** add:
- `ADMIN_TOKEN` — a long random secret. Create one with:
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `ALLOWED_ORIGINS` — `https://ritutourist.vercel.app` (no trailing slash)

Then redeploy the service with this code. **Until you do, the old public bookings list is still online.**

To read saved bookings (only you can, because only you know the token):
```
curl -H "x-admin-token: YOUR_TOKEN" https://ritutourist.onrender.com/api/bookings
```
Render's free plan can erase files when the service restarts, so treat saved bookings as a backup — your email and WhatsApp are the real record. If you don't want the server at all, leave `VITE_API_URL` unset (and you can delete the Render service).

## 3. Put this code on GitHub
Copy these files over your local repo folder, delete the old root `index.html`, then:
```
git rm -r -q --cached client/node_modules server/node_modules server/data/bookings.json
git add -A
git commit -m "New logo, contact details, secure booking form"
git push
```
(`.gitignore` now stops `node_modules`, `.env` files and `bookings.json` from being committed again.)
Vercel settings: **Root Directory = `client`**. Render settings: **Root Directory = `server`**, start command `npm start`.

## What is protected
- Bookings list needs the secret `ADMIN_TOKEN` (locked for everyone if the token isn't set).
- Rate limits, spam-trap field, size limits and input checks on the booking API.
- CORS allows only your website; security headers on both Vercel (`client/vercel.json`) and Render (helmet).
- No customer data is echoed back by the API or committed to Git.
- Turn on **2-step verification** for GitHub, Vercel, Render, EmailJS and Gmail — stolen logins are the most common way small sites lose data.

## About the car images
The Car Fleet section currently uses photos that were supplied for this project (not
taken by you) — they look like official manufacturer/dealer marketing photography
(Maruti Suzuki, Toyota). Those companies own the rights to that photography, and using
it on a commercial site without a license carries some copyright risk — likely small for
a local business site, but real. We are not lawyers, so we can't tell you exactly how
much risk that is for your situation. The safest long-term option is to swap in your own
photos of your actual vehicles.

To replace a car photo: put a `.jpg` in `client/src/assets/fleet/`, import it near the
top of `client/src/App.jsx` (e.g. `import myPhoto from './assets/fleet/myphoto.jpg';`),
and use it as that entry's `photo` value in the `FLEET` array.

## About the theme toggle
The switch in the top bar sets `data-theme="dark"` or `"light"` on the page and saves the
choice in the visitor's browser (`localStorage`), so it stays the way they left it next
visit. It also respects a first-time visitor's OS-level dark mode preference. All colors
are CSS variables in `client/src/index.css` (`--bg`, `--surface`, `--surface-alt`,
`--text`, `--text-muted`, `--border`) — adjust the dark values under
`:root[data-theme="dark"]` near the top of that file if you want a different look.

## Before you go live
- The **customer reviews** in `client/src/App.jsx` (`TESTIMONIALS`) are sample text (one even names another company). Replace them with real reviews or delete the section.
- Check the numbers on the page (5000+ customers, 8+ years, 50+ cars) are true for your business.
- The Privacy Policy / Terms / Cancellation links in the footer don't lead anywhere yet.
