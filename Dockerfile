# -----------------------------------------------------------------------------
# Runtime image only — CI must produce ./dist before `docker build`.
# Boundary: Vite compile (GitHub Actions) | static serve (this image).
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="websolsoffttech-web" \
      org.opencontainers.image.description="Websolsoffttech marketing site — nginx static" \
      org.opencontainers.image.vendor="homelab"

RUN apk add --no-cache curl

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

# Fail fast if CI did not produce a valid Vite build
RUN test -f /usr/share/nginx/html/index.html \
    && test -d /usr/share/nginx/html/assets \
    && ! grep -qE 'src="/src/' /usr/share/nginx/html/index.html

RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 9100

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -fsS http://127.0.0.1:9100/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
