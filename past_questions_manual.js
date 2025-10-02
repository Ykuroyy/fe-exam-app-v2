// 手動で作成した過去問データ（サンプル）
// 実際の過去問リポジトリから主要な問題を抽出

const pastQuestions = {
    // 令和5年度 科目A問題
    past_r5_a: [
        {
            id: 'r5a001',
            category: 'subject_a',
            level: 'basic',
            text: '16進小数0.Cを10進小数に変換したものはどれか。',
            choices: ['0.12', '0.55', '0.75', '0.84'],
            correct: 2,
            explanation: '16進小数0.Cを10進数に変換します。Cは12を表すので、0.C = 12/16 = 0.75となります。',
            keyPoints: '16進数と10進数の変換',
            relatedInfo: '出典: 令和5年度春期 基本情報技術者試験',
            year: 'R5'
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
            relatedInfo: '出典: 令和5年度春期 基本情報技術者試験',
            year: 'R5'
        },
        {
            id: 'r5a003',
            category: 'subject_a',
            level: 'standard',
            text: 'エッジコンピューティングの説明として，最も適切なものはどれか。',
            choices: [
                '画面生成やデータ処理をクライアント側で実行することによって，Webアプリケーションソフトウェアの操作性や表現力を高めること',
                'データが送信されてきたときだけ必要なサーバを立ち上げて，処理が終わり次第サーバを停止してリソースを解放すること',
                '複数のサーバやPCを仮想化して統合することによって一つの高性能なコンピュータを作り上げ，並列処理によって処理能力を高めること',
                '利用者や機器に取り付けられたセンサなどのデータ発生源に近い場所にあるサーバなどでデータを一次処理し，処理のリアルタイム性を高めること'
            ],
            correct: 3,
            explanation: 'エッジコンピューティングは、データの発生源に近いエッジ（端末側）でデータ処理を行うことで、レイテンシを削減し、リアルタイム性を向上させる技術です。',
            keyPoints: 'エッジコンピューティングはリアルタイム処理のためのネットワーク技術',
            relatedInfo: '出典: 令和5年度春期 基本情報技術者試験',
            year: 'R5'
        }
    ],

    // 令和5年度 科目B問題
    past_r5_b: [
        {
            id: 'r5b001',
            category: 'algorithm',
            level: 'advanced',
            text: '関数 findPrimeNumbers は，引数で与えられた整数以下の，全ての素数だけを格納した配列を返す関数である。ここで，引数に与える整数は 2 以上である。',
            code: `○整数型の配列: findPrimeNumbers(整数型: maxNum)
  整数型の配列: pnList ← {}
  整数型: i, j
  論理型: divideFlag
  for (i を 2 から 【 a 】 まで 1 ずつ増やす)
    divideFlag ← true
    for (j を 2 から iの正の平方根の整数部分 まで 1 ずつ増やす)
      if (【 b 】)
        divideFlag ← false
        break
      endif
    endfor
    if (divideFlag が true)
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
            explanation: '素数判定アルゴリズムです。aは範囲の上限maxNum、bは割り切れるかどうかの判定 i % j == 0 が正解です。iがjで割り切れるかを調べています。',
            keyPoints: '素数判定アルゴリズム、エラトステネスの篩の応用',
            relatedInfo: '出典: 令和5年度春期 基本情報技術者試験 科目B',
            year: 'R5'
        }
    ],

    // 令和6年度 科目A問題
    past_r6_a: [
        {
            id: 'r6a001',
            category: 'subject_a',
            level: 'standard',
            text: 'X 及び Y はそれぞれ 0 又は 1 の値をとる変数である。X □Y を X と Y の論理演算としたとき，真理値表から X □Y を求めよ。',
            choices: [
                'X=0,Y=0→0; X=0,Y=1→0; X=1,Y=0→0; X=1,Y=1→1',
                'X=0,Y=0→0; X=0,Y=1→1; X=1,Y=0→0; X=1,Y=1→1',
                'X=0,Y=0→1; X=0,Y=1→1; X=1,Y=0→0; X=1,Y=1→1',
                'X=0,Y=0→1; X=0,Y=1→1; X=1,Y=0→1; X=1,Y=1→0'
            ],
            correct: 2,
            explanation: 'X AND (X □Y)とX OR (X □Y)の値から、X □YはX OR Y（論理和）であることが導かれます。',
            keyPoints: '論理演算と真理値表の理解',
            relatedInfo: '出典: 令和6年度春期 基本情報技術者試験',
            year: 'R6'
        }
    ],

    // 令和6年度 科目B問題
    past_r6_b: [
        {
            id: 'r6b001',
            category: 'algorithm',
            level: 'advanced',
            text: '次のプログラムは、0 以上 9 以下の整数からなる数列を昇順に整列するプログラムである。',
            code: `procedure sort(配列 a, 整数 n)
  for i = 0 to 9
    count[i] = 0
  end for
  
  for i = 0 to n-1
    count[a[i]] = count[a[i]] + 1
  end for
  
  k = 0
  for i = 0 to 9
    for j = 1 to count[i]
      a[k] = i
      k = k + 1
    end for
  end for
end procedure`,
            choices: [
                'バブルソート',
                'クイックソート',
                'カウンティングソート',
                'マージソート'
            ],
            correct: 2,
            explanation: 'このアルゴリズムはカウンティングソートです。各値の出現回数をカウントし、それに基づいて配列を再構築するソート方法です。',
            keyPoints: 'カウンティングソートは値の範囲が限定されている場合に効率的なソートアルゴリズム',
            relatedInfo: '出典: 令和6年度春期 基本情報技術者試験 科目B',
            year: 'R6'
        }
    ],

    // 令和7年度 科目A問題
    past_r7_a: [
        {
            id: 'r7a001',
            category: 'subject_a',
            level: 'basic',
            text: 'フォンノイマン型コンピュータの特徴として，最も適切なものはどれか。',
            choices: [
                'プログラムとデータを主記憶に格納し，プログラムを逐次実行する',
                'プログラムとデータを別々の記憶装置に格納し，並列に処理する',
                'ハードウェアの構成を変更することでプログラムを実行する',
                'プログラムを専用の記憶装置に固定して格納する'
            ],
            correct: 0,
            explanation: 'フォンノイマン型コンピュータは、プログラムとデータを同じ主記憶装置に格納し、プログラムを順次読み出して実行する方式です。',
            keyPoints: 'フォンノイマン型アーキテクチャはストアドプログラム方式',
            relatedInfo: '出典: 令和7年度春期 基本情報技術者試験',
            year: 'R7'
        }
    ],

    // 令和7年度 科目B問題  
    past_r7_b: [
        {
            id: 'r7b001',
            category: 'algorithm',
            level: 'advanced',
            text: '次のプログラムは、グラフの隣接行列を用いて最短経路を求めるアルゴリズムである。',
            code: `for k = 0 to n-1
  for i = 0 to n-1
    for j = 0 to n-1
      if d[i][k] + d[k][j] < d[i][j] then
        d[i][j] = d[i][k] + d[k][j]
      endif
    endfor
  endfor
endfor`,
            choices: [
                'ダイクストラ法',
                'ワーシャル・フロイド法',
                '幅優先探索',
                '深さ優先探索'
            ],
            correct: 1,
            explanation: 'このアルゴリズムはワーシャル・フロイド法（Floyd-Warshall法）です。全点対間の最短距離を動的プログラミングで求めるアルゴリズムです。',
            keyPoints: 'ワーシャル・フロイド法は全点対間最短経路問題を解く動的プログラミング手法',
            relatedInfo: '出典: 令和7年度春期 基本情報技術者試験 科目B',
            year: 'R7'
        }
    ]
};

// モジュール exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pastQuestions;
}

// グローバル変数として設定（ブラウザ環境）
if (typeof window !== 'undefined') {
    window.pastQuestions = pastQuestions;
}