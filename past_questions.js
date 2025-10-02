
// 過去問データ（自動生成）
const pastQuestions = {
  "past_r5_a": [],
  "past_r5_b": [],
  "past_r6_a": [],
  "past_r6_b": [],
  "past_r7_a": [],
  "past_r7_b": []
};

// 統計
console.log('過去問データ統計:');
Object.keys(pastQuestions).forEach(key => {
    console.log(`${key}: ${pastQuestions[key].length}問`);
});

module.exports = pastQuestions;
