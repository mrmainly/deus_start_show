FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm i
#RUN yarn add vite
COPY . /app
ARG NODE_OPTIONS='--max-old-space-size=1345'
RUN npm run build
#RUN yarn build
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
