#!/usr/bin/env sh

##
# Docker script to build the application
#
#

usage() {
	echo "usage: $(basename $0) docker-commands"
	echo
}

$(dirname $0)/verify-commands.sh docker docker-compose

cd $(dirname $0)/../configs/docker

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
