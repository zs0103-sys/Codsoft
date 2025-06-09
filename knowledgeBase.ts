// This is a mock service that simulates retrieval from a knowledge base
// In a real application, this would connect to a backend service with RAG

interface KnowledgeBaseResponse {
  answer: string;
  source?: string;
  confidence: number;
}

// Sample knowledge base content
const knowledgeBase = {
  math: [
    {
      question: 'What is the Pythagorean theorem?',
      answer: 'The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides. If a and b are the legs of the triangle and c is the hypotenuse, then a² + b² = c².\n\nExample Problem:\nFind the hypotenuse of a right triangle with legs of length 3 and 4.\n\nSolution:\n1. Use the formula: a² + b² = c²\n2. Plug in values: 3² + 4² = c²\n3. Simplify: 9 + 16 = c²\n4. Solve: 25 = c²\n5. Take square root: c = 5\n\nTherefore, the hypotenuse is 5 units long.',
      keywords: ['pythagorean', 'theorem', 'triangle', 'right angle', 'hypotenuse'],
      source: 'Basic Geometry, Chapter 7'
    },
    {
      question: 'How do you solve quadratic equations?',
      answer: 'There are several methods to solve quadratic equations (ax² + bx + c = 0):\n\n1. Factoring Method:\nExample: Solve x² + 5x + 6 = 0\nStep 1: Factor into (x + 2)(x + 3) = 0\nStep 2: Set each factor to zero: x + 2 = 0 or x + 3 = 0\nStep 3: Solve: x = -2 or x = -3\n\n2. Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a\nExample: Solve 2x² - 7x + 3 = 0\nStep 1: Identify a = 2, b = -7, c = 3\nStep 2: Plug into formula: x = (7 ± √(49 - 24)) / 4\nStep 3: Simplify: x = (7 ± √25) / 4\nStep 4: Solve: x = (7 ± 5) / 4\nTherefore, x = 3 or x = 1/2',
      keywords: ['quadratic', 'equation', 'solve', 'formula', 'factoring'],
      source: 'Algebra II, Chapter 3'
    },
    {
      question: 'How do you solve systems of equations?',
      answer: 'There are three main methods to solve systems of equations:\n\n1. Substitution Method:\nExample: Solve\nx + 2y = 5\n2x - y = 3\n\nStep 1: Solve first equation for x: x = 5 - 2y\nStep 2: Substitute into second equation: 2(5 - 2y) - y = 3\nStep 3: Simplify: 10 - 4y - y = 3\nStep 4: Solve for y: -5y = -7, so y = 7/5\nStep 5: Find x: x = 5 - 2(7/5) = 5 - 14/5 = 11/5\n\n2. Elimination Method:\nMultiply equations by constants to eliminate one variable when added or subtracted.',
      keywords: ['systems', 'equations', 'substitution', 'elimination', 'linear'],
      source: 'Algebra I, Chapter 8'
    }
  ],
  physics: [
    {
      question: 'How do you solve projectile motion problems?',
      answer: 'To solve projectile motion problems, follow these steps:\n\n1. Identify given values and what you\'re solving for\n2. Break motion into horizontal and vertical components\n3. Use these key equations:\n   - Horizontal: x = v₀ₓt\n   - Vertical: y = y₀ + v₀ᵧt - (1/2)gt²\n   - v = v₀ + gt\n\nExample Problem:\nA ball is thrown with initial velocity 20 m/s at 30° angle. Find maximum height.\n\nSolution:\n1. Find initial vertical velocity:\n   v₀ᵧ = 20 sin(30°) = 10 m/s\n2. Use equation: h_max = v₀ᵧ²/(2g)\n3. Plug in values: h_max = 10²/(2×9.81)\n4. Solve: h_max = 5.1 meters',
      keywords: ['projectile', 'motion', 'trajectory', 'velocity', 'acceleration'],
      source: 'Physics Mechanics, Chapter 4'
    }
  ],
  chemistry: [
    {
      question: 'How do you balance chemical equations?',
      answer: 'To balance chemical equations, follow these steps:\n\n1. Write the unbalanced equation\n2. Count atoms of each element on both sides\n3. Add coefficients to balance atoms\n4. Check final equation\n\nExample:\nBalance: Fe + O₂ → Fe₂O₃\n\nStep 1: Count atoms\n- Left: 1 Fe, 2 O\n- Right: 2 Fe, 3 O\n\nStep 2: Balance Fe first\n- Add coefficient 2 to Fe: 2Fe + O₂ → Fe₂O₃\n\nStep 3: Balance O\n- Need 3 O on left: 2Fe + 3/2O₂ → Fe₂O₃\n- Multiply all by 2 to eliminate fraction: 4Fe + 3O₂ → 2Fe₂O₃\n\nFinal balanced equation: 4Fe + 3O₂ → 2Fe₂O₃',
      keywords: ['balance', 'equation', 'chemical', 'reaction', 'stoichiometry'],
      source: 'General Chemistry, Chapter 6'
    }
  ],
  cs: [
    {
      question: 'How do you implement binary search?',
      answer: 'Binary search is an efficient algorithm for finding an element in a sorted array.\n\nImplementation in TypeScript:\n\n```typescript\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid; // Found the target\n    } else if (arr[mid] < target) {\n      left = mid + 1; // Search right half\n    } else {\n      right = mid - 1; // Search left half\n    }\n  }\n  \n  return -1; // Target not found\n}\n\n// Example usage:\nconst arr = [1, 3, 5, 7, 9, 11, 13, 15];\nconst target = 7;\nconst result = binarySearch(arr, target);\nconsole.log(`Found at index: ${result}`); // Output: Found at index: 3\n```\n\nTime Complexity: O(log n)\nSpace Complexity: O(1)',
      keywords: ['binary search', 'algorithm', 'sorted array', 'searching', 'implementation'],
      source: 'Data Structures and Algorithms, Chapter 4'
    },
    {
      question: 'How do you implement quicksort?',
      answer: 'Quicksort is an efficient, in-place sorting algorithm using divide-and-conquer strategy.\n\nImplementation in TypeScript:\n\n```typescript\nfunction quickSort(arr: number[], low: number = 0, high: number = arr.length - 1) {\n  if (low < high) {\n    const pivotIndex = partition(arr, low, high);\n    quickSort(arr, low, pivotIndex - 1);\n    quickSort(arr, pivotIndex + 1, high);\n  }\n  return arr;\n}\n\nfunction partition(arr: number[], low: number, high: number): number {\n  const pivot = arr[high];\n  let i = low - 1;\n\n  for (let j = low; j < high; j++) {\n    if (arr[j] <= pivot) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n\n  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n  return i + 1;\n}\n\n// Example usage:\nconst arr = [64, 34, 25, 12, 22, 11, 90];\nconsole.log(quickSort([...arr]));\n// Output: [11, 12, 22, 25, 34, 64, 90]\n```\n\nTime Complexity:\n- Average case: O(n log n)\n- Worst case: O(n²)\nSpace Complexity: O(log n)',
      keywords: ['quicksort', 'sorting', 'algorithm', 'divide and conquer', 'implementation'],
      source: 'Data Structures and Algorithms, Chapter 5'
    }
  ]
};

