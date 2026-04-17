import requests
import json

# Test the local API
url = "http://localhost:3000/api/generate"
headers = {
    "Content-Type": "application/json"
}
data = {
    "inputText": "人工智能在医疗领域的应用"
}

try:
    print("Testing /api/generate endpoint...")
    response = requests.post(url, headers=headers, json=data, timeout=120)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text[:2000] if len(response.text) > 2000 else response.text}")
except Exception as e:
    print(f"Error: {e}")
