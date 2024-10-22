  // Function to calculate the average score rounded to the nearest 0.5
export const calculateAverage = (listening, reading, writing, speaking) => {
    const scores = [listening, reading, writing, speaking].map(score => parseFloat(score) || 0);
    const average = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    return Math.round(average * 2) / 2; // Round to the nearest 0.5
  };