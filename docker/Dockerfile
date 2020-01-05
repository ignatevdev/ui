FROM node:alpine AS builder
# Copy package and lock files for better caching 
COPY package.json package.json
COPY yarn.lock yarn.lock
# Install dependencies
RUN yarn
# Copy rest of the files
COPY . .
# Build styleguidist
RUN yarn docs
RUN ls

FROM nginx
# Copy needed files
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder docs /usr/share/nginx/html


