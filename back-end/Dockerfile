# Version dependencies
FROM node

# Install app dependencies
COPY package*.json ./

# Create app directory
WORKDIR /usr/minidev-ext-i-bk
COPY .env ./

RUN npm install
#Bundle app source - COPY ALL FROM . TO WORKDIR
COPY . .

# production environment
#RUN npm run build
# WORKDIR /usr/minidev-ext-i/dist
#CMD ["node", "start"]
# development environment
EXPOSE 4000 
CMD ["npm",  "run",  "dev"]

