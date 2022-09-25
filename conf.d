server {
    listen 80;
    listen 443 ssl;
    server_name www.dawnbreaker.app;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # . . . other code
    location /{
      root /usr/share/nginx/html/;
      index index.html;
      try_files $uri /index.html;
    }


}

