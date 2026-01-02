#!/bin/bash

dirs=("resources/js/core" "resources/css/core")

result=()

for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        while IFS= read -r -d '' file; do
            subdir="$(dirname "${file#$dir/}")"
            result+=("\"$file\"",)
        done < <(find "$dir" -type f -print0)
    fi
done

for entry in "${result[@]}"; do
    echo "$entry"
done