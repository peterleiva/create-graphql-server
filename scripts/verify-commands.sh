#!/usr/bin/env sh

failed=FALSE

for script; do
	if ! type $script &>/dev/null; then
		failed=TRUE
		echo "Please install '$script' to proceed"
	fi
done

if [ failed = TRUE ]; then exit 1; fi
