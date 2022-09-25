server {
    listen 80;
    server_name dawnbreaker.app www.dawnbreaker.app;
    return 301 https://dawnbreaker.app$request_uri;
}

server {
    listen 443 ssl;
    server_name www.dawnbreaker.app;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate /etc/nginx/ssl/key.pem;

    # . . . other code
    location /{
      try_files $uri /index.html;
    }


}

