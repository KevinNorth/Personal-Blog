FROM ubuntu/postgres:14-22.04_beta

# Install RVM
# Borrowed from https://github.com/ms-ati/docker-rvm/blob/master/Dockerfile
# RUN sed -i 's/^mesg n/tty -s \&\& mesg n/g' ~/.profile \
#     && sed -i 's~http://archive\(\.ubuntu\.com\)/ubuntu/~mirror://mirrors\1/mirrors.txt~g' /etc/apt/sources.list \
#     && export DEBIAN_FRONTEND=noninteractive \
RUN apt-get update -qq \
    && apt-get install -qy --no-install-recommends \
    ca-certificates \
    && apt-get install -qy --no-install-recommends \
    curl \
    dirmngr \
    git \
    gnupg2

RUN mkdir ~/.gnupg \
    && chmod 700 ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && gpg --keyserver keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB \
    && ( echo 409B6B1796C275462A1703113804BB82D39DC0E3:6: | gpg2 --import-ownertrust ) \
    && ( echo 7D2BAF1CF37B13E2069D6956105BD0E739499BDB:6: | gpg2 --import-ownertrust ) \
    && curl -sSL https://raw.githubusercontent.com/rvm/rvm/stable/binscripts/rvm-installer -o rvm-installer \
    && curl -sSL https://raw.githubusercontent.com/rvm/rvm/stable/binscripts/rvm-installer.asc -o rvm-installer.asc \
    && gpg2 --verify rvm-installer.asc rvm-installer \
    && bash rvm-installer \
    && rm rvm-installer

SHELL [ "/bin/bash", "-l", "-c" ]

# Install Ruby
RUN rvm get stable
RUN rvm install 3.2.2
RUN gem install bundler

# Install NVM and NodeJS
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && nvm install 20.8.0 \
    && nvm alias default 20.8.0 \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v20.8.0/lib/node_modules
ENV PATH      $NVM_DIR/v20.8.0/bin:$PATH

# Install Postgresql client
RUN apt-get install -qy postgresql-client

# Make sure Git doesn't mark all files as dirty when in the container
RUN git config --global core.autocrlf input
