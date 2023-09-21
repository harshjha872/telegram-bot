FROM node:16
 
WORKDIR /usr/src/app
 
COPY package.json ./
COPY package-lock.json ./
 
# Copy the docs package.json
COPY apps/api/package.json ./apps/api/package.json
 
RUN npm install
 
# Copy app source
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "run", "start" ]
