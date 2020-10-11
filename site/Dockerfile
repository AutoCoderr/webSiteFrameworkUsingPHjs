FROM node:14

WORKDIR /frameworkDev

RUN npm install -g sequelize mysql2
RUN apt-get install git -y

EXPOSE 5001
CMD ["sh", "installAndRun.sh"]
