FROM node:18.18-alpine as builder

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder

COPY . ./

RUN npm i
