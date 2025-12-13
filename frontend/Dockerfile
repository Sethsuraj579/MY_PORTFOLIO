FROM nginx:alpine AS build-env 
COPY . /app
WORKDIR /app
RUN npm ci

FROM nginx:alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM nginx:alpine AS development-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci

FROM nginx:alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]