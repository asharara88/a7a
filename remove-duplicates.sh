#!/bin/bash

echo "=== Removing duplicates ==="

# Function to keep the most recently modified file from duplicates
keep_newest() {
  local files=("$@")
  local newest=""
  local newest_time=0
  
  for file in "${files[@]}"; do
    if [ -f "$file" ]; then
      mod_time=$(stat -c %Y "$file" 2>/dev/null || stat -f %m "$file")
      if [ "$mod_time" -gt "$newest_time" ]; then
        newest_time=$mod_time
        newest=$file
      fi
    fi
  done
  
  echo "Keeping: $newest"
  for file in "${files[@]}"; do
    if [ "$file" != "$newest" ] && [ -f "$file" ]; then
      echo "Removing: $file"
      rm -f "$file"
    fi
  done
}

# Remove exact duplicates (keeping one)
echo "Removing exact file duplicates..."
find . -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "./node_modules/*" -not -path "./.git/*" \
  -exec md5sum {} + | sort | \
  awk '{if (files[$1]) {print $2} else {files[$1]=$2}}' | \
  while read dup_file; do
    echo "Removing duplicate: $dup_file"
    rm -f "$dup_file"
  done

# Clean up empty directories
find ./src -type d -empty -delete

echo "Duplicate cleanup complete!"
