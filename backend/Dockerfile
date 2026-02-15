FROM node:20-alpine

WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
