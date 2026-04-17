import requests
import json

# Test the local API with qwen3.5:9b model
url = "http://localhost:3000/api/generate"
headers = {
    "Content-Type": "application/json"
}
data = {
    "inputText": "人工智能在医疗领域的应用"
}

try:
    print("Testing /api/generate with qwen3.5:9b model...")
    print("Please wait...")
    response = requests.post(url, headers=headers, json=data, timeout=180)
    print(f"\nStatus Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Success! Response:")
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"Error Response: {response.text}")
except requests.exceptions.Timeout:
    print("\nError: Request timed out")
except Exception as e:
    print(f"\nError: {e}")
