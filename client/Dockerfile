# Use a specific Node.js version
FROM node:21-alpine3.17

# Set the working directory
WORKDIR /app

# Copy only package.json to leverage caching
COPY package.json .

# Install dependencies
RUN npm install --loglevel=silly

# Remove the existing node_modules (if any)
RUN rm -rf node_modules

# Copy the rest of the files
COPY . .

# Create a non-root user
RUN adduser --disabled-password viteApp
USER viteApp

# Expose the port if needed
EXPOSE 5173
ENV PORT 5173

# Command to run the application
CMD ["npm", "run", "dev"]
