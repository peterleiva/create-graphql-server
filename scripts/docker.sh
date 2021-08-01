#!/usr/bin/env sh

##
# Docker script to build the application
#
#

usage() {
	echo "usage: $(basename $0) docker-commands"
	echo
}

##
# Validate required commands
#
verify_commands() {
	if ! type docker &>/dev/null; then
		echo "Install docker"
		exit 1
	fi

	if ! type docker-compose &>/dev/null; then
		echo "Install docker-compose"
		exit 1
	fi
}

verify_commands

cd $(realpath $(dirname $0)/../configs/docker)

environment=${NODE_ENV:-'development'}
configs=

case $environment in
prod | production)
	configs="-f docker-compose.yml -f production.yml"
	;;

test)
	configs="-f docker-compose.yml -f docker-compose.override.yml -f test.yml"

	set exec web
	;;

\?)
	usage
	;;
esac

docker-compose $configs "$@"

exit 1
