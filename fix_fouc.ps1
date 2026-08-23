$script = @"
<script>
    if (localStorage.getItem('levelup_theme') === 'light' || (!localStorage.getItem('levelup_theme') && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        document.body.classList.add('light-mode');
    }
</script>
"@

Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch "localStorage.getItem\('levelup_theme'\)") {
        $newContent = $content -replace "(<body[^>]*>)", "`$1`n$script"
        Set-Content -Path $_.FullName -Value $newContent
    }
}
Write-Host "FOUC fix applied to all HTML files."
