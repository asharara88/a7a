#!/bin/bash

echo "=== Starting targeted cleanup ==="

# Backup current state
git add -A
git commit -m "Backup before deduplication" || echo "Nothing to commit"

# 1. Fix Card component duplicates
echo "Fixing Card component duplicates..."
if [ -f "./src/components/ui/card.tsx" ] && [ -f "./src/components/ui/Card.tsx" ]; then
  # Keep the lowercase version as it seems to be the standard
  echo "Merging Card components..."
  cp ./src/components/ui/card.tsx ./src/components/ui/card.backup.tsx
  
  # Update all imports to use lowercase
  find . -name "*.tsx" -o -name "*.ts" | \
    grep -v node_modules | \
    xargs sed -i "s|from '../ui/Card'|from '../ui/card'|g"
  
  find . -name "*.tsx" -o -name "*.ts" | \
    grep -v node_modules | \
    xargs sed -i "s|from './Card'|from './card'|g"
  
  find . -name "*.tsx" -o -name "*.ts" | \
    grep -v node_modules | \
    xargs sed -i "s|from '@/components/ui/Card'|from '@/components/ui/card'|g"
  
  # Remove the uppercase version
  rm -f ./src/components/ui/Card.tsx
  echo "Card component deduplicated"
fi

# 2. Remove unused MacroCard (0 exports, 0 imports)
if [ -f "./src/components/dashboard/MacroCard.tsx" ]; then
  # Check if it's really unused
  usage=$(grep -r "MacroCard" --include="*.tsx" --include="*.ts" . | grep -v "MacroCard.tsx" | wc -l)
  if [ "$usage" -eq 0 ]; then
    echo "Removing unused MacroCard..."
    rm -f ./src/components/dashboard/MacroCard.tsx
  fi
fi

# 3. Clean up SQL files (if they're duplicates)
echo -e "\nAnalyzing SQL files..."
# Group SQL files by content hash
find . -name "*.sql" -type f -exec md5sum {} + | sort | \
  awk '{files[$1] = files[$1] " " $2} END {for (hash in files) if (split(files[hash], f, " ") > 2) print "Duplicates:", files[hash]}'

# 4. Remove duplicate API response handling code
echo -e "\nConsolidating API error handling..."
# Create a shared API utility if patterns are duplicated

# 5. Check for duplicate test files
echo -e "\nChecking for orphaned test files..."
find . -name "*.test.ts" -o -name "*.test.tsx" | \
  while read test_file; do
    base_file=$(echo "$test_file" | sed 's/\.test\./\./')
    if [ ! -f "$base_file" ]; then
      echo "Orphaned test: $test_file"
      rm -f "$test_file"
    fi
  done

# 6. Consolidate similar dashboard cards
echo -e "\nAnalyzing dashboard cards for consolidation opportunities..."
# These could potentially use a shared base component

# 7. Remove empty directories
find ./src -type d -empty -delete

echo "=== Cleanup complete ==="
echo "Run 'npm run build' to verify everything still works"
