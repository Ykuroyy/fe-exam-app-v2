// 手動で過去問データを統合

// 令和5年度過去問（科目A）の一部
const r5_subject_a = [
    {
        id: 'r5a001',
        category: 'subject_a',
        level: 'basic',
        text: '16進小数0.Cを10進小数に変換したものはどれか。',
        choices: ['0.12', '0.55', '0.75', '0.84'],
        correct: 2,
        explanation: '16進小数0.Cを10進数に変換します。Cは12を表すので、0.C = 12/16 = 0.75となります。',
        keyPoints: '16進数と10進数の変換',
        relatedInfo: '出典: 令和5年度春期 基本情報技術者試験'
    },
    {
        id: 'r5a002',
        category: 'subject_a',
        level: 'standard',
        text: 'コンピュータの高速化技術の一つであるメモリインタリーブに関する記述として，適切なものはどれか。',
        choices: [
            '主記憶と入出力装置，又は主記憶同士のデータの受渡しをCPU経由でなく直接やり取りする方式',
            '主記憶にデータを送り出す際に，データをキャッシュに書き込み，キャッシュがあふれたときに主記憶へ書き込む方式',
            '主記憶のデータの一部をキャッシュにコピーすることによって，レジスタと主記憶とのアクセス速度の差を縮める方式',
            '主記憶を複数の独立して動作するグループに分けて，各グループに並列にアクセスする方式'
        ],
        correct: 3,
        explanation: 'メモリインタリーブは、主記憶を複数の独立したバンクに分けて、それぞれに並列にアクセスすることで、メモリアクセス速度を向上させる技術です。',
        keyPoints: 'メモリインタリーブはメモリアクセスの並列化技術',
        relatedInfo: '出典: 令和5年度春期 基本情報技術者試験'
    }
];

// 令和5年度過去問（科目B）の一部
const r5_subject_b = [
    {
        id: 'r5b001',
        category: 'algorithm',
        level: 'advanced',
        text: `次のプログラム中の【 a 】と【 b 】に入れる正しい答えの組合せを，解答群の中から選べ。ここで，配列の要素番号は 1 から始まる。

関数 findPrimeNumbers は，引数で与えられた整数以下の，全ての素数だけを格納した配列を返す関数である。ここで，引数に与える整数は 2 以上である。`,
        code: `○整数型の配列: findPrimeNumbers(整数型: maxNum)
  整数型の配列: pnList ← {} // 要素数0の配列
  整数型: i, j
  論理型: divideFlag
  for (i を 2 から 【 a 】 まで 1 ずつ増やす)
    divideFlag ← true
    for (j を 2 から iの正の平方根の整数部分 まで 1 ずつ増やす)
      if (【 b 】)
        divideFlag ← false
        αの行から始まる繰返し処理を終了する
      endif
    endfor
    if (divideFlag が true と等しい)
      pnListの末尾 に iの値 を追加する
    endif
  endfor
  return pnList`,
        choices: [
            'a: maxNum, b: i % j == 0',
            'a: maxNum, b: j % i == 0', 
            'a: sqrt(maxNum), b: i % j == 0',
            'a: sqrt(maxNum), b: j % i == 0'
        ],
        correct: 0,
        explanation: '素数判定アルゴリズムです。aは範囲の上限maxNum、bは割り切れるかどうかの判定 i % j == 0 が正解です。',
        keyPoints: '素数判定アルゴリズム、エラトステネスの篩の応用',
        relatedInfo: '出典: 令和5年度春期 基本情報技術者試験 科目B'
    }
];

// 令和6年度過去問（科目A）の一部
const r6_subject_a = [
    {
        id: 'r6a001',
        category: 'subject_a',
        level: 'standard',
        text: 'X 及び Y はそれぞれ 0 又は 1 の値をとる変数である。X □Y を X と Y の論理演算としたとき，次の真理値表が得られた。X □Y の真理値表はどれか。',
        choices: [
            'X=0,Y=0 → 0; X=0,Y=1 → 0; X=1,Y=0 → 0; X=1,Y=1 → 1',
            'X=0,Y=0 → 0; X=0,Y=1 → 1; X=1,Y=0 → 0; X=1,Y=1 → 1',
            'X=0,Y=0 → 1; X=0,Y=1 → 1; X=1,Y=0 → 0; X=1,Y=1 → 1',
            'X=0,Y=0 → 1; X=0,Y=1 → 1; X=1,Y=0 → 1; X=1,Y=1 → 0'
        ],
        correct: 2,
        explanation: 'X AND (X □Y)とX OR (X □Y)の値から、X □YはX OR Y（論理和）であることが導かれます。',
        keyPoints: '論理演算と真理値表の理解',
        relatedInfo: '出典: 令和6年度春期 基本情報技術者試験'
    }
];

// 上記データをJSONとして出力
const integrated_past_questions = {
    past_r5_a: r5_subject_a,
    past_r5_b: r5_subject_b,
    past_r6_a: r6_subject_a,
    past_r6_b: [],
    past_r7_a: [],
    past_r7_b: []
};

console.log('手動統合過去問データ:');
console.log(JSON.stringify(integrated_past_questions, null, 2));

module.exports = integrated_past_questions;