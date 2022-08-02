export function wordDeclension(num, words) {
  num = Math.abs(num) % 100;
  const n1 = num % 10;

  if (num > 10 && num < 20) return words[2];
  if (n1 > 1 && n1 < 5) return words[1];
  if (n1 === 1) return words[0];
  
  return words[2];
};
