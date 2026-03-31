# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2: Serve
FROM nginx:alpine

# ✅ FIX: copy nginx config here
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ✅ Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]