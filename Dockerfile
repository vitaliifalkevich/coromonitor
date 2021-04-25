FROM node:15.8.0

WORKDIR /app
COPY . .

CMD ["npm", "start"]
