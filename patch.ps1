$b64 = (Get-Content logo_b64.txt -Raw).Trim()

$js = Get-Content pdf-generator.js -Raw

# Replace Tanggal Cetak position
$js = $js -replace "doc\.text\(`Tanggal Cetak: \`\$\{currentDate\}`, margin, margin \+ 31\);", "doc.text(`Tanggal Cetak: `$currentDate`, pageWidth - margin, margin + 35, { align: 'right' });"

# Replace table startY
$js = $js -replace "startY: margin \+ 30,", "startY: margin + 40,"

# Replace fetch logic with hardcoded base64
$searchPattern = [regex]::Escape('    // Fetch and add logo') + '[\s\S]*?' + [regex]::Escape('    } catch(e) {')
$replacement = "    // Embed logo`n    try {`n        const base64data = 'data:image/png;base64,' + '$b64';`n        doc.addImage(base64data, 'PNG', pageWidth - margin - 20, margin, 20, 20);`n    } catch(e) {"

$js = $js -replace $searchPattern, $replacement

Set-Content pdf-generator.js $js
