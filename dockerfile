FROM node:8

# Create app directory
WORKDIR /Desktop/udemy/dialogflow/weather

COPY package.json package.json 

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]