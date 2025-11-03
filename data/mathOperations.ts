import type { MathOperation, MathDifficulty, MathQuestion, OperationConfig } from '@/types';

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Configuration for all math operations
 * Each operation defines how to generate questions and validate answers
 */
export const operationConfigs: Record<MathOperation, OperationConfig> = {
  addition: {
    id: 'addition',
    symbol: '+',
    emoji: '➕',
    numberRange: {
      easy: { min: 1, max: 10 },
      medium: { min: 1, max: 50 },
      hard: { min: 1, max: 100 }
    },
    generateQuestion: (difficulty: MathDifficulty): MathQuestion => {
      const range = operationConfigs.addition.numberRange[difficulty];
      const num1 = randomInRange(range.min, range.max);
      const num2 = randomInRange(range.min, range.max);
      return {
        operand1: num1,
        operand2: num2,
        operation: 'addition',
        correctAnswer: num1 + num2,
        displayText: `${num1} + ${num2} = ?`
      };
    },
    validate: (question: MathQuestion, answer: number): boolean => {
      return answer === question.correctAnswer;
    }
  },

  subtraction: {
    id: 'subtraction',
    symbol: '-',
    emoji: '➖',
    numberRange: {
      easy: { min: 1, max: 10 },
      medium: { min: 1, max: 50 },
      hard: { min: 1, max: 100 }
    },
    generateQuestion: (difficulty: MathDifficulty): MathQuestion => {
      const range = operationConfigs.subtraction.numberRange[difficulty];
      let num1 = randomInRange(range.min, range.max);
      let num2 = randomInRange(range.min, range.max);

      // Ensure positive result by making sure num1 >= num2
      if (num2 > num1) {
        [num1, num2] = [num2, num1];
      }

      return {
        operand1: num1,
        operand2: num2,
        operation: 'subtraction',
        correctAnswer: num1 - num2,
        displayText: `${num1} - ${num2} = ?`
      };
    },
    validate: (question: MathQuestion, answer: number): boolean => {
      return answer === question.correctAnswer;
    }
  },

  multiplication: {
    id: 'multiplication',
    symbol: '×',
    emoji: '✖️',
    numberRange: {
      easy: { min: 1, max: 5 },    // 1-5 times tables
      medium: { min: 1, max: 10 },  // 1-10 times tables
      hard: { min: 1, max: 12 }     // 1-12 times tables
    },
    generateQuestion: (difficulty: MathDifficulty): MathQuestion => {
      const range = operationConfigs.multiplication.numberRange[difficulty];
      const num1 = randomInRange(range.min, range.max);
      const num2 = randomInRange(range.min, range.max);
      return {
        operand1: num1,
        operand2: num2,
        operation: 'multiplication',
        correctAnswer: num1 * num2,
        displayText: `${num1} × ${num2} = ?`
      };
    },
    validate: (question: MathQuestion, answer: number): boolean => {
      return answer === question.correctAnswer;
    }
  },

  division: {
    id: 'division',
    symbol: '÷',
    emoji: '➗',
    numberRange: {
      easy: { min: 1, max: 5 },
      medium: { min: 1, max: 10 },
      hard: { min: 1, max: 12 }
    },
    generateQuestion: (difficulty: MathDifficulty): MathQuestion => {
      const range = operationConfigs.division.numberRange[difficulty];

      // Generate divisor and quotient, then calculate dividend
      // This ensures we always have whole number results
      const divisor = randomInRange(range.min, range.max);
      const quotient = randomInRange(range.min, range.max);
      const dividend = divisor * quotient;

      return {
        operand1: dividend,
        operand2: divisor,
        operation: 'division',
        correctAnswer: quotient,
        displayText: `${dividend} ÷ ${divisor} = ?`
      };
    },
    validate: (question: MathQuestion, answer: number): boolean => {
      return answer === question.correctAnswer;
    }
  }
};

/**
 * Get operation configuration by operation type
 */
export function getOperationConfig(operation: MathOperation): OperationConfig {
  return operationConfigs[operation];
}

/**
 * Get all available operations
 */
export function getAllOperations(): MathOperation[] {
  return Object.keys(operationConfigs) as MathOperation[];
}
