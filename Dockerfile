ARG NODE_VERSION=alpine
FROM node:${NODE_VERSION}

ENV USER "node"
ENV LOG_LEVEL "info"
ENV PORT 7000

# Define node user which is the app's runner
USER $USER

# setup application folders
WORKDIR /home/$USER/app
COPY --chown=$USER:$USER . .
RUN npm ci

EXPOSE $PORT

CMD ["npm", "start"]