FROM  mcr.microsoft.com/playwright:v1.40.1-jammy
WORKDIR /tests
COPY  .  . 

RUN ["npm", "install", "-g", "npm@10.4.0"]

CMD ["npx", "playwright", "test"]