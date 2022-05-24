# we tell Docker to include in our image all the functionality from the node image.
FROM node

# Path default for all subsequent commands
WORKDIR /usr/minidev-ext-i-bk

# For Install app dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# The COPY command takes all the files located in the current directory and copies them into the image. (TO WORKDIR)
COPY . .

EXPOSE 4000 

# For Developent environment - We tell Docker what command we want to run when our image runs inside a container.
CMD ["npm",  "run",  "dev"]

# For production environment
#   RUN npm run build
#   WORKDIR /usr/minidev-ext-i/dist
#   CMD ["node", "start"]


