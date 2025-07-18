#!/bin/bash

echo "=== Fixing merge conflicts in SavedRecipesGrid.tsx ==="

# Create a clean version without merge conflict markers
awk '
/^<<<<<<< HEAD/ { in_conflict = 1; next }
/^=======/ { in_conflict = 2; next }
/^>>>>>>> / { in_conflict = 0; next }
in_conflict == 0 || in_conflict == 2 { print }
' src/components/nutrition/SavedRecipesGrid.tsx > src/components/nutrition/SavedRecipesGrid.tsx.fixed

# Move the fixed file back
mv src/components/nutrition/SavedRecipesGrid.tsx.fixed src/components/nutrition/SavedRecipesGrid.tsx

echo "Merge conflicts removed from SavedRecipesGrid.tsx"
