import requests
import json

# Test the local API on port 3001
url = "http://localhost:3001/api/generate"
headers = {
    "Content-Type": "application/json"
}
data = {
    "inputText": "人工智能在医疗领域的应用"
}

try:
    print("Testing /api/generate endpoint on port 3001...")
    print("This may take a while as the LLM generates content...")
    response = requests.post(url, headers=headers, json=data, timeout=180)
    print(f"\nStatus Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Success! Response preview:")
        print(json.dumps(result, ensure_ascii=False, indent=2)[:1500])
    else:
        print(f"Error Response: {response.text}")
except requests.exceptions.Timeout:
    print("\nError: Request timed out after 180 seconds")
    print("The LLM is taking too long to respond. This could be because:")
    print("1. The model (qwen3.5:0.8b) is too slow on your hardware")
    print("2. Ollama is not responding properly")
    print("3. The prompt is too complex")
except Exception as e:
    print(f"\nError: {e}")
