# Ritu Tourist Taxi Service — website

## Latest update
- Added a third vehicle option: **XUV / Innova Crysta** (form, fleet section, email and WhatsApp message).
- The booking date is now a **From Date** and **To Date** range instead of one date.
- **⚠️ If you already set up your EmailJS template:** open it and replace the `{{date}}` row with `{{from_date}}` and `{{to_date}}` — otherwise trip dates won't show in the email. The updated template is in `emailjs-template.txt`.
- Car Fleet cards now use original illustrated vehicle art (not stock photos — see note below) with a "Popular" / "Premium" badge and a subtle shine animation.
- Booking button shows an animated car driving along a road while sending; the confirmation popup has a short confetti burst.
- Contact section got a live-status badge and soft background accents.
- Footer columns are now evenly spaced with a consistent color, plus the proprietor's name in the copyright line.


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
The Car Fleet section uses original drawn vehicle illustrations, not photos — a real,
specific model's photo can't be reused without the rights holder's permission, so these
are safe to publish. To use real photos of your own cars instead: put a `.jpg` in
`client/src/assets/`, import it in `client/src/App.jsx`, and swap `<car.Art />` for
`<img src={yourPhoto} className="fleet-illustration" alt={car.name} />` for that entry.

## Before you go live
- The **customer reviews** in `client/src/App.jsx` (`TESTIMONIALS`) are sample text (one even names another company). Replace them with real reviews or delete the section.
- Check the numbers on the page (5000+ customers, 8+ years, 50+ cars) are true for your business.
- The Privacy Policy / Terms / Cancellation links in the footer don't lead anywhere yet.
