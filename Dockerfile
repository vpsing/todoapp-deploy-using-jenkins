# =============================================
# Stage 1: BUILD
# Node.js se React app build karenge
# =============================================
FROM node:18-alpine AS builder

# Working directory set karo
WORKDIR /app

# pehle package files copy karo (cache optimization)
COPY package.json package-lock.json* ./

# Dependencies install karo
RUN npm install --frozen-lockfile

# Baaki sara code copy karo
COPY . .

# Production build banao
RUN npm run build

# =============================================
# Stage 2: PRODUCTION (Nginx)
# Sirf build files serve karenge - lightweight!
# =============================================
FROM nginx:alpine

# Custom nginx config copy karo (SPA routing ke liye)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# React build files copy karo
COPY --from=builder /app/build /usr/share/nginx/html

# Port expose karo
EXPOSE 80

# Nginx start karo
CMD ["nginx", "-g", "daemon off;"]
