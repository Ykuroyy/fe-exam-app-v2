// 基本情報技術者試験 科目B 問題データベース
// アルゴリズム16問 + 情報セキュリティ4問 = 計20問

const questions = {
    algorithm: [
        {
            id: 'alg001',
            category: 'algorithm',
            text: '配列 a[1], a[2], ..., a[10] の要素をバブルソートで昇順に並べ替える。\n下記のプログラムにおいて、要素の交換が行われる最大回数はどれか。',
            code: `for i = 1 to 9
    for j = 1 to 10-i
        if a[j] > a[j+1] then
            a[j] と a[j+1] を交換
        end if
    end for
end for`,
            choices: [
                '45回',
                '90回',
                '100回',
                '無限回'
            ],
            correct: 0,
            explanation: 'バブルソートにおける交換の最大回数は、配列が完全に逆順になっている場合に発生します。\n要素数をnとすると、最大交換回数は n(n-1)/2 になります。\nn=10の場合：10×9/2 = 45回が正解です。',
            keyPoints: 'バブルソートの最悪計算量はO(n²)で、完全逆順の配列で最大交換回数 n(n-1)/2 が発生する。',
            relatedInfo: 'バブルソートは安定ソートですが、実用性は低く、教育目的で使用されることが多いアルゴリズムです。'
        },
        {
            id: 'alg002',
            category: 'algorithm',
            text: '挿入ソートのアルゴリズムを次のように実装した。\n配列の要素数が n のとき、最悪の場合の比較回数はどれか。',
            code: `for i = 2 to n
    key = a[i]
    j = i - 1
    while j >= 1 and a[j] > key
        a[j+1] = a[j]
        j = j - 1
    end while
    a[j+1] = key
end for`,
            choices: [
                'n-1',
                'n(n-1)/2',
                'n²',
                'n log n'
            ],
            correct: 1,
            explanation: '挿入ソートの最悪ケースは配列が逆順の場合です。\n各要素について、その要素より前のすべての要素と比較する必要があります。\n2番目の要素は1回、3番目は2回、...、n番目は(n-1)回比較するので、\n総比較回数は 1+2+...+(n-1) = n(n-1)/2 回になります。',
            keyPoints: '挿入ソートの最悪計算量はO(n²)。既にソートされた配列に対してはO(n)で動作する。',
            relatedInfo: '挿入ソートは小さなデータセットや部分的にソート済みの配列に対して効率的です。'
        },
        {
            id: 'alg003',
            category: 'algorithm',
            text: '配列 a[1..n] から値 x を線形探索で検索するプログラムである。\n要素が見つからない場合の比較回数はどれか。',
            code: `i = 1
while i <= n and a[i] != x
    i = i + 1
end while
if i <= n then
    return i  // 見つかった位置を返す
else
    return 0  // 見つからない
end if`,
            choices: [
                'n回',
                'n+1回',
                '2n回',
                '2n+1回'
            ],
            correct: 0,
            explanation: '線形探索で要素が見つからない場合、配列のすべての要素と比較する必要があります。\nwhile文の条件 "i <= n and a[i] != x" において：\n・a[1], a[2], ..., a[n] の各要素と x を比較（n回）\n・最後に i <= n の条件チェック時、i = n+1 となっており条件が偽となる\nしたがって、要素の比較回数は n回です。',
            keyPoints: '線形探索の計算量はO(n)。最悪ケースでは配列のすべての要素を確認する必要がある。',
            relatedInfo: '線形探索はソートされていない配列に対する最も基本的な探索方法です。'
        },
        {
            id: 'alg004',
            category: 'algorithm',
            text: 'ソート済み配列に対する二分探索のプログラムである。\n配列の要素数が16の場合、最大何回の比較で探索が完了するか。',
            code: `left = 1
right = n
while left <= right
    mid = (left + right) / 2  // 整数除算
    if a[mid] == x then
        return mid
    else if a[mid] < x then
        left = mid + 1
    else
        right = mid - 1
    end if
end while
return 0  // 見つからない`,
            choices: [
                '3回',
                '4回',
                '5回',
                '8回'
            ],
            correct: 2,
            explanation: '二分探索では、毎回探索範囲を半分に絞り込みます。\n要素数16の場合の探索過程：\n1回目：16個 → 8個\n2回目：8個 → 4個\n3回目：4個 → 2個\n4回目：2個 → 1個\n5回目：1個で最終判定\n\n最大比較回数は ⌊log₂(n)⌋ + 1 = ⌊log₂(16)⌋ + 1 = 4 + 1 = 5回です。',
            keyPoints: '二分探索の計算量はO(log n)。探索範囲を毎回半分にすることで高速に動作する。',
            relatedInfo: '二分探索を使用するためには、配列が事前にソートされている必要があります。'
        },
        {
            id: 'alg005',
            category: 'algorithm',
            text: '配列の最大値を求めるアルゴリズムである。\nn個の要素がある配列において、比較回数はどれか。',
            code: `max = a[1]
for i = 2 to n
    if a[i] > max then
        max = a[i]
    end if
end for
return max`,
            choices: [
                'n-1回',
                'n回',
                'n+1回',
                '2n回'
            ],
            correct: 0,
            explanation: '最大値を求めるアルゴリズムでは：\n・最初に max = a[1] で初期化\n・for文で i = 2 から n まで実行（n-1回繰り返し）\n・各回で a[i] > max の比較を1回実行\n\nしたがって、比較回数は n-1回になります。\nこれは最も効率的な方法で、すべての要素を確認する必要があるため、これより少ない比較では解けません。',
            keyPoints: '最大値（最小値）を求める問題では、必ずn-1回の比較が必要。これ以上効率化はできない。',
            relatedInfo: '分割統治法を使っても比較回数は変わりませんが、並列処理には適しています。'
        },
        {
            id: 'alg006',
            category: 'algorithm',
            text: 'スタックを配列で実装したプログラムである。\n次の操作を順に行った後、スタックの状態はどうなるか。\nPUSH(1), PUSH(2), POP(), PUSH(3), PUSH(4), POP(), POP()',
            code: `top = 0  // スタックポインタ
stack[100]  // スタック用配列

procedure PUSH(x)
    top = top + 1
    stack[top] = x
end procedure

procedure POP()
    if top > 0 then
        top = top - 1
        return stack[top + 1]
    end if
end procedure`,
            choices: [
                'スタックは空',
                'スタックに1が残っている',
                'スタックに3が残っている',
                'スタックに1,3が残っている'
            ],
            correct: 1,
            explanation: '操作を順に追跡します：\n1. PUSH(1): stack=[1], top=1\n2. PUSH(2): stack=[1,2], top=2\n3. POP(): 2を取り出し、stack=[1], top=1\n4. PUSH(3): stack=[1,3], top=2\n5. PUSH(4): stack=[1,3,4], top=3\n6. POP(): 4を取り出し、stack=[1,3], top=2\n7. POP(): 3を取り出し、stack=[1], top=1\n\n最終的にスタックには1が残っています。',
            keyPoints: 'スタックはLIFO（Last In, First Out）構造。最後に挿入された要素が最初に取り出される。',
            relatedInfo: 'スタックは関数呼び出し、式の評価、括弧の対応チェックなどで活用されます。'
        },
        {
            id: 'alg007',
            category: 'algorithm',
            text: 'キューを配列で実装したプログラムである。\n次の操作後、最初にDEQUEUEされる値はどれか。\nENQUEUE(A), ENQUEUE(B), DEQUEUE(), ENQUEUE(C), ENQUEUE(D)',
            code: `front = 1
rear = 1
queue[100]

procedure ENQUEUE(x)
    queue[rear] = x
    rear = rear + 1
end procedure

procedure DEQUEUE()
    if front < rear then
        result = queue[front]
        front = front + 1
        return result
    end if
end procedure`,
            choices: [
                'A',
                'B',
                'C',
                'D'
            ],
            correct: 1,
            explanation: '操作を順に追跡します：\n1. ENQUEUE(A): queue[1]=A, rear=2\n2. ENQUEUE(B): queue[2]=B, rear=3\n3. DEQUEUE(): Aを取り出し、front=2\n4. ENQUEUE(C): queue[3]=C, rear=4\n5. ENQUEUE(D): queue[4]=D, rear=5\n\n現在のキューの状態：front=2, rear=5\nqueue[2]=B, queue[3]=C, queue[4]=D\n次にDEQUEUEされるのは queue[front] = queue[2] = B です。',
            keyPoints: 'キューはFIFO（First In, First Out）構造。最初に挿入された要素が最初に取り出される。',
            relatedInfo: 'キューはプロセススケジューリング、幅優先探索、バッファリングなどで使用されます。'
        },
        {
            id: 'alg008',
            category: 'algorithm',
            text: '再帰関数による階乗計算のプログラムである。\nfact(4)を呼び出したとき、fact関数は何回呼び出されるか（最初の呼び出しを含む）。',
            code: `function fact(n)
    if n <= 1 then
        return 1
    else
        return n * fact(n-1)
    end if
end function`,
            choices: [
                '3回',
                '4回',
                '5回',
                '6回'
            ],
            correct: 2,
            explanation: 'fact(4)の再帰呼び出しを追跡します：\n1. fact(4): 4 * fact(3) を計算\n2. fact(3): 3 * fact(2) を計算\n3. fact(2): 2 * fact(1) を計算\n4. fact(1): n <= 1 なので 1 を返す（再帰終了）\n5. 計算結果: 2*1=2 → 3*2=6 → 4*6=24\n\nfact関数は合計5回呼び出されます（fact(4), fact(3), fact(2), fact(1)の4回 + 最初の呼び出し）。',
            keyPoints: '再帰関数では基底条件（ベースケース）が重要。無限再帰を防ぐ終了条件を必ず設定する。',
            relatedInfo: '階乗計算は再帰の典型例ですが、大きな値では反復処理の方が効率的です。'
        },
        {
            id: 'alg009',
            category: 'algorithm',
            text: '文字列の長さを求める再帰関数である。\n文字列 "ABC" に対して strlen("ABC") を呼び出すとき、関数は何回呼び出されるか。',
            code: `function strlen(s)
    if s[1] == '' then  // 空文字の場合
        return 0
    else
        return 1 + strlen(substring(s, 2))  // 2文字目以降の部分文字列
    end if
end function`,
            choices: [
                '2回',
                '3回',
                '4回',
                '5回'
            ],
            correct: 2,
            explanation: 'strlen("ABC")の再帰呼び出しを追跡します：\n1. strlen("ABC"): 1 + strlen("BC")\n2. strlen("BC"): 1 + strlen("C")\n3. strlen("C"): 1 + strlen("")\n4. strlen(""): 空文字なので 0 を返す\n\n計算結果: 0 → 1+0=1 → 1+1=2 → 1+2=3\nstrlen関数は合計4回呼び出されます。',
            keyPoints: '文字列処理の再帰では、空文字列が基底条件となることが多い。',
            relatedInfo: '実際のプログラムでは、文字列長を求める専用関数（length等）を使用する方が効率的です。'
        },
        {
            id: 'alg010',
            category: 'algorithm',
            text: '配列の要素を逆順に出力する再帰プログラムである。\n配列a=[1,2,3,4]に対してreverse(a,1,4)を呼び出すとき、出力される順序はどれか。',
            code: `procedure reverse(a, start, end)
    if start <= end then
        print a[end]
        reverse(a, start, end-1)
    end if
end procedure`,
            choices: [
                '1, 2, 3, 4',
                '4, 3, 2, 1',
                '1, 4, 2, 3',
                '3, 2, 1, 4'
            ],
            correct: 1,
            explanation: 'reverse(a,1,4)の実行過程を追跡します：\n1. reverse(a,1,4): a[4]=4 を出力, reverse(a,1,3)呼び出し\n2. reverse(a,1,3): a[3]=3 を出力, reverse(a,1,2)呼び出し\n3. reverse(a,1,2): a[2]=2 を出力, reverse(a,1,1)呼び出し\n4. reverse(a,1,1): a[1]=1 を出力, reverse(a,1,0)呼び出し\n5. reverse(a,1,0): start > end なので終了\n\n出力順序：4, 3, 2, 1',
            keyPoints: '再帰による配列処理では、インデックスの管理が重要。境界条件を正しく設定する。',
            relatedInfo: '配列の逆順出力は、スタックやクイックソートの分割処理でも応用されます。'
        },
        {
            id: 'alg011',
            category: 'algorithm',
            text: '文字列中の特定文字をカウントするプログラムである。\n文字列 "programming" 中の文字 "r" の個数を正しく求めるのはどれか。',
            code: `count = 0
str = "programming"
target = "r"
for i = 1 to length(str)
    if str[i] == target then
        count = count + 1
    end if
end for`,
            choices: [
                '1個',
                '2個',
                '3個',
                '4個'
            ],
            correct: 1,
            explanation: '文字列 "programming" を1文字ずつ確認します：\np-r-o-g-r-a-m-m-i-n-g\n\n位置2: "r" (カウント=1)\n位置5: "r" (カウント=2)\n\n文字 "r" は2個含まれています。\nプログラムは各文字を順番にチェックし、targetと一致する場合にcountを増加させるため、正しく2を返します。',
            keyPoints: '文字列処理では、インデックスの範囲と文字の比較方法に注意する。',
            relatedInfo: '実際のプログラミングでは、正規表現や専用ライブラリを使用することも多いです。'
        },
        {
            id: 'alg012',
            category: 'algorithm',
            text: '配列内で重複する要素を見つけるプログラムである。\n配列 [1,2,3,2,4,3,5] において、最初に見つかる重複要素はどれか。',
            code: `for i = 1 to n-1
    for j = i+1 to n
        if a[i] == a[j] then
            print "重複発見: " + a[i]
            return a[i]
        end if
    end for
end for`,
            choices: [
                '1',
                '2',
                '3',
                '4'
            ],
            correct: 1,
            explanation: '配列 [1,2,3,2,4,3,5] での重複検出過程：\n\ni=1 (a[1]=1): j=2～7で比較 → 重複なし\ni=2 (a[2]=2): \n  j=3 (a[3]=3): 2≠3\n  j=4 (a[4]=2): 2==2 → 重複発見！\n\n最初に見つかる重複要素は2です。\nプログラムは左から順番に各要素と、それより右にある全要素を比較するため、配列上で最初に現れる重複が検出されます。',
            keyPoints: '二重ループによる重複検出は O(n²) の計算量。大規模データではハッシュテーブルを使用すると効率的。',
            relatedInfo: 'ソート後の隣接要素比較や、ハッシュセットを使用した方法もあります。'
        },
        {
            id: 'alg013',
            category: 'algorithm',
            text: '選択ソートのアルゴリズムである。\n配列 [64, 34, 25, 12, 89] をソートする場合、1回目のパス後の配列の状態はどれか。',
            code: `for i = 1 to n-1
    min_index = i
    for j = i+1 to n
        if a[j] < a[min_index] then
            min_index = j
        end if
    end for
    swap(a[i], a[min_index])
end for`,
            choices: [
                '[12, 34, 25, 64, 89]',
                '[34, 64, 25, 12, 89]',
                '[25, 34, 64, 12, 89]',
                '[12, 64, 34, 25, 89]'
            ],
            correct: 0,
            explanation: '選択ソートの1回目のパス（i=1）：\n\n配列: [64, 34, 25, 12, 89]\n・min_index = 1 (値64)で開始\n・j=2: a[2]=34 < 64 → min_index = 2\n・j=3: a[3]=25 < 34 → min_index = 3\n・j=4: a[4]=12 < 25 → min_index = 4\n・j=5: a[5]=89 > 12 → 変更なし\n\na[1]=64 と a[4]=12 を交換\n結果: [12, 34, 25, 64, 89]',
            keyPoints: '選択ソートは各パスで未ソート部分の最小値を見つけて先頭に配置する。安定ソートではない。',
            relatedInfo: '選択ソートの計算量は常にO(n²)で、データの初期状態に依存しません。'
        },
        {
            id: 'alg014',
            category: 'algorithm',
            text: '以下のプログラムは配列の要素をトレースするものである。\n配列a=[5,2,8,1,9]に対して実行すると、変数sumの最終値はいくつになるか。',
            code: `sum = 0
max_val = a[1]
for i = 1 to 5
    if a[i] > max_val then
        max_val = a[i]
        sum = sum + a[i]
    end if
end for`,
            choices: [
                '9',
                '17',
                '25',
                '8'
            ],
            correct: 1,
            explanation: '配列a=[5,2,8,1,9]での実行過程：\n\n初期値: sum=0, max_val=5\ni=1: a[1]=5, 5>5は偽 → 何もしない\ni=2: a[2]=2, 2>5は偽 → 何もしない\ni=3: a[3]=8, 8>5は真 → max_val=8, sum=0+8=8\ni=4: a[4]=1, 1>8は偽 → 何もしない\ni=5: a[5]=9, 9>8は真 → max_val=9, sum=8+9=17\n\n最終的にsum=17になります。',
            keyPoints: 'トレース問題では、各ステップでの変数の値を正確に追跡することが重要。',
            relatedInfo: 'このようなアルゴリズムは、最大値の更新履歴を記録したい場合に使用されます。'
        },
        {
            id: 'alg015',
            category: 'algorithm',
            text: '次のプログラムでは配列の要素に対してmod演算を行っている。\n配列a=[17,23,31,45]に対して実行したとき、出力される値の順序はどれか。',
            code: `for i = 1 to 4
    result = a[i] mod 7
    print result
end for`,
            choices: [
                '3, 2, 3, 3',
                '2, 4, 3, 1',
                '1, 2, 4, 5',
                '3, 2, 4, 1'
            ],
            correct: 0,
            explanation: 'mod演算（剰余演算）の計算：\n\na[1] = 17: 17 ÷ 7 = 2 余り 3 → 17 mod 7 = 3\na[2] = 23: 23 ÷ 7 = 3 余り 2 → 23 mod 7 = 2\na[3] = 31: 31 ÷ 7 = 4 余り 3 → 31 mod 7 = 3\na[4] = 45: 45 ÷ 7 = 6 余り 3 → 45 mod 7 = 3\n\n出力される値の順序：3, 2, 3, 3',
            keyPoints: 'mod演算(a mod b)は aをbで割った余りを求める。結果は必ず0以上b未満の整数になる。',
            relatedInfo: 'mod演算はハッシュ関数、周期的な処理、チェックサム計算などで頻繁に使用されます。'
        },
        {
            id: 'alg016',
            category: 'algorithm',
            text: '以下は二次元配列の要素の合計を求めるプログラムである。\n3×3の配列 matrix で、各行の要素がすべて同じ値（1行目:2, 2行目:3, 3行目:4）の場合、\n変数totalの最終値はいくつになるか。',
            code: `total = 0
for i = 1 to 3
    for j = 1 to 3
        total = total + matrix[i][j]
    end for
end for`,
            choices: [
                '18',
                '27',
                '36',
                '9'
            ],
            correct: 1,
            explanation: '3×3配列の内容：\n[[2,2,2],\n [3,3,3],\n [4,4,4]]\n\n計算過程：\n1行目: 2+2+2 = 6\n2行目: 3+3+3 = 9\n3行目: 4+4+4 = 12\n\n合計: 6+9+12 = 27\n\nまたは：2×3 + 3×3 + 4×3 = 6+9+12 = 27',
            keyPoints: '二次元配列の処理では、行と列のインデックスを正しく管理することが重要。',
            relatedInfo: '二次元配列は行列演算、画像処理、ゲームの盤面表現などで広く使用されます。'
        }
    ],
    security: [
        {
            id: 'sec001',
            category: 'security',
            text: '共通鍵暗号化方式（対称鍵暗号）の特徴として正しいものはどれか。',
            choices: [
                '暗号化と復号化に同じ鍵を使用し、鍵の配送が課題となる',
                '暗号化と復号化に異なる鍵を使用し、鍵配送の問題がない',
                'デジタル署名の機能を提供する',
                '鍵の管理が公開鍵暗号より簡単である'
            ],
            correct: 0,
            explanation: '共通鍵暗号化方式（対称鍵暗号）は、暗号化と復号化に同一の鍵を使用します。\n主な特徴：\n・処理速度が高速\n・同一鍵を安全に配送する必要がある（鍵配送問題）\n・事前に送受信者間で鍵を共有する必要がある\n\nAES、DESなどが代表的なアルゴリズムです。',
            keyPoints: '共通鍵暗号の最大の課題は「鍵配送問題」。事前に安全な経路で鍵を共有する必要がある。',
            relatedInfo: '現在はAES（Advanced Encryption Standard）が標準的に使用されており、128bit、192bit、256bitの鍵長がある。'
        },
        {
            id: 'sec002',
            category: 'security',
            text: '公開鍵暗号化方式（非対称鍵暗号）におけるデジタル署名の目的として正しいものはどれか。',
            choices: [
                'データの機密性を保護する',
                '送信者の認証とデータの完全性を保証する',
                'データの圧縮率を向上させる',
                'ネットワークの通信速度を向上させる'
            ],
            correct: 1,
            explanation: 'デジタル署名の主な目的：\n\n1. 認証（Authentication）：送信者が本人であることを証明\n2. 完全性（Integrity）：データが改ざんされていないことを保証\n3. 否認防止（Non-repudiation）：送信者が送信を否認できない\n\nデジタル署名は送信者の秘密鍵で作成し、対応する公開鍵で検証します。',
            keyPoints: 'デジタル署名 = 認証 + 完全性 + 否認防止。機密性の保護は暗号化の役割。',
            relatedInfo: 'RSA、DSA、ECDSAなどのアルゴリズムがあり、電子契約や証明書で広く利用されている。'
        },
        {
            id: 'sec003',
            category: 'security',
            text: 'ファイアウォールの機能について、正しい説明はどれか。',
            choices: [
                'ウイルスの検出と駆除を自動的に行う',
                'ネットワークトラフィックを監視し、許可されていない通信を遮断する',
                'データベースへの不正アクセスを防ぐ',
                'Webサイトの改ざんを検出する'
            ],
            correct: 1,
            explanation: 'ファイアウォールの主な機能：\n\n1. パケットフィルタリング：IPアドレス、ポート番号による制御\n2. ステートフルインスペクション：通信状態を監視\n3. アプリケーションゲートウェイ：アプリケーション層の制御\n\nファイアウォールは主にネットワーク層からアプリケーション層でのアクセス制御を行います。',
            keyPoints: 'ファイアウォール = ネットワークの番人。予め定義されたルールに基づいて通信の可否を判断。',
            relatedInfo: '近年はNGFW（Next Generation Firewall）として、DPI（Deep Packet Inspection）機能も追加されている。'
        },
        {
            id: 'sec004',
            category: 'security',
            text: '以下の攻撃手法のうち、Webアプリケーションの脆弱性を狙った攻撃として最も適切でないものはどれか。',
            choices: [
                'SQLインジェクション攻撃',
                'クロスサイトスクリプティング（XSS）攻撃', 
                'DDoS（分散サービス拒否）攻撃',
                'クロスサイトリクエストフォージェリ（CSRF）攻撃'
            ],
            correct: 2,
            explanation: 'Webアプリケーション脆弱性を狙った攻撃：\n\n・SQLインジェクション：不正なSQL文を注入してDBを操作\n・XSS：悪意のあるスクリプトを注入してユーザ情報を窃取\n・CSRF：ユーザの意図しない操作を実行させる\n\nDDoS攻撃は大量のトラフィックでサービスを停止させる攻撃で、Webアプリの脆弱性を直接狙うものではありません。',
            keyPoints: 'DDoS攻撃はリソース枯渇攻撃。Webアプリの脆弱性攻撃とは性質が異なる。',
            relatedInfo: 'OWASP Top 10でWebアプリケーションの主要な脆弱性がまとめられており、セキュリティ対策の指針となる。'
        }
    ]
};

// 問題データのエクスポート（ブラウザ環境での使用）
if (typeof window !== 'undefined') {
    window.questions = questions;
}

// Node.js環境でのエクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questions;
}