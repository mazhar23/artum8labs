
# Accept all SSL certificates (needed for self-signed certs common on Namecheap)
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

$ftpHost = "ftp.artum8labs.com"
$ftpUser = "anigraviti@artum8labs.com"
$ftpPass = "Armani@2387"
$localRoot = "c:\Users\shree02\Desktop\personal projects\artum8_labs_portfolio"
$remoteRoot = "/public_html"

# Files/folders to exclude
$excludeFolders = @("node_modules", ".git")
$excludeFiles   = @("node_modules (2).zip", "package.json", "package-lock.json", ".gitignore", "README.md", "ftp_upload.ps1")

function FtpCreateDir($uri, $user, $pass) {
    try {
        $req = [System.Net.FtpWebRequest]::Create($uri)
        $req.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
        $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $req.UseBinary = $true
        $req.UsePassive = $true
        $req.EnableSsl = $true
        $req.KeepAlive = $false
        $resp = $req.GetResponse()
        $resp.Close()
    } catch {
        # Directory may already exist, ignore
    }
}

function FtpUploadFile($localPath, $remotePath, $user, $pass) {
    $uri = "ftp://$ftpHost$remotePath"
    $req = [System.Net.FtpWebRequest]::Create($uri)
    $req.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
    $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $req.UseBinary = $true
    $req.UsePassive = $true
    $req.EnableSsl = $true
    $req.KeepAlive = $false

    $fileBytes = [System.IO.File]::ReadAllBytes($localPath)
    $req.ContentLength = $fileBytes.Length

    $stream = $req.GetRequestStream()
    $stream.Write($fileBytes, 0, $fileBytes.Length)
    $stream.Close()

    $resp = $req.GetResponse()
    $resp.Close()
}

# Ensure remote root exists
FtpCreateDir "ftp://$ftpHost$remoteRoot" $ftpUser $ftpPass

# Get all files recursively
$allFiles = Get-ChildItem -Path $localRoot -Recurse -File

$totalFiles = ($allFiles | Where-Object {
    $rel = $_.FullName.Substring($localRoot.Length).Replace("\", "/")
    $inExcFolder = $false
    foreach ($ef in $excludeFolders) {
        if ($rel -like "/$ef/*" -or $rel -like "/$ef") { $inExcFolder = $true; break }
    }
    -not $inExcFolder -and ($excludeFiles -notcontains $_.Name)
}).Count

$uploadedFiles = 0
$failedFiles = @()

foreach ($file in $allFiles) {
    $relativePath = $file.FullName.Substring($localRoot.Length).Replace("\", "/")

    # Check excluded folders
    $inExcludedFolder = $false
    foreach ($excFolder in $excludeFolders) {
        if ($relativePath -like "/$excFolder/*" -or $relativePath -like "/$excFolder") {
            $inExcludedFolder = $true; break
        }
    }
    if ($inExcludedFolder) { continue }
    if ($excludeFiles -contains $file.Name) { continue }

    $remotePath = "$remoteRoot$relativePath"

    # Ensure remote directory exists
    $remoteDir = $remotePath.Substring(0, $remotePath.LastIndexOf("/"))
    FtpCreateDir "ftp://$ftpHost$remoteDir" $ftpUser $ftpPass

    Write-Host "[$uploadedFiles/$totalFiles] Uploading: $relativePath" -ForegroundColor Cyan

    try {
        FtpUploadFile $file.FullName $remotePath $ftpUser $ftpPass
        $uploadedFiles++
        Write-Host "  OK" -ForegroundColor Green
    } catch {
        $failedFiles += $relativePath
        Write-Host "  FAILED: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================" -ForegroundColor Yellow
Write-Host "UPLOAD COMPLETE" -ForegroundColor Yellow
Write-Host "Uploaded: $uploadedFiles / $totalFiles files" -ForegroundColor Green
if ($failedFiles.Count -gt 0) {
    Write-Host "Failed ($($failedFiles.Count)):" -ForegroundColor Red
    $failedFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}
