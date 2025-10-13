# wallet_requestAccount

```http
POST https://api.g.alchemy.com/v2/{apiKey}
Content-Type: application/json
```

This method is used to get the smart account address and relevant info for a given signer. If an account does not already exist for a given signer, this method will create one before returning the counterfactual address.

## Path Parameters

- apiKey (required)

## Response Body

## Examples

```shell
curl -X POST https://api.g.alchemy.com/v2/{apiKey} \
     -H "Content-Type: application/json" \
     -d '{
  "jsonrpc": "2.0",
  "method": "wallet_requestAccount",
  "params": [
    [
      {
        "signerAddress": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A"
      }
    ]
  ],
  "id": 1
}'
```

```python
import requests

url = "https://api.g.alchemy.com/v2/:apiKey"

payload = { "0": [{ "signerAddress": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A" }] }
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = "https://api.g.alchemy.com/v2/:apiKey";
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"0":[{"signerAddress":"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A"}]}',
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.g.alchemy.com/v2/:apiKey"

	payload := strings.NewReader("{\n  \"0\": [\n    {\n      \"signerAddress\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.g.alchemy.com/v2/:apiKey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'application/json'
request.body = "{\n  \"0\": [\n    {\n      \"signerAddress\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse response = Unirest.post("https://api.g.alchemy.com/v2/:apiKey")
  .header("Content-Type", "application/json")
  .body("{\n  \"0\": [\n    {\n      \"signerAddress\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\"\n    }\n  ]\n}")
  .asString();
```

```php
request('POST', 'https://api.g.alchemy.com/v2/:apiKey', [
  'body' => '{
  "0": [
    {
      "signerAddress": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A"
    }
  ]
}',
  'headers' => [
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.g.alchemy.com/v2/:apiKey");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"0\": [\n    {\n      \"signerAddress\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Content-Type": "application/json"]
let parameters = ["0": [["signerAddress": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A"]]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.g.alchemy.com/v2/:apiKey")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# wallet_prepareCalls

```http
POST https://api.g.alchemy.com/v2/{apiKey}
Content-Type: application/json
```

This method is used to prepare a user operation for submission. It will return a built user operation and a signature request which needs to be signed by the user before submitting to wallet_sendPreparedCalls

## Path Parameters

- apiKey (required)

## Response Body

## Examples

```shell
curl -X POST https://api.g.alchemy.com/v2/{apiKey} \
     -H "Content-Type: application/json" \
     -d '{
  "jsonrpc": "2.0",
  "method": "wallet_prepareCalls",
  "params": [
    [
      {
        "calls": [
          {
            "to": "0x1234567890123456789012345678901234567890",
            "data": "0x"
          }
        ],
        "from": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
        "chainId": "0x01",
        "capabilities": {
          "paymasterService": {
            "policyId": "11111111-2222-3333-4444-555555555555"
          }
        }
      }
    ]
  ],
  "id": 1
}'
```

```python
import requests

url = "https://api.g.alchemy.com/v2/:apiKey"

