# Heading 1

## Heading 2

### Heading 3

**bold text**
_italic text_

- Bullet list
- Another item

1. Numbered list
2. Next item

`inline code`

```bash
code block
```

# Steps to start server along with worker

```bash
npm run dev
npm run worker:dev
```

_above commands should run separate command prompt in parallel_

---

# Redis Installation Guide (WSL + Ubuntu)

This guide explains how to install and run Redis using WSL (Windows Subsystem for Linux) with Ubuntu.

---

## Step 1 — Install WSL

Open PowerShell as Administrator and run:

```bash
wsl --install
```

Restart your system if prompted.

---

## Step 2 — Open Ubuntu & Update Packages

Launch Ubuntu from the Start Menu and run:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Step 3 — Install Redis

```bash
sudo apt install redis-server -y
```

---

## Step 4 — Start Redis Server

```bash
sudo service redis-server start
```

---

## Step 5 — Verify Redis Installation

```bash
redis-cli ping
```

Expected output:

```
PONG
```

🔥 Redis is now running successfully.

---

## Optional — Enable Redis Auto Start

```bash
sudo update-rc.d redis-server defaults
```

---

## Useful Commands

Restart Redis:

```bash
sudo service redis-server restart
```

Check status:

```bash
sudo service redis-server status
```

Stop Redis:

```bash
sudo service redis-server stop
```

---

## Notes

- Redis config file: `/etc/redis/redis.conf`
- Default port: `6379`
