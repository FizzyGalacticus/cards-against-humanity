# <--------------STAGE--------------> cah-be
FROM mhart/alpine-node:14 as cah-be

RUN addgroup -g 10001 -S cah && adduser -u 10000 -S -G cah -h /home/cah cah

RUN apk add --no-cache tini bind-tools

# Create App directory
RUN mkdir -p /var/app
RUN chown -R cah:cah /var/app
WORKDIR /var/app

RUN npm i -g yarn

COPY package.json yarn.lock /var/app/

USER cah

# <--------------STAGE--------------> BE Deployment
FROM cah-be as be-deployment

COPY app /var/app/app

RUN yarn install --production=true

ENTRYPOINT ["/sbin/tini", "--", "yarn"]

CMD ["start"]

# <--------------STAGE--------------> BE Development
FROM cah-be as be-development

USER root
RUN npm i -g nodemon
USER cah

COPY app /var/app/app

RUN yarn

CMD ["npm", "run", "dev"]
