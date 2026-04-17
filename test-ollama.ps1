$body = @{
    model = "qwen3.5:0.8b"
    messages = @(
        @{
            role = "user"
            content = "Hello"
        }
    )
    max_tokens = 50
} | ConvertTo-Json -Compress

$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer ollama"
}

try {
    $response = Invoke-WebRequest -Uri "http://localhost:11434/v1/chat/completions" -Method POST -Headers $headers -Body $body -TimeoutSec 30
    Write-Host "Response Status: $($response.StatusCode)"
    Write-Host "Response Body: $($response.Content)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error Response: $errorBody"
    }
}
