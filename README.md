# vrchat.network

## Setup

### CORS proxy

Since the vrc api does not allow cross-origin request, you'll need a cors proxy to handle the api requests.

An example nginx config would be

```
    location / {
       if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
         }

        proxy_pass https://vrchat.com;
        add_header 'Access-Control-Allow-Methods' 'GET, HEAD, POST, PUT, OPTIONS';
        add_header 'Access-Control-Allow-Origin' '*';

        proxy_set_header Host vrchat.com;
    }

```

You'll need to configure the url of the proxy in `src/App.tsx` by setting the `crossHandler`

### Building

Run `npm run build`
