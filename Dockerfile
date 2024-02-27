#
# Ubuntu Dockerfile
#
# https://github.com/dockerfile/ubuntu
#

# Pull base image.
FROM ubuntu:20.04

# Install.
# RUN sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list &&
RUN \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y python3 pip && \
  # apt-get install -y software-properties-common && \
  apt-get install -y byobu curl git htop man unzip vim wget && \
  rm -rf /var/lib/apt/lists/*

# Set environment variables.
ENV HOME /home

# Define working directory.
WORKDIR /home

COPY . .

RUN pip3 install -r requirements.txt

EXPOSE 8080
# Define default command.
CMD ["python3", "main.py"]
# CMD ["sleep", "infinity"]
