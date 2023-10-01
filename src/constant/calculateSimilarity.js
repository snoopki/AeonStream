export function calculateSimilarity(str1, str2) {
  const lengthStr1 = str1.length;
  const lengthStr2 = str2.length;

  const editDistanceMatrix = Array.from(Array(lengthStr1 + 1), () => Array(lengthStr2 + 1).fill(0));

  Array.from({ length: lengthStr1 + 1 }).forEach((_, rowIndex) => {
    editDistanceMatrix[rowIndex][0] = rowIndex; 
  });

  Array.from({ length: lengthStr2 + 1 }).forEach((_, colIndex) => {
    editDistanceMatrix[0][colIndex] = colIndex; 
  });

  Array.from({ length: lengthStr1 }).forEach((_, rowIndex) => {
    Array.from({ length: lengthStr2 }).forEach((_, colIndex) => {
      const cost = str1[rowIndex] === str2[colIndex] ? 0 : 1; 
      editDistanceMatrix[rowIndex + 1][colIndex + 1] = Math.min(
        editDistanceMatrix[rowIndex][colIndex + 1] + 1, 
        editDistanceMatrix[rowIndex + 1][colIndex] + 1, 
        editDistanceMatrix[rowIndex][colIndex] + cost 
      );
    });
  });

  const maxLength = Math.max(lengthStr1, lengthStr2);
  const similarity = 1 - editDistanceMatrix[lengthStr1][lengthStr2] / maxLength;

  return similarity;
}
