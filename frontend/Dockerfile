FROM node:20

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Only build + install serve in production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build && npm install -g serve; fi

EXPOSE 5173

# Production CMD (Deployment only) – overridden in dev
CMD ["serve", "-s", "dist", "-l", "5173"]
