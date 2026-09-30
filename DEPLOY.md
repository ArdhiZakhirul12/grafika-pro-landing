# Deploy dengan PM2

Grafika Pro adalah SPA statis (Vue 3 + Vite + Vue Router). PM2 dipakai untuk menyajikan folder `dist/` dengan fallback SPA, lalu Nginx sebagai reverse proxy + SSL.

> Deploy via cPanel (upload `dist/` + `.htaccess`) ada di [DEPLOYMENT.md](DEPLOYMENT.md).

## 1. Prasyarat di VPS

Masuk ke VPS lalu siapkan paket dasar (contoh Ubuntu/Debian):

```bash
ssh root@<ip-vps>

sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl nginx
```

Install Node dan PM2:

```bash
# Node.js 20+ (contoh via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20

# PM2
npm install -g pm2
```

## 2. Download project ke VPS (git clone) & build

Kalau repo **private**, daftarkan SSH key VPS ke GitHub dulu:

```bash
ssh-keygen -t ed25519 -C "vps-grafika-pro"   # Enter terus
cat ~/.ssh/id_ed25519.pub
# Salin output -> GitHub repo > Settings > Deploy keys > Add deploy key (read-only)
ssh -T git@github.com                          # tes koneksi
```

Clone dan build:

```bash
sudo mkdir -p /var/www && sudo chown -R $USER:$USER /var/www
cd /var/www
git clone git@github.com:ChristYoga123/<nama-repo>.git grafika-pro-landing
# repo public: git clone https://github.com/ChristYoga123/<nama-repo>.git grafika-pro-landing
cd grafika-pro-landing

npm ci
npm run build        # vue-tsc + vite build -> dist/
```

## 3. Jalankan dengan PM2

File `ecosystem.config.cjs` sudah ada di root project (app `grafika-pro`, menyajikan `./dist` di port 3000 dengan mode SPA).

Lalu:

```bash
pm2 start ecosystem.config.cjs
pm2 save                 # simpan daftar proses
pm2 startup              # jalankan perintah yang dicetak agar PM2 auto-start saat reboot
```

Alternatif satu baris tanpa file config:

```bash
pm2 serve dist 3000 --spa --name grafika-pro
```

Cek: `curl -I http://127.0.0.1:3000/` dan buka salah satu route (mis. `/faq`) — harus 200, bukan 404.

## 4. Nginx reverse proxy + SSL

`/etc/nginx/sites-available/grafika-pro`:

```nginx
server {
    listen 80;
    server_name grafikapro.example.com;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/grafika-pro /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d grafikapro.example.com
```

## 5. Update / redeploy

```bash
cd /var/www/grafika-pro-landing
git pull
npm ci
npm run build
pm2 reload grafika-pro
```

## Perintah PM2 berguna

| Perintah | Fungsi |
| --- | --- |
| `pm2 ls` | Daftar proses |
| `pm2 logs grafika-pro` | Lihat log |
| `pm2 restart grafika-pro` | Restart |
| `pm2 stop grafika-pro` | Stop |
| `pm2 delete grafika-pro` | Hapus dari PM2 |
| `pm2 monit` | Monitor CPU/RAM |

## Catatan

- `node_modules/` dan `dist/` tidak di-commit — keduanya dibuat di server lewat `npm ci` dan `npm run build`.
- Ganti port `3000` jika sudah dipakai app lain, dan sesuaikan `proxy_pass` di Nginx.
- Jangan buka port 3000 ke publik; akses cukup lewat Nginx (80/443).