payload = { "0": [
        {
            "calls": [
                {
                    "to": "0x1234567890123456789012345678901234567890",
                    "data": "0x"
                }
            ],
            "from": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
            "chainId": "0x01",
            "capabilities": { "paymasterService": { "policyId": "11111111-2222-3333-4444-555555555555" } }
        }
    ] }
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = "https://api.g.alchemy.com/v2/:apiKey";
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"0":[{"calls":[{"to":"0x1234567890123456789012345678901234567890","data":"0x"}],"from":"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A","chainId":"0x01","capabilities":{"paymasterService":{"policyId":"11111111-2222-3333-4444-555555555555"}}}]}',
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.g.alchemy.com/v2/:apiKey"

	payload := strings.NewReader("{\n  \"0\": [\n    {\n      \"calls\": [\n        {\n          \"to\": \"0x1234567890123456789012345678901234567890\",\n          \"data\": \"0x\"\n        }\n      ],\n      \"from\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n      \"chainId\": \"0x01\",\n      \"capabilities\": {\n        \"paymasterService\": {\n          \"policyId\": \"11111111-2222-3333-4444-555555555555\"\n        }\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.g.alchemy.com/v2/:apiKey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'application/json'
request.body = "{\n  \"0\": [\n    {\n      \"calls\": [\n        {\n          \"to\": \"0x1234567890123456789012345678901234567890\",\n          \"data\": \"0x\"\n        }\n      ],\n      \"from\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n      \"chainId\": \"0x01\",\n      \"capabilities\": {\n        \"paymasterService\": {\n          \"policyId\": \"11111111-2222-3333-4444-555555555555\"\n        }\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse response = Unirest.post("https://api.g.alchemy.com/v2/:apiKey")
  .header("Content-Type", "application/json")
  .body("{\n  \"0\": [\n    {\n      \"calls\": [\n        {\n          \"to\": \"0x1234567890123456789012345678901234567890\",\n          \"data\": \"0x\"\n        }\n      ],\n      \"from\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n      \"chainId\": \"0x01\",\n      \"capabilities\": {\n        \"paymasterService\": {\n          \"policyId\": \"11111111-2222-3333-4444-555555555555\"\n        }\n      }\n    }\n  ]\n}")
  .asString();
```

```php
request('POST', 'https://api.g.alchemy.com/v2/:apiKey', [
  'body' => '{
  "0": [
    {
      "calls": [
        {
          "to": "0x1234567890123456789012345678901234567890",
          "data": "0x"
        }
      ],
      "from": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
      "chainId": "0x01",
      "capabilities": {
        "paymasterService": {
          "policyId": "11111111-2222-3333-4444-555555555555"
        }
      }
    }
  ]
}',
  'headers' => [
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.g.alchemy.com/v2/:apiKey");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"0\": [\n    {\n      \"calls\": [\n        {\n          \"to\": \"0x1234567890123456789012345678901234567890\",\n          \"data\": \"0x\"\n        }\n      ],\n      \"from\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n      \"chainId\": \"0x01\",\n      \"capabilities\": {\n        \"paymasterService\": {\n          \"policyId\": \"11111111-2222-3333-4444-555555555555\"\n        }\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Content-Type": "application/json"]
let parameters = ["0": [
    [
      "calls": [
        [
          "to": "0x1234567890123456789012345678901234567890",
          "data": "0x"
        ]
      ],
      "from": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
      "chainId": "0x01",
      "capabilities": ["paymasterService": ["policyId": "11111111-2222-3333-4444-555555555555"]]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.g.alchemy.com/v2/:apiKey")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# wallet_sendPreparedCalls

```http
POST https://api.g.alchemy.com/v2/{apiKey}
Content-Type: application/json
```

This method is used after signing the signatureRequest returned from prepareCalls to submit a user operation

## Path Parameters

- apiKey (required)

## Response Body

## Examples

```shell
curl -X POST https://api.g.alchemy.com/v2/{apiKey} \
     -H "Content-Type: application/json" \
     -d '{
  "jsonrpc": "2.0",
  "method": "wallet_sendPreparedCalls",
  "params": [
    [
      {
        "type": "user-operation-v070",
        "data": {
          "sender": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
          "nonce": "0x10000000000000000",
          "callData": "0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
          "paymaster": "0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048",
          "paymasterData": "0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c",
          "paymasterPostOpGasLimit": "0x0",
          "paymasterVerificationGasLimit": "0x74d3",
          "maxPriorityFeePerGas": "0x60e4b0",
          "maxFeePerGas": "0x1bf52290",
          "callGasLimit": "0x2bb8",
          "verificationGasLimit": "0xc845",
          "preVerificationGas": "0x14b74"
        },
        "chainId": "0x66eee",
        "signature": {
          "type": "secp256k1",
          "data": "0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b"
        }
      }
    ]
  ],
  "id": 1
}'
```

```python
import requests

url = "https://api.g.alchemy.com/v2/:apiKey"

payload = { "0": [
        {
            "type": "user-operation-v070",
            "data": {
                "sender": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
                "nonce": "0x10000000000000000",
                "callData": "0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
                "paymaster": "0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048",
                "paymasterData": "0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c",
                "paymasterPostOpGasLimit": "0x0",
                "paymasterVerificationGasLimit": "0x74d3",
                "maxPriorityFeePerGas": "0x60e4b0",
                "maxFeePerGas": "0x1bf52290",
                "callGasLimit": "0x2bb8",
                "verificationGasLimit": "0xc845",
                "preVerificationGas": "0x14b74"
            },
            "chainId": "0x66eee",
            "signature": {
                "type": "secp256k1",
                "data": "0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b"
            }
        }
    ] }
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = "https://api.g.alchemy.com/v2/:apiKey";
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"0":[{"type":"user-operation-v070","data":{"sender":"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A","nonce":"0x10000000000000000","callData":"0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000","paymaster":"0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048","paymasterData":"0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c","paymasterPostOpGasLimit":"0x0","paymasterVerificationGasLimit":"0x74d3","maxPriorityFeePerGas":"0x60e4b0","maxFeePerGas":"0x1bf52290","callGasLimit":"0x2bb8","verificationGasLimit":"0xc845","preVerificationGas":"0x14b74"},"chainId":"0x66eee","signature":{"type":"secp256k1","data":"0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b"}}]}',
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.g.alchemy.com/v2/:apiKey"

	payload := strings.NewReader("{\n  \"0\": [\n    {\n      \"type\": \"user-operation-v070\",\n      \"data\": {\n        \"sender\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n        \"nonce\": \"0x10000000000000000\",\n        \"callData\": \"0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000\",\n        \"paymaster\": \"0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048\",\n        \"paymasterData\": \"0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c\",\n        \"paymasterPostOpGasLimit\": \"0x0\",\n        \"paymasterVerificationGasLimit\": \"0x74d3\",\n        \"maxPriorityFeePerGas\": \"0x60e4b0\",\n        \"maxFeePerGas\": \"0x1bf52290\",\n        \"callGasLimit\": \"0x2bb8\",\n        \"verificationGasLimit\": \"0xc845\",\n        \"preVerificationGas\": \"0x14b74\"\n      },\n      \"chainId\": \"0x66eee\",\n      \"signature\": {\n        \"type\": \"secp256k1\",\n        \"data\": \"0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b\"\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.g.alchemy.com/v2/:apiKey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'application/json'
request.body = "{\n  \"0\": [\n    {\n      \"type\": \"user-operation-v070\",\n      \"data\": {\n        \"sender\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n        \"nonce\": \"0x10000000000000000\",\n        \"callData\": \"0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000\",\n        \"paymaster\": \"0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048\",\n        \"paymasterData\": \"0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c\",\n        \"paymasterPostOpGasLimit\": \"0x0\",\n        \"paymasterVerificationGasLimit\": \"0x74d3\",\n        \"maxPriorityFeePerGas\": \"0x60e4b0\",\n        \"maxFeePerGas\": \"0x1bf52290\",\n        \"callGasLimit\": \"0x2bb8\",\n        \"verificationGasLimit\": \"0xc845\",\n        \"preVerificationGas\": \"0x14b74\"\n      },\n      \"chainId\": \"0x66eee\",\n      \"signature\": {\n        \"type\": \"secp256k1\",\n        \"data\": \"0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b\"\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse response = Unirest.post("https://api.g.alchemy.com/v2/:apiKey")
  .header("Content-Type", "application/json")
  .body("{\n  \"0\": [\n    {\n      \"type\": \"user-operation-v070\",\n      \"data\": {\n        \"sender\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n        \"nonce\": \"0x10000000000000000\",\n        \"callData\": \"0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000\",\n        \"paymaster\": \"0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048\",\n        \"paymasterData\": \"0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c\",\n        \"paymasterPostOpGasLimit\": \"0x0\",\n        \"paymasterVerificationGasLimit\": \"0x74d3\",\n        \"maxPriorityFeePerGas\": \"0x60e4b0\",\n        \"maxFeePerGas\": \"0x1bf52290\",\n        \"callGasLimit\": \"0x2bb8\",\n        \"verificationGasLimit\": \"0xc845\",\n        \"preVerificationGas\": \"0x14b74\"\n      },\n      \"chainId\": \"0x66eee\",\n      \"signature\": {\n        \"type\": \"secp256k1\",\n        \"data\": \"0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b\"\n      }\n    }\n  ]\n}")
  .asString();
```

```php
request('POST', 'https://api.g.alchemy.com/v2/:apiKey', [
  'body' => '{
  "0": [
    {
      "type": "user-operation-v070",
      "data": {
        "sender": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
        "nonce": "0x10000000000000000",
        "callData": "0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
        "paymaster": "0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048",
        "paymasterData": "0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c",
        "paymasterPostOpGasLimit": "0x0",
        "paymasterVerificationGasLimit": "0x74d3",
        "maxPriorityFeePerGas": "0x60e4b0",
        "maxFeePerGas": "0x1bf52290",
        "callGasLimit": "0x2bb8",
        "verificationGasLimit": "0xc845",
        "preVerificationGas": "0x14b74"
      },
      "chainId": "0x66eee",
      "signature": {
        "type": "secp256k1",
        "data": "0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b"
      }
    }
  ]
}',
  'headers' => [
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.g.alchemy.com/v2/:apiKey");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"0\": [\n    {\n      \"type\": \"user-operation-v070\",\n      \"data\": {\n        \"sender\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n        \"nonce\": \"0x10000000000000000\",\n        \"callData\": \"0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000\",\n        \"paymaster\": \"0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048\",\n        \"paymasterData\": \"0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c\",\n        \"paymasterPostOpGasLimit\": \"0x0\",\n        \"paymasterVerificationGasLimit\": \"0x74d3\",\n        \"maxPriorityFeePerGas\": \"0x60e4b0\",\n        \"maxFeePerGas\": \"0x1bf52290\",\n        \"callGasLimit\": \"0x2bb8\",\n        \"verificationGasLimit\": \"0xc845\",\n        \"preVerificationGas\": \"0x14b74\"\n      },\n      \"chainId\": \"0x66eee\",\n      \"signature\": {\n        \"type\": \"secp256k1\",\n        \"data\": \"0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b\"\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Content-Type": "application/json"]
let parameters = ["0": [
    [
      "type": "user-operation-v070",
      "data": [
        "sender": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
        "nonce": "0x10000000000000000",
        "callData": "0x34fcd5be0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
        "paymaster": "0x3f222Df6aB18C1E10d0Ec136503c3B0dfd929048",
        "paymasterData": "0x0000000000000000682d7e7c9fa6f71c28c31141a11ac9eb2bdbe898ddbd42a4f7085f8bb3380ba75dd9231a386e24fe5a84777217c907391e983b5b0f78a4a9d0fd1c8631dd22c10e106b461c",
        "paymasterPostOpGasLimit": "0x0",
        "paymasterVerificationGasLimit": "0x74d3",
        "maxPriorityFeePerGas": "0x60e4b0",
        "maxFeePerGas": "0x1bf52290",
        "callGasLimit": "0x2bb8",
        "verificationGasLimit": "0xc845",
        "preVerificationGas": "0x14b74"
      ],
      "chainId": "0x66eee",
      "signature": [
        "type": "secp256k1",
        "data": "0xb1a055089b1ba8387ed435f2bd0afe7ff69f22b928cdfdea1b5323c64d6af387164de3fa6febf031b544de46a84d6fb7f084b9798ddfaba820950c257139a7321b"
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.g.alchemy.com/v2/:apiKey")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# wallet_createAccount

```http
POST https://api.g.alchemy.com/v2/{apiKey}
Content-Type: application/json
```

This method is used to create a smart account for a given signer. This method is primarly used to import existing accounts. For most cases, you should use wallet_requestAccount instead.

## Path Parameters

- apiKey (required)

## Response Body

## Examples

```shell
curl -X POST https://api.g.alchemy.com/v2/{apiKey} \
     -H "Content-Type: application/json" \
     -d '{
  "jsonrpc": "2.0",
  "method": "wallet_createAccount",
  "params": [
    [
      {
        "signerAddress": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
        "creationOption": {
          "salt": "0x10"
        }
      }
    ]
  ],
  "id": 1
}'
```

```python
import requests

url = "https://api.g.alchemy.com/v2/:apiKey"

payload = { "0": [
        {
            "signerAddress": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
            "creationOption": { "salt": "0x10" }
        }
    ] }
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = "https://api.g.alchemy.com/v2/:apiKey";
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"0":[{"signerAddress":"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A","creationOption":{"salt":"0x10"}}]}',
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.g.alchemy.com/v2/:apiKey"

	payload := strings.NewReader("{\n  \"0\": [\n    {\n      \"signerAddress\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n      \"creationOption\": {\n        \"salt\": \"0x10\"\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.g.alchemy.com/v2/:apiKey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'application/json'
request.body = "{\n  \"0\": [\n    {\n      \"signerAddress\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n      \"creationOption\": {\n        \"salt\": \"0x10\"\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse response = Unirest.post("https://api.g.alchemy.com/v2/:apiKey")
  .header("Content-Type", "application/json")
  .body("{\n  \"0\": [\n    {\n      \"signerAddress\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n      \"creationOption\": {\n        \"salt\": \"0x10\"\n      }\n    }\n  ]\n}")
  .asString();
```

```php
request('POST', 'https://api.g.alchemy.com/v2/:apiKey', [
  'body' => '{
  "0": [
    {
      "signerAddress": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
      "creationOption": {
        "salt": "0x10"
      }
    }
  ]
}',
  'headers' => [
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.g.alchemy.com/v2/:apiKey");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"0\": [\n    {\n      \"signerAddress\": \"0xa363219d7C0b8673df17529D469Db9eFF0f35D2A\",\n      \"creationOption\": {\n        \"salt\": \"0x10\"\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Content-Type": "application/json"]
let parameters = ["0": [
    [
      "signerAddress": "0xa363219d7C0b8673df17529D469Db9eFF0f35D2A",
      "creationOption": ["salt": "0x10"]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.g.alchemy.com/v2/:apiKey")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# wallet_createSession

```http
POST https://api.g.alchemy.com/v2/{apiKey}
Content-Type: application/json
```

This method is used to create a session for a given address with specified permissions.

## Path Parameters

- apiKey (required)

## Response Body

## Examples

```shell
curl -X POST https://api.g.alchemy.com/v2/{apiKey} \
     -H "Content-Type: application/json" \
     -d '{
  "jsonrpc": "2.0",
  "method": "wallet_createSession",
  "params": [
    [
      {
        "account": "0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2",
        "chainId": "0x01",
        "key": {
          "publicKey": "0x647bbf38CD0E116d1672405aE17a775572a84e03",
          "type": "secp256k1"
        },
        "permissions": [
          {
            "type": "root"
          }
        ],
        "expirySec": 1747969653
      }
    ]
  ],
  "id": 1
}'
```

```python
import requests

url = "https://api.g.alchemy.com/v2/:apiKey"

payload = { "0": [
        {
            "account": "0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2",
            "chainId": "0x01",
            "key": {
                "publicKey": "0x647bbf38CD0E116d1672405aE17a775572a84e03",
                "type": "secp256k1"
            },
            "permissions": [{ "type": "root" }],
            "expirySec": 1747969653
        }
    ] }
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = "https://api.g.alchemy.com/v2/:apiKey";
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"0":[{"account":"0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2","chainId":"0x01","key":{"publicKey":"0x647bbf38CD0E116d1672405aE17a775572a84e03","type":"secp256k1"},"permissions":[{"type":"root"}],"expirySec":1747969653}]}',
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.g.alchemy.com/v2/:apiKey"

	payload := strings.NewReader("{\n  \"0\": [\n    {\n      \"account\": \"0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2\",\n      \"chainId\": \"0x01\",\n      \"key\": {\n        \"publicKey\": \"0x647bbf38CD0E116d1672405aE17a775572a84e03\",\n        \"type\": \"secp256k1\"\n      },\n      \"permissions\": [\n        {\n          \"type\": \"root\"\n        }\n      ],\n      \"expirySec\": 1747969653\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.g.alchemy.com/v2/:apiKey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'application/json'
request.body = "{\n  \"0\": [\n    {\n      \"account\": \"0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2\",\n      \"chainId\": \"0x01\",\n      \"key\": {\n        \"publicKey\": \"0x647bbf38CD0E116d1672405aE17a775572a84e03\",\n        \"type\": \"secp256k1\"\n      },\n      \"permissions\": [\n        {\n          \"type\": \"root\"\n        }\n      ],\n      \"expirySec\": 1747969653\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse response = Unirest.post("https://api.g.alchemy.com/v2/:apiKey")
  .header("Content-Type", "application/json")
  .body("{\n  \"0\": [\n    {\n      \"account\": \"0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2\",\n      \"chainId\": \"0x01\",\n      \"key\": {\n        \"publicKey\": \"0x647bbf38CD0E116d1672405aE17a775572a84e03\",\n        \"type\": \"secp256k1\"\n      },\n      \"permissions\": [\n        {\n          \"type\": \"root\"\n        }\n      ],\n      \"expirySec\": 1747969653\n    }\n  ]\n}")
  .asString();
```

```php
request('POST', 'https://api.g.alchemy.com/v2/:apiKey', [
  'body' => '{
  "0": [
    {
      "account": "0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2",
      "chainId": "0x01",
      "key": {
        "publicKey": "0x647bbf38CD0E116d1672405aE17a775572a84e03",
        "type": "secp256k1"
      },
      "permissions": [
        {
          "type": "root"
        }
      ],
      "expirySec": 1747969653
    }
  ]
}',
  'headers' => [
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.g.alchemy.com/v2/:apiKey");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"0\": [\n    {\n      \"account\": \"0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2\",\n      \"chainId\": \"0x01\",\n      \"key\": {\n        \"publicKey\": \"0x647bbf38CD0E116d1672405aE17a775572a84e03\",\n        \"type\": \"secp256k1\"\n      },\n      \"permissions\": [\n        {\n          \"type\": \"root\"\n        }\n      ],\n      \"expirySec\": 1747969653\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Content-Type": "application/json"]
let parameters = ["0": [
    [
      "account": "0xafdABa1E09e82F780721963eba39bA9e6d9FE4d2",
      "chainId": "0x01",
      "key": [
        "publicKey": "0x647bbf38CD0E116d1672405aE17a775572a84e03",
        "type": "secp256k1"
      ],
      "permissions": [["type": "root"]],
      "expirySec": 1747969653
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.g.alchemy.com/v2/:apiKey")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# wallet_getCallsStatus

```http
POST https://api.g.alchemy.com/v2/{apiKey}
Content-Type: application/json
```

This method is used to get the status of calls IDs returned from wallet_sendPreparedCalls.

## Path Parameters

- apiKey (required)

## Response Body

## Examples

```shell
curl -X POST https://api.g.alchemy.com/v2/{apiKey} \
     -H "Content-Type: application/json" \
     -d '{
  "jsonrpc": "2.0",
  "method": "wallet_getCallsStatus",
  "params": [
    [
      "0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477"
    ]
  ],
  "id": 1
}'
```

```python
import requests

url = "https://api.g.alchemy.com/v2/:apiKey"

payload = { "0": ["0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477"] }
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = "https://api.g.alchemy.com/v2/:apiKey";
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"0":["0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477"]}',
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.g.alchemy.com/v2/:apiKey"

	payload := strings.NewReader("{\n  \"0\": [\n    \"0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477\"\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.g.alchemy.com/v2/:apiKey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'application/json'
request.body = "{\n  \"0\": [\n    \"0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse response = Unirest.post("https://api.g.alchemy.com/v2/:apiKey")
  .header("Content-Type", "application/json")
  .body("{\n  \"0\": [\n    \"0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477\"\n  ]\n}")
  .asString();
```

```php
request('POST', 'https://api.g.alchemy.com/v2/:apiKey', [
  'body' => '{
  "0": [
    "0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477"
  ]
}',
  'headers' => [
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.g.alchemy.com/v2/:apiKey");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"0\": [\n    \"0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Content-Type": "application/json"]
let parameters = ["0": ["0x0000000000000000000000000000000000000000000000000000000000066eee1057eff9529142aa3b74adcaacfce5b99a09d80c9f2e38e35ea1f27535e61477"]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.g.alchemy.com/v2/:apiKey")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# wallet_listAccounts

```http
POST https://api.g.alchemy.com/v2/{apiKey}
Content-Type: application/json
```

This method is used to list all smart accounts for a given signer.

## Path Parameters

- apiKey (required)

## Response Body

## Examples

```shell
curl -X POST https://api.g.alchemy.com/v2/{apiKey} \
     -H "Content-Type: application/json" \
     -d '{
  "jsonrpc": "2.0",
  "method": "wallet_listAccounts",
  "params": [
    [
      {
        "signerAddress": "0x6275B53E98D07c729108A177207634eA22F5A748"
      }
    ]
  ],
  "id": 1
}'
```

```python
import requests

url = "https://api.g.alchemy.com/v2/:apiKey"

payload = { "0": [{ "signerAddress": "0x6275B53E98D07c729108A177207634eA22F5A748" }] }
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = "https://api.g.alchemy.com/v2/:apiKey";
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"0":[{"signerAddress":"0x6275B53E98D07c729108A177207634eA22F5A748"}]}',
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.g.alchemy.com/v2/:apiKey"

	payload := strings.NewReader("{\n  \"0\": [\n    {\n      \"signerAddress\": \"0x6275B53E98D07c729108A177207634eA22F5A748\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.g.alchemy.com/v2/:apiKey")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = 'application/json'
request.body = "{\n  \"0\": [\n    {\n      \"signerAddress\": \"0x6275B53E98D07c729108A177207634eA22F5A748\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse response = Unirest.post("https://api.g.alchemy.com/v2/:apiKey")
  .header("Content-Type", "application/json")
  .body("{\n  \"0\": [\n    {\n      \"signerAddress\": \"0x6275B53E98D07c729108A177207634eA22F5A748\"\n    }\n  ]\n}")
  .asString();
```

```php
request('POST', 'https://api.g.alchemy.com/v2/:apiKey', [
  'body' => '{
  "0": [
    {
      "signerAddress": "0x6275B53E98D07c729108A177207634eA22F5A748"
    }
  ]
}',
  'headers' => [
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.g.alchemy.com/v2/:apiKey");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"0\": [\n    {\n      \"signerAddress\": \"0x6275B53E98D07c729108A177207634eA22F5A748\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Content-Type": "application/json"]
let parameters = ["0": [["signerAddress": "0x6275B53E98D07c729108A177207634eA22F5A748"]]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.g.alchemy.com/v2/:apiKey")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```
