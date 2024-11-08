import { useEffect } from "react"

const AiComponent = async () => {

    useEffect(() => {
        const PROJECT_ID = "cs3219-demo"
        const LOCATION_ID = "asia-southeast1"
        const API_ENDPOINT = "asia-southeast1-aiplatform.googleapis.com"
        const MODEL_ID = "gemini-1.0-pro-001"
        const apiKey = '';  // Replace with your Judge0 API key

        const payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": "Give me steps to solving leetcode problem two sum"
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 1,
                "maxOutputTokens": 8192,
                "topP": 0.95
            },
            "safetySettings": [
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "OFF"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "OFF"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "OFF"
                },
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "OFF"
                }
            ]
        };
        const fetchData = async () => {
            try {
                const response = await fetch(`https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:generateContent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(payload)  // Convert the payload to a JSON string
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                  
                console.log('Success:', data);
            } catch (error) {
                console.error('Error:', error);
            }

        };

        fetchData();  // Call the function to make the POST request

    }, []);  // Empty dependency array means this runs once when the component mounts


    return (<>Ai</>)
}

export default AiComponent;