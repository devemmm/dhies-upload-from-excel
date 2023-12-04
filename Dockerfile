FROM node:16.16.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# tzdata for timzone
RUN apt-get update -y
RUN apt-get install -y tzdata
 
# timezone env with default
ENV TZ=Africa/Kigali

RUN npm install
RUN npm build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3003
CMD [ "node", "./dist/src/script.js" ]