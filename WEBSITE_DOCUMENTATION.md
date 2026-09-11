# KTM 390 Adventure Website

## Overview

This project is a KTM-inspired promotional website for the KTM 390 Adventure and KTM 390 Duke. It uses HTML, CSS, JavaScript, Vue 3, external media, local KTM image assets, and an optional PHP backend.

This is a promotional concept website and is not an official KTM website.

## Main Pages

- `index.html` - Homepage with hero section, KTM Duke hero image, product navigation, media gallery, performance content, specifications, contact form, and test-ride modal.
- `performance.html` - Performance-focused product information.
- `technology.html` - Technology and rider-assistance information.
- `experience.html` - Adventure and riding-experience information.
- `specs.html` - KTM 390 Adventure specifications.
- `duke-390.html` - KTM 390 Duke product page.

## Frontend Files

- `style.css` - Shared responsive styling, hero layout, animation, cards, media gallery, and page layouts.
- `script.js` - Vue homepage behavior, form submission, API integration, loader, navigation state, and test-ride logic.
- `bike 2_files/ktm-pdp-desktop-duke390.webp` - Local KTM Duke image used in the homepage hero.
- `bike 2_files/` - Local KTM image assets collected for the product presentation.

## Homepage Hero

The homepage hero contains:

- KTM 390 Adventure headline and performance metrics.
- KTM Duke image positioned on the right side.
- Floating image animation, slow zoom, and light-sweep animation.
- Link to the official KTM 390 Duke showroom page.
- Test-ride and performance navigation buttons.

The hero image is loaded locally with this path:

```html
<img src="bike%202_files/ktm-pdp-desktop-duke390.webp" alt="KTM 390 Duke motorcycle">
```

## Media Section

The homepage includes:

- Local KTM product imagery in the hero.
- Real motorcycle photos from Unsplash.
- A cinematic motorcycle video from Pexels.
- Responsive media cards with image and video controls.

Internet access is required for the remote Unsplash and Pexels media.

## Backend

The backend is located at:

```text
backend-package/ktm390_backend/
```

It uses PHP and JSON files instead of MySQL.

### API Endpoints

| Endpoint | Method | Purpose |
|---|---:|---|
| `api/health.php` | GET | Checks whether the backend is running. |
| `api/contact.php` | POST | Stores contact/enquiry submissions. |
| `api/test-ride.php` | POST | Stores test-ride requests. |
| `api/newsletter.php` | POST | Stores newsletter subscriptions. |
| `api/specs.php` | GET | Returns KTM 390 Adventure specifications. |

Submitted records are stored in:

```text
backend-package/ktm390_backend/data/contacts.json
backend-package/ktm390_backend/data/test_rides.json
backend-package/ktm390_backend/data/subscribers.json
```

## Run Locally With PHP

PHP is required.

From the project folder, run:

```powershell
Push-Location '.\backend-package\ktm390_backend'
php -S localhost:8080
```

The backend will be available at:

```text
http://localhost:8080
```

Test the backend:

```text
http://localhost:8080/api/health.php
```

Then open `index.html` in a browser. When the frontend is opened with `file://`, it uses:

```text
http://localhost:8080/api/
```

## Run With XAMPP

1. Copy `backend-package/ktm390_backend` into `C:\xampp\htdocs\`.
2. Start Apache in XAMPP.
3. Open the backend at:

```text
http://localhost/ktm390_backend/
```

4. Open the frontend through the XAMPP web root or configure the frontend API base URL.

For HTTP-hosted frontend pages, the default API path is:

```text
/ktm390_backend/api/
```

You can override the API URL before loading `script.js` with:

```html
<script>
    window.KTM_API_BASE = "http://localhost:8080/api/";
</script>
<script src="script.js"></script>
```

## Forms

### Contact Form

The homepage sends contact data to `api/contact.php`:

- `name`
- `email`
- `phone`
- `message`

### Test Ride Form

The homepage sends test-ride data to `api/test-ride.php`:

- `name`
- `email`
- `phone`
- `city`
- `date`
- `preferred_time`

The frontend only displays a success message when the API returns `success: true`.

## Admin Dashboard

The backend includes an admin area:

```text
http://localhost:8080/admin/
```

The default credentials are defined in:

```text
backend-package/ktm390_backend/config/config.php
```

Change the default password before deployment. Do not use the included default credentials on a public server.

## Validation

Useful checks:

```powershell
php -l .\backend-package\ktm390_backend\api\contact.php
php -l .\backend-package\ktm390_backend\api\test-ride.php
```

The frontend can be checked by opening `index.html` and confirming:

- The homepage loads after the loader finishes.
- The hero image appears on the right.
- The Duke showroom links open.
- The contact form and test-ride form submit through the PHP API.
- The secondary pages load without Vue errors.

## Deployment Notes

Before production deployment:

- Use HTTPS.
- Replace JSON storage with a database.
- Change the admin password.
- Hash admin passwords.
- Add CSRF protection and rate limiting.
- Restrict direct access to the `data` directory.
- Move secrets and configuration into environment variables.
- Confirm that all image and video assets are properly licensed for the intended use.
