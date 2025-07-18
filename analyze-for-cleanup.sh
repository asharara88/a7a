#!/bin/bash

echo "=== Analyzing duplicates for safe removal ==="

# Find UI components that might be duplicated
echo -e "\n--- UI Components Analysis ---"
for component in Button Card Input Modal Form Table List; do
  echo -e "\n$component components:"
  find ./src -iname "*${component}*.tsx" -type f | while read file; do
    imports=$(grep -c "^import" "$file")
    exports=$(grep -c "^export" "$file")
    lines=$(wc -l < "$file")
    echo "  $file (imports: $imports, exports: $exports, lines: $lines)"
  done
done

# Find duplicate utility files
echo -e "\n--- Utility Files Analysis ---"
find ./src -name "*util*.ts" -o -name "*helper*.ts" -o -name "*common*.ts" | \
  grep -v node_modules | while read file; do
    exports=$(grep -c "^export" "$file")
    echo "  $file (exports: $exports)"
  done

# Find duplicate type definitions
echo -e "\n--- Type Definition Files ---"
find ./src -name "*types*.ts" -o -name "*interface*.ts" -o -name "*.d.ts" | \
  grep -v node_modules | sort

# Check for multiple index files in same directory
echo -e "\n--- Multiple index files ---"
find ./src -name "index.ts" -o -name "index.tsx" | xargs dirname | sort | uniq -d

