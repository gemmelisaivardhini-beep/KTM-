# KTM 390 Adventure PHP Backend

This backend is designed for the KTM 390 Adventure promotional frontend.

## Included

- PHP REST-style endpoints
- Contact form
- Test ride booking
- Newsletter subscription
- KTM 390 Adventure specification API
- Health check API
- Admin login/logout
- Admin dashboard
- JSON-file storage (no MySQL required)

## Folder structure

```text
ktm390_backend/
├── admin/
│   ├── dashboard.php
│   ├── index.html
│   ├── login.php
│   └── logout.php
├── api/
│   ├── contact.php
│   ├── health.php
│   ├── newsletter.php
│   ├── specs.php
│   └── test-ride.php
├── config/
│   ├── config.php
│   └── cors.php
├── data/
│   ├── contacts.json
│   ├── subscribers.json
│   ├── test_rides.json
│   └── .htaccess
└── README.md
```

## Run with XAMPP

1. Install XAMPP.
2. Start Apache.
3. Copy `ktm390_backend` into:
   `C:\xampp\htdocs\`
4. Your backend URL becomes:
   `http://localhost/ktm390_backend/`
5. Test:
   `http://localhost/ktm390_backend/api/health.php`
6. Open admin:
   `http://localhost/ktm390_backend/admin/`

Default admin:
- Username: `admin`
- Password: `admin123`

**Change the password in `config/config.php` before putting this online.**

## Connect your frontend

If your frontend runs through XAMPP, use:

```js
const API_BASE = "http://localhost/ktm390_backend/api/";
```

### Contact form

```js
fetch(API_BASE + "contact.php", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    name: form.name,
    email: form.email,
    phone: form.phone,
    message: form.message
  })
})
.then(r => r.json())
.then(data => alert(data.message));
```

### Test ride

```js
fetch(API_BASE + "test-ride.php", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    name: ride.name,
    email: ride.email,
    phone: ride.phone,
    city: ride.city,
    date: ride.date,
    preferred_time: ride.preferred_time
  })
})
.then(r => r.json())
.then(data => alert(data.message));
```

### Newsletter

```js
fetch(API_BASE + "newsletter.php", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({email: email})
})
.then(r => r.json())
.then(data => alert(data.message));
```

### Specifications

```js
fetch(API_BASE + "specs.php")
  .then(r => r.json())
  .then(data => console.log(data.data));
```

## Important

This version uses JSON files instead of MySQL, so it is easy to learn and run locally.

For a real production website, use:
- HTTPS
- a real database
- hashed admin passwords
- CSRF protection
- rate limiting
- server-side authentication/authorization
- restricted data-directory access
- environment variables for secrets
