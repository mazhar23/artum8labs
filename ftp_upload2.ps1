# FTP Upload using curl.exe (built-in Windows 10/11)
# curl handles FTP and explicit FTPS properly

$ftpHost = "ftp.artum8labs.com"
$ftpUser = "anigraviti@artum8labs.com"
$ftpPass = "Armani@2387"
$localRoot = "c:\Users\shree02\Desktop\personal projects\artum8_labs_portfolio"
$remoteRoot = "public_html"

# Files/folders to exclude
$excludeFolders = @("node_modules", ".git")
$excludeFiles   = @("node_modules (2).zip", "package.json", "package-lock.json", ".gitignore", "README.md", "ftp_upload.ps1", "ftp_upload2.ps1")

# Get all files
$allFiles = Get-ChildItem -Path $localRoot -Recurse -File

$totalCandidates = @()
foreach ($file in $allFiles) {
    $relativePath = $file.FullName.Substring($localRoot.Length).Replace("\", "/").TrimStart("/")
    $inExcludedFolder = $false
    foreach ($excFolder in $excludeFolders) {
        if ($relativePath -like "$excFolder/*" -or $relativePath -eq $excFolder) {
            $inExcludedFolder = $true; break
        }
    }
    if (-not $inExcludedFolder -and ($excludeFiles -notcontains $file.Name)) {
        $totalCandidates += $file
    }
}

$total = $totalCandidates.Count
$uploaded = 0
$failed = @()

Write-Host "Found $total files to upload." -ForegroundColor Yellow
Write-Host ""

foreach ($file in $totalCandidates) {
    $relativePath = $file.FullName.Substring($localRoot.Length).Replace("\", "/").TrimStart("/")
    $remoteUrl = "ftp://$ftpHost/$remoteRoot/$relativePath"

    Write-Host "[$uploaded/$total] $relativePath" -ForegroundColor Cyan

    # Use curl: --ssl-reqd for explicit FTPS, --insecure to accept self-signed certs
    $result = & curl.exe --ssl-reqd --insecure `
        --user "${ftpUser}:${ftpPass}" `
        --upload-file $file.FullName `
        --ftp-create-dirs `
        --silent --show-error `
        "$remoteUrl" 2>&1

    if ($LASTEXITCODE -eq 0) {
        $uploaded++
        Write-Host "  OK" -ForegroundColor Green
    } else {
        Write-Host "  FAILED: $result" -ForegroundColor Red
        $failed += $relativePath
    }
}

Write-Host ""
Write-Host "============================" -ForegroundColor Yellow
Write-Host "DONE: $uploaded / $total uploaded" -ForegroundColor Green
if ($failed.Count -gt 0) {
    Write-Host "FAILED ($($failed.Count)):" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}
