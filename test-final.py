import requests
import json
import time

# Test the local API with 10 minute timeout
url = "http://localhost:3000/api/generate"
headers = {
    "Content-Type": "application/json"
}
data = {
    "inputText": "人工智能在医疗领域的应用"
}

try:
    print("Testing /api/generate with 10 minute timeout...")
    print("This will take about 8-10 minutes, please wait...")
    start = time.time()
    response = requests.post(url, headers=headers, json=data, timeout=650)
    elapsed = time.time() - start
    print(f"\nCompleted in {elapsed:.2f} seconds")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"\nSuccess! Generated content:")
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(f"Error Response: {response.text}")
except requests.exceptions.Timeout:
    print("\nError: Request timed out after 650 seconds")
except Exception as e:
    print(f"\nError: {e}")
