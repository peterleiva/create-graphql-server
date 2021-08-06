#!/usr/bin/env sh

##
# Build in the specific environment and start the application if necessary
#

usage() {
	option() {
		printf "%5.2s%10s%-s %s\n" "$1" " " "$2" "$3"
	}

	echo "usage: $(basename "$0") [options] [...presets]"
	echo
	echo "Options"
	option '-w' 'watch mode'
	option '-e' 'environment' '("production"|"development") (default "production")'
	option '-h' 'print this message'
}

##
# Return basepath where webpack store its environment configurations
# TODO: check other prefixes or basepath
#
webpack_env() {
	basepath=configs/webpack/env
	prefix=webpack
	path="$(dirname $0)/../$basepath"

	[ $# -gt 0 ] && path="$path/$prefix.$1.js"

	echo $path
}

##
# Check if exists the webpack environment file
#
check_environment() {
	[ -e "$(webpack_env $1)" ] && return 0

	return 1
}

verify_fallback() {
	check_environment $fallback

	if [ $? -ne 0 ]; then
		echo "Before proceed configure webpack production file. At \c"
		webpack_env $fallback
		exit 1
	fi
}

verify_required_commands() {
	if ! type npm &>/dev/null; then
		echo "npm command not found" >&2
		exit 2
	fi

	if ! type webpack &>/dev/null; then
		echo "webpack command not found. Please install webpack first
		running npm run install" >&2
		exit 2
	fi
}

verify_environment() {
	check_environment "$environment"

	if [ $? -ne 0 ]; then
		echo "$(webpack_env $environment) not found" >&2
		fallback=production

		echo "Using $fallback as a fallback"
		environment=$fallback $0 "$@"
		exit 0
	fi
}

# set root path of the application as current directory
PATH="$(pwd)/node_modules/.bin:$PATH:$(dirname $0)"
cd $(dirname $0)/..

presets=
fallback=production
: ${environment:=${NODE_ENV:-$fallback}}
watch=

verify_fallback
verify_required_commands

while getopts hwe: option; do
	case $option in
	w)
		watch='--watch'
		;;
	e)
		environment="$OPTARG"
		;;
	h)
		usage
		exit 0
		;;
	\?)
		usage
		exit 3
		;;
	esac
done

shift $(($OPTIND - 1))

verify_environment "$@"

printf "%-18s%-42s\n" "👤 presets:" "$*"
printf "%-18s%-42s\n" "📦 environment:" $environment

for preset; do
	presets="$presets presets.$preset"
done

eval webpack -- $watch --env mode=$environment $presets
