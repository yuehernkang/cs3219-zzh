import React, { useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const CodeExecution = ({ stderr, testcases,code, executionResult,  activeTab,
    setActiveTab,
   }: {  stderr:string, testcases: string[], code: string;
    executionResult: string;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
   }) => {
    return (
    <div>
      <h1>Code Execution</h1>
      <Tabs defaultValue="testcase" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-72 grid-cols-2">
        <TabsTrigger value="testcase">Testcase</TabsTrigger>
        <TabsTrigger value="testresult">Test Result</TabsTrigger>
      </TabsList>
      <TabsContent value="testcase">
      {testcases.map((testcase, index) => (
              <div key={index} className="flex flex-col bg-gray-100 p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-700 ">{testcase}</p>
              </div>
            ))}

      </TabsContent>
      <TabsContent value="testresult">
                  {/* Display stderr if it's not null */}
                  {stderr ? (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
              <strong>Error:</strong> {stderr}
            </div>
          ) : (
            <p className="w-full bg-gray-200 p-4 text-sm text-gray-800 rounded-md">{executionResult}</p>
          )}

      </TabsContent>
    </Tabs>
    </div>
  );
};

export default CodeExecution;
