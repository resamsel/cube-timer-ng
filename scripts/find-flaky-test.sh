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
  [[ "$1" = "0" ]] && echo "OK" || echo "FAILED"
}

mkdir -p $(dirname "${LOG_FILE}")
rm -f "${LOG_FILE}"
touch "${LOG_FILE}"

echo "Find flaky test by testing the project while disabling one test at a time"
echo

find "${SOURCE_DIR}" -name "*.spec.ts" | while read line; do
  echo -n "Trying $(basename "${line}") ($(dirname "${line}")): "

  mv "${line}" "${line}.off"

  ITERATION=1
  echo -n "."
  run_test
  CODE=$?

  while [[ "$CODE" = "0" && "$ITERATION" -lt "$MAX_ITERATIONS" ]]; do
    (( ITERATION++ ))
    echo -n "."
    run_test
    CODE=$?
  done

  mv "${line}.off" "${line}"

  echo
  if [[ "$ITERATION" = "$MAX_ITERATIONS" ]]; then
    echo -e "\tFLAKY (tests did not fail in $MAX_ITERATIONS iterations)"

  else
    echo -e "\tNOT FLAKY (tests failed on iteration $ITERATION)"
  fi
done
