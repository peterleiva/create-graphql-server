#!/usr/bin/env sh
##
# Upgrade node related packages related to node binary.
# Node upgrade must be done separately, due to many installation methods. It
# uses node binary version in PATH to get the LTS version, which is always even
# numbered, to be used by @tsconfig/nodeX package
#

$(dirname $0)/verify-commands.sh node npm

major_version=$(node -v | sed -E 's/^v([0-9]+)(\.[0-9]+){2}$/\1/')
lts=$major_version

# get the latest LTS version
if [ $(($major_version % 2)) = 1 ]; then lts=$(($major_version - 1)); fi

# upgrade typescript type definition only if typescript is installed
if npm ls --depth=0 typescript &>/dev/null; then
	echo "Upgrading typescript related packages"
	npm install --save-dev @types/node@latest @tsconfig/node$lts@latest \
		typescript@latest \
		@typescript-eslint/eslint-plugin@latest \
		@typescript-eslint/parser@latest \
		ts-jest@latest ts-loader@latest \
		@types/core-js@latest
fi

echo "Upgrading Language packages"
npm install --save-dev core-js@latest
