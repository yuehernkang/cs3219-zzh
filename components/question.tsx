const QuestionSection = () => {
    const sampleQuestion = {
        title: "Two Sum",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        exampleInput: "Input: nums = [2, 7, 11, 15], target = 9",
        exampleOutput: "Output: [0, 1]",
      };
      return (
        <div className="p-4 border">
              <h1 className="text-3xl font-bold">{sampleQuestion.title}</h1>
      <p className="description">{sampleQuestion.description}</p>
      <pre className="example">Example Input: {sampleQuestion.exampleInput}</pre>
      <pre className="example">Example Output: {sampleQuestion.exampleOutput}</pre>

        </div>
      )
    
}

export default QuestionSection;
