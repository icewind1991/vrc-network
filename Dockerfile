FROM fholzer/nginx-brotli:v1.10.3

ADD ./nginx.conf /etc/nginx/nginx.conf
ADD ./build /usr/share/nginx/html/

CMD ["nginx"]
