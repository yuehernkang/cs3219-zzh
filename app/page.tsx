"use client"
import CodeExecution from '@/components/code_execution';
import QuestionSection from '@/components/question';
import Editor from '@monaco-editor/react';
import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState<string>('console.log("hello");');
  const [executionResult, setExecutionResult] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [activeTab, setActiveTab] = useState("testcase");

  const [results, setResult]  = useState<string>('console.log("hello");');
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    setActiveTab("testresult");
    event.preventDefault();
    try {
      const response = await fetch('http://34.87.60.94:2358/submissions/?base64_encoded=false&wait=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_code: code, // The code to execute
          language_id: 63, // Language ID for Python 3; change as needed
          stdin: 'world', // Input to be given to the code
          expected_output: "hello world",
        }
        ),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setExecutionResult(data.stdout);
      setStderr(data.stderr)
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="flex flex-col items-start">
      <div className="w-full p-4">
        <form action="#" onSubmit={handleSubmit}>
          <div className='flex flex-row gap-2'>
            <QuestionSection />
              <Editor
                onChange={setCode}
                value={code}
                height="50vh"
                defaultLanguage="javascript"
                defaultValue='console.log("hello");'
              />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Run
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='w-full p-4'>
        <CodeExecution stderr={stderr} testcases={["hello world"]} code={code} executionResult={executionResult}           activeTab={activeTab}  // Pass activeTab state
          setActiveTab={setActiveTab}  // Pass setActiveTab function
/>
      </div>
    </div>
  );
}