// Simple search function to find relevant knowledge base entries
const findRelevantEntry = (query: string, subjectId: string): KnowledgeBaseResponse | null => {
  const subjectData = knowledgeBase[subjectId as keyof typeof knowledgeBase] || [];
  
  // Check for exact question matches first
  const exactMatch = subjectData.find(
    (entry) => entry.question.toLowerCase() === query.toLowerCase()
  );
  
  if (exactMatch) {
    return {
      answer: exactMatch.answer,
      source: exactMatch.source,
      confidence: 0.95,
    };
  }
  
  // Search keywords
  let bestMatch = null;
  let highestScore = 0;
  
  for (const entry of subjectData) {
    let score = 0;
    const words = query.toLowerCase().split(/\s+/);
    
    for (const word of words) {
      if (word.length < 3) continue; // Skip very short words
      
      if (entry.question.toLowerCase().includes(word)) {
        score += 0.5;
      }
      
      const matchingKeywords = entry.keywords.filter(
        (keyword) => keyword.includes(word) || word.includes(keyword)
      );
      
      score += matchingKeywords.length * 0.3;
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }
  
  // Return best match if score is high enough
  if (bestMatch && highestScore > 0.5) {
    return {
      answer: bestMatch.answer,
      source: bestMatch.source,
      confidence: Math.min(0.9, highestScore / 3),
    };
  }
  
  // Default response if no good match
  return {
    answer: generateDefaultResponse(query, subjectId),
    confidence: 0.3,
  };
};

const generateDefaultResponse = (query: string, subjectId: string): string => {
  const subjectName = getSubjectName(subjectId);
  
  return `I don't have specific information about "${query}" in my ${subjectName} knowledge base. This would be a great opportunity to consult your textbook or ask your teacher for more information. If you'd like, you can try rephrasing your question or asking about a related topic I might know more about.`;
};

const getSubjectName = (subjectId: string): string => {
  switch (subjectId) {
    case 'math': return 'Mathematics';
    case 'physics': return 'Physics';
    case 'chemistry': return 'Chemistry';
    case 'biology': return 'Biology';
    case 'history': return 'History';
    case 'cs': return 'Computer Science';
    default: return 'subject';
  }
};

export const getKnowledgeBaseAnswer = async (
  query: string,
  subjectId: string
): Promise<KnowledgeBaseResponse> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = findRelevantEntry(query, subjectId);
      
      if (result) {
        resolve(result);
      } else {
        resolve({
          answer: generateDefaultResponse(query, subjectId),
          confidence: 0.3,
        });
      }
    }, 1000);
  });
};