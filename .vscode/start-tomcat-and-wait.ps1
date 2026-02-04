param(
    [int]$Port = 8081,
    [int]$TimeoutSeconds = 60
)

$workspace = Convert-Path ..\

function Test-PortOpen($host, $port) {
    try {
        $res = Test-NetConnection -ComputerName $host -Port $port -WarningAction SilentlyContinue
        return $res.TcpTestSucceeded
    } catch {
        return $false
    }
}

if (Test-PortOpen -host 'localhost' -port $Port) {
    Write-Host "Port $Port already open; assuming Tomcat is running."
    exit 0
}

Write-Host "Starting Tomcat via 'mvn tomcat7:run' (detached)..."
Start-Process -FilePath mvn -ArgumentList 'tomcat7:run' -WorkingDirectory $workspace -NoNewWindow -WindowStyle Hidden

Write-Host "Waiting up to $TimeoutSeconds seconds for Tomcat to respond on port $Port..."
$elapsed = 0
while ($elapsed -lt $TimeoutSeconds) {
    if (Test-PortOpen -host 'localhost' -port $Port) {
        Write-Host "Tomcat is responding on port $Port."
        exit 0
    }
    Start-Sleep -Seconds 1
    $elapsed += 1
}

Write-Error "Timed out waiting for Tomcat on port $Port after $TimeoutSeconds seconds."
exit 1
