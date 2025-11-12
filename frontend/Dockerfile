FROM nginx:1.27.3-alpine
COPY templates/default.conf.template /etc/nginx/templates/default.conf.template
COPY public/ /usr/share/nginx/html/
EXPOSE 80
