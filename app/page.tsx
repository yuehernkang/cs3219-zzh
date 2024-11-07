"use client"
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState<string>();
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await fetch('http://34.87.60.94:2358/submissions/?base64_encoded=false&wait=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            source_code: 'print("Hello, World!")', // The code to execute
            language_id: 71, // Language ID for Python 3; change as needed
            stdin: '', // Input to be given to the code
          }
        ),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-start pt-10 h-screen">
      <div className="w-full max-w-4xl p-4 border">
        <form action="#" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
            value={code}
              height="50vh"
              defaultLanguage="javascript"
              defaultValue='Deno.serve(req => new Response("Hello!"));'
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
    </div>
  );
}
