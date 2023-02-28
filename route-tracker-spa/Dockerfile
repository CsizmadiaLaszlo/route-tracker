FROM node
WORKDIR /usr/src/app
COPY ./route-tracker-spa/package.json .
RUN npm i
COPY ./route-tracker-spa/ .
EXPOSE 3000
CMD ["npm", "run", "preview"]