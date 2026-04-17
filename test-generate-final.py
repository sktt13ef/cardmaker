import requests
import json

# Test the local API on port 3000 with increased timeout
url = "http://localhost:3000/api/generate"
headers = {
    "Content-Type": "application/json"
}
data = {
    "inputText": "人工智能在医疗领域的应用"
}

try:
    print("Testing /api/generate endpoint with 5 minute timeout...")
    print("Please wait, this may take a few minutes...")
    response = requests.post(url, headers=headers, json=data, timeout=350)
    print(f"\nStatus Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Success! Response:")
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"Error Response: {response.text}")
except requests.exceptions.Timeout:
    print("\nError: Request timed out after 350 seconds")
    print("The model is still too slow. Try using a more powerful model.")
except Exception as e:
    print(f"\nError: {e}")
