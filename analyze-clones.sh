#!/bin/bash

echo "=== Analyzing code clones from jscpd report ==="

# Parse the JSON report to find exact duplicates
if [ -f "duplicate-report/jscpd-report.json" ]; then
  echo "Processing duplication report..."
  
  # Extract duplicate information
  node -e '
    const report = require("./duplicate-report/jscpd-report.json");
    const duplicates = report.duplicates || [];
    
    console.log(`Found ${duplicates.length} duplicate blocks\n`);
    
    // Group by files
    const fileGroups = {};
    duplicates.forEach(dup => {
      const key = `${dup.firstFile}:${dup.secondFile}`;
      if (!fileGroups[key]) fileGroups[key] = [];
      fileGroups[key].push(dup);
    });
    
    // Show top duplicate pairs
    Object.entries(fileGroups)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10)
      .forEach(([files, dups]) => {
        const totalLines = dups.reduce((sum, d) => sum + d.lines, 0);
        console.log(`\n${files}`);
        console.log(`  Duplications: ${dups.length}, Total lines: ${totalLines}`);
      });
  '
fi

# Identify consolidation opportunities
echo -e "\n=== Consolidation opportunities ==="

# API files with same import pattern - could share base client
echo -e "\nAPI files with identical imports:"
grep -l "f1f401d0f3a6fc2f2505dbfbc71c5029" *.txt | xargs -I {} basename {} .txt

# Dashboard components that could share base component
echo -e "\nDashboard cards that could extend base component:"
ls ./src/components/dashboard/*Card.tsx 2>/dev/null | wc -l

# Edge functions with same pattern
echo -e "\nEdge functions with similar structure:"
ls ./supabase/functions/*/index.ts 2>/dev/null | wc -l

