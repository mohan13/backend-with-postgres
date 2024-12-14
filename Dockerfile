FROM node:20 

WORKDIR /backend

COPY package*.json .
RUN npm i 
COPY . .
EXPOSE 4000
CMD [ "npm","start" ]