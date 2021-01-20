# <--------------STAGE--------------> cah-fe
FROM mhart/alpine-node:14 as cah-fe

RUN addgroup -g 10001 -S cah && adduser -u 10000 -S -G cah -h /home/cah cah

RUN apk add --no-cache tini bind-tools

# Create App directory
RUN mkdir -p /var/app
RUN chown -R cah:cah /var/app
WORKDIR /var/app

RUN npm i -g yarn

COPY package.json yarn.lock /var/app/

USER cah

# <--------------STAGE--------------> FE Development
FROM cah-fe as fe-development

RUN yarn

ENTRYPOINT ["/sbin/tini", "--", "yarn"]

CMD ["dev"]
