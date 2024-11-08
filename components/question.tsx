import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

const QuestionSection = ({code}: {code:string}) => {
  console.log(code)
  const PROJECT_ID = "cs3219-demo"
  const LOCATION_ID = "asia-southeast1"
  const API_ENDPOINT = "asia-southeast1-aiplatform.googleapis.com"
  const MODEL_ID = "gemini-1.0-pro-001"
  const apiKey = '';  // Replace with your Judge0 API key
  const sampleQuestion = {
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    exampleInput: "Input: nums = [2, 7, 11, 15], target = 9",
    exampleOutput: "Output: [0, 1]",
  };
  const [hint, setHint] = useState(null)
  const [isLoading, setIsLoading] = useState(false) // To track loading state
  const [translateResult, setTranslateResult] = useState('');
  const [languageTranslate, setLanguageTranslate] = useState('');
  const [loadingTranslate, setLoadingTranslate] = useState(false);
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
  const payloadSolution = {
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "Give me the javascript solution to solving leetcode problem two sum"
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

  const payloadTranslate = {
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": `translate this code from javascript to ${languageTranslate} \n ${code}`
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


  const handleShowSolution = async () => {
    setIsLoading(true) // Set loading state to true before sending request

    try {
      const response = await fetch(`https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:generateContent`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadSolution)
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        const hintText = data.candidates[0]?.content?.parts[0]?.text || "No hint available.";
        setHint(removeBackticksAndWord(hintText)); // Set the hint state
      } else {
        console.error("Error fetching hint:", response.statusText)
      }
    } catch (error) {
      console.error("Request failed", error)
    } finally {
      setIsLoading(false) // Set loading state to false when request finishes
    }
  }
  const handleShowHint = async () => {
    setIsLoading(true) // Set loading state to true before sending request

    try {
      const response = await fetch(`https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:generateContent`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const data = await response.json()
        const hintText = data.candidates[0]?.content?.parts[0]?.text || "No hint available.";
        setHint(hintText); // Set the hint state
      } else {
        console.error("Error fetching hint:", response.statusText)
      }
    } catch (error) {
      console.error("Request failed", error)
    } finally {
      setIsLoading(false) // Set loading state to false when request finishes
    }
  }
  const formatHintText = (text) => {
    // Convert Markdown bold (**bold**) to HTML <strong> tags
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold conversion
      .replace(/\n/g, "<br />"); // Newline conversion

    return formattedText;
  }

  function removeBackticksAndWord(code) {
    // Remove the opening backticks and the word after it
    code = code.replace(/^```[a-zA-Z]*\n/, '');

    // Remove the closing backticks on the last line
    code = code.replace(/```$/, '');

    return code;
  }
  const handleLanguageChange = (language) => {
    setLanguageTranslate(language);
  };

  useEffect(() => {
    const fetchHint = async () => {
      setLoadingTranslate(true)
      try {
        const response = await fetch(`https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:generateContent`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadTranslate)
        })

        if (response.ok) {
          const data = await response.json()
          const hintText = data.candidates[0]?.content?.parts[0]?.text || "No hint available.";
          setTranslateResult(removeBackticksAndWord(hintText)); // Set the hint state
        } else {
          console.error("Error fetching hint:", response.statusText)
        }
      } catch (error) {
        console.error("Request failed", error)
      } finally {
        setLoadingTranslate(false) // Set loading state to true before sending request
      }
    }

    // Only run the fetch function if the languageTranslate changes
    if (languageTranslate) {
      fetchHint();
    }
    
  }, [languageTranslate])

  return (
    <>
      <div className="p-4 border">
        <h1 className="text-3xl font-bold">{sampleQuestion.title}</h1>
        <p className="description">{sampleQuestion.description}</p>
        <pre className="example">Example Input: {sampleQuestion.exampleInput}</pre>
        <pre className="example">Example Output: {sampleQuestion.exampleOutput}</pre>
        <div className="mt-auto flex flex-row gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleShowHint}>
                Show Hint 💡
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Hint</DialogTitle>
                <DialogDescription>
                  Shows u hint to the question
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 ">
                {/* Show loading message or the formatted hint */}
                {isLoading ? (
                  <p>Loading...</p> // Display loading message
                ) : hint ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatHintText(hint),
                    }}
                  /> // Render formatted hint
                ) : (
                  <p>No hint available.</p> // Display message if no hint is available
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleShowSolution}>
                Show Solution
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[300px] overflow-y-auto max-w-fit">
              <DialogHeader>
                <DialogTitle>Solution</DialogTitle>
                <DialogDescription>
                  Shows u solution to the question
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 ">
                {isLoading ? (
                  <p>Loading...</p> // Display loading message
                ) : hint ? (
                  <Editor
                    value={hint}
                    options={{
                      wordWrap: "on",
                    }}
                    height="90vh"
                    defaultLanguage="javascript"
                    defaultValue={hint}
                  />
                ) : (
                  <p>No hint available.</p> // Display message if no hint is available
                )}

              </div>
              <DialogFooter>
                <Button type="submit">Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleShowSolution}>
                Translate Code
              </Button>
            </DialogTrigger>
            <DialogContent className=" max-h-[600px] overflow-y-auto max-2-[800px] ">
              <DialogHeader>
                <DialogTitle>Solution</DialogTitle>
                <DialogDescription className="flex flex-row gap-2">
                  <Button onClick={() => handleLanguageChange('JavaScript')} variant="outline">JavaScript</Button>
                  <Button onClick={() => handleLanguageChange('Python')} variant="outline">Python</Button>

                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 ">
                {loadingTranslate ? (
                  <p>Loading...</p> // Display loading message
                ) : hint ? (
                  <Editor
                  options={{
                    wordWrap: "on",
                  }}
    
                    value={translateResult}
                    height="90vh"
                    defaultLanguage="javascript"
                  />
                ) : (
                  <p>No hint available.</p> // Display message if no hint is available
                )}

              </div>
              <DialogFooter>
                <Button type="submit">Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </>
  )

}

export default QuestionSection;
