# Version dependencies
FROM node

# Install app dependencies
COPY package*.json ./

# Create app directory
WORKDIR /usr/minidev-ext-i-fr

RUN npm install
#Bundle app source - COPY ALL FROM . TO WORKDIR
COPY . .

#ENV PUBLIC_NEXT_API_URL to http://172.28.0.1:4000/graphql
EXPOSE 3000 
CMD ["npm",  "run",  "dev"]

