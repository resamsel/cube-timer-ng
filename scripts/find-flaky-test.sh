#!/bin/bash

SOURCE_DIR=../src
LOG_FILE=../tmp/flaky-test.log
MAX_ITERATIONS=8

run_test() {
  npm run test:headless > /dev/null 2>&1
  CODE=$?
  echo "$line,$CODE" >> "${LOG_FILE}"
  return ${CODE}
}

print_result() {
  [ "$1" = "0" ] && echo "OK" || echo "FAILED"
}

mkdir -p $(dirname "${LOG_FILE}")
rm -f "${LOG_FILE}"
touch "${LOG_FILE}"

find "${SOURCE_DIR}" -name "*.spec.ts" | while read line; do
  echo
  echo "*****************************************"
  echo "* Trying ${line}..."
  echo "*"

  mv "${line}" "${line}.off"

  ITERATION=1
  echo -n "* Iteration #${ITERATION}... "
  run_test
  CODE=$?
  print_result "${CODE}"

  while [ "$CODE" = "0" -a "$ITERATION" -lt "$MAX_ITERATIONS" ]; do
    (( ITERATION++ ))
    echo -n "* Iteration #${ITERATION}... "
    run_test
    CODE=$?
    print_result "${CODE}"
  done

  mv "${line}.off" "${line}"

  echo "*"
  if [ "$ITERATION" = "$MAX_ITERATIONS" ]; then
    echo "* Most probably FLAKY (disabling led to $MAX_ITERATIONS successful test runs)"
  else
    echo "* Most probably OK (disabling still fails the tests)"
  fi

  echo "*****************************************"
done
