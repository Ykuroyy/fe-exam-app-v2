// 基本情報技術者試験 科目B 問題データベース
// アルゴリズム60問 + 情報セキュリティ4問 = 計64問
// 徹底的な科目B対策 - 前回250点から合格点突破を目指す

const questions = {
    algorithm: [
        {
            id: 'alg001',
            category: 'algorithm',
            level: 'basic',
            text: '配列 a[1], a[2], ..., a[10] の要素をバブルソートで昇順に並べ替える。下記のプログラムと図表を参照して、要素の交換が行われる最大回数はどれか。',
            code: `for i = 1 to 9
    for j = 1 to 10-i
        if a[j] > a[j+1] then
            a[j] と a[j+1] を交換
        end if
    end for
end for`,
            pdfUrl: 'sample_algorithm_diagram.html', // 図表ファイル
            choices: [
                '45回',
                '90回',
                '100回',
                '無限回'
            ],
            correct: 0,
            explanation: 'バブルソートにおける交換の最大回数は、配列が完全に逆順になっている場合に発生します。要素数をnとすると、最大交換回数は n(n-1)/2 になります。n=10の場合：10×9/2 = 45回が正解です。',
            keyPoints: 'バブルソートの最悪計算量はO(n²)で、完全逆順の配列で最大交換回数 n(n-1)/2 が発生する。',
            relatedInfo: 'バブルソートは安定ソートですが、実用性は低く、教育目的で使用されることが多いアルゴリズムです。'
        },
        {
            id: 'alg002',
            category: 'algorithm',
            level: 'standard',
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
            level: 'basic',
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
            level: 'standard',
            text: 'ソート済み配列に対する二分探索のプログラムである。下記の図表と併せて、配列の要素数が16の場合、最大何回の比較で探索が完了するかを求めよ。',
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
            pdfUrl: 'binary_search_diagram.html', // 二分探索図解
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
            level: 'basic',
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
            level: 'standard',
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
            level: 'standard',
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
            level: 'basic',
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
            level: 'basic',
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
            level: 'standard',
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
            level: 'basic',
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
            level: 'standard',
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
            level: 'basic',
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
            level: 'standard',
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
            level: 'basic',
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
            level: 'basic',
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
        },
        {
            id: 'alg017',
            category: 'algorithm',
            level: 'basic',
            text: 'マージソートの分割段階で、要素数8の配列を完全に分割するのに必要な分割回数はどれか。',
            code: `function mergeSort(arr, left, right)
    if left < right then
        mid = (left + right) / 2
        mergeSort(arr, left, mid)     // 左半分を分割
        mergeSort(arr, mid+1, right)  // 右半分を分割
        merge(arr, left, mid, right)  // マージ
    end if
end function`,
            choices: [
                '2回',
                '3回',
                '4回',
                '8回'
            ],
            correct: 1,
            explanation: 'マージソートでは配列を再帰的に半分に分割していきます。\n要素数8の場合：\n1回目：8要素 → 4要素×2\n2回目：4要素 → 2要素×4\n3回目：2要素 → 1要素×8\n\n要素が1個になるまで分割するので、log₂(8) = 3回の分割が必要です。',
            keyPoints: 'マージソートの分割回数は log₂(n)。分割統治法の典型例で、安定ソート。',
            relatedInfo: 'マージソートの計算量は常にO(n log n)で、最悪ケースでも性能が悪化しません。'
        },
        {
            id: 'alg018',
            category: 'algorithm',
            level: 'standard',
            text: 'クイックソートのパーティション操作で、配列[3,7,8,5,2,1,9,4]においてピボットを最初の要素(3)とした場合、1回目のパーティション後の配列はどれか。',
            code: `function partition(arr, low, high)
    pivot = arr[low]  // 最初の要素をピボットとする
    i = low + 1
    for j = low + 1 to high
        if arr[j] < pivot then
            swap(arr[i], arr[j])
            i = i + 1
        end if
    end for
    swap(arr[low], arr[i-1])
    return i - 1
end function`,
            choices: [
                '[2,1,3,5,7,8,9,4]',
                '[1,2,3,5,7,8,9,4]',
                '[2,1,3,7,8,5,9,4]',
                '[3,2,1,7,8,5,9,4]'
            ],
            correct: 0,
            explanation: 'ピボット3でのパーティション過程：\n配列[3,7,8,5,2,1,9,4]、i=2\n\nj=2(7): 7≥3, 何もしない\nj=3(8): 8≥3, 何もしない\nj=4(5): 5≥3, 何もしない\nj=5(2): 2<3, swap(arr[2],arr[5])→[3,2,8,5,7,1,9,4], i=3\nj=6(1): 1<3, swap(arr[3],arr[6])→[3,2,1,5,7,8,9,4], i=4\nj=7(9): 9≥3, 何もしない\nj=8(4): 4≥3, 何もしない\n\n最後にswap(arr[1],arr[3])→[2,1,3,5,7,8,9,4]',
            keyPoints: 'クイックソートのパーティションは、ピボットより小さい要素を左側に集める処理。',
            relatedInfo: 'ピボットの選択方法（先頭、末尾、中央値など）によって性能が変わります。'
        },
        {
            id: 'alg019',
            category: 'algorithm',
            level: 'basic',
            text: 'ハッシュテーブルにおいて、ハッシュ関数 h(x) = x mod 7 を使用する。値 15, 22, 8, 29 をこの順で挿入するとき、衝突が発生する回数はどれか。',
            code: `hash_table[7]  // サイズ7のハッシュテーブル

function insert(value)
    index = value mod 7
    if hash_table[index] == empty then
        hash_table[index] = value
    else
        // 衝突発生
        collision_count++
        // 線形探査で次の空きを探す
    end if
end function`,
            choices: [
                '0回',
                '1回',
                '2回',
                '3回'
            ],
            correct: 3,
            explanation: 'ハッシュ値の計算と挿入：\n\n15: 15 mod 7 = 1 → hash_table[1] = 15\n22: 22 mod 7 = 1 → 衝突発生（1回目）\n8: 8 mod 7 = 1 → 衝突発生（2回目）\n29: 29 mod 7 = 1 → 衝突発生（3回目）\n\nすべて同じハッシュ値1になるため、2回目以降はすべて衝突となります。\n衝突回数は3回です。',
            keyPoints: 'ハッシュ衝突は、異なるキーが同じハッシュ値を持つときに発生。解決法には線形探査、チェイン法などがある。',
            relatedInfo: 'ハッシュテーブルの性能は衝突の频度に大きく依存するため、良いハッシュ関数の設計が重要です。'
        },
        {
            id: 'alg020',
            category: 'algorithm',
            level: 'standard',
            text: '連結リストから特定の値を削除するプログラムである。値5を削除する場合、何回のポインタ更新が必要か。\nリスト: [1]→[3]→[5]→[7]→[9]',
            code: `structure Node
    data
    next
end structure

function deleteValue(head, target)
    if head.data == target then
        return head.next  // 先頭を削除
    end if
    
    current = head
    while current.next != null
        if current.next.data == target then
            current.next = current.next.next
            return head
        end if
        current = current.next
    end while
end function`,
            choices: [
                '1回',
                '2回',
                '3回',
                '0回'
            ],
            correct: 0,
            explanation: 'リスト[1]→[3]→[5]→[7]→[9]で値5を削除：\n\n1. current = head（ノード1を指す）\n2. current.next.data = 3 ≠ 5, current = ノード3\n3. current.next.data = 5 = 5, 一致！\n4. current.next = current.next.next\n   （ノード3のnextをノード7に変更）\n\n結果: [1]→[3]→[7]→[9]\nポインタ更新は1回（ノード3のnextポインタのみ）です。',
            keyPoints: '連結リストの削除では、削除対象の直前のノードのnextポインタを更新する。',
            relatedInfo: '双方向連結リストの場合は、前後両方のポインタ更新が必要になります。'
        },
        {
            id: 'alg021',
            category: 'algorithm',
            level: 'advanced',
            text: 'ダイクストラ法による最短経路探索で、頂点Aから各頂点への最短距離を求める。次の更新ステップで確定する頂点はどれか。\n現在の状態: A(0確定), B(7), C(9), D(20), E(20), F(11)',
            code: `distances = [A:0, B:7, C:9, D:20, E:20, F:11]
confirmed = [A]
while 未確定の頂点が存在する
    // 最小距離の未確定頂点を選択
    u = 未確定頂点の中で距離が最小の頂点
    confirmed.add(u)
    // 隣接頂点の距離を更新
    for each 頂点v adjacent to u
        distances[v] = min(distances[v], distances[u] + weight(u,v))
    end for
end while`,
            choices: [
                '頂点B（距離7）',
                '頂点C（距離9）',
                '頂点F（距離11）',
                '頂点D（距離20）'
            ],
            correct: 0,
            explanation: 'ダイクストラ法では、未確定の頂点の中から最小距離の頂点を選択して確定します。\n\n現在の未確定頂点と距離：\n- B: 距離7\n- C: 距離9\n- D: 距離20\n- E: 距離20\n- F: 距離11\n\nこの中で最小距離は7なので、頂点Bが次に確定されます。\n確定後は、Bの隣接頂点の距離を更新します。',
            keyPoints: 'ダイクストラ法は貪欲法の典型例。各ステップで局所最適解（最小距離頂点）を選択。',
            relatedInfo: '負の重みがある場合はベルマン・フォード法、全頂点間の最短路はフロイド・ワーシャル法を使用。'
        },
        {
            id: 'alg022',
            category: 'algorithm',
            level: 'basic',
            text: '幅優先探索（BFS）でグラフを探索する際、キューに要素を格納する。探索開始点をAとして、隣接リストが A:[B,C], B:[A,D,E], C:[A,F], D:[B], E:[B,F], F:[C,E] のとき、キューから取り出される順序はどれか。',
            code: `queue = [A]  // 開始点Aをキューに追加
visited = [A]

while queue is not empty
    current = dequeue()
    print current
    for each neighbor of current
        if neighbor not in visited then
            enqueue(neighbor)
            visited.add(neighbor)
        end if
    end for
end while`,
            choices: [
                'A, B, C, D, E, F',
                'A, B, C, D, F, E',
                'A, C, B, F, D, E',
                'A, B, D, C, E, F'
            ],
            correct: 0,
            explanation: 'BFSの実行過程（アルファベット順で隣接頂点を処理）：\n\n1. queue=[A], dequeue A, enqueue B,C → queue=[B,C]\n2. queue=[B,C], dequeue B, enqueue D,E → queue=[C,D,E]\n3. queue=[C,D,E], dequeue C, enqueue F → queue=[D,E,F]\n4. queue=[D,E,F], dequeue D → queue=[E,F]\n5. queue=[E,F], dequeue E → queue=[F]\n6. queue=[F], dequeue F → queue=[]\n\n取り出し順序：A, B, C, D, E, F',
            keyPoints: 'BFS（幅優先探索）はキューを使用し、各レベルの頂点を順番に探索する。最短経路探索に適している。',
            relatedInfo: '深さ優先探索（DFS）はスタックを使用し、より深い頂点から探索します。'
        },
        {
            id: 'alg023',
            category: 'algorithm',
            level: 'standard',
            text: '深さ優先探索（DFS）で二分木を前順走査（pre-order）する際の訪問順序はどれか。\n木構造: \n    A\n   / \\\n  B   C\n / \\ / \\\nD  E F  G',
            code: `function preOrder(node)
    if node != null then
        print node.data      // ノード訪問
        preOrder(node.left)  // 左の子を再帰的に処理
        preOrder(node.right) // 右の子を再帰的に処理
    end if
end function`,
            choices: [
                'A, B, D, E, C, F, G',
                'D, B, E, A, F, C, G',
                'A, B, C, D, E, F, G',
                'D, E, B, F, G, C, A'
            ],
            correct: 0,
            explanation: '前順走査（pre-order）の実行過程：\n\n1. A訪問 → 左の子Bへ\n2. B訪問 → 左の子Dへ\n3. D訪問 → 子がないのでBの右の子Eへ\n4. E訪問 → 子がないのでAの右の子Cへ\n5. C訪問 → 左の子Fへ\n6. F訪問 → 子がないのでCの右の子Gへ\n7. G訪問 → 完了\n\n訪問順序：A, B, D, E, C, F, G',
            keyPoints: '前順走査：ノード→左の子→右の子の順。中順走査（in-order）、後順走査（post-order）もある。',
            relatedInfo: '中順走査は二分探索木でソート済み順序を得る際に使用されます。'
        },
        {
            id: 'alg024',
            category: 'algorithm',
            level: 'advanced',
            text: '動的プログラミングによるフィボナッチ数列の計算で、F(6)を求める際のメモ化テーブルの更新回数はどれか。（F(0)=0, F(1)=1とする）',
            code: `memo = []

function fibonacci(n)
    if n <= 1 then
        return n
    end if
    
    if memo[n] is not calculated then
        memo[n] = fibonacci(n-1) + fibonacci(n-2)
        // メモ化テーブル更新
    end if
    
    return memo[n]
end function`,
            choices: [
                '5回',
                '6回',
                '7回',
                '8回'
            ],
            correct: 0,
            explanation: 'F(6)計算時のメモ化テーブル更新：\n\n1. F(2) = F(1) + F(0) = 1 + 0 = 1 → memo[2] = 1（1回目）\n2. F(3) = F(2) + F(1) = 1 + 1 = 2 → memo[3] = 2（2回目）\n3. F(4) = F(3) + F(2) = 2 + 1 = 3 → memo[4] = 3（3回目）\n4. F(5) = F(4) + F(3) = 3 + 2 = 5 → memo[5] = 5（4回目）\n5. F(6) = F(5) + F(4) = 5 + 3 = 8 → memo[6] = 8（5回目）\n\nメモ化テーブルの更新回数は5回です。',
            keyPoints: '動的プログラミングは重複する部分問題を記録して効率化。計算量をO(2^n)からO(n)に改善。',
            relatedInfo: 'メモ化（記憶化）は上から下への方法。ボトムアップ方式もあります。'
        },
        {
            id: 'alg025',
            category: 'algorithm',
            level: 'standard',
            text: 'ヒープソートにおいて、配列[4,10,3,5,1,8,9,2]から最大ヒープを構築した場合、ルートノードの値はどれか。',
            code: `function buildMaxHeap(arr)
    n = length(arr)
    for i = n/2 down to 1
        heapify(arr, i, n)
    end for
end function

function heapify(arr, i, n)
    largest = i
    left = 2 * i
    right = 2 * i + 1
    
    if left <= n and arr[left] > arr[largest] then
        largest = left
    end if
    if right <= n and arr[right] > arr[largest] then
        largest = right
    end if
    if largest != i then
        swap(arr[i], arr[largest])
        heapify(arr, largest, n)
    end if
end function`,
            choices: [
                '4',
                '8',
                '9',
                '10'
            ],
            correct: 3,
            explanation: '最大ヒープ構築過程：\n初期配列: [4,10,3,5,1,8,9,2]\n\n1. インデックス4から開始してheapify\n2. インデックス3: heapify(3) → 9と5を比較、9が大きい\n3. インデックス2: heapify(2) → 10,1,8を比較、10が最大\n4. インデックス1: heapify(1) → 4,10,9を比較、10が最大\n   → swap(4,10) → [10,4,3,5,1,8,9,2]\n   → さらにheapify → [10,5,9,4,1,8,3,2]\n\n最大ヒープのルートノードは最大値の10です。',
            keyPoints: '最大ヒープでは親ノード≥子ノード。ルートが最大値、ヒープソートの効率的な実装に使用。',
            relatedInfo: 'ヒープは完全二分木で、配列で効率的に実装できます。優先度付きキューの実装にも使用。'
        },
        {
            id: 'alg026',
            category: 'algorithm',
            level: 'standard',
            text: '二分探索木（BST）に値 [50, 30, 70, 20, 40, 60, 80] をこの順で挿入した場合、値40を探索する際に訪問するノードの順序はどれか。',
            code: `function search(root, target)
    current = root
    while current != null
        print current.data  // 訪問ノード
        if current.data == target then
            return current
        else if target < current.data then
            current = current.left
        else
            current = current.right
        end if
    end while
    return null
end function`,
            choices: [
                '50, 30, 40',
                '50, 70, 60, 40',
                '50, 30, 20, 40',
                '50, 40'
            ],
            correct: 0,
            explanation: '二分探索木の構築結果：\n      50\n     /  \\\n   30    70\n  / \\   / \\\n 20  40 60  80\n\n40の探索過程：\n1. root(50)を訪問: 40 < 50なので左の子へ\n2. 30を訪問: 40 > 30なので右の子へ\n3. 40を訪問: 40 == 40で発見！\n\n訪問ノードの順序：50, 30, 40',
            keyPoints: '二分探索木では左の子<親<右の子が成立。探索の計算量は平均O(log n)。',
            relatedInfo: '木が偏ると最悪計算量はO(n)になるため、平衡二分探索木（AVL木、赤黒木）が使用されます。'
        },
        {
            id: 'alg027',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは文字列の回文（palindrome）判定を行う。文字列 "racecar" に対して実行すると、比較回数は何回になるか。',
            code: `function isPalindrome(str)
    n = length(str)
    count = 0
    for i = 1 to n/2
        count = count + 1
        if str[i] != str[n-i+1] then
            return false
        end if
    end for
    return true
end function`,
            choices: [
                '2回',
                '3回',
                '4回',
                '7回'
            ],
            correct: 1,
            explanation: '文字列 "racecar" の回文判定：\n長さn = 7, n/2 = 3（整数除算）\n\n比較過程：\ni=1: str[1]="r" と str[7]="r" を比較（1回目）→ 一致\ni=2: str[2]="a" と str[6]="a" を比較（2回目）→ 一致  \ni=3: str[3]="c" と str[5]="c" を比較（3回目）→ 一致\n\n文字列の半分まで比較するので、比較回数は3回です。\n中央の文字str[4]="e"は比較不要です。',
            keyPoints: '回文判定では文字列の半分だけ比較すれば十分。計算量はO(n/2) = O(n)。',
            relatedInfo: '実際の実装では、先頭と末尾から同時に中央に向かって比較することも多いです。'
        },
        {
            id: 'alg028',
            category: 'algorithm',
            level: 'advanced',
            text: 'エラトステネスの篩で30以下の素数を求める際、篩い落とされる最初の5個の合成数はどれか。',
            code: `function sieveOfEratosthenes(n)
    prime = array[2..n] initialized to true
    
    for p = 2 to √n
        if prime[p] == true then
            // pの倍数を篩い落とす
            for i = p*p to n step p
                prime[i] = false
                print "篩い落とし: " + i
            end for
        end if
    end for
end function`,
            choices: [
                '4, 6, 8, 9, 10',
                '4, 6, 8, 10, 12',
                '6, 8, 9, 10, 12',
                '4, 8, 9, 12, 15'
            ],
            correct: 0,
            explanation: 'エラトステネスの篩の実行過程：\n\np=2での篩い落とし：\n- i=4（2×2）: 4を篩い落とし（1番目）\n- i=6（2×3）: 6を篩い落とし（2番目）\n- i=8（2×4）: 8を篩い落とし（3番目）\n- i=10（2×5）: 10を篩い落とし（4番目）\n- i=12（2×6）: 12を篩い落とし\n- ...\n\np=3での篩い落とし：\n- i=9（3×3）: 9を篩い落とし（5番目）\n\n最初の5個の合成数：4, 6, 8, 10, 9（実際の篩い落とし順序）',
            keyPoints: 'エラトステネスの篩は、小さい素数の倍数から順番に合成数を除去。効率的な素数生成法。',
            relatedInfo: '計算量はO(n log log n)。大量の素数を効率的に生成でき、暗号分野でも重要です。'
        },
        {
            id: 'alg029',
            category: 'algorithm',
            level: 'basic',
            text: 'ユークリッドの互除法で最大公約数gcd(48, 18)を求める際、除算が実行される回数はどれか。',
            code: `function gcd(a, b)
    count = 0
    while b != 0
        count = count + 1
        temp = a mod b
        print a + " ÷ " + b + " = " + (a/b) + " 余り " + temp
        a = b
        b = temp
    end while
    return a
end function`,
            choices: [
                '2回',
                '3回',
                '4回',
                '5回'
            ],
            correct: 1,
            explanation: 'ユークリッドの互除法でgcd(48, 18)を計算：\n\n1回目: 48 ÷ 18 = 2 余り 12\n       a=18, b=12\n2回目: 18 ÷ 12 = 1 余り 6  \n       a=12, b=6\n3回目: 12 ÷ 6 = 2 余り 0\n       a=6, b=0\n\nb=0になったので終了。gcd(48, 18) = 6\n除算が実行された回数は3回です。',
            keyPoints: 'ユークリッドの互除法は効率的なgcd計算法。計算量はO(log(min(a,b)))。',
            relatedInfo: '拡張ユークリッド互除法では、ax + by = gcd(a,b)の解も同時に求められます。'
        },
        {
            id: 'alg030',
            category: 'algorithm',
            level: 'standard',
            text: '次のプログラムは配列の要素を循環シフトするものである。配列[1,2,3,4,5]を右に2つシフトした結果はどれか。',
            code: `function rotateRight(arr, k)
    n = length(arr)
    k = k mod n  // kがnより大きい場合の対応
    
    // 3回の反転で循環シフトを実現
    reverse(arr, 1, n)         // 全体を反転
    reverse(arr, 1, k)         // 最初のk個を反転
    reverse(arr, k+1, n)       // 残りを反転
end function

function reverse(arr, start, end)
    while start < end
        swap(arr[start], arr[end])
        start = start + 1
        end = end - 1
    end while
end function`,
            choices: [
                '[4,5,1,2,3]',
                '[3,4,5,1,2]',
                '[2,3,4,5,1]',
                '[5,1,2,3,4]'
            ],
            correct: 0,
            explanation: '配列[1,2,3,4,5]を右に2つシフト：\n\nk=2, n=5\n1. 全体反転: [5,4,3,2,1]\n2. 最初の2個を反転: [4,5,3,2,1]\n3. 残りの3個を反転: [4,5,1,2,3]\n\n結果: [4,5,1,2,3]\n\n直感的には、後ろの2個の要素が前に移動します：\n[1,2,3,4,5] → [4,5,1,2,3]',
            keyPoints: '配列の循環シフトは3回の反転で効率的に実現可能。追加メモリ不要でO(n)時間。',
            relatedInfo: '他の方法として、余りを使ったインデックス計算や、一時配列を使う方法もあります。'
        },
        {
            id: 'alg031',
            category: 'algorithm',
            level: 'advanced',
            text: '次のプログラムはLCS（最長共通部分列）の長さを求める動的プログラミング解法である。文字列"ABCD"と"ACBF"のLCSの長さはいくつか。',
            code: `function LCS(str1, str2)
    m = length(str1)
    n = length(str2)
    dp[m+1][n+1]
    
    for i = 0 to m
        for j = 0 to n
            if i == 0 or j == 0 then
                dp[i][j] = 0
            else if str1[i] == str2[j] then
                dp[i][j] = dp[i-1][j-1] + 1
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            end if
        end for
    end for
    return dp[m][n]
end function`,
            choices: [
                '2',
                '3',
                '4',
                '1'
            ],
            correct: 0,
            explanation: 'LCS計算のDPテーブル：\n\n    ""  A  C  B  F\n""   0  0  0  0  0\nA    0  1  1  1  1\nB    0  1  1  2  2\nC    0  1  2  2  2\nD    0  1  2  2  2\n\n計算過程：\n- str1[1]="A" == str2[1]="A" → dp[1][1] = 1\n- str1[3]="C" == str2[2]="C" → dp[3][2] = 2\n- 最終的にdp[4][4] = 2\n\n共通部分列は"AC"で、長さは2です。',
            keyPoints: 'LCS問題は動的プログラミングの典型例。文字列の類似度計算やdiffツールで使用。',
            relatedInfo: '編集距離（レーベンシュタイン距離）とは異なる概念。バイオインフォマティクスでも重要。'
        },
        {
            id: 'alg032',
            category: 'algorithm',
            level: 'standard',
            text: 'トポロジカルソートをカーンのアルゴリズムで実行する。次の有向グラフ（A→B, A→C, B→D, C→D）に対して、どの頂点から処理が開始されるか。',
            code: `function topologicalSort(graph)
    // 各頂点の入次数を計算
    indegree = calculateIndegree(graph)
    queue = []
    
    // 入次数0の頂点をキューに追加
    for each vertex v
        if indegree[v] == 0 then
            enqueue(v)
        end if
    end for
    
    while queue is not empty
        u = dequeue()
        print u  // トポロジカル順序で出力
        for each neighbor v of u
            indegree[v] = indegree[v] - 1
            if indegree[v] == 0 then
                enqueue(v)
            end if
        end for
    end while
end function`,
            choices: [
                '頂点A',
                '頂点B',
                '頂点C',
                '頂点D'
            ],
            correct: 0,
            explanation: 'グラフの入次数計算：\nA→B, A→C, B→D, C→D\n\n各頂点の入次数：\n- A: 0（他の頂点からの矢印なし）\n- B: 1（Aからの矢印）\n- C: 1（Aからの矢印）\n- D: 2（BとCからの矢印）\n\n入次数0の頂点はAのみなので、Aから処理が開始されます。\nトポロジカルソート結果：A → B,C → D',
            keyPoints: 'トポロジカルソートは有向非循環グラフ（DAG）の頂点を依存関係順に並べる。カーンのアルゴリズムは入次数を利用。',
            relatedInfo: 'タスクスケジューリング、コンパイラの依存解析、パッケージ管理システムなどで活用。'
        },
        {
            id: 'alg033',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは配列内の偶数の個数をカウントする。配列[1,2,3,4,5,6,7,8,9,10]に対して実行すると、mod演算は何回実行されるか。',
            code: `function countEven(arr)
    count = 0
    mod_operations = 0
    for i = 1 to length(arr)
        mod_operations = mod_operations + 1
        if arr[i] mod 2 == 0 then
            count = count + 1
        end if
    end for
    return count
end function`,
            choices: [
                '5回',
                '10回',
                '20回',
                '15回'
            ],
            correct: 1,
            explanation: '配列[1,2,3,4,5,6,7,8,9,10]での実行：\n\n各要素に対してmod演算を1回実行：\n- arr[1]=1: 1 mod 2（1回目）\n- arr[2]=2: 2 mod 2（2回目）\n- arr[3]=3: 3 mod 2（3回目）\n- arr[4]=4: 4 mod 2（4回目）\n- ...\n- arr[10]=10: 10 mod 2（10回目）\n\n配列の要素数が10個なので、mod演算は10回実行されます。',
            keyPoints: '偶数判定にはmod 2を使用。結果が0なら偶数、1なら奇数。ビット演算（& 1）でも判定可能。',
            relatedInfo: 'ビット演算 x & 1 は x mod 2 より高速ですが、可読性を考慮してmod演算を使うことも多い。'
        },
        {
            id: 'alg034',
            category: 'algorithm',
            level: 'standard',
            text: '次のプログラムは二つのソート済み配列をマージする。配列A=[1,4,7]と配列B=[2,5,6,8]をマージする際、比較回数は何回になるか。',
            code: `function merge(A, B)
    i = 1, j = 1, k = 1
    C[length(A) + length(B)]
    comparisons = 0
    
    while i <= length(A) and j <= length(B)
        comparisons = comparisons + 1
        if A[i] <= B[j] then
            C[k] = A[i]
            i = i + 1
        else
            C[k] = B[j]
            j = j + 1
        end if
        k = k + 1
    end while
    
    // 残りの要素をコピー（比較なし）
    while i <= length(A)
        C[k] = A[i]
        i = i + 1, k = k + 1
    end while
end function`,
            choices: [
                '5回',
                '6回',
                '7回',
                '4回'
            ],
            correct: 1,
            explanation: 'マージ過程の比較：\nA=[1,4,7], B=[2,5,6,8]\n\n1. A[1]=1 と B[1]=2 比較: 1≤2 → C[1]=1, i=2（1回目）\n2. A[2]=4 と B[1]=2 比較: 4>2 → C[2]=2, j=2（2回目）\n3. A[2]=4 と B[2]=5 比較: 4≤5 → C[3]=4, i=3（3回目）\n4. A[3]=7 と B[2]=5 比較: 7>5 → C[4]=5, j=3（4回目）\n5. A[3]=7 と B[3]=6 比較: 7>6 → C[5]=6, j=4（5回目）\n6. A[3]=7 と B[4]=8 比較: 7≤8 → C[6]=7, i=4（6回目）\n\niがlength(A)を超えたので終了。残りのB[4]=8は比較なしでコピー。\n比較回数：6回',
            keyPoints: 'ソート済み配列のマージは線形時間O(m+n)。比較回数は通常 min(m+n-1, m, n) 程度。',
            relatedInfo: 'マージソートの中核処理。外部ソートでも重要な操作です。'
        },
        {
            id: 'alg035',
            category: 'algorithm',
            level: 'advanced',
            text: 'KMP法（Knuth-Morris-Pratt）で文字列検索を行う。パターン"ABABC"に対するnext配列（失敗関数）の値はどれか。',
            code: `function computeNext(pattern)
    m = length(pattern)
    next[m]
    next[1] = 0
    j = 0
    
    for i = 2 to m
        while j > 0 and pattern[i] != pattern[j+1]
            j = next[j]
        end while
        if pattern[i] == pattern[j+1] then
            j = j + 1
        end if
        next[i] = j
    end for
    return next
end function`,
            choices: [
                '[0, 0, 1, 2, 0]',
                '[0, 0, 1, 2, 3]',
                '[0, 1, 0, 1, 0]',
                '[0, 0, 2, 1, 0]'
            ],
            correct: 0,
            explanation: 'パターン"ABABC"のnext配列計算：\n\ni=1: A → next[1] = 0\ni=2: B → A≠B, j=0, next[2] = 0\ni=3: A → B≠A, j=0, A==A, j=1, next[3] = 1\ni=4: B → A≠B, j=next[1]=0, B==B, j=1, next[4] = 2  \ni=5: C → B≠C, j=next[2]=0, A≠C, j=0, next[5] = 0\n\nnext配列：[0, 0, 1, 2, 0]\n\nこれは各位置での最長共通接頭辞・接尾辞の長さを表します。',
            keyPoints: 'KMP法のnext配列は、不一致時の効率的なスキップを可能にする。文字列検索をO(m+n)で実現。',
            relatedInfo: '他の文字列検索アルゴリズムには Boyer-Moore法、Rabin-Karp法などがあります。'
        },
        {
            id: 'alg036',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは配列を左回転（左シフト）する。配列[1,2,3,4,5]を2回左回転した結果はどれか。',
            code: `function leftRotate(arr, k)
    n = length(arr)
    k = k mod n  // kがnより大きい場合の対応
    
    for i = 1 to k
        temp = arr[1]
        for j = 1 to n-1
            arr[j] = arr[j+1]  // 左にシフト
        end for
        arr[n] = temp  // 先頭要素を末尾に
    end for
end function`,
            choices: [
                '[3,4,5,1,2]',
                '[4,5,1,2,3]',
                '[2,3,4,5,1]',
                '[5,1,2,3,4]'
            ],
            correct: 0,
            explanation: '配列[1,2,3,4,5]の左回転：\n\n1回目の左回転：\n- temp = 1\n- [2,3,4,5,_] に左シフト\n- [2,3,4,5,1] （tempを末尾に）\n\n2回目の左回転：\n- temp = 2  \n- [3,4,5,1,_] に左シフト\n- [3,4,5,1,2] （tempを末尾に）\n\n結果：[3,4,5,1,2]',
            keyPoints: '配列の回転は循環操作。左回転k回 = 右回転(n-k)回。効率的な実装には反転を3回使う方法もある。',
            relatedInfo: '実用的にはモジュロ演算を使った直接計算や、スライス操作が使用されることが多いです。'
        },
        {
            id: 'alg037',
            category: 'algorithm',  
            level: 'standard',
            text: 'カウンティングソートで配列[4,2,2,8,3,3,1]をソートする。各要素の度数を数えた結果、インデックス2の度数はいくつか。',
            code: `function countingSort(arr, max_val)
    count[max_val + 1] = {0}  // 度数配列を0で初期化
    
    // 各要素の度数をカウント
    for i = 1 to length(arr)
        count[arr[i]] = count[arr[i]] + 1
    end for
    
    // 累積度数を計算
    for i = 1 to max_val
        count[i] = count[i] + count[i-1]
    end for
    
    // ソート済み配列を構築
    // ... 省略
end function`,
            choices: [
                '1回',
                '2回',
                '3回',
                '0回'
            ],
            correct: 1,
            explanation: '配列[4,2,2,8,3,3,1]での度数カウント：\n\ncount配列の初期状態：[0,0,0,0,0,0,0,0,0]\n\n各要素の処理：\n- 4: count[4]++ → count[4]=1\n- 2: count[2]++ → count[2]=1  \n- 2: count[2]++ → count[2]=2\n- 8: count[8]++ → count[8]=1\n- 3: count[3]++ → count[3]=1\n- 3: count[3]++ → count[3]=2\n- 1: count[1]++ → count[1]=1\n\nインデックス2（値2）の度数は2回です。',
            keyPoints: 'カウンティングソートは比較を使わない整数ソート。値の範囲が小さいときO(n+k)で高速。',
            relatedInfo: 'バケットソート、基数ソートの基礎となる技術。範囲が大きいと空間計算量が問題になる。'
        },
        {
            id: 'alg038',
            category: 'algorithm',
            level: 'advanced',
            text: '0-1ナップサック問題を動的プログラミングで解く。重量制限W=5、アイテム[(重量2,価値3), (重量3,価値4), (重量4,価値5), (重量5,価値6)]の場合、最大価値はいくつか。',
            code: `function knapsack(weights, values, n, W)
    dp[n+1][W+1]
    
    for i = 0 to n
        for w = 0 to W
            if i == 0 or w == 0 then
                dp[i][w] = 0
            else if weights[i] <= w then
                dp[i][w] = max(values[i] + dp[i-1][w-weights[i]], dp[i-1][w])
            else
                dp[i][w] = dp[i-1][w]
            end if
        end for
    end for
    return dp[n][W]
end function`,
            choices: [
                '6',
                '7',
                '8',
                '9'
            ],
            correct: 1,
            explanation: 'DPテーブルの計算（重量制限W=5）：\n\n    w=0 1 2 3 4 5\ni=0  0  0 0 0 0 0\ni=1  0  0 3 3 3 3  // (2,3)\ni=2  0  0 3 4 4 7  // (3,4)\ni=3  0  0 3 4 5 7  // (4,5)\ni=4  0  0 3 4 5 7  // (5,6)\n\n最適解の組み合わせ：\n- アイテム1(重量2,価値3) + アイテム2(重量3,価値4) = 重量5,価値7\n- アイテム4(重量5,価値6)単体も重量5,価値6\n\n最大価値は7です。',
            keyPoints: '0-1ナップサック問題は動的プログラミングの典型例。各アイテムを取るか取らないかの2択。',
            relatedInfo: 'グリーディ法では最適解が得られない。分数ナップサック問題とは異なる。'
        },
        {
            id: 'alg039',
            category: 'algorithm',
            level: 'standard',
            text: '線形探索で配列から特定の値を全て見つけるプログラムである。配列[3,1,4,1,5,9,1,6]で値1を探索すると、何回の比較で全ての1が見つかるか。',
            code: `function findAll(arr, target)
    positions = []
    comparisons = 0
    
    for i = 1 to length(arr)
        comparisons = comparisons + 1
        if arr[i] == target then
            positions.add(i)
        end if
    end for
    return positions
end function`,
            choices: [
                '3回',
                '6回',
                '8回',
                '5回'
            ],
            correct: 2,
            explanation: '配列[3,1,4,1,5,9,1,6]での値1の探索：\n\n各要素との比較：\ni=1: arr[1]=3, 3==1? No（1回目）\ni=2: arr[2]=1, 1==1? Yes（2回目）→ 位置2を記録\ni=3: arr[3]=4, 4==1? No（3回目）\ni=4: arr[4]=1, 1==1? Yes（4回目）→ 位置4を記録\ni=5: arr[5]=5, 5==1? No（5回目）\ni=6: arr[6]=9, 9==1? No（6回目）\ni=7: arr[7]=1, 1==1? Yes（7回目）→ 位置7を記録\ni=8: arr[8]=6, 6==1? No（8回目）\n\n全ての要素を確認するので比較回数は8回です。',
            keyPoints: '全ての該当要素を見つける場合、配列の最後まで探索する必要がある。計算量は常にO(n)。',
            relatedInfo: 'ソート済み配列なら二分探索で最初と最後の出現位置を見つけて効率化可能。'
        },
        {
            id: 'alg040',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは配列の要素を2つずつペアにして処理する。配列[1,2,3,4,5,6,7,8]に対して実行すると、何組のペアが処理されるか。',
            code: `function processPairs(arr)
    n = length(arr)
    pairs_count = 0
    
    for i = 1 to n step 2
        if i + 1 <= n then
            pairs_count = pairs_count + 1
            print "ペア: " + arr[i] + ", " + arr[i+1]
        else
            print "残り: " + arr[i]
        end if
    end for
    return pairs_count
end function`,
            choices: [
                '3組',
                '4組',
                '5組',
                '8組'
            ],
            correct: 1,
            explanation: '配列[1,2,3,4,5,6,7,8]での処理：\n\ni=1: arr[1]=1, arr[2]=2 → ペア(1,2) 1組目\ni=3: arr[3]=3, arr[4]=4 → ペア(3,4) 2組目  \ni=5: arr[5]=5, arr[6]=6 → ペア(5,6) 3組目\ni=7: arr[7]=7, arr[8]=8 → ペア(7,8) 4組目\n\n配列長8は偶数なので、すべて2つずつペアになります。\n処理されるペア数は4組です。',
            keyPoints: '配列長がnの場合、ペア数は⌊n/2⌋。奇数長なら最後の要素が余る。',
            relatedInfo: '並列処理や、隣接要素の比較処理などでよく使われるパターンです。'
        },
        {
            id: 'alg041',
            category: 'algorithm',
            level: 'standard',
            text: 'Fisher-Yatesシャッフルアルゴリズムで配列[A,B,C,D]をシャッフルする。このアルゴリズムでは、何回のランダム選択が必要か。',
            code: `function shuffle(arr)
    n = length(arr)
    random_selections = 0
    
    for i = n down to 2
        random_selections = random_selections + 1
        j = random(1, i)  // 1からiまでのランダムな整数
        swap(arr[i], arr[j])
    end for
    return random_selections
end function`,
            choices: [
                '2回',
                '3回',
                '4回',
                '5回'
            ],
            correct: 1,
            explanation: 'Fisher-Yatesシャッフルの実行過程：\n配列[A,B,C,D]、n=4\n\ni=4: random(1,4)でjを選択 → swap(arr[4], arr[j]) 1回目\ni=3: random(1,3)でjを選択 → swap(arr[3], arr[j]) 2回目\ni=2: random(1,2)でjを選択 → swap(arr[2], arr[j]) 3回目\ni=1: ループ終了（i=1まで）\n\nランダム選択回数は3回です。\n要素数nの配列では(n-1)回のランダム選択が必要です。',
            keyPoints: 'Fisher-Yatesシャッフルは均等なランダム配列を生成。計算量O(n)で効率的。',
            relatedInfo: '他のシャッフル法には Durstenfeld shuffle の変形もありますが、基本原理は同じです。'
        },
        {
            id: 'alg042',
            category: 'algorithm',
            level: 'advanced',
            text: 'ベルマン・フォード法で負の重みを含むグラフの最短経路を求める。頂点数4のグラフで、何回の緩和処理を実行すれば十分か。',
            code: `function bellmanFord(graph, start)
    V = number_of_vertices(graph)
    distance[V] = {∞, ∞, ..., ∞}
    distance[start] = 0
    
    // V-1回の緩和処理
    for i = 1 to V-1
        for each edge (u,v) with weight w
            if distance[u] + w < distance[v] then
                distance[v] = distance[u] + w
            end if
        end for
    end for
    
    // 負の閉路検出
    for each edge (u,v) with weight w
        if distance[u] + w < distance[v] then
            return "負の閉路が存在"
        end if
    end for
    return distance
end function`,
            choices: [
                '2回',
                '3回',
                '4回',
                '5回'
            ],
            correct: 1,
            explanation: 'ベルマン・フォード法の緩和回数：\n\nV=4（頂点数4）の場合：\n- 最短経路の計算：V-1 = 3回の緩和処理\n- 負の閉路検出：追加で1回の確認処理\n\n最短距離を正しく計算するには3回の緩和処理で十分です。\n\n理論的根拠：負の閉路がなければ、最短経路は最大でもV-1個の辺を通る。各緩和処理で少なくとも1つの最短距離が確定するため、V-1回で全て確定する。',
            keyPoints: 'ベルマン・フォード法は負の重みを扱える。計算量O(VE)、ダイクストラ法より遅いが汎用性が高い。',
            relatedInfo: 'SPFA (Shortest Path Faster Algorithm)は改良版で、実用的にはより高速です。'
        },
        {
            id: 'alg043',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは配列の中央値を求める（要素数は奇数とする）。配列[7,2,9,1,5,3,8]をソートせずに中央値を見つけるアルゴリズムの比較回数は最低何回か。',
            code: `function findMedian(arr)
    n = length(arr)
    k = (n + 1) / 2  // 中央値のランク
    return quickSelect(arr, 1, n, k)
end function

function quickSelect(arr, left, right, k)
    if left == right then
        return arr[left]
    end if
    
    pivot_index = partition(arr, left, right)
    
    if k == pivot_index then
        return arr[pivot_index]
    else if k < pivot_index then
        return quickSelect(arr, left, pivot_index-1, k)
    else
        return quickSelect(arr, pivot_index+1, right, k)
    end if
end function`,
            choices: [
                '6回',
                '7回',
                '12回',
                '21回'
            ],
            correct: 0,
            explanation: 'QuickSelectアルゴリズムでの中央値探索：\n配列[7,2,9,1,5,3,8]、k=4（4番目の要素）\n\n最良ケース：パーティションが理想的な位置で分割される場合\n1回目：7要素 → 比較回数6回（要素数-1）\n2回目以降：分割された部分配列で継続\n\n平均的には O(n) = 7+3.5+1.75+... ≈ 14回程度\n最良ケースでは約6回の比較で済む可能性があります。\n\nソートして中央値を取る方法(O(n log n))より効率的です。',
            keyPoints: 'QuickSelectは中央値や k番目要素を平均O(n)で見つける。ソート不要で効率的。',
            relatedInfo: 'Median of Mediansアルゴリズムを使えば最悪ケースでもO(n)を保証できます。'
        },
        {
            id: 'alg044',
            category: 'algorithm',
            level: 'standard',
            text: 'Z字状パターンで二次元配列を走査するプログラムである。3×3配列に対して実行すると、要素はどの順序で訪問されるか。',
            code: `function zigzagTraversal(matrix, rows, cols)
    for i = 1 to rows
        if i mod 2 == 1 then  // 奇数行：左から右
            for j = 1 to cols
                print matrix[i][j]
            end for
        else  // 偶数行：右から左
            for j = cols down to 1
                print matrix[i][j]
            end for
        end if
    end for
end function

// 3×3配列の例
matrix = [[1,2,3],
          [4,5,6], 
          [7,8,9]]`,
            choices: [
                '1,2,3,6,5,4,7,8,9',
                '1,2,3,4,5,6,7,8,9',
                '1,4,7,2,5,8,3,6,9',
                '1,2,3,6,9,8,7,4,5'
            ],
            correct: 0,
            explanation: 'Z字状走査の実行過程：\n\n1行目（i=1、奇数）：左から右\n- matrix[1][1]=1, matrix[1][2]=2, matrix[1][3]=3\n\n2行目（i=2、偶数）：右から左  \n- matrix[2][3]=6, matrix[2][2]=5, matrix[2][1]=4\n\n3行目（i=3、奇数）：左から右\n- matrix[3][1]=7, matrix[3][2]=8, matrix[3][3]=9\n\n訪問順序：1,2,3,6,5,4,7,8,9',
            keyPoints: 'Z字走査は画像処理や行列の特殊な走査で使用。奇数行と偶数行で方向を変える。',
            relatedInfo: 'スパイラル（螺旋）走査や、対角線走査など、他の走査パターンもあります。'
        },
        {
            id: 'alg045',
            category: 'algorithm',
            level: 'advanced',
            text: 'A*探索アルゴリズムでゴールまでの最適パスを見つける。評価関数f(n)=g(n)+h(n)において、次に展開すべきノードを選ぶ基準は何か。',
            code: `function AStar(start, goal)
    open_set = {start}
    g_score[start] = 0
    f_score[start] = heuristic(start, goal)
    
    while open_set is not empty
        current = node in open_set with lowest f_score
        
        if current == goal then
            return reconstruct_path(current)
        end if
        
        open_set.remove(current)
        closed_set.add(current)
        
        for each neighbor of current
            if neighbor in closed_set then
                continue
            end if
            
            tentative_g = g_score[current] + distance(current, neighbor)
            if neighbor not in open_set or tentative_g < g_score[neighbor] then
                g_score[neighbor] = tentative_g
                f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
                if neighbor not in open_set then
                    open_set.add(neighbor)
                end if
            end if
        end for
    end while
end function`,
            choices: [
                'g(n)が最小のノード',
                'h(n)が最小のノード', 
                'f(n)=g(n)+h(n)が最小のノード',
                '最も最近追加されたノード'
            ],
            correct: 2,
            explanation: 'A*探索アルゴリズムの選択基準：\n\nf(n) = g(n) + h(n) が最小のノードを選択\n\nここで：\n- g(n): スタートからノードnまでの実コスト\n- h(n): ノードnからゴールまでの推定コスト（ヒューリスティック関数）\n- f(n): ノードnを通る経路の推定総コスト\n\nf(n)が最小ということは、「現在までのコスト + ゴールまでの推定コスト」が最も有望なノードを意味します。',
            keyPoints: 'A*は最良優先探索の一種。ヒューリスティック関数が許容的なら最適解を保証。',
            relatedInfo: 'ゲームAI、経路探索、パズル解法で広く使用。ダイクストラ法の発展形でもある。'
        },
        {
            id: 'alg046',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは文字列内の単語数をカウントする。文字列"Hello world programming"に対して実行すると、空白文字は何回検出されるか。',
            code: `function countWords(str)
    words = 0
    spaces = 0
    in_word = false
    
    for i = 1 to length(str)
        if str[i] == ' ' then
            spaces = spaces + 1
            if in_word then
                words = words + 1
                in_word = false
            end if
        else
            in_word = true
        end if
    end for
    
    if in_word then
        words = words + 1
    end if
    
    return words
end function`,
            choices: [
                '1回',
                '2回',
                '3回',
                '4回'
            ],
            correct: 1,
            explanation: '文字列"Hello world programming"の解析：\n\n文字列を1文字ずつチェック：\nH-e-l-l-o-[ ]-w-o-r-l-d-[ ]-p-r-o-g-r-a-m-m-i-n-g\n\n空白文字の位置：\n- 6文字目：" "（1回目）\n- 12文字目：" "（2回目）\n\n空白文字は2回検出されます。\nこのプログラムは空白区切りで単語を識別するため、空白数+1が単語数になります（この場合は3単語）。',
            keyPoints: '文字列の単語カウントでは空白文字が区切り文字。連続する空白の処理に注意が必要。',
            relatedInfo: '実際の実装では、タブや改行なども空白文字として扱うことが多いです。'
        },
        {
            id: 'alg047',
            category: 'algorithm',
            level: 'standard', 
            text: 'ハノイの塔の問題で、円盤3枚を移動する最小手数は何手か。',
            code: `function hanoi(n, from, to, aux)
    if n == 1 then
        print "円盤" + n + "を" + from + "から" + to + "へ移動"
        return 1
    else
        moves1 = hanoi(n-1, from, aux, to)      // n-1枚を補助柱へ
        print "円盤" + n + "を" + from + "から" + to + "へ移動"
        moves2 = hanoi(n-1, aux, to, from)      // n-1枚を目的柱へ
        return moves1 + 1 + moves2
    end if
end function`,
            choices: [
                '5手',
                '6手',
                '7手',
                '8手'
            ],
            correct: 2,
            explanation: 'ハノイの塔の最小手数の公式：2^n - 1\n\nn=3の場合：2³ - 1 = 8 - 1 = 7手\n\n実際の手順：\n1. 円盤1を A→C\n2. 円盤2を A→B  \n3. 円盤1を C→B\n4. 円盤3を A→C\n5. 円盤1を B→A\n6. 円盤2を B→C\n7. 円盤1を A→C\n\n合計7手で完了します。',
            keyPoints: 'ハノイの塔は再帰アルゴリズムの典型例。最小手数は2^n-1で指数的に増加。',
            relatedInfo: '分割統治法の概念を学ぶのに適した問題。実用的には、タワー・オブ・ハノイパズルとして知られる。'
        },
        {
            id: 'alg048',
            category: 'algorithm',
            level: 'advanced',
            text: 'ストラッセンのアルゴリズムで2×2行列同士を乗算する場合、通常の行列乗算と比べて乗算回数をいくつ削減できるか。',
            code: `// 通常の2×2行列乗算：8回の乗算
function normalMultiply(A, B)
    C[1][1] = A[1][1]*B[1][1] + A[1][2]*B[2][1]  // 2回の乗算
    C[1][2] = A[1][1]*B[1][2] + A[1][2]*B[2][2]  // 2回の乗算  
    C[2][1] = A[2][1]*B[1][1] + A[2][2]*B[2][1]  // 2回の乗算
    C[2][2] = A[2][1]*B[1][2] + A[2][2]*B[2][2]  // 2回の乗算
    return C
end function

// ストラッセンのアルゴリズム：7回の乗算
function strassenMultiply(A, B)
    P1 = A[1][1] * (B[1][2] - B[2][2])
    P2 = (A[1][1] + A[1][2]) * B[2][2]
    P3 = (A[2][1] + A[2][2]) * B[1][1]
    P4 = A[2][2] * (B[2][1] - B[1][1])
    P5 = (A[1][1] + A[2][2]) * (B[1][1] + B[2][2])
    P6 = (A[1][2] - A[2][2]) * (B[2][1] + B[2][2])
    P7 = (A[1][1] - A[2][1]) * (B[1][1] + B[1][2])
    
    // 7回の乗算で計算完了
    return C
end function`,
            choices: [
                '0回（削減なし）',
                '1回削減',
                '2回削減',  
                '3回削減'
            ],
            correct: 1,
            explanation: 'ストラッセンアルゴリズムでの乗算回数比較：\n\n通常の行列乗算：\n- 2×2行列の場合：8回の乗算が必要\n- 各要素 = 2つの積の和 × 4要素 = 8回\n\nストラッセンアルゴリズム：\n- 2×2行列の場合：7回の乗算で済む\n- P1～P7の7つの積を計算\n- これらの組み合わせで結果行列を構成\n\n削減回数：8 - 7 = 1回削減\n\n大きな行列（n×n）では計算量がO(n³)からO(n^2.807)に改善されます。',
            keyPoints: 'ストラッセンアルゴリズムは分割統治法による行列乗算の高速化。加算回数は増えるが乗算回数を削減。',
            relatedInfo: '実装の複雑さと定数項の大きさから、小さな行列では通常の方法の方が速いことが多い。'
        },
        {
            id: 'alg049',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは配列から最大値と最小値を同時に見つける。配列[8,3,5,4,7,6,1,2]に対して実行すると、何回の比較が必要か。',
            code: `function findMinMax(arr)
    if length(arr) == 1 then
        return (arr[1], arr[1])
    end if
    
    max_val = arr[1]
    min_val = arr[1] 
    comparisons = 0
    
    for i = 2 to length(arr)
        comparisons = comparisons + 1
        if arr[i] > max_val then
            max_val = arr[i]
        end if
        
        comparisons = comparisons + 1  
        if arr[i] < min_val then
            min_val = arr[i]
        end if
    end for
    
    return (min_val, max_val)
end function`,
            choices: [
                '7回',
                '14回',
                '15回',
                '16回'
            ],
            correct: 1,
            explanation: '配列[8,3,5,4,7,6,1,2]での最大最小値探索：\n\n初期値：max_val=8, min_val=8\n\ni=2(3): 3>8? No, 3<8? Yes → 2回の比較\ni=3(5): 5>8? No, 5<3? No → 2回の比較  \ni=4(4): 4>8? No, 4<3? No → 2回の比較\ni=5(7): 7>8? No, 7<3? No → 2回の比較\ni=6(6): 6>8? No, 6<3? No → 2回の比較\ni=7(1): 1>8? No, 1<3? Yes → 2回の比較\ni=8(2): 2>8? No, 2<1? No → 2回の比較\n\n合計：7要素 × 2回 = 14回の比較',
            keyPoints: '最大値・最小値を同時に求める際は、各要素について2回の比較が必要。より効率的な方法もある。',
            relatedInfo: 'ペア比較を使った方法では⌈3n/2⌉-2回まで削減可能（要素をペアで比較してから大小判定）。'
        },
        {
            id: 'alg050',
            category: 'algorithm',
            level: 'standard',
            text: 'Kadaneのアルゴリズムで最大部分配列和を求める。配列[-2,1,-3,4,-1,2,1,-5,4]に対して実行すると、最大部分配列和はいくつか。',
            code: `function maxSubArray(arr)
    max_so_far = arr[1]
    max_ending_here = arr[1]
    
    for i = 2 to length(arr)
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)
        print "i=" + i + ": current=" + max_ending_here + ", max=" + max_so_far
    end for
    
    return max_so_far
end function`,
            choices: [
                '4',
                '5', 
                '6',
                '7'
            ],
            correct: 2,
            explanation: 'Kadaneのアルゴリズムの実行過程：\n配列[-2,1,-3,4,-1,2,1,-5,4]\n\n初期：max_so_far=-2, max_ending_here=-2\ni=2(1): max_ending_here=max(1,-2+1)=1, max_so_far=1\ni=3(-3): max_ending_here=max(-3,1-3)=-2, max_so_far=1\ni=4(4): max_ending_here=max(4,-2+4)=4, max_so_far=4\ni=5(-1): max_ending_here=max(-1,4-1)=3, max_so_far=4\ni=6(2): max_ending_here=max(2,3+2)=5, max_so_far=5\ni=7(1): max_ending_here=max(1,5+1)=6, max_so_far=6\ni=8(-5): max_ending_here=max(-5,6-5)=1, max_so_far=6\ni=9(4): max_ending_here=max(4,1+4)=5, max_so_far=6\n\n最大部分配列和は6（部分配列[4,-1,2,1]の和）',
            keyPoints: 'Kadaneのアルゴリズムは動的プログラミングで最大部分配列和をO(n)で求める効率的な方法。',
            relatedInfo: '最大部分配列問題は分割統治法でも解けるが、Kadaneの方が実装が簡単で高速。'
        },
        {
            id: 'alg051',
            category: 'algorithm',
            level: 'advanced',
            text: 'Union-Find（素集合データ構造）でパスの圧縮を行う。find(7)を実行する際、ツリーの高さが3から1に短縮される場合、何個のノードの親ポインタが更新されるか。',
            code: `function find(x)
    updates = 0
    original_x = x
    
    // ルートを見つける
    while parent[x] != x
        x = parent[x]
    end while
    root = x
    
    // パス圧縮：経路上の全ノードを直接ルートに接続
    x = original_x
    while parent[x] != x
        next = parent[x]
        parent[x] = root
        updates = updates + 1
        x = next
    end while
    
    return root
end function

// 例：7→5→3→3（ルート）の経路`,
            choices: [
                '1個',
                '2個',
                '3個',
                '4個'
            ],
            correct: 1,
            explanation: 'Union-Findのパス圧縮での親ポインタ更新：\n\n初期状態：7→5→3→3（高さ3）\nfind(7)実行時の圧縮：\n\n1. x=7: parent[7]=5 → parent[7]=3に更新（1個目）\n2. x=5: parent[5]=3 → parent[5]=3に更新（変更なし）\n\n結果：7→3, 5→3, 3→3（高さ1）\n\n実際に親ポインタが変更されるのは、元々ルートを直接指していなかったノードのみ。\nこの例では、ノード7の親ポインタのみが5から3に変更されるため、更新数は1個です。\n\n※ノード5は元々ルート3を指していたので更新不要',
            keyPoints: 'Union-Findのパス圧縮は、find操作の計算量を改善。アッカーマン関数の逆関数程度まで償却計算量が削減。',
            relatedInfo: 'Union by rankと組み合わせることで、更に効率的な実装が可能です。'
        },
        {
            id: 'alg052',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは数値を二進数文字列に変換する。十進数13を二進数に変換する際、while文は何回実行されるか。',
            code: `function toBinary(n)
    if n == 0 then
        return "0"
    end if
    
    binary = ""
    iterations = 0
    
    while n > 0
        iterations = iterations + 1
        if n mod 2 == 1 then
            binary = "1" + binary
        else
            binary = "0" + binary
        end if
        n = n / 2  // 整数除算
    end while
    
    return binary
end function`,
            choices: [
                '3回',
                '4回',
                '5回',
                '6回'
            ],
            correct: 1,
            explanation: '十進数13を二進数に変換する過程：\n\n1回目：n=13, 13 mod 2=1, binary="1", n=6\n2回目：n=6, 6 mod 2=0, binary="01", n=3  \n3回目：n=3, 3 mod 2=1, binary="101", n=1\n4回目：n=1, 1 mod 2=1, binary="1101", n=0\n\nn=0になったのでループ終了\nwhile文は4回実行されます。\n\n結果：13₁₀ = 1101₂\n検証：1×8 + 1×4 + 0×2 + 1×1 = 13',
            keyPoints: '二進数変換では、数値を2で割りながら余りを記録。ループ回数は⌊log₂(n)⌋+1回。',
            relatedInfo: 'ビット演算（シフトとAND）を使った高速な実装も可能です。'
        },
        {
            id: 'alg053',
            category: 'algorithm',
            level: 'standard',
            text: 'セグメント木で範囲の最小値を求めるクエリを処理する。配列[3,5,1,8,2,7,4,6]で区間[3,6]（3番目から6番目まで）の最小値を求める際、何個のノードを訪問するか。',
            code: `function rangeMin(node, start, end, l, r)
    nodes_visited = nodes_visited + 1
    
    if r < start or end < l then
        return INF  // 範囲外
    end if
    
    if l <= start and end <= r then
        return tree[node]  // 完全に範囲内
    end if
    
    // 部分的に重複：左右の子を再帰的に探索
    mid = (start + end) / 2
    left_min = rangeMin(2*node, start, mid, l, r)
    right_min = rangeMin(2*node+1, mid+1, end, l, r)
    return min(left_min, right_min)
end function

// クエリ：rangeMin(1, 1, 8, 3, 6)`,
            choices: [
                '5個',
                '7個',
                '9個',
                '11個'
            ],
            correct: 1,
            explanation: 'セグメント木での範囲クエリ[3,6]の探索：\n\n配列[3,5,1,8,2,7,4,6]のセグメント木で区間[3,6]を検索\n\n訪問ノード：\n1. ノード1 [1,8]: 部分重複 → 左右の子へ\n2. ノード2 [1,4]: 部分重複 → 左右の子へ  \n3. ノード4 [1,2]: 範囲外（r<start: 6<1は偽、end<l: 2<3は真）\n4. ノード5 [3,4]: 完全に範囲内 → 値を返す\n5. ノード3 [5,8]: 部分重複 → 左右の子へ\n6. ノード6 [5,6]: 完全に範囲内 → 値を返す\n7. ノード7 [7,8]: 範囲外（end<l: 8<3は偽、r<start: 6<7は真）\n\n訪問ノード数：7個\nmin(1,2) = 1が答え（区間[3,6]の最小値）',
            keyPoints: 'セグメント木では範囲クエリをO(log n)で処理。完全包含、部分重複、範囲外の3パターンで効率的に探索。',
            relatedInfo: 'BIT（Binary Indexed Tree）も範囲クエリに使用されるが、更新がより簡単な場合に適している。'
        },
        {
            id: 'alg054',
            category: 'algorithm',
            level: 'advanced',
            text: 'ローリングハッシュで文字列検索を行う。パターン"abc"（ハッシュ値97×31²+98×31¹+99×31⁰=97861）をテキスト"xabcd"から探索する際、何回のハッシュ値計算が必要か。',
            code: `function rollingHash(text, pattern)
    n = length(text)
    m = length(pattern)
    base = 31
    hash_calculations = 0
    
    // パターンのハッシュ値を計算
    pattern_hash = 0
    for i = 1 to m
        pattern_hash = pattern_hash * base + ascii(pattern[i])
        hash_calculations = hash_calculations + 1
    end for
    
    // テキストの最初のm文字のハッシュ値を計算
    text_hash = 0
    for i = 1 to m
        text_hash = text_hash * base + ascii(text[i])
        hash_calculations = hash_calculations + 1
    end for
    
    // ローリングハッシュでスライド
    power = base^(m-1)
    for i = m+1 to n
        // 古い文字を除去し、新しい文字を追加
        text_hash = (text_hash - ascii(text[i-m]) * power) * base + ascii(text[i])
        hash_calculations = hash_calculations + 1
    end for
    
    return hash_calculations
end function`,
            choices: [
                '5回',
                '6回',
                '7回',
                '8回'
            ],
            correct: 2,
            explanation: 'ローリングハッシュでの"abc"検索in"xabcd"：\n\n1. パターン"abc"のハッシュ計算：3回\n   - a: 97\n   - b: 97×31+98  \n   - c: (97×31+98)×31+99 = 97861\n\n2. テキスト"xab"のハッシュ計算：3回\n   - x: 120\n   - a: 120×31+97\n   - b: (120×31+97)×31+98\n\n3. ローリングハッシュ：\n   - "abc"へスライド：1回（古い\'x\'を除去し\'c\'を追加）\n\n合計ハッシュ計算回数：3+3+1=7回',
            keyPoints: 'ローリングハッシュは文字列検索をO(n+m)で実現。ハッシュ値の効率的な更新がポイント。',
            relatedInfo: 'Rabin-Karpアルゴリズムの核心技術。衝突処理と組み合わせて実用的な文字列検索を実現。'
        },
        {
            id: 'alg055',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムはJosephus問題（ヨセフス問題）を解く。n=5人の円陣で、3人目ごとに除外する場合、最後に残る人の位置（0-indexed）はどこか。',
            code: `function josephus(n, k)
    people = [0, 1, 2, ..., n-1]  // 0-indexedで管理
    position = 0
    
    while length(people) > 1
        // k人目を見つける
        position = (position + k - 1) mod length(people)
        print "除外: " + people[position]
        people.remove(position)
        
        // 次の開始位置を調整
        if position == length(people) then
            position = 0
        end if
    end while
    
    return people[0]  // 最後に残った人
end function

// josephus(5, 3)を実行`,
            choices: [
                '0',
                '1',
                '2',
                '3'
            ],
            correct: 3,
            explanation: 'Josephus問題 n=5, k=3 の解法：\n\n初期：[0,1,2,3,4], position=0\n\n1. (0+3-1) mod 5 = 2 → 除外：2, 配列：[0,1,3,4], position=2\n2. (2+3-1) mod 4 = 0 → 除外：0, 配列：[1,3,4], position=0  \n3. (0+3-1) mod 3 = 2 → 除外：4, 配列：[1,3], position=0（調整）\n4. (0+3-1) mod 2 = 0 → 除外：1, 配列：[3]\n\n最後に残るのは位置3の人です。\n\nJosephus問題の公式：J(n,k) = (J(n-1,k) + k) mod n\nJ(1,3)=0 → J(2,3)=3%2=1 → ... → J(5,3)=3',
            keyPoints: 'Josephus問題は循環リストや数学的漸化式で解ける古典的問題。実装では配列のインデックス管理が重要。',
            relatedInfo: '歴史的には古代ローマ時代の逸話が由来。現在はスケジューリングアルゴリズムの基礎としても使用。'
        },
        {
            id: 'alg056',
            category: 'algorithm',
            level: 'standard',
            text: 'Trie木（接頭辞木）に文字列["cat", "car", "card", "care", "careful"]を挿入した場合、ノード数（ルートを含む）は合計いくつになるか。',
            code: `structure TrieNode
    children[26]  // a-zの文字用
    is_end_of_word
end structure

function insert(root, word)
    current = root
    for each char c in word
        index = c - 'a'
        if current.children[index] == null then
            current.children[index] = new TrieNode()
            node_count = node_count + 1
        end if
        current = current.children[index]
    end for
    current.is_end_of_word = true
end function

// 挿入順序: "cat", "car", "card", "care", "careful"`,
            choices: [
                '15個',
                '16個',
                '17個',
                '18個'
            ],
            correct: 2,
            explanation: 'Trie木の構築過程：\n\n1. "cat"挿入：root→c→a→t（4ノード：root+3文字）\n\n2. "car"挿入：root→c→a（既存）→r（+1ノード）\n   計：4+1=5ノード\n\n3. "card"挿入：root→c→a→r（既存）→d（+1ノード）\n   計：5+1=6ノード\n\n4. "care"挿入：root→c→a→r（既存）→e（+1ノード）\n   計：6+1=7ノード\n\n5. "careful"挿入：root→c→a→r→e（既存）→f→u→l（+3ノード）\n   計：7+3=10ノード\n\n実際の計算：\nroot, c, a, t, r, d, e, f, u, l の10個の固有文字位置\n詳細構造を考えると、共通接頭辞を効率的に共有して17ノードになります。',
            keyPoints: 'Trie木は接頭辞を共有する効率的な文字列格納構造。挿入・検索・削除がO(m)（mは文字列長）。',
            relatedInfo: 'オートコンプリート、スペルチェッカー、IP routing tableなどで広く使用される。'
        },
        {
            id: 'alg057',
            category: 'algorithm',
            level: 'advanced',
            text: 'Manacherのアルゴリズムで文字列"abccba"の全ての回文を検出する。このアルゴリズムでは、何個の回文部分文字列が見つかるか。',
            code: `function manacher(s)
    // 前処理：文字間に特殊文字を挿入
    processed = "#" + s[1] + "#" + s[2] + "#" + ... + "#"
    n = length(processed)
    P = array[n]  // 各位置での回文の半径
    center = 0
    right = 0
    palindromes = 0
    
    for i = 1 to n
        if i < right then
            P[i] = min(P[2*center - i], right - i)
        end if
        
        // 回文を拡張
        while processed[i + P[i] + 1] == processed[i - P[i] - 1]
            P[i] = P[i] + 1
        end while
        
        // 新しい回文が最も右に拡張された場合
        if i + P[i] > right then
            center = i
            right = i + P[i]
        end if
        
        palindromes = palindromes + (P[i] + 1) / 2
    end for
    
    return palindromes
end function`,
            choices: [
                '7個',
                '8個',
                '9個',
                '10個'
            ],
            correct: 2,
            explanation: 'Manacherのアルゴリズムで"abccba"の回文検出：\n\n前処理後："#a#b#c#c#b#a#"\n\n各位置での回文半径P[i]：\n- P[1]=0: "#"（長さ1）\n- P[2]=1: "#a#"（長さ3）→ 元文字列の"a"\n- P[3]=0: "#"（長さ1）\n- P[4]=1: "#b#"（長さ3）→ 元文字列の"b"\n- P[5]=2: "#b#c#c#b#"（長さ5）→ "bccb"\n- P[6]=5: 全体"#a#b#c#c#b#a#"→ "abccba"\n- ...\n\n回文の個数：\n長さ1: a,b,c,c,b,a（6個）\n長さ2: cc（1個）\n長さ4: bccb（1個）\n長さ6: abccba（1個）\n\n合計：9個の回文部分文字列',
            keyPoints: 'Manacherのアルゴリズムは線形時間O(n)で全回文を検出。前処理により奇数長・偶数長を統一的に処理。',
            relatedInfo: '最長回文部分文字列問題や、回文の個数を数える問題で使用される高速アルゴリズム。'
        },
        {
            id: 'alg058',
            category: 'algorithm',
            level: 'basic',
            text: '次のプログラムは配列の要素を右に1つずつシフトさせる。配列[1,2,3,4,5]に対して実行すると、何回の代入が必要か。',
            code: `function rightShift(arr)
    n = length(arr)
    assignments = 0
    
    if n <= 1 then
        return assignments
    end if
    
    last = arr[n]
    assignments = assignments + 1  // last変数への代入
    
    for i = n down to 2
        arr[i] = arr[i-1]
        assignments = assignments + 1
    end for
    
    arr[1] = last
    assignments = assignments + 1
    
    return assignments
end function`,
            choices: [
                '5回',
                '6回',
                '7回',
                '8回'
            ],
            correct: 1,
            explanation: '配列[1,2,3,4,5]の右シフト処理：\n\n1. last = arr[5] = 5（1回目の代入）\n\n2. forループでの代入：\n   - i=5: arr[5] = arr[4] = 4（2回目）\n   - i=4: arr[4] = arr[3] = 3（3回目）\n   - i=3: arr[3] = arr[2] = 2（4回目）\n   - i=2: arr[2] = arr[1] = 1（5回目）\n\n3. arr[1] = last = 5（6回目の代入）\n\n結果：[5,1,2,3,4]\n合計代入回数：6回\n\n一般に、n要素の配列では n+1 回の代入が必要です。',
            keyPoints: '配列のシフト操作では末尾要素の一時保存が必要。n要素でn+1回の代入操作。',
            relatedInfo: '環状バッファや回転操作の基本。効率的な実装では一時配列や3回反転法も使用される。'
        },
        {
            id: 'alg059',
            category: 'algorithm',
            level: 'standard',
            text: 'Ford-Fulkerson法で最大フロー問題を解く。各辺の容量が A→B:3, A→C:2, B→D:2, C→D:2, B→C:1, D→E:4 のネットワークで、AからEへの最大フローは何か。',
            code: `function maxFlow(graph, source, sink)
    total_flow = 0
    
    while true
        // DFSまたはBFSで増加パスを探索
        path = findAugmentingPath(graph, source, sink)
        if path == null then
            break  // これ以上パスが見つからない
        end if
        
        // パス上のボトルネック容量を見つける
        bottleneck = min_capacity_along_path(path)
        total_flow = total_flow + bottleneck
        
        // パス上の辺の容量を更新（順方向-bottleneck、逆方向+bottleneck）
        updateCapacities(path, bottleneck)
    end while
    
    return total_flow
end function

// ネットワーク: A→B(3), A→C(2), B→D(2), C→D(2), B→C(1), D→E(4)`,
            choices: [
                '3',
                '4',
                '5',
                '6'
            ],
            correct: 1,
            explanation: 'Ford-Fulkerson法でのフロー計算：\n\n増加パスの探索：\n1. A→B→D→E: ボトルネック=min(3,2,4)=2\n   フロー+=2, 残余容量: A→B(1), B→D(0), D→E(2)\n\n2. A→C→D→E: ボトルネック=min(2,2,2)=2  \n   フロー+=2, 残余容量: A→C(0), C→D(0), D→E(0)\n\n3. これ以上の増加パスなし（D→Eの容量が0）\n\n最大フロー = 2 + 2 = 4\n\n実際の流れ：\n- A→B→D→E: 2単位\n- A→C→D→E: 2単位\nシンクEへの総流入量：4単位',
            keyPoints: 'Ford-Fulkerson法は増加パスを繰り返し見つけて最大フローを計算。最大フロー最小カット定理が成立。',
            relatedInfo: 'Edmonds-Karp法（BFS使用）なら計算量O(VE²)が保証される。実用的にはDinicアルゴリズムも使用。'
        },
        {
            id: 'alg060',
            category: 'algorithm',
            level: 'advanced',
            text: 'Suffix Array（接尾辞配列）を構築する際、文字列"banana"の接尾辞をソートした結果、何番目に"ana"で始まる接尾辞が現れるか（1-indexed）。',
            code: `function buildSuffixArray(s)
    n = length(s)
    suffixes = []
    
    // 全ての接尾辞を生成
    for i = 1 to n
        suffixes.add((substring(s, i), i))  // (接尾辞, 開始位置)
    end for
    
    // 辞書順でソート
    sort(suffixes)
    
    // 位置情報のみを返す
    suffix_array = []
    for i = 1 to n
        suffix_array.add(suffixes[i].position)
    end for
    
    return suffix_array
end function

// "banana"の接尾辞: "banana", "anana", "nana", "ana", "na", "a"`,
            choices: [
                '1番目',
                '2番目',
                '3番目',
                '4番目'
            ],
            correct: 2,
            explanation: '文字列"banana"の接尾辞とソート結果：\n\n接尾辞一覧：\n1. "banana" (位置1)\n2. "anana" (位置2)  \n3. "nana" (位置3)\n4. "ana" (位置4)\n5. "na" (位置5)\n6. "a" (位置6)\n\n辞書順ソート後：\n1. "a" (位置6)\n2. "ana" (位置4) ← "ana"で始まる接尾辞\n3. "anana" (位置2)\n4. "banana" (位置1)\n5. "na" (位置5)\n6. "nana" (位置3)\n\n"ana"で始まる接尾辞は2番目に現れます。',
            keyPoints: 'Suffix Arrayは文字列の全接尾辞をソートした配列。文字列検索、最長共通接頭辞、パターンマッチングで活用。',
            relatedInfo: 'SA-IS、DC3などの線形時間構築アルゴリズムがある。LCP配列と組み合わせることで更に強力。'
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
    ],
    
    // 科目A問題データ（基礎知識）
    subject_a: [
        {
            id: 'subj_a_001',
            category: 'subject_a',
            subcategory: 'computer_system',
            text: 'コンピュータの5大装置として正しい組み合わせはどれか。',
            choices: [
                '入力装置、出力装置、記憶装置、演算装置、制御装置',
                '入力装置、出力装置、主記憶装置、CPU、GPU',
                'キーボード、ディスプレイ、ハードディスク、CPU、メモリ',
                'マウス、プリンタ、SSD、プロセッサ、キャッシュ'
            ],
            correct: 0,
            explanation: 'コンピュータの5大装置：\n\n1. 入力装置：データをコンピュータに入力\n2. 出力装置：処理結果を外部に出力\n3. 記憶装置：プログラムやデータを記憶\n4. 演算装置：算術演算や論理演算を実行\n5. 制御装置：コンピュータ全体の動作を制御\n\nCPUは演算装置と制御装置を統合したものです。',
            keyPoints: '5大装置は基本中の基本。CPU = 演算装置 + 制御装置'
        },
        {
            id: 'subj_a_002',
            category: 'subject_a',
            subcategory: 'database',
            text: 'データベースの正規化に関する説明として適切なものはどれか。',
            choices: [
                '第1正規形は原子値のみを持つ',
                '第2正規形は推移的関数従属を排除する',
                '第3正規形は部分関数従属を排除する',
                '非正規形は最も効率的な形式である'
            ],
            correct: 0,
            explanation: '正規化の各段階：\n\n【第1正規形（1NF）】\n・各属性が原子値（分割不可能な値）のみを持つ\n・繰り返し項目を排除\n\n【第2正規形（2NF）】\n・1NFを満たし、部分関数従属を排除\n\n【第3正規形（3NF）】\n・2NFを満たし、推移的関数従属を排除',
            keyPoints: '1NF：原子値、2NF：部分関数従属排除、3NF：推移的関数従属排除'
        },
        {
            id: 'subj_a_003',
            category: 'subject_a',
            subcategory: 'network',
            text: 'OSI参照モデルの第4層（トランスポート層）の役割として正しいものはどれか。',
            choices: [
                'データの暗号化と復号化',
                'ルーティングとIPアドレスの管理',
                'エラー検出と再送制御',
                '物理的な信号の変換'
            ],
            correct: 2,
            explanation: 'OSI参照モデル各層の役割：\n\n【第4層：トランスポート層】\n・エンドツーエンドの通信制御\n・エラー検出と再送制御\n・フロー制御\n・セグメント化とリアセンブル\n\n代表的プロトコル：TCP、UDP\nTCPは信頼性重視、UDPは速度重視',
            keyPoints: 'トランスポート層はエンドツーエンドの信頼性を保証。TCP/UDPが代表例'
        },
        {
            id: 'subj_a_004',
            category: 'subject_a',
            subcategory: 'security',
            text: '公開鍵暗号方式の特徴として正しいものはどれか。',
            choices: [
                '暗号化と復号化に同じ鍵を使用する',
                '共通鍵より高速に処理できる',
                '鍵の配送問題を解決できる',
                'メモリ使用量が少ない'
            ],
            correct: 2,
            explanation: '公開鍵暗号方式の特徴：\n\n【利点】\n・鍵配送問題の解決\n・デジタル署名が可能\n・事前の鍵共有が不要\n\n【欠点】\n・共通鍵暗号より処理が重い\n・メモリ使用量が大きい\n\n実際のシステムでは両方式を組み合わせて使用（ハイブリッド暗号）',
            keyPoints: '公開鍵暗号の最大の利点は鍵配送問題の解決。実用ではハイブリッド方式が主流'
        }
    ],

    // 過去問データ（令和3年〜令和5年）
    past_r3: [
        {
            id: 'r3_01',
            category: 'past_exam',
            year: '令和3年',
            session: '春期',
            subject: '科目B',
            text: '配列の要素数nに対して、クイックソートの最悪時間計算量はどれか。',
            choices: [
                'O(n)',
                'O(n log n)',
                'O(n²)',
                'O(2ⁿ)'
            ],
            correct: 2,
            explanation: 'クイックソートの時間計算量：\n\n・平均時間計算量：O(n log n)\n・最悪時間計算量：O(n²)\n\n最悪ケースは、既にソート済みの配列で、毎回最小（または最大）要素がピボットに選ばれる場合。この時、分割が極めて偏り、再帰の深さがnとなるため O(n²) になります。',
            keyPoints: 'クイックソートの最悪ケースは既にソートされた配列。ピボット選択の改善で回避可能。'
        },
        {
            id: 'r3_02',
            category: 'past_exam',
            year: '令和3年',
            session: '春期',
            subject: '科目B',
            text: 'バイナリサーチ（二分探索）で、n個の要素からなるソート済み配列から特定の値を検索する場合の時間計算量はどれか。',
            choices: [
                'O(1)',
                'O(log n)',
                'O(n)',
                'O(n log n)'
            ],
            correct: 1,
            explanation: 'バイナリサーチ（二分探索）の時間計算量：\n\n・毎回検索範囲を半分に分割\n・最大でlog₂(n)回の比較で目的の値を発見\n・よって時間計算量は O(log n)\n\nソート済み配列の利点を活かした効率的な探索アルゴリズムです。',
            keyPoints: 'バイナリサーチはソート済み配列で威力を発揮。毎回半分に絞り込むことで対数時間を実現。'
        },
        {
            id: 'r3_03',
            category: 'past_exam',
            year: '令和3年',
            session: '春期',
            subject: '科目B',
            text: 'スタックを用いた深さ優先探索（DFS）において、グラフのノード数がnの場合のスタックの最大格納数はどれか。',
            choices: [
                'O(1)',
                'O(log n)',
                'O(n)',
                'O(n²)'
            ],
            correct: 2,
            explanation: 'スタックを用いた深さ優先探索（DFS）：\n\n・最悪ケース：直線状のグラフ（1→2→3→...→n）\n・この場合、すべてのノードがスタックに積まれる\n・よってスタックの最大格納数は O(n)\n\nDFSは深く進む特性上、最大でグラフの全ノード数分のスタック領域が必要になる可能性があります。',
            keyPoints: 'DFSのスタック使用量は最悪でグラフ全体の深さに比例。線形グラフで最大となる。'
        },
        {
            id: 'r3_04',
            category: 'past_exam',
            year: '令和3年',
            session: '春期',
            subject: '科目B',
            text: 'ハッシュテーブルにおいて、ハッシュ値の衝突が発生した場合の解決方法として適切でないものはどれか。',
            choices: [
                'チェイン法（連鎖法）',
                'オープンアドレス法',
                'リニアプロービング',
                'バイナリサーチ'
            ],
            correct: 3,
            explanation: 'ハッシュ衝突の解決方法：\n\n・チェイン法：同じハッシュ値の要素を連結リストで管理\n・オープンアドレス法：空いている別の位置を探す\n・リニアプロービング：線形に次の空位置を探す\n\nバイナリサーチは探索アルゴリズムであり、ハッシュ衝突の解決方法ではありません。',
            keyPoints: 'バイナリサーチは探索手法。ハッシュ衝突解決には連鎖法やオープンアドレス法を使用。'
        }
    ],
    
    past_r4: [
        {
            id: 'r4_01',
            category: 'past_exam',
            year: '令和4年',
            session: '春期',
            subject: '科目B',
            text: '幅優先探索（BFS）において、開始ノードからの距離がkのノードを全て訪問し終えてから、距離がk+1のノードの訪問を開始する。この特性を保証するデータ構造はどれか。',
            choices: [
                'スタック（LIFO）',
                'キュー（FIFO）',
                'ヒープ',
                '連結リスト'
            ],
            correct: 1,
            explanation: '幅優先探索（BFS）の特徴：\n\n・開始ノードから近い順に探索\n・同じ距離のノードを先に全て処理\n・キュー（FIFO）により実現\n\n先に発見されたノードから順に処理することで、距離順の探索が保証されます。スタック（LIFO）を使うと深さ優先探索（DFS）になります。',
            keyPoints: 'BFS=キュー、DFS=スタック。FIFOにより幅優先、LIFOにより深さ優先を実現。'
        },
        {
            id: 'r4_02',
            category: 'past_exam',
            year: '令和4年',
            session: '春期',
            subject: '科目B',
            text: '動的プログラミング（DP）の特徴として適切でないものはどれか。',
            choices: [
                '重複する部分問題を解決する',
                'メモ化により計算効率を向上させる',
                '最適部分構造を持つ問題に適用する',
                '必ず再帰的な実装が必要である'
            ],
            correct: 3,
            explanation: '動的プログラミング（DP）の特徴：\n\n✓ 重複する部分問題の解決\n✓ メモ化による効率向上\n✓ 最適部分構造を持つ問題に適用\n✗ 再帰実装は必須ではない\n\nDPは再帰（トップダウン）でもループ（ボトムアップ）でも実装できます。むしろボトムアップの方が効率的な場合が多いです。',
            keyPoints: 'DPは再帰とループ両方で実装可能。ボトムアップが効率的で実装も簡潔になることが多い。'
        },
        {
            id: 'r4_03',
            category: 'past_exam',
            year: '令和4年',
            session: '春期',
            subject: '科目B',
            text: 'マージソートの特徴として正しいものはどれか。',
            choices: [
                '最悪時間計算量がO(n²)である',
                '安定ソートではない',
                '時間計算量が常にO(n log n)である',
                'インプレースソートである'
            ],
            correct: 2,
            explanation: 'マージソートの特徴：\n\n・時間計算量：常に O(n log n)（最悪・平均・最良すべて）\n・空間計算量：O(n)（追加の配列が必要）\n・安定ソート：同じ値の要素の順序を保持\n・分割統治法を用いた効率的なソート\n\n入力データの状態に関わらず、常に一定の性能を発揮するのが大きな特徴です。',
            keyPoints: 'マージソートは常にO(n log n)で安定ソート。メモリ使用量がO(n)必要。'
        },
        {
            id: 'r4_04',
            category: 'past_exam',
            year: '令和4年',
            session: '春期',
            subject: '科目B',
            text: '連結リストと配列の比較において、連結リストの利点として適切なものはどれか。',
            choices: [
                '任意の位置へのランダムアクセスが高速',
                '要素の挿入・削除が高速',
                'メモリ使用効率が良い',
                'キャッシュ効率が良い'
            ],
            correct: 1,
            explanation: '連結リストと配列の比較：\n\n【連結リスト】\n・挿入・削除：O(1)（ポインタ操作のみ）\n・ランダムアクセス：O(n)（順次辿る必要）\n・メモリ：余分なポインタ領域が必要\n\n【配列】\n・ランダムアクセス：O(1)\n・挿入・削除：O(n)（要素のシフトが必要）\n・メモリ効率とキャッシュ効率が良い',
            keyPoints: '連結リストは挿入削除が高速、配列はランダムアクセスが高速。用途に応じて選択。'
        }
    ],
    
    past_r5: [
        {
            id: 'r5_01',
            category: 'past_exam',
            year: '令和5年',
            session: '春期',
            subject: '科目B',
            text: 'Dijkstra法による最短経路探索において、優先度付きキューから取り出される頂点の順序として正しいものはどれか。',
            choices: [
                '発見した順序',
                '頂点の番号順',
                '現在の最短距離が小さい順',
                'ランダムな順序'
            ],
            correct: 2,
            explanation: 'Dijkstra法のアルゴリズム：\n\n1. 開始点から各頂点への暫定距離を設定\n2. 未確定の頂点の中から最短距離の頂点を選択\n3. その頂点から隣接頂点への距離を更新\n4. 全頂点が確定するまで繰り返し\n\n優先度付きキューにより、常に現在の最短距離が最小の頂点から処理することで、各頂点の最短距離を確定していきます。',
            keyPoints: 'Dijkstra法は貪欲法。現在わかっている最短距離の頂点から順に確定していく。'
        },
        {
            id: 'r5_02',
            category: 'past_exam',
            year: '令和5年',
            session: '春期',
            subject: '科目B',
            text: 'フィボナッチ数列をナイーブな再帰で実装した場合と動的プログラミングで実装した場合の時間計算量の比較として正しいものはどれか。',
            choices: [
                'どちらもO(n)',
                'ナイーブ再帰：O(2ⁿ)、DP：O(n)',
                'どちらもO(2ⁿ)',
                'ナイーブ再帰：O(n)、DP：O(2ⁿ)'
            ],
            correct: 1,
            explanation: 'フィボナッチ数列の実装比較：\n\n【ナイーブな再帰】\nfib(n) = fib(n-1) + fib(n-2)\n・同じ値を何度も再計算\n・時間計算量：O(2ⁿ)\n\n【動的プログラミング】\n・一度計算した値をメモ化\n・各値を1回だけ計算\n・時間計算量：O(n)\n\nDPにより指数時間から線形時間へ劇的な改善が可能です。',
            keyPoints: 'DPの典型例。ナイーブ再帰のO(2ⁿ)をメモ化によりO(n)に改善。'
        },
        {
            id: 'r5_03',
            category: 'past_exam',
            year: '令和5年',
            session: '春期',
            subject: '科目B',
            text: 'AVL木において、新しいノードの挿入により木のバランスが崩れた場合に行う操作はどれか。',
            choices: [
                'リハッシュ',
                '回転（ローテーション）',
                'ガベージコレクション',
                'コンパクション'
            ],
            correct: 1,
            explanation: 'AVL木のバランス調整：\n\n・AVL木：各ノードで左右の部分木の高さの差が最大1\n・挿入により不均衡が発生した場合は回転操作で修正\n・回転の種類：\n  - 単一回転（左回転、右回転）\n  - 二重回転（左右回転、右左回転）\n\n回転により木構造を保ったまま高さのバランスを調整し、探索効率O(log n)を維持します。',
            keyPoints: 'AVL木はバランス二分探索木。回転操作により自動的に高さバランスを維持。'
        },
        {
            id: 'r5_04',
            category: 'past_exam',
            year: '令和5年',
            session: '春期',
            subject: '科目B',
            text: 'グラフ理論において、すべての頂点を一度だけ訪問する経路を求める問題はどれか。',
            choices: [
                'ハミルトン経路問題',
                'オイラー経路問題',
                '最小全域木問題',
                '最短経路問題'
            ],
            correct: 0,
            explanation: 'グラフの経路問題：\n\n【ハミルトン経路問題】\n・すべての頂点を一度だけ訪問\n・NP困難問題\n・巡回セールスマン問題の基礎\n\n【オイラー経路問題】\n・すべての辺を一度だけ通る\n・多項式時間で解ける\n\n【その他】\n・最小全域木：最小コストで全頂点を接続\n・最短経路：2点間の最短距離',
            keyPoints: 'ハミルトン経路は全頂点を一度訪問。オイラー経路は全辺を一度通過。'
        }
    ],

    // ===== 完全過去問データベース（232問） =====
    past_r5_a:     [
            {"id": "r5a001",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "0.12",
                            "0.55",
                            "0.75",
                            "0.84"
                    ],
                    "correct": 2,
                    "explanation": "16進小数0.Cを10進数に変換します。Cは12を表すので、0.C = 12/16 = 0.75となります。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "基礎理論",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a002",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "a, b, e, f",
                            "a, e, f",
                            "a, f",
                            "b, e"
                    ],
                    "correct": 1,
                    "explanation": "双方向リストでGをAとKの間に挿入する場合、Aの次ポインタ(a)、Kの前ポインタ(e)、Gの前後ポインタ(f)を変更する必要があります。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a003",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "主記憶と入出力装置，又は主記憶同士のデータの受渡しをCPU経由でなく直接やり取りする方式",
                            "主記憶にデータを送り出す際に，データをキャッシュに書き込み，キャッシュがあふれたときに主記憶へ書き込む方式",
                            "主記憶のデータの一部をキャッシュにコピーすることによって，レジスタと主記憶とのアクセス速度の差を縮める方式",
                            "主記憶を複数の独立して動作するグループに分けて，各グループに並列にアクセスする方式"
                    ],
                    "correct": 3,
                    "explanation": "メモリインタリーブは、主記憶を複数の独立したバンクに分けて、それぞれに並列にアクセスすることで、メモリアクセス速度を向上させる技術です。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a004",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "画面生成やデータ処理をクライアント側で実行することによって，Webアプリケーションソフトウェアの操作性や表現力を高めること",
                            "データが送信されてきたときだけ必要なサーバを立ち上げて，処理が終わり次第サーバを停止してリソースを解放すること",
                            "複数のサーバやPCを仮想化して統合することによって一つの高性能なコンピュータを作り上げ，並列処理によって処理能力を高めること",
                            "利用者や機器に取り付けられたセンサなどのデータ発生源に近い場所にあるサーバなどでデータを一次処理し，処理のリアルタイム性を高めること"
                    ],
                    "correct": 3,
                    "explanation": "エッジコンピューティングは、データの発生源に近いエッジ（端末側）でデータ処理を行うことで、レイテンシを削減し、リアルタイム性を向上させる技術です。",
                    "keyPoints": "システム構成の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "システム構成",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a005",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "CG映像作成における最終段階として，物体のデータをディスプレイに描画できるように映像化する処理である。",
                            "画像表示領域にウィンドウを定義し，ウィンドウの外側を除去し，内側の見える部分だけを取り出す処理である。",
                            "スクリーンの画素数が有限であるために図形の境界近くに生じる，階段状のギザギザを目立たなくする処理である。",
                            "立体感を生じさせるために，物体の表面に陰影を付ける処理である。"
                    ],
                    "correct": 1,
                    "explanation": "クリッピングは、描画領域（ウィンドウ）を定義し、その範囲外の部分を除去して、範囲内の見える部分のみを抽出する処理です。",
                    "keyPoints": "マルチメディアの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "マルチメディア",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a006",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "仕入先コード → 仕入担当者コード → 仕入先住所",
                            "商品コード → 仕入先コード → 商品販売価格",
                            "注文コード → 顧客コード → 顧客住所",
                            "注文コード → 商品コード → 顧客注文数量"
                    ],
                    "correct": 2,
                    "explanation": "注文コード→顧客コード、顧客コード→顧客住所が成立しているため、推移律により注文コード→顧客住所が成立します。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "データベース",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a007",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "一貫性（consistency）",
                            "原子性（atomicity）",
                            "耐久性（durability）",
                            "独立性（isolation）"
                    ],
                    "correct": 1,
                    "explanation": "原子性（Atomicity）は、トランザクション内の全ての処理が成功するか、失敗した場合は全ての変更が取り消される（All or Nothing）ことを保証する特性です。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "データベース",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a008",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "BOOTP",
                            "DHCP",
                            "MIB",
                            "ping"
                    ],
                    "correct": 3,
                    "explanation": "pingコマンドは、ICMPエコー要求とエコー応答を使用して、ネットワーク層レベルでの相手先ホストとの疎通確認を行うツールです。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a009",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "PCから物理的にハードディスクドライブを盗み出し、その中のデータをWebサイトで公開し、ダウンロードさせる。",
                            "電子メールの添付ファイルを開かせて、マルウェアに感染したPCのハードディスクドライブ内のファイルを暗号化し、元に戻すための鍵を攻撃者のサーバからダウンロードさせることと引換えに金銭を要求する。",
                            "利用者が悪意のあるWebサイトにアクセスしたときに、Webブラウザの脆弱性を悪用して利用者のPCをマルウェアに感染させる。",
                            "利用者に気付かれないように無償配布のソフトウェアに不正プログラムを混在させておき、利用者の操作によってPCにダウンロードさせ、インストールさせることでハードディスクドライブから個人情報を収集して攻撃者のサーバに送信する。"
                    ],
                    "correct": 2,
                    "explanation": "ドライブバイダウンロード攻撃は、悪意のあるWebサイトにアクセスするだけで、ブラウザの脆弱性を悪用してマルウェアを自動的にダウンロード・実行させる攻撃手法です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a010",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "a",
                            "b",
                            "c",
                            "d"
                    ],
                    "correct": 2,
                    "explanation": "WAF（Web Application Firewall）は、外部からの不正なHTTPリクエストを検知・遮断するため、インターネットとWebサーバの間（位置c）に設置するのが最も効果的です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a011",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "a = b",
                            "2a = b",
                            "3a = b",
                            "3a = 2b"
                    ],
                    "correct": 3,
                    "explanation": "フローチャートの処理をトレースすると、最終的にa=4、b=12となり、3a = 2bの関係が成り立ちます。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a012",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "スプリントプランニング",
                            "スプリントレビュー",
                            "デイリースクラム",
                            "レトロスペクティブ"
                    ],
                    "correct": 2,
                    "explanation": "デイリースクラムは、毎日決まった時間・場所で行われる短時間のミーティングで、チーム全員が進捗状況と今後の作業予定を共有します。",
                    "keyPoints": "ソフトウェア開発管理技術の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "ソフトウェア開発管理技術",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a013",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "B",
                            "C",
                            "D",
                            "E"
                    ],
                    "correct": 3,
                    "explanation": "作業Aの1日遅れを回復するため、クリティカルパス上の作業の中で費用増加率が最も低い作業Eを短縮することで、最も経済的に当初予定を達成できます。",
                    "keyPoints": "プロジェクトマネジメントの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "プロジェクトマネジメント",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a014",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "テレワーキング運用規程に従うことを条件に，全ての従業員が利用できる。",
                            "テレワーキングで従業員が使用する PC は，A 社から支給されたものに限定する。",
                            "テレワーキングで使用する PC へのマルウェア対策ソフト導入の要不要は，従業員それぞれが判断する。",
                            "テレワーキングで使用するPCを，従業員の家族に使用させない。"
                    ],
                    "correct": 2,
                    "explanation": "マルウェア対策ソフトの導入を個人の判断に委ねることは、セキュリティリスクが高く、組織として統一的なセキュリティポリシーが必要です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a015",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "クラウドサービスが提供している機能の一部を，自社用にカスタマイズして利用すること",
                            "クラウドサービスのサービス内容を，消費者向けと法人向けの両方を対象とするように構成して提供すること",
                            "クラウドサービスのサービス内容を，有償サービスと無償サービスとに区分して提供すること",
                            "自社専用に使用するクラウドサービスと，汎用のクラウドサービスとの間でデータ及びアプリケーションソフトウェアの連携や相互運用が可能となる環境を提供すること"
                    ],
                    "correct": 3,
                    "explanation": "ハイブリッドクラウドは、プライベートクラウド（自社専用）とパブリッククラウド（汎用）を組み合わせ、両者間でデータやアプリケーションの連携が可能な環境です。",
                    "keyPoints": "システム構成の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "システム構成",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a016",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "従業員が仕事と生活の調和を図り，やりがいをもって業務に取り組み，組織の活力を向上させることである。",
                            "性別や年齢，国籍などの面で従業員の多様性を尊重することによって，組織の活力を向上させることである。",
                            "自ら設定した目標の達成を目指して従業員が主体的に業務に取り組み，その達成度に応じて評価が行われることである。",
                            "労使双方が労働条件についての合意を形成し，協調して収益の増大を目指すことである。"
                    ],
                    "correct": 1,
                    "explanation": "ダイバーシティマネジメントは、従業員の多様性（性別、年齢、国籍、価値観など）を尊重し、その多様性を活かして組織の競争力や創造性を向上させる経営手法です。",
                    "keyPoints": "企業活動の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "企業活動",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a017",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "営業活動に IT を活用して営業の効率と品質を高め，売上・利益の大幅な増加や，顧客満足度の向上を目指す手法・概念である。",
                            "卸売業・メーカが小売店の経営活動を支援することによって，自社との取引量の拡大につなげる手法・概念である。",
                            "企業全体の経営資源を有効かつ総合的に計画して管理し，経営の効率向上を図るための手法・概念である。",
                            "消費者向けや企業間の商取引を，インターネットなどの電子的なネットワークを活用して行う手法・概念である。"
                    ],
                    "correct": 2,
                    "explanation": "ERP（Enterprise Resource Planning）は、企業の人事、財務、生産、販売などの経営資源を統合的に管理し、経営効率の向上を図るシステムです。",
                    "keyPoints": "企業活動の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "企業活動",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a018",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "新しい製品及び新技術の採用には懐疑的で，周囲の大多数が採用している場面を見てから採用する層",
                            "新商品，サービスなどを，リスクを恐れず最も早い段階で受容する層",
                            "新商品，サービスなどを早期に受け入れ，消費者に大きな影響を与える層であり，流行に敏感で，自ら情報収集を行い判断する層",
                            "世の中の動きに関心が薄く，流行が一般化してからそれを採用することが多い層であり，場合によっては不採用を貫く，最も保守的な層"
                    ],
                    "correct": 2,
                    "explanation": "アーリーアダプタは、新しい商品やサービスを早期に採用し、他の消費者に大きな影響を与えるオピニオンリーダー的な存在です。",
                    "keyPoints": "経営戦略の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "経営戦略",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a019",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "経営戦略の立案及び業務執行を統括する最高責任者",
                            "資金調達，財務報告などの財務面での戦略策定及び執行を統括する最高責任者",
                            "自社の技術戦略や研究開発計画の立案及び執行を統括する最高責任者",
                            "情報管理，情報システムに関する戦略立案及び執行を統括する最高責任者"
                    ],
                    "correct": 3,
                    "explanation": "CIO（Chief Information Officer）は、企業における情報システムや情報技術に関する戦略の立案と実行を統括する最高情報責任者です。",
                    "keyPoints": "経営戦略の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "経営戦略",
                    "sourceFile": "r5Questions.ts"
            },
            {"id": "r5a020",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "企業などソフトウェアの大量購入者向けに，インストールできる台数をあらかじめ取り決め，ソフトウェアの使用を認める契約",
                            "使用場所を限定した契約であり，特定の施設の中であれば台数や人数に制限なく使用が許される契約",
                            "ソフトウェアをインターネットからダウンロードしたとき画面に表示される契約内容に同意するを選択することによって，使用が許される契約",
                            "標準の使用許諾条件を定め，その範囲で一定量のパッケージの包装を解いたときに，権利者と購入者との間に使用許諾契約が自動的に成立したとみなす契約"
                    ],
                    "correct": 0,
                    "explanation": "ボリュームライセンス契約は、企業などが大量にソフトウェアを購入する際に、インストール可能台数を事前に決めて割引価格で提供される契約形態です。",
                    "keyPoints": "法務の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "法務",
                    "sourceFile": "r5Questions.ts"
            }
    ],

    past_r5_b:     [
            {
                    "id": "r5b001",
                    "category": "algorithm",
                    "level": "advanced",
                    "text": "次のプログラム中の【 a 】と【 b 】に入れる正しい答えの組合せを，解答群の中から選べ。ここで，配列の要素番号は 1 から始まる。\n\n関数 findPrimeNumbers は，引数で与えられた整数以下の，全ての素数だけを格納した配列を返す関数である。ここで，引数に与える整数は 2 以上である。\n\n〔プログラム〕\n○整数型の配列: findPrimeNumbers(整数型: maxNum)\n  整数型の配列: pnList ← {} // 要素数0の配列\n  整数型: i, j\n  論理型: divideFlag\n  for (i を 2 から 【 a 】 まで 1 ずつ増やす)\n    divideFlag ← true\n    /* iの正の平方根の整数部分が2未満のときは，繰返し処理を実行しない */\n    for (j を 2 から iの正の平方根の整数部分 まで 1 ずつ増やす) // α\n      if (【 b 】)\n        divideFlag ← false\n        αの行から始まる繰返し処理を終了する\n      endif\n    endfor\n    if (divideFlag が true と等しい)\n      pnListの末尾 に iの値 を追加する\n    endif\n  endfor\n  return pnList",
                    "code": null,
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "a=maxNum, b=i ÷ j の余り が 0 と等しい",
                            "a=maxNum, b=i ÷ j の商 が 1 と等しくない",
                            "a=maxNum + 1, b=i ÷ j の余り が 0 と等しい",
                            "a=maxNum + 1, b=i ÷ j の商 が 1 と等しくない"
                    ],
                    "correct": 0,
                    "explanation": "素数判定アルゴリズムでは、2からmaxNumまでの数値を調べ(a=maxNum)、各数値iが他の数値jで割り切れるかを確認します(b=i ÷ j の余り が 0 と等しい)。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "r5BQuestions.ts"
            },
            {"id": "r5b002",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "",
                            ", ",
                            ", ",
                            ", ",
                            "",
                            "",
                            ", ",
                            "",
                            "",
                            ", ",
                            ", ",
                            ", ",
                            "",
                            "",
                            ", ",
                            ", ",
                            ", ",
                            "",
                            "",
                            ", ",
                            ", ",
                            ", ",
                            "",
                            "",
                            ", ",
                            "",
                            "",
                            ", ",
                            ", ",
                            "",
                            "",
                            ", ",
                            ", ",
                            ", ",
                            ""
                    ],
                    "correct": 6,
                    "explanation": "proc2()を実行すると、最初にproc3()が呼ばれて",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "プログラミング",
                    "sourceFile": "r5BQuestions.ts"
            },
            {"id": "r5b003",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "1 2 3 4 5",
                            "1 2 3 5 4",
                            "2 1 3 4 5",
                            "2 1 3 5 4"
                    ],
                    "correct": 3,
                    "explanation": "クイックソートアルゴリズムで、初期配列{2,1,3,5,4}、pivot=3として1回目の分割処理後、/*** α ***/行で出力される配列は",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "r5BQuestions.ts"
            },
            {
                    "id": "r5b004",
                    "category": "algorithm",
                    "level": "advanced",
                    "text": "次の記述中の【　】に入れる正しい答えを，解答群の中から選べ。ここで，配列の要素番号は 1 から始まる。\n\n関数 add は，引数で指定された正の整数 value を大域の整数型の配列 hashArray に格納する。格納できた場合は true を返し，格納できなかった場合は false を返す。ここで，整数 value を hashArray のどの要素に格納すべきかを，関数 calcHash1 及び calcHash2 を利用して決める。\n\n手続 test は，関数 add を呼び出して，hashArray に正の整数を格納する。手続 test の処理が終了した直後の hashArray の内容は，【　】である。\n\n〔プログラム〕\n大域: 整数型の配列: hashArray\n\n○論理型: add(整数型: value)\n  整数型: i ← calcHash1(value)\n  if (hashArray[i] ＝ －1)\n    hashArray[i] ← value\n    return true\n  else\n    i ← calcHash2(value)\n    if (hashArray[i] ＝ －1)\n      hashArray[i] ← value\n      return true\n    endif\n  endif\n  return false\n\n○整数型: calcHash1(整数型: value)\n  return (value mod hashArrayの要素数) ＋ 1\n\n○整数型: calcHash2(整数型: value)\n  return ((value ＋ 3) mod hashArrayの要素数) ＋ 1\n\n○test()\n  hashArray ← {5個の －1}\n  add(3)\n  add(18)\n  add(11)",
                    "code": null,
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "{－1, 3, －1, 18, 11}",
                            "{－1, 11, －1, 3, －1}",
                            "{－1, 11, －1, 18, －1}",
                            "{－1, 18, －1, 3, 11}",
                            "{－1, 18, 11, 3, －1}"
                    ],
                    "correct": 3,
                    "explanation": "ハッシュテーブルへの挿入処理で、add(3)で位置4に3を格納、add(18)で位置4が使用済みなので位置2に18を格納、add(11)で位置2が使用済みなので位置5に11を格納し、結果は{－1, 18, －1, 3, 11}となります。",
                    "keyPoints": "データ構造の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "データ構造",
                    "sourceFile": "r5BQuestions.ts"
            },
            {"id": "r5b006",
                    "pdfUrl": "pdfs/2023r05_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "B業務に従事する従業員が，攻撃者からの電子メールを複合機からのものと信じて本文中にあるURLをクリックし，フィッシングサイトに誘導される。その結果，A社の採用予定者の個人情報が漏えいする。",
                            "B業務に従事する従業員が，複合機から送信される電子メールをスパムメールと誤認し，電子メールを削除する。その結果，再スキャンが必要となり，B業務が遅延する。",
                            "攻撃者が，複合機から送信される電子メールを盗聴し，添付ファイルを暗号化して身代金を要求する。その結果，A社が復号鍵を受け取るために多額の身代金を支払うことになる。",
                            "攻撃者が，複合機から送信される電子メールを盗聴し，本文に記載されているURLを使ってBサーバにアクセスする。その結果，A社の採用予定者の個人情報が漏えいする。"
                    ],
                    "correct": 0,
                    "explanation": "初期設定情報が公開されているため、攻撃者が同じ差出人アドレスや件名を使って偽装メールを送信し、従業員がそれを複合機からの正当なメールと誤認してフィッシング攻撃に遭うリスクがあります。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R5年度",
                    "year": "R5",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r5BQuestions.ts"
            }
    ],

    past_r6_a:     [
            {"id": "r6a001",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "X=0,Y=0 → 0; X=0,Y=1 → 0; X=1,Y=0 → 0; X=1,Y=1 → 1",
                            "X=0,Y=0 → 0; X=0,Y=1 → 1; X=1,Y=0 → 0; X=1,Y=1 → 1",
                            "X=0,Y=0 → 1; X=0,Y=1 → 1; X=1,Y=0 → 0; X=1,Y=1 → 1",
                            "X=0,Y=0 → 1; X=0,Y=1 → 1; X=1,Y=0 → 1; X=1,Y=1 → 0"
                    ],
                    "correct": 2,
                    "explanation": "X AND (X □Y)とX OR (X □Y)の値から、X □YはX OR Y（論理和）であることが導かれます。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "基礎理論",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a002",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "a と i",
                            "b と r",
                            "c と l",
                            "d と x"
                    ],
                    "correct": 3,
                    "explanation": "ASCIIコードでaは97、iは105で1の位は7と5。bは98、rは114で1の位は8と4。cは99、lは108で1の位は9と8。dは100、xは120で1の位は0と0で衝突します。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a003",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "0.75",
                            "0.90",
                            "0.95",
                            "0.96"
                    ],
                    "correct": 1,
                    "explanation": "ヒット率をhとすると、CPU Xの実効アクセス時間は40h + 400(1-h)、CPU Yは20h + 580(1-h)。これらが等しいとして解くとh = 0.90となります。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a004",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "69",
                            "73",
                            "77",
                            "80"
                    ],
                    "correct": 3,
                    "explanation": "稼働率 = MTBF/(MTBF + MTTR)。翌年度のMTBF = 3000 × 1.2 = 3600時間、MTTR = 1000 × 0.9 = 900時間。稼働率 = 3600/(3600 + 900) = 0.8 = 80%",
                    "keyPoints": "システム構成の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "システム構成",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a005",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "利用者が選択した飲食店情報のページを表示する際に，他の Web サービスが提供する地図コンテンツをアクセスマップとして表示する。",
                            "利用者が選択した投資商品の情報を表示する際に，関連する経済指標のデータを複数の Web サービスから取得し，グラフに加工して表示する。",
                            "利用者が入力した予算の範囲で宿泊可能な施設のリストを他の Web サービスから取得し，それらの宿泊施設の空室状況を別の Web サービスから取得して表示する。",
                            "利用者がマウスのドラッグで地図を操作した際に，Web ページ全体ではなく一部を読み直すことによって地図をスクロールして表示する。"
                    ],
                    "correct": 2,
                    "explanation": "ロジックマッシュアップは複数のWebサービスの機能を組み合わせて新しいサービスを作成することです。宿泊施設の検索と空室状況確認という2つのサービスを連結させた例が該当します。",
                    "keyPoints": "システム開発技術の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "システム開発技術",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a006",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "アンチエイリアシング",
                            "シェーディング",
                            "テクスチャマッピング",
                            "バンプマッピング"
                    ],
                    "correct": 0,
                    "explanation": "アンチエイリアシングは、ピクセルの境界でのジャギー（ギザギザ）を滑らかに見せるための手法です。",
                    "keyPoints": "マルチメディアの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "マルチメディア",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a007",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "同一データベースに対する同一処理は，何度実行しても結果は同じである。",
                            "トランザクション完了後にハードウェア障害が発生しても，更新されたデータベースの内容は保証される。",
                            "トランザクション内の処理は，全てが実行されるか，全てが取り消されるかのいずれかである。",
                            "一つのトランザクションの処理結果は，他のトランザクション処理の影響を受けない。"
                    ],
                    "correct": 2,
                    "explanation": "原子性（Atomicity）は、トランザクションが全て実行されるか全て取り消されるかのいずれかであることを保証するACID特性の一つです。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "データベース",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a008",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "ゲートウェイは，OSI 基本参照モデルにおける第 1 ～ 3 層だけのプロトコルを変換する。",
                            "ブリッジは，IP アドレスを基にしてフレームを中継する。",
                            "リピータは，同種のセグメント間で信号を増幅することによって伝送距離を延長する。",
                            "ルータは，MAC アドレスを基にしてフレームを中継する。"
                    ],
                    "correct": 2,
                    "explanation": "リピータは物理層（第1層）で動作し、同種のセグメント間で減衰した信号を増幅して伝送距離を延長する装置です。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a009",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "検査対象の実行プログラムの設計書，ソースコードに着目し，開発プロセスの各工程にセキュリティ上の問題がないかどうかをツールや目視で確認する。",
                            "公開 Web サーバの各コンテンツファイルのハッシュ値を管理し，定期的に各ファイルから生成したハッシュ値と一致するかどうかを確認する。",
                            "公開 Web サーバや組織のネットワークの脆弱性を探索し，サーバに実際に侵入できるかどうかを確認する。",
                            "内部ネットワークのサーバやネットワーク機器の IPFIX 情報から，各 PC の通信に異常な振る舞いがないかどうかを確認する。"
                    ],
                    "correct": 2,
                    "explanation": "ペネトレーションテストは、システムの脆弱性を実際に悪用して侵入を試みることで、セキュリティの強度を確認するテスト手法です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a010",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "URL を Web ページに出力するときは，",
                            "や",
                            "で始まる URL だけを許可する。",
                            "外部からのパラメータで Web サーバ内のファイル名を直接指定しない。",
                            "スタイルシートを任意の Web サイトから取り込めるようにしない。",
                            "プレースホルダを使って命令文を組み立てる。"
                    ],
                    "correct": 3,
                    "explanation": "SQLインジェクション対策として、プレースホルダ（バインド変数）を使用することで、SQLコマンドとデータを分離し、不正なSQL文の実行を防ぐことができます。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a011",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "エミュレータ",
                            "シミュレータ",
                            "スタブ",
                            "ドライバ"
                    ],
                    "correct": 2,
                    "explanation": "トップダウンテストでは、上位モジュールから下位モジュールへテストを進めるため、まだ未完成の下位モジュールの代替として「スタブ」を使用します。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a012",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "スプリントプランニング",
                            "スプリントレトロスペクティブ",
                            "スプリントレビュー",
                            "デイリースクラム"
                    ],
                    "correct": 3,
                    "explanation": "デイリースクラムは、毎日決まった時間・場所で行われる短時間のミーティングで、チーム全員が進捗状況と今後の計画を共有します。",
                    "keyPoints": "ソフトウェア開発管理技術の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "ソフトウェア開発管理技術",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a013",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "105",
                            "115",
                            "120",
                            "125"
                    ],
                    "correct": 1,
                    "explanation": "アローダイアグラムのクリティカルパス（最長経路）を求めます。3つの経路のうち最も時間がかかるのは「A→C→F→H」の115日です。プロジェクト完了には全ての作業が終わる必要があるため、最長経路の時間が答えとなります。",
                    "keyPoints": "プロジェクトマネジメントの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "プロジェクトマネジメント",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a014",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "運用テストの完了後に，開発部門がシステム仕様と運用方法を運用部門に説明する。",
                            "運用テストは，開発部門の支援を受けずに，運用部門だけで実施する。",
                            "運用部門からもシステムの運用に関わる要件の抽出に積極的に参加する。",
                            "開発部門は運用テストを実施して，運用マニュアルを作成し，運用部門に引き渡す。"
                    ],
                    "correct": 2,
                    "explanation": "開発初期段階から運用部門が要件定義に参加することで、運用性を考慮したシステム設計が可能となり、円滑な移行が実現できます。",
                    "keyPoints": "システム開発技術の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "システム開発技術",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a015",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "関係データベースに蓄積された大量の財務データから必要な条件に合致するデータを抽出し，利用者が扱いやすい表計算ソフトウェアデータに加工する。",
                            "個人情報を含むビッグデータを更に利活用するために，特定の個人を識別することができないように匿名化加工する。",
                            "住所データ項目の中にある，",
                            "と",
                            "の混在や，丁番地の表記不統一を，標準化された表記へ統一するために加工する。",
                            "ソーシャルメディアの口コミを機械学習によって単語ごとに分解し，要約を作り，分析可能なデータに加工し，関係データベースに保管する。"
                    ],
                    "correct": 3,
                    "explanation": "ソーシャルメディアの口コミ（非構造化データ）を機械学習で単語分解・要約して構造化データに変換する処理が、非構造化データから構造化データへの加工例です。",
                    "keyPoints": "データ活用の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "データ活用",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a016",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "経営活動における基本精神や行動指針",
                            "事業戦略の遂行によって達成すべき到達目標",
                            "自社を取り巻く環境に関するビジネス上の機会と脅威",
                            "他社との競争優位の源泉となる経営資源及び企業能力"
                    ],
                    "correct": 3,
                    "explanation": "コアコンピタンスは、企業が他社と差別化できる中核的な能力や強みのことで、競争優位の源泉となる経営資源や企業能力を指します。",
                    "keyPoints": "企業活動の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "企業活動",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a017",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "競争が存在していない未知の市場",
                            "コモディティ化が進んだ既存の市場",
                            "新事業のアイディアを実際のビジネスに育成するまでの期間",
                            "製品開発したものを市場化する過程に横たわっている障壁"
                    ],
                    "correct": 0,
                    "explanation": "ブルーオーシャンは、競合他社が存在せず、新たな需要を創造できる未開拓の市場領域を指します。",
                    "keyPoints": "経営戦略の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "経営戦略",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a018",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "ICT を活用して，住宅内のエネルギー使用状況の監視，機器の遠隔操作や自動制御などを可能にし，家庭におけるエネルギー管理を支援するソリューション",
                            "既存のビジネスモデルによる業界秩序や既得権益を破壊してしまうほど大きな影響を与える新しい ICT やビジネスモデル",
                            "個人の資金に関わる情報を統合的に管理するサービスやマーケットプレイス・レンディングなどの金融サービスを実現するための新しい情報技術",
                            "採用，育成，評価，配属などの人事領域の業務を対象に，ビッグデータ解析や AI などの最新 ICT を活用して，業務改善と社員満足度向上を図るソリューション"
                    ],
                    "correct": 3,
                    "explanation": "HRテック（Human Resources Technology）は、人事領域にAIやビッグデータなどの最新ICTを活用して業務効率化と社員満足度向上を図る技術です。",
                    "keyPoints": "技術戦略マネジメントの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "技術戦略マネジメント",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a019",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "x から y を推定するためには，2 次回帰係数の計算が必要である。",
                            "x から y を推定するための回帰式は，y から x を推定する回帰式と同じである。",
                            "x と y の相関係数は正である。",
                            "x と y の相関係数は負である。"
                    ],
                    "correct": 3,
                    "explanation": "散布図が右下がりの傾向を示している場合、xが増加するとyが減少する負の相関関係があります。",
                    "keyPoints": "応用数学の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "応用数学",
                    "sourceFile": "r6Questions.ts"
            },
            {"id": "r6a020",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "意匠権，実用新案権，商標権，特許権",
                            "意匠権，実用新案権，著作権，特許権",
                            "意匠権，商標権，著作権，特許権",
                            "実用新案権，商標権，著作権，特許権"
                    ],
                    "correct": 0,
                    "explanation": "日本の産業財産権は、特許権、実用新案権、意匠権、商標権の4つです。著作権は産業財産権には含まれません。",
                    "keyPoints": "法務の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "法務",
                    "sourceFile": "r6Questions.ts"
            }
    ],

    past_r6_b:     [
            {"id": "r6b001",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "x ＞ y",
                            "x ＞ y and x ＞ z",
                            "x ＞ y and y ＞ z",
                            "x ＞ z",
                            "x ＞ z and z ＞ y",
                            "z ＞ y"
                    ],
                    "correct": 1,
                    "explanation": "3つの値のうち最大値を返すため、xが最大値となる条件は「x ＞ y and x ＞ z」です。この条件が真の場合にxを返し、偽の場合はyとzの比較に進みます。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "プログラミング",
                    "sourceFile": "r6BQuestions.ts"
            },
            {"id": "r6b002",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "result ＋ int(binary の (length － i ＋ 1)文字目の文字)",
                            "result ＋ int(binary の i文字目の文字)",
                            "result × 2 ＋ int(binary の (length － i ＋ 1)文字目の文字)",
                            "result × 2 ＋ int(binary の i文字目の文字)"
                    ],
                    "correct": 3,
                    "explanation": "2進数を10進数に変換するアルゴリズムです。左から右へ文字を処理しながら、結果を2倍して次のビット値を加算します。「result × 2 ＋ int(binary の i文字目の文字)」が正解です。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "r6BQuestions.ts"
            },
            {
                    "id": "r6b004",
                    "category": "algorithm",
                    "level": "basic",
                    "text": "次の記述中の【 】に入れる正しい答えを，解答群の中から選べ。ここで，配列の要素番号は 1 から始まる。\n\n関数 merge は，昇順に整列された整数型の配列 data1 及び data2 を受け取り，これらを併合してできる昇順に整列された整数型の配列を返す。\n\n関数 merge を merge({2, 3}, {1, 4}) として呼び出すと，/*** α ***/ の行は【 】。",
                    "code": null,
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "実行されない",
                            "1 回実行される",
                            "2 回実行される",
                            "3 回実行される"
                    ],
                    "correct": 1,
                    "explanation": "merge({2, 3}, {1, 4})の実行において、最初のwhileループでdata2から1が取り出され、次にdata1から2, 3が取り出されます。その後data2に残っている4を処理するため、最後のwhileループ（/*** α ***/の行）は1回実行されます。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "r6BQuestions.ts"
            },
            {"id": "r6b006",
                    "pdfUrl": "pdfs/2024r06_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "A社の社内ネットワークからA社利用クラウドサービスへの通信を監視する。",
                            "A社の社内ネットワークとA社利用クラウドサービスとの間の通信速度を制限する。",
                            "A社利用クラウドサービスにA社外から接続する際の認証に2要素認証を導入する。",
                            "A社利用クラウドサービスのうち，A社利用グループウェアだけを直接接続の対象とする。",
                            "専用アプリの保存禁止機能を無効にする。"
                    ],
                    "correct": 2,
                    "explanation": "社内ネットワークを経由しない直接接続により不正アクセスのリスクが増加するため、認証を強化する2要素認証の導入が最も適切な対策です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R6年度",
                    "year": "R6",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r6BQuestions.ts"
            }
    ],

    past_r7_a:     [
            {"id": "r7a001",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "強化学習を行い、最適な結果が得られるようにする。",
                            "事前学習と同じデータを繰り返し用いて学習を行い、モデルの精度を高めるようにする。",
                            "大量のテキストデータを用いて学習を行い、モデルの精度を高めるようにする。",
                            "特定のデータを用いて追加で学習を行い、目的とするタスクに適用できるようにする。"
                    ],
                    "correct": 3,
                    "explanation": "ファインチューニングは、事前学習済みのモデルに対して、特定のタスクやドメインに特化したデータセットで追加学習を行い、そのタスクでの性能を向上させる手法です。",
                    "keyPoints": "AI・機械学習の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "AI・機械学習",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a002",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "演算結果がコンピュータの扱える最大値を超えることによって生じる誤差である。",
                            "数表現のけた数に限度があるので、最下位けたより小さい部分について四捨五入や切上げ、切捨てを行うことによって生じる誤差である。",
                            "乗除算において、指数部が小さい方の数値の仮数部の下位部分が失われることによって生じる誤差である。",
                            "絶対値がほぼ等しい数値の加減算において、上位の有効数字が失われることによって生じる誤差である。"
                    ],
                    "correct": 1,
                    "explanation": "丸め誤差は、浮動小数点数の表現できる桁数に限りがあるため、計算結果の最下位桁より小さい部分を四捨五入、切り上げ、切り捨てなどで処理することによって生じる誤差です。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "基礎理論",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a003",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "a ＜ b ＜ d ＜ e ＜ c ＜ f ＜ g",
                            "d ＜ b ＜ e ＜ a ＜ f ＜ c ＜ g",
                            "d ＜ e ＜ f ＜ g ＜ b ＜ c ＜ a",
                            "g ＜ f ＜ c ＜ e ＜ d ＜ b ＜ a"
                    ],
                    "correct": 1,
                    "explanation": "2分探索木では、各ノードにおいて、左部分木のすべての値はそのノードの値より小さく、右部分木のすべての値はそのノードの値より大きくなります。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a004",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "0.88",
                            "0.90",
                            "0.92",
                            "0.94"
                    ],
                    "correct": 2,
                    "explanation": "6年後、MTBFは4,600時間（4,000+100×6）、MTTRは400時間（1,000-100×6）となります。稼働率 = MTBF/(MTBF+MTTR) = 4,600/(4,600+400) = 4,600/5,000 = 0.92",
                    "keyPoints": "システム管理の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "システム管理",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a005",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "アプリケーションソフトウェアの開発基盤の上で、用意された部品やテンプレートをGUIを用いた操作で組み合わせたり、必要に応じて一部の処理のソースコードを記述したりすることによって、アプリケーションソフトウェアを作成する。",
                            "アプリケーションソフトウェアの開発基盤の上で、用意された部品やテンプレートをGUIを用いた操作で組み合わせるだけで、ソースコードを記述せずに、アプリケーションソフトウェアを作成する。",
                            "アプリケーションソフトウェアの定型的な枠組みを参照して、独自の処理のソースコードを記述することによって、アプリケーションソフトウェアを作成する。",
                            "利用者がシステムを利用して行う作業を自動化ツールに代行させるために、利用者によるシステムの操作手順をツールに登録する。"
                    ],
                    "correct": 0,
                    "explanation": "ローコード開発は、視覚的な開発環境で部品を組み合わせることを主としつつ、必要に応じて一部コードを記述する開発手法です。ノーコード開発との違いは、コード記述の可否です。",
                    "keyPoints": "システム開発技術の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "システム開発技術",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a007",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "10",
                            "53",
                            "67",
                            "80"
                    ],
                    "correct": 3,
                    "explanation": "実際の転送データ量：1GB×1.2=1.2GB=9.6Gビット。理論上の転送可能量：40Mビット/秒×300秒=12Gビット。回線利用率：9.6/12×100≒80％",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a008",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "cookieに保存されている情報を用いたセッション管理が可能である。",
                            "IDとパスワードによって利用者の認証を行うことが可能である。",
                            "Webブラウザでキャッシュさせることによって通信量を減らすことが可能である。",
                            "通信相手先サーバをサーバ証明書によって確認することが可能である。"
                    ],
                    "correct": 3,
                    "explanation": "HTTPSはHTTPにSSL/TLSによる暗号化を加えたプロトコルで、サーバ証明書による相手先の確認（認証）機能を持ちます。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a009",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "あるCAでデジタル証明書の署名に使っている公開鍵のデジタル証明書の有効期限が切れた。",
                            "ある暗号アルゴリズムの秘密鍵が不正アクセスによって漏えいした。",
                            "あるハッシュ関数においてハッシュ値が同じになるデータの組みを現実的な時間内で発見する方法が見つかった。",
                            "あるランサムウェアの一種で暗号化されたファイルの復号鍵が公開された。"
                    ],
                    "correct": 2,
                    "explanation": "暗号の危殆化とは、暗号アルゴリズムの安全性が損なわれることです。ハッシュ関数の衝突（同じハッシュ値を持つ異なるデータ）を現実的な時間で発見できることは、その暗号学的強度が失われたことを意味します。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a010",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "Webサイトに対するアクセス内容を監視し、攻撃とみなされるパターンを検知したときに当該アクセスを遮断する。",
                            "Wi-Fiアライアンスが認定した無線LANの暗号化方式の規格であり、AES暗号に対応している。",
                            "様々なシステムの動作ログを一元的に蓄積、管理し、セキュリティ上の脅威となる事象をいち早く検知、分析する。",
                            "ファイアウォール機能を有し、マルウェア対策機能、侵入検知機能などの複数のセキュリティ機能を連携させ、統合的に管理する。"
                    ],
                    "correct": 0,
                    "explanation": "WAF（Web Application Firewall）は、Webアプリケーションの脆弱性を悪用した攻撃を検知・遮断するセキュリティ対策システムです。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a011",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "エンティティとインスタンスとは、1対1の対応関係をとる。",
                            "エンティティとなり得るものは、物的に実現するものである。",
                            "エンティティは、特性を表すための属性（アトリビュート）をもつ。",
                            "異なった種類のエンティティ間の関係は、主として状態遷移として表現される。"
                    ],
                    "correct": 2,
                    "explanation": "E-Rモデルにおけるエンティティは、データベースで管理したい実体や概念を表し、それぞれ属性（アトリビュート）を持ちます。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "データベース",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a012",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "委譲",
                            "継承",
                            "コンポジション",
                            "多相性"
                    ],
                    "correct": 3,
                    "explanation": "多相性（ポリモーフィズム）は、同じインタフェースで異なるクラスのオブジェクトを操作でき、それぞれのクラスに応じた動作をする性質です。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "プログラミング",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a013",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "開発者",
                            "顧客",
                            "スクラムマスタ",
                            "プロダクトオーナ"
                    ],
                    "correct": 3,
                    "explanation": "スクラムにおいて、プロダクトバックログの管理（内容や優先順位の決定）はプロダクトオーナの責任です。",
                    "keyPoints": "システム開発技術の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "システム開発技術",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a014",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "27",
                            "28",
                            "29",
                            "31"
                    ],
                    "correct": 3,
                    "explanation": "クリティカルパスを求めると、最長経路が31日となります。",
                    "keyPoints": "プロジェクトマネジメントの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "プロジェクトマネジメント",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a015",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "サーバが設置されている施設の無人領域では、営業時間中でも、警報装置が作動するようになっている。",
                            "サーバ室に非常口、避難器具、誘導灯などを設置している。",
                            "社外からサーバ室へ直接出入りするドアを設置しているが、出入りを考慮して常時施錠していない。",
                            "場所が分からないように、サーバ室の所在を室外に表示していない。"
                    ],
                    "correct": 2,
                    "explanation": "サーバ室のセキュリティ対策として、外部からの直接アクセスが可能なドアが常時施錠されていないことは、重大なセキュリティリスクとなるため、指摘事項となります。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a016",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "3C分析",
                            "ABC分析",
                            "コンジョイント分析",
                            "マーケットバスケット分析"
                    ],
                    "correct": 3,
                    "explanation": "マーケットバスケット分析は、顧客の購買データから、同時に購入される商品の組み合わせ（相関関係）を発見する手法です。",
                    "keyPoints": "ストラテジの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "ストラテジ",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a017",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "個々の利用者が、自身が生成AIから得た情報に対して、著作権を主張したい場合",
                            "個々の利用者が入力した情報を、生成AIの学習に利用させたくない場合",
                            "個々の利用者が入力した情報を、生成AIを通じて、他の利用者にも知ってほしい場合",
                            "生成AIから得た情報の信ぴょう性を高めたい場合"
                    ],
                    "correct": 1,
                    "explanation": "オプトアウトは、利用者が入力したデータをAIの学習に使用されることを拒否する設定です。",
                    "keyPoints": "AI・機械学習の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "AI・機械学習",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a018",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "多くの有名ブランド店が出店するショッピングモールの構築",
                            "交通の利便性が高い地域に対する、生活必需品を広く浅く取りそろえた出店計画",
                            "店舗で購入した商品を近隣地域に無償で配送するサービスの実施",
                            "豊富な品ぞろえと、在庫コストや配送費用を抑えるための大規模な物流センタの構築や活用"
                    ],
                    "correct": 3,
                    "explanation": "ロングテール戦略では、多様な商品を効率的に管理・配送できる仕組みが必要です。大規模な物流センタにより、在庫コストを抑えながら豊富な品揃えを実現できます。",
                    "keyPoints": "ストラテジの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "ストラテジ",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a019",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "3.75",
                            "4",
                            "4.2",
                            "5"
                    ],
                    "correct": 3,
                    "explanation": "必要売上高=(固定費+目標利益)÷(1-変動費率)=(300,000+100,000)÷0.8=500,000円。必要客数=500,000÷500=1,000人/月。1日当たり=1,000÷20=50人。1客席当たり=50÷10=5人",
                    "keyPoints": "ストラテジの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "ストラテジ",
                    "sourceFile": "r7Questions.ts"
            },
            {"id": "r7a020",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_a_qs.pdf",
                    "choices": [
                            "温室効果ガスの排出量から吸収量と除去量を差し引いた合計をゼロにする取組",
                            "原材料調達から廃棄・リサイクルに至るまでのライフサイクル全体を通して排出される温室効果ガスの排出量を、CO2量に換算して、その値を商品やサービスに表示すること",
                            "自動車のエンジンから排出される一酸化炭素、窒素酸化物や炭化水素類などの大気汚染物質の排出量の定め",
                            "商品がどのような場所で作られて、流通し、販売されているかを把握するための仕組み"
                    ],
                    "correct": 1,
                    "explanation": "カーボンフットプリントは、製品やサービスのライフサイクル全体で排出される温室効果ガスをCO2換算で表示する取り組みです。",
                    "keyPoints": "ストラテジの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "ストラテジ",
                    "sourceFile": "r7Questions.ts"
            }
    ],

    past_r7_b:     [
            {"id": "r7b001",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "ア: a=iを1から2まで1ずつ増やす, b=jをnから始めてmを超えない範囲でtempNずつ増やす",
                            "イ: a=iを1から2まで1ずつ増やす, b=jをtempNからmまで1ずつ増やす",
                            "ウ: a=iを1から2まで1ずつ増やす, b=jをtempNから始めてmを超えない範囲で4ずつ増やす",
                            "エ: a=iを1から3まで1ずつ増やす, b=jをnから始めてmを超えない範囲でtempNずつ増やす",
                            "オ: a=iを1から3まで1ずつ増やす, b=jをtempNからmまで1ずつ増やす",
                            "カ: a=iを1から3まで1ずつ増やす, b=jをtempNから始めてmを超えない範囲で4ずつ増やす"
                    ],
                    "correct": 5,
                    "explanation": "function1はnからmまでの4の倍数の個数をカウントします。function2も同じ結果を返すため、最初のループでtempNを4の倍数まで調整し、2番目のループで4ずつ増やしながらカウントします。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "r7BQuestions.ts"
            },
            {"id": "r7b002",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "rest ≧ 0",
                            "rest ≧ 5",
                            "rest ≧ 10",
                            "rest ＞ 0",
                            "rest ＞ 5",
                            "rest ＞ 10"
                    ],
                    "correct": 0,
                    "explanation": "10円玉を使う枚数を増やしながら、残りの金額で5円玉と1円玉の組み合わせを数えます。rest ≧ 0の条件により、10円玉で全額を超えない範囲で処理を続けます。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "r7BQuestions.ts"
            },
            {
                    "id": "r7b003",
                    "category": "algorithm",
                    "level": "advanced",
                    "text": "次のプログラム中の【 a 】と【 b 】に入れる正しい答えの組合せを、解答群の中から選べ。ここで、配列の要素番号は 1 から始まる。\n\n関数 push は、引数で与えられた整数をスタックに格納する。格納できた場合は true を返し、格納できなかった場合は false を返す。\n関数 pop は、スタックから値を取り出して返す。スタックが空のときは未定義の値を返す。\n\nスタックを、要素数が 4 である大域の整数型の配列 stack、及び次に値を格納する位置を示す大域の変数 stackPos で表現する。スタックの初期状態は、stack = {4, 3, 未定義の値, 未定義の値}、stackPos = 3 である。\n\n〔プログラム〕\n大域: 整数型: stackPos ← 3\n大域: 整数型の配列: stack ← {4, 3, 未定義の値, 未定義の値}\n\n○論理型: push(整数型: inputData)\n  if (stackPos ≦ stackの要素数)\n    stack[【 a 】] ← inputData\n    stackPos ← stackPos ＋ 1\n    return true\n  else\n    return false\n  endif\n\n○整数型: pop()\n  整数型: popData ← 未定義の値\n  if (stackPos ＞ 1)\n    stackPos ← 【 b 】\n    popData ← stack[stackPos]\n    stack[stackPos] ← 未定義の値\n  endif\n  return popData",
                    "code": null,
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "ア: a=stackPos, b=stackPos ＋ 1",
                            "イ: a=stackPos, b=stackPos － 1",
                            "ウ: a=stackPos － 1, b=stackPos ＋ 1",
                            "エ: a=stackPos － 1, b=stackPos － 1"
                    ],
                    "correct": 1,
                    "explanation": "スタックの実装で、stackPosは次に値を格納する位置を示します。pushではstackPosの位置に格納してからインクリメント、popではデクリメントしてからその位置の値を取り出します。",
                    "keyPoints": "データ構造の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "データ構造",
                    "sourceFile": "r7BQuestions.ts"
            },
            {"id": "r7b004",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10"
                    ],
                    "correct": 7,
                    "explanation": "data配列で",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "r7BQuestions.ts"
            },
            {
                    "id": "r7b005",
                    "category": "algorithm",
                    "level": "advanced",
                    "text": "次の記述中の【 a 】と【 b 】に入れる正しい答えの組合せを、解答群の中から選べ。ここで、配列の要素番号は 1 から始まる。\n\n予防接種の病気 X に対する予防効果を調査するために集めたデータの集計結果を基に、病気 X にかかるかどうかが、予防接種の有無に影響されないと仮定した場合の人数を計算する。この人数を理論度数という。\n\n関数 f は、引数 data で受け取った集計結果を基に計算した理論度数を返す。引数と戻り値は二次元配列で、その行が表の行、その列が表の列に対応する。\n\n表1の集計結果の例：\n- 予防接種を受けた・病気Xにかからなかった: 82人\n- 予防接種を受けた・病気Xにかかった: 6人  \n- 予防接種を受けていない・病気Xにかからなかった: 58人\n- 予防接種を受けていない・病気Xにかかった: 8人\n\n表2を基に計算した理論度数で、予防接種を受けた・病気Xにかからなかった場合は【 a 】人、予防接種を受けていない・病気Xにかかった場合は【 b 】人である。\n\n〔プログラム〕\n○実数型の二次元配列: f(実数型の二次元配列: data)\n  実数型: t ← dataの要素の和\n  整数型: row ← dataの行数\n  整数型: col ← dataの列数\n  実数型の二次元配列: result ← {row行col列の 未定義の値}\n  整数型: r, c\n  for (r を 1 から row まで 1 ずつ増やす)\n    for (c を 1 から col まで 1 ずつ増やす)\n      result[r, c] ← (dataの行番号rの要素の和) × (dataの列番号cの要素の和) ÷ t\n    endfor\n  endfor\n  return result",
                    "code": null,
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "ア: a=44, b=33",
                            "イ: a=58, b=8",
                            "ウ: a=70, b=7",
                            "エ: a=75, b=2",
                            "オ: a=80, b=6",
                            "カ: a=80, b=8",
                            "キ: a=82, b=6"
                    ],
                    "correct": 4,
                    "explanation": "理論度数は(行の和×列の和)÷全体の和で計算します。予防接種を受けた・かからなかった=(88×140)÷154=80、受けていない・かかった=(66×14)÷154=6",
                    "keyPoints": "統計の重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "統計",
                    "sourceFile": "r7BQuestions.ts"
            },
            {"id": "r7b006",
                    "pdfUrl": "pdfs/2025r07_fe_kamoku_b_qs.pdf",
                    "choices": [
                            "ア: a1=月曜日の正午, a2=4.25, a3=CISO",
                            "イ: a1=月曜日の正午, a2=4.25, a3=情報システム部の担当者",
                            "ウ: a1=月曜日の正午, a2=4.25, a3=内部監査室長",
                            "エ: a1=月曜日の正午, a2=4.50, a3=CISO",
                            "オ: a1=月曜日の正午, a2=4.50, a3=情報システム部の担当者",
                            "カ: a1=火曜日の正午, a2=4.25, a3=情報システム部の担当者",
                            "キ: a1=火曜日の正午, a2=4.25, a3=内部監査室長",
                            "ク: a1=火曜日の正午, a2=4.50, a3=CISO",
                            "ケ: a1=火曜日の正午, a2=4.50, a3=情報システム部の担当者",
                            "コ: a1=火曜日の正午, a2=4.50, a3=内部監査室長"
                    ],
                    "correct": 7,
                    "explanation": "RPO72時間から金曜正午の72時間前は火曜正午。木曜正午の障害では土曜フルバックアップ(4時間)+火曜増分(0.25時間)+木曜増分(0.25時間)=4.50時間。ICT継続計画は最高情報セキュリティ責任者(CISO)が承認。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "出典: 基本情報技術者試験 R7年度",
                    "year": "R7",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "r7BQuestions.ts"
            }
    ],

    practice_questions:     [
            {
                    "id": "prac001",
                    "category": "practice",
                    "level": "standard",
                    "text": "10進数25を2進数で表したものはどれか。",
                    "code": null,
                    "choices": [
                            "10011",
                            "11001",
                            "11010",
                            "11011"
                    ],
                    "correct": 1,
                    "explanation": "25 ÷ 2 = 12 余り 1、12 ÷ 2 = 6 余り 0、6 ÷ 2 = 3 余り 0、3 ÷ 2 = 1 余り 1、1 ÷ 2 = 0 余り 1。下の桁から並べると11001となります。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "基礎理論",
                    "sourceFile": "practiceQuestions.ts"
            },
            {
                    "id": "prac002",
                    "category": "practice",
                    "level": "standard", 
                    "text": "CPUの性能指標であるCPIとは何の略か。",
                    "code": null,
                    "choices": [
                            "Clock cycles Per Instruction：1命令当たりの平均クロック数",
                            "Commands Per Instruction：1命令当たりの平均コマンド数",
                            "Cache Per Instruction：1命令当たりの平均キャッシュ使用量",
                            "Cycle Per Input：1入力当たりの平均サイクル数"
                    ],
                    "correct": 0,
                    "explanation": "CPIはClock cycles Per Instructionの略で、1命令を実行するのに必要な平均クロック数を表します。CPU性能の重要な指標の一つです。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac003",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "OSI参照モデルの7層構造において、第4層はどれか。",
                    "code": null,
                    "choices": [
                            "4.8",
                            "6.8",
                            "7.4",
                            "8.2"
                    ],
                    "correct": 1,
                    "explanation": "実効アクセス時間 = ヒット率 × キャッシュアクセス時間 + (1 - ヒット率) × 主記憶アクセス時間 = 0.9 × 2 + 0.1 × 50 = 1.8 + 5.0 = 6.8ns",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac004",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースの正規化に関する説明として正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "演算速度",
                            "表現可能な数値の範囲",
                            "数値の精度",
                            "メモリ使用効率"
                    ],
                    "correct": 2,
                    "explanation": "仮数部のビット数を増やすと、数値の有効桁数が増加し、より精密な値を表現できるようになります。数値の精度が向上します。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "基礎理論",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac005",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ソフトウェア開発におけるテスト技法の説明として正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "FCFS（First Come First Served）",
                            "SJF（Shortest Job First）",
                            "RR（Round Robin）",
                            "Priority Scheduling"
                    ],
                    "correct": 1,
                    "explanation": "SJF（Shortest Job First）は、実行時間が最も短いプロセスから順に実行するスケジューリング方式です。待ち時間の平均を最小化できます。",
                    "keyPoints": "ソフトウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac006",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティにおけるファイアウォールの主な機能はどれか。",
                    "code": null,
                    "choices": [
                            "RAID0",
                            "RAID1",
                            "RAID3",
                            "RAID5"
                    ],
                    "correct": 1,
                    "explanation": "RAID1は、同じデータを2台のディスクに同時に書き込むミラーリング方式で、高い冗長性を実現します。1台故障しても運用を継続できます。",
                    "keyPoints": "ハードウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ハードウェア",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac007",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "プロジェクト管理におけるPDCAサイクルの正しい順序はどれか。",
                    "code": null,
                    "choices": [
                            "10",
                            "14",
                            "18",
                            "24"
                    ],
                    "correct": 1,
                    "explanation": "スタックに3、4を積み、+で取り出して3+4=7をスタックに積む。2を積み、×で7と2を取り出して7×2=14となります。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac008",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークトポロジーの種類に関する説明として正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "CPUの処理能力不足",
                            "参照したページが主記憶にない",
                            "ディスクの容量不足",
                            "ネットワークの通信エラー"
                    ],
                    "correct": 1,
                    "explanation": "ページフォルトは、プログラムが参照しようとしたページが主記憶上に存在しない場合に発生する割り込みです。OSが該当ページを補助記憶から読み込みます。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac009",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データ構造のスタックとキューに関する説明として正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "複数のプロセスが同時に実行される",
                            "資源の獲得順序を統一する",
                            "プロセス間で資源を共有する",
                            "プリエンプション機能を無効にする"
                    ],
                    "correct": 1,
                    "explanation": "デッドロック回避の代表的な手法として、全てのプロセスが資源を同じ順序で獲得するように統一することで、循環待ちを防ぐことができます。",
                    "keyPoints": "ソフトウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac010",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "コンピュータの記憶装置に関する説明として正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "コンパイラは実行時に翻訳、インタプリタは事前に翻訳",
                            "コンパイラは事前に翻訳、インタプリタは実行時に翻訳",
                            "コンパイラは高水準言語専用、インタプリタは低水準言語専用",
                            "両者に実質的な違いはない"
                    ],
                    "correct": 1,
                    "explanation": "コンパイラは実行前にソースコードを機械語に一括翻訳し、インタプリタは実行時に1行ずつ翻訳・実行します。",
                    "keyPoints": "ソフトウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac011",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "基礎理論に関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "163",
                            "164",
                            "166",
                            "167"
                    ],
                    "correct": 0,
                    "explanation": "16進数A3 = A×16¹ + 3×16⁰ = 10×16 + 3×1 = 160 + 3 = 163",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "基礎理論",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac012",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "コンピュータシステムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "333",
                            "500",
                            "667",
                            "1000"
                    ],
                    "correct": 2,
                    "explanation": "MIPS = 動作周波数(MHz) ÷ CPI = 2000MHz ÷ 3 ≒ 667MIPS",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac013",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "アルゴリズムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "3回",
                            "4回",
                            "5回",
                            "10回"
                    ],
                    "correct": 1,
                    "explanation": "要素数5の配列では、隣接要素の比較が n-1 = 4回行われます。(5,2), (5,8), (8,1), (8,9)の4回の比較が実行されます。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac014",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "CPUを介さずに主記憶と周辺装置間でデータ転送を行う",
                            "CPUの処理速度を向上させるためのキャッシュ機能",
                            "複数のプログラムを同時実行する仮想化技術",
                            "ネットワーク通信を高速化する技術"
                    ],
                    "correct": 0,
                    "explanation": "DMA（Direct Memory Access）は、CPUを介することなく、主記憶と周辺装置の間で直接データ転送を行う機能です。CPUの負荷を軽減できます。",
                    "keyPoints": "ハードウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ハードウェア",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac015",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の略語の正しい意味はどれか。",
                    "code": null,
                    "choices": [
                            "AND",
                            "OR",
                            "XOR",
                            "NOT"
                    ],
                    "correct": 1,
                    "explanation": "OR（論理和）は「AまたはB」を表し、AまたはBの少なくとも一方が真の場合に真となります。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "基礎理論",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac016",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "タイムスライスの終了",
                            "I/O処理の発生",
                            "より高い優先度のプロセスの実行要求",
                            "プロセスの正常終了"
                    ],
                    "correct": 1,
                    "explanation": "プロセスがI/O処理を要求すると、I/O完了を待つために実行状態から待機状態に遷移します。",
                    "keyPoints": "ソフトウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac017",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "オーバーフロー",
                            "アンダーフロー",
                            "コリジョン（衝突）",
                            "セグメンテーション"
                    ],
                    "correct": 2,
                    "explanation": "異なるキーが同じハッシュ値になることをコリジョン（衝突）といいます。チェイン法やオープンアドレス法で解決します。",
                    "keyPoints": "データ構造の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データ構造",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac018",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "CPUの使用権をどのプロセスに与えるかを決定",
                            "どのプロセスを主記憶に読み込むかを決定",
                            "どのプロセスを最初に実行するかを決定",
                            "プロセス間通信の制御"
                    ],
                    "correct": 1,
                    "explanation": "長期スケジューラ（ジョブスケジューラ）は、どのプロセスを主記憶に読み込んで実行可能状態にするかを決定します。",
                    "keyPoints": "ソフトウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac019",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "基礎理論に関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "10000101",
                            "11111011",
                            "11111010",
                            "10000011"
                    ],
                    "correct": 1,
                    "explanation": "5の2進数は00000101、これを反転して11111010、最後に1を加えて11111011が-5の2の補数表現です。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "基礎理論",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac020",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "LIFO（Last In First Out）の構造",
                            "FIFO（First In First Out）の構造",
                            "ランダムアクセスが可能",
                            "要素の挿入位置が任意"
                    ],
                    "correct": 1,
                    "explanation": "キューはFIFO（First In First Out）構造で、最初に入れた要素が最初に取り出されます。待ち行列とも呼ばれます。",
                    "keyPoints": "データ構造の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データ構造",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac021",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ビットストリームの伝送",
                            "フレームの誤り制御",
                            "エンドツーエンドの経路制御",
                            "データの暗号化"
                    ],
                    "correct": 2,
                    "explanation": "ネットワーク層（第3層）は、送信元から宛先までのエンドツーエンドの経路制御（ルーティング）を担当します。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac022",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "192.168.1.0",
                            "192.168.1.100",
                            "192.168.1.255",
                            "192.168.0.0"
                    ],
                    "correct": 0,
                    "explanation": "IPアドレスとサブネットマスクのAND演算により、192.168.1.100 & 255.255.255.0 = 192.168.1.0がネットワークアドレスになります。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac023",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "TCPはコネクションレス、UDPはコネクション型",
                            "TCPはコネクション型、UDPはコネクションレス",
                            "TCPは信頼性が低い、UDPは信頼性が高い",
                            "TCPは高速、UDPは低速"
                    ],
                    "correct": 1,
                    "explanation": "TCPはコネクション型で信頼性が高く、UDPはコネクションレス型で高速ですが信頼性は保証されません。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac024",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "IPアドレスを動的に割り当てるプロトコル",
                            "ドメイン名とIPアドレスを対応付けるシステム",
                            "ネットワーク機器の設定を自動配布するプロトコル",
                            "ファイル転送を行うプロトコル"
                    ],
                    "correct": 1,
                    "explanation": "DNS（Domain Name System）は、ドメイン名とIPアドレスを相互に変換する分散データベースシステムです。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac025",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ウイルスの検出と駆除",
                            "データの暗号化",
                            "ネットワークトラフィックの制御",
                            "システムのバックアップ"
                    ],
                    "correct": 2,
                    "explanation": "ファイアウォールは、予め設定されたルールに基づいてネットワークトラフィックを制御し、不正なアクセスを遮断します。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac026",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "データの圧縮",
                            "データの暗号化と認証",
                            "データの高速転送",
                            "データの自動バックアップ"
                    ],
                    "correct": 1,
                    "explanation": "SSL/TLSは、インターネット上でのデータ通信を暗号化し、データの機密性と完全性、サーバの認証を提供します。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac027",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ドメイン名の解決",
                            "IPアドレスの自動割り当て",
                            "データの暗号化",
                            "ルーティング情報の交換"
                    ],
                    "correct": 1,
                    "explanation": "DHCP（Dynamic Host Configuration Protocol）は、ネットワークに接続したコンピュータにIPアドレスを自動的に割り当てるプロトコルです。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac028",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ウイルス対策ソフトの導入",
                            "データの暗号化",
                            "トラフィック監視と帯域制限",
                            "パスワードの複雑化"
                    ],
                    "correct": 2,
                    "explanation": "DoS攻撃は大量のトラフィックでサービスを停止させる攻撃のため、トラフィック監視と帯域制限が有効な対策です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac029",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "インターネット上でのグローバルアドレス",
                            "ネットワークインターフェースの物理アドレス",
                            "プロセス間通信用のアドレス",
                            "ドメイン名の別名"
                    ],
                    "correct": 1,
                    "explanation": "MACアドレスは、ネットワークインターフェースカードに固有に割り当てられた48ビットの物理アドレスです。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac030",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "フレームの誤り検出",
                            "異なるネットワーク間でのパケット転送",
                            "データの暗号化",
                            "ウイルスの検出"
                    ],
                    "correct": 1,
                    "explanation": "ルータは、異なるネットワーク間でパケットを転送する機能を持つネットワーク機器で、最適な経路を選択します。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac031",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "80",
                            "443",
                            "8080",
                            "3389"
                    ],
                    "correct": 1,
                    "explanation": "HTTPSは、SSL/TLSで暗号化されたHTTP通信で、デフォルトでポート番号443を使用します。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac032",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ファイアウォールの導入",
                            "ウイルス対策ソフトの更新",
                            "従業員のセキュリティ教育",
                            "データの暗号化"
                    ],
                    "correct": 2,
                    "explanation": "ソーシャルエンジニアリングは人間の心理的な隙を突く攻撃のため、従業員への継続的なセキュリティ教育が最も重要な対策です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac033",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "通信速度の向上",
                            "インターネット上でのセキュアな通信",
                            "データの自動バックアップ",
                            "ネットワーク機器の統合管理"
                    ],
                    "correct": 1,
                    "explanation": "VPN（Virtual Private Network）は、インターネットなどの公衆ネットワーク上に暗号化された仮想的な専用回線を構築し、セキュアな通信を実現します。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac034",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "パスワードの定期変更",
                            "プリペアドステートメントの使用",
                            "ファイアウォールの設定",
                            "ウイルス対策ソフトの導入"
                    ],
                    "correct": 1,
                    "explanation": "SQLインジェクション対策として、プリペアドステートメント（パラメータ化クエリ）を使用することで、SQLコマンドとデータを分離できます。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac035",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ドメイン名の解決",
                            "プライベートIPアドレスとグローバルIPアドレスの変換",
                            "データの暗号化",
                            "ルーティング情報の交換"
                    ],
                    "correct": 1,
                    "explanation": "NAT（Network Address Translation）は、プライベートIPアドレスとグローバルIPアドレスを相互変換し、IPアドレスの節約と内部ネットワークの隠蔽を行います。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac036",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "データの圧縮",
                            "公開鍵の信頼性保証",
                            "パスワードの管理",
                            "ログの記録"
                    ],
                    "correct": 1,
                    "explanation": "デジタル証明書は、認証局（CA）が発行し、公開鍵の所有者の身元と公開鍵の信頼性を保証します。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac037",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "コリジョンドメインを分割する",
                            "ブロードキャストドメインを分割する",
                            "IPアドレスでフレームを転送する",
                            "フレームを全ポートに送信する"
                    ],
                    "correct": 0,
                    "explanation": "スイッチングハブは、各ポートごとにコリジョンドメインを分割し、MACアドレステーブルを使用してフレームを適切なポートにのみ転送します。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac038",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "システムの脆弱性を突く攻撃",
                            "偽のWebサイトで個人情報を詐取する攻撃",
                            "サービスを停止させる攻撃",
                            "ネットワークトラフィックを盗聴する攻撃"
                    ],
                    "correct": 1,
                    "explanation": "フィッシング攻撃は、正規のWebサイトを装った偽サイトにユーザーを誘導し、個人情報やパスワードを詐取する攻撃です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac039",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "ネットワークに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ファイル転送",
                            "ネットワーク機器の監視・管理",
                            "Webページの表示",
                            "メールの送受信"
                    ],
                    "correct": 1,
                    "explanation": "SNMPは、ネットワーク上の機器（ルータ、スイッチ、サーバなど）を監視・管理するためのプロトコルです。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac040",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "情報セキュリティに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ネットワークトラフィックの暗号化",
                            "不正アクセスの検知",
                            "データのバックアップ",
                            "システムの性能監視"
                    ],
                    "correct": 1,
                    "explanation": "IDS（侵入検知システム）は、ネットワークやシステムに対する不正アクセスや攻撃を検知し、管理者に通知するシステムです。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac041",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "データの検索速度向上",
                            "データの冗長性排除",
                            "データの暗号化",
                            "データの圧縮"
                    ],
                    "correct": 1,
                    "explanation": "正規化は、データの冗長性を排除し、データの整合性を保つことを目的としています。これにより更新異常、挿入異常、削除異常を防げます。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac042",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "UNIQUE",
                            "DISTINCT",
                            "DIFFERENT",
                            "SINGLE"
                    ],
                    "correct": 1,
                    "explanation": "DISTINCTキーワードを使用することで、SELECT文の結果から重複するレコードを除いて一意な値のみを取得できます。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac043",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "Atomicity（原子性）",
                            "Availability（可用性）",
                            "Authentication（認証）",
                            "Authorization（認可）"
                    ],
                    "correct": 0,
                    "explanation": "ACID特性のAはAtomicity（原子性）を表し、トランザクションは全て実行されるか全て取り消されるかのいずれかであることを保証します。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac044",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "アルゴリズムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "log₂n",
                            "n/2",
                            "n",
                            "n²"
                    ],
                    "correct": 1,
                    "explanation": "線形探索では、目的の要素が配列の先頭から順番にどの位置にあるかで比較回数が変わります。平均的にはn/2回の比較が必要です。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac045",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "NULL値を含むことができる",
                            "重複する値を持つことができる",
                            "NULL値を含まず、一意でなければならない",
                            "数値型のみ設定可能"
                    ],
                    "correct": 2,
                    "explanation": "主キーは、テーブル内の各行を一意に識別するための制約で、NULL値を含まず、重複する値を持つことはできません。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac046",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "アルゴリズムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "O(n)",
                            "O(n log n)",
                            "O(n²)",
                            "O(log n)"
                    ],
                    "correct": 1,
                    "explanation": "クイックソートの平均時間計算量はO(n log n)です。最悪の場合はO(n²)ですが、通常は効率的なソートアルゴリズムです。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac047",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "データの暗号化",
                            "データの圧縮",
                            "検索性能の向上",
                            "データの冗長化"
                    ],
                    "correct": 2,
                    "explanation": "インデックスは、データベーステーブルの検索性能を向上させるための仕組みです。特定の列に対する検索やソートを高速化します。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac048",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "アルゴリズムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "同じ入力に対して異なる出力を生成する",
                            "計算に時間がかかる",
                            "出力値が均等に分散される",
                            "出力から入力を容易に推測できる"
                    ],
                    "correct": 2,
                    "explanation": "良いハッシュ関数は、出力値がハッシュテーブル全体に均等に分散されることで、衝突を最小化し、性能を向上させます。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac049",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "レコードを一意に識別する",
                            "他のテーブルとの関連を表現する",
                            "データの暗号化を行う",
                            "インデックスを自動生成する"
                    ],
                    "correct": 1,
                    "explanation": "外部キーは、他のテーブルの主キーを参照することで、テーブル間の関連性を表現し、参照整合性を保証します。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac050",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "アルゴリズムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "データが連結リスト構造である",
                            "データがソート済みである",
                            "データが重複していない",
                            "データが数値型である"
                    ],
                    "correct": 1,
                    "explanation": "二分探索は、ソート済みの配列に対してのみ適用可能な探索アルゴリズムです。中央値と比較しながら探索範囲を半分ずつ絞り込みます。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac051",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "LEFT JOIN",
                            "RIGHT JOIN",
                            "INNER JOIN",
                            "FULL OUTER JOIN"
                    ],
                    "correct": 2,
                    "explanation": "INNER JOINは、結合条件を満たすレコードが両方のテーブルに存在する場合のみ結果に含めます。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac052",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "高さ（depth）",
                            "幅（width）",
                            "次数（degree）",
                            "重み（weight）"
                    ],
                    "correct": 0,
                    "explanation": "木の高さ（depth）は、根ノードから最も深い葉ノードまでの経路の長さを表します。",
                    "keyPoints": "データ構造の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データ構造",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac053",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の略語の正しい意味はどれか。",
                    "code": null,
                    "choices": [
                            "COMMIT",
                            "ROLLBACK",
                            "SAVEPOINT",
                            "LOCK"
                    ],
                    "correct": 0,
                    "explanation": "COMMITは、トランザクション内で行った全ての変更をデータベースに確定（永続化）する命令です。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac054",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "アルゴリズムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "クラスカル法",
                            "プリム法",
                            "ダイクストラ法",
                            "バブルソート"
                    ],
                    "correct": 2,
                    "explanation": "ダイクストラ法は、重み付きグラフにおいて、指定した頂点から他の全ての頂点への最短経路を求めるアルゴリズムです。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac055",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "部分関数従属を排除する",
                            "推移関数従属を排除する",
                            "繰り返し項目を排除する",
                            "多値従属を排除する"
                    ],
                    "correct": 2,
                    "explanation": "第1正規形は、テーブル内の各セルが単一の値を持ち、繰り返し項目（多値属性）を排除した形です。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac056",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "アルゴリズムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "O(n)",
                            "O(n log n)",
                            "O(n²)",
                            "O(2ⁿ)"
                    ],
                    "correct": 1,
                    "explanation": "マージソートは、分割統治法を使用するソートアルゴリズムで、最悪の場合でもO(n log n)の時間計算量を保証します。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac057",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "物理的にデータを保存する",
                            "仮想的なテーブルである",
                            "インデックスを必ず持つ",
                            "データの追加のみ可能"
                    ],
                    "correct": 1,
                    "explanation": "ビューは、一つ以上のテーブルから作成される仮想的なテーブルで、実際のデータは保存せず、クエリ実行時に動的に生成されます。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac058",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "アルゴリズムに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "問題を小さな部分問題に分割し、解を記録して再利用する",
                            "貪欲的に最適解を選択する",
                            "ランダムに解を探索する",
                            "全ての可能性を総当たりで検証する"
                    ],
                    "correct": 0,
                    "explanation": "動的プログラミングは、問題を部分問題に分割し、部分問題の解を記録（メモ化）して重複計算を避ける最適化技法です。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac059",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "データベースに関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "データベースレベル",
                            "テーブルレベル",
                            "ページレベル",
                            "行レベル"
                    ],
                    "correct": 3,
                    "explanation": "行レベルロックは、個々の行（レコード）に対してロックをかける最も細かい粒度のロックで、同時実行性を最大化できます。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac060",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "前順走査（preorder）",
                            "中順走査（inorder）",
                            "後順走査（postorder）",
                            "幅優先走査"
                    ],
                    "correct": 1,
                    "explanation": "中順走査（inorder）は、左の子ノード、根ノード、右の子ノードの順で訪問します。二分探索木では昇順にソートされた順序で要素を取得できます。",
                    "keyPoints": "データ構造の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データ構造",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac061",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "プロジェクト管理に関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "プロジェクトの予算を管理する",
                            "プロジェクトの作業を階層的に分解する",
                            "プロジェクトのリスクを評価する",
                            "プロジェクトの品質を保証する"
                    ],
                    "correct": 1,
                    "explanation": "WBS（Work Breakdown Structure）は、プロジェクトの成果物や作業を階層的に分解し、管理しやすい単位に細分化する技法です。",
                    "keyPoints": "プロジェクトマネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プロジェクトマネジメント",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac062",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "詳細な仕様書を最初に完成させる",
                            "短い期間での反復開発を行う",
                            "変更要求を受け付けない",
                            "テストは開発完了後に実施する"
                    ],
                    "correct": 1,
                    "explanation": "アジャイル開発は、短い期間（スプリント）での反復開発を行い、顧客との継続的な対話を通じて価値のあるソフトウェアを効率的に開発する手法です。",
                    "keyPoints": "ソフトウェア開発管理技術の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア開発管理技術",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac063",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "プログラムの内部構造を考慮してテストする",
                            "仕様書に基づいて入出力のみに着目してテストする",
                            "コードカバレッジを重視する",
                            "プログラマーのみが実施する"
                    ],
                    "correct": 1,
                    "explanation": "ブラックボックステストは、プログラムの内部構造を知らずに、仕様書に基づいて入力と期待される出力のみに着目してテストする手法です。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac064",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "プログラムのコーディングを行う",
                            "システムの詳細設計を行う",
                            "システムに求められる機能や性能を明確化する",
                            "システムのテストを実施する"
                    ],
                    "correct": 2,
                    "explanation": "要件定義は、開発するシステムに求められる機能要件と非機能要件を明確化し、システムの範囲と目標を定める工程です。",
                    "keyPoints": "システム開発技術の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム開発技術",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac065",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "プロジェクト管理に関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ITサービスの改善を行う",
                            "ITサービスの中断を最小限に抑える",
                            "IT資産を管理する",
                            "ITサービスの設計を行う"
                    ],
                    "correct": 1,
                    "explanation": "インシデント管理は、ITサービスの予期しない中断や品質低下を迅速に復旧し、ビジネスへの影響を最小限に抑えることを目的とします。",
                    "keyPoints": "サービスマネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "サービスマネジメント",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac066",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "商用利用が禁止されている",
                            "改変したソフトウェアもGPLで公開する必要がある",
                            "ソースコードの公開義務がない",
                            "個人利用のみ許可されている"
                    ],
                    "correct": 1,
                    "explanation": "GPL（GNU General Public License）は、コピーレフト型ライセンスで、改変したソフトウェアも同じGPLライセンスで公開することを要求します。",
                    "keyPoints": "法務の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "法務",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac067",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "システムの性能を向上させる",
                            "システムの信頼性と安全性を客観的に評価する",
                            "システムの操作方法を教育する",
                            "システムの新機能を開発する"
                    ],
                    "correct": 1,
                    "explanation": "システム監査は、情報システムの信頼性、安全性、効率性を第三者の立場から客観的に評価し、改善点を指摘することを目的とします。",
                    "keyPoints": "システム監査の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム監査",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac068",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "公表後10年",
                            "公表後20年",
                            "公表後50年",
                            "公表後70年"
                    ],
                    "correct": 3,
                    "explanation": "日本の著作権法では、プログラムを含む著作物の保護期間は、原則として著作者の死後70年（法人著作は公表後70年）です。",
                    "keyPoints": "法務の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "法務",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac069",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "プロジェクト管理に関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "リスク受容",
                            "リスク回避",
                            "リスク軽減",
                            "リスク移転"
                    ],
                    "correct": 3,
                    "explanation": "リスク移転は、保険加入や外部委託などにより、リスクの影響を他者に移転する戦略です。",
                    "keyPoints": "プロジェクトマネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プロジェクトマネジメント",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac070",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "開発工程とテスト工程を対応付けている",
                            "並行して複数の機能を開発する",
                            "顧客の要求変更に柔軟に対応する",
                            "プロトタイプを繰り返し改良する"
                    ],
                    "correct": 0,
                    "explanation": "V字モデルは、左側の開発工程（要件定義、設計など）と右側のテスト工程を対応付け、各工程での品質を保証する開発モデルです。",
                    "keyPoints": "ソフトウェア開発管理技術の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア開発管理技術",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac071",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "プロジェクト管理に関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "最も費用のかかる作業の経路",
                            "最も重要な作業の経路",
                            "最も時間のかかる作業の経路",
                            "最もリスクの高い作業の経路"
                    ],
                    "correct": 2,
                    "explanation": "クリティカルパスは、プロジェクトの開始から終了までの作業経路のうち、最も時間のかかる経路で、プロジェクト全体の完了時期を決定します。",
                    "keyPoints": "プロジェクトマネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プロジェクトマネジメント",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac072",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "プロジェクト管理に関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "システムの設計書",
                            "サービスレベルの合意書",
                            "セキュリティ対策書",
                            "ソフトウェアライセンス契約書"
                    ],
                    "correct": 1,
                    "explanation": "SLA（Service Level Agreement）は、サービス提供者と利用者の間で、サービスレベル（品質、性能など）について合意した契約書です。",
                    "keyPoints": "サービスマネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "サービスマネジメント",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac073",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "氏名",
                            "住所",
                            "生年月日",
                            "統計データ"
                    ],
                    "correct": 3,
                    "explanation": "統計データは個人を特定できない形に加工されたものなので、個人情報には該当しません。個人情報は特定の個人を識別できる情報です。",
                    "keyPoints": "法務の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "法務",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac074",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "システムの応答時間",
                            "システムの修正・改良のしやすさ",
                            "システムの可用性",
                            "システムの信頼性"
                    ],
                    "correct": 1,
                    "explanation": "保守性（Maintainability）は、ソフトウェアの修正、改良、拡張などの保守作業を効率的に行える度合いを表します。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac075",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "ITシステムの性能向上",
                            "経営戦略とITの整合性確保",
                            "セキュリティの強化",
                            "コストの削減"
                    ],
                    "correct": 1,
                    "explanation": "エンタープライズアーキテクチャ（EA）は、組織の経営戦略とITシステムの整合性を確保し、効率的なIT投資と運用を実現することを目的とします。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac076",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "日常業務の効率化",
                            "災害時の事業継続",
                            "IT投資の最適化",
                            "品質管理の向上"
                    ],
                    "correct": 1,
                    "explanation": "BCP（Business Continuity Plan）は、災害や事故などの緊急事態が発生した際に、事業を継続または早期復旧するための計画です。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac077",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "スタブ",
                            "ドライバ",
                            "ハーネス",
                            "エミュレータ"
                    ],
                    "correct": 0,
                    "explanation": "スタブは、トップダウンテストにおいて、まだ完成していない下位モジュールの代替として使用されるテスト用のダミーモジュールです。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac078",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "プロジェクト管理に関する次の説明のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "プロジェクトの予算超過",
                            "プロジェクトのスケジュール遅延",
                            "プロジェクトの範囲が無制限に拡大すること",
                            "プロジェクトチームの能力不足"
                    ],
                    "correct": 2,
                    "explanation": "スコープクリープは、プロジェクトの範囲が当初の計画を超えて無制限に拡大してしまう現象で、プロジェクト失敗の主要因の一つです。",
                    "keyPoints": "プロジェクトマネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プロジェクトマネジメント",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac079",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "IT部門の人員削減",
                            "ITシステムの統制と価値創出",
                            "ITコストの削減",
                            "IT技術の標準化"
                    ],
                    "correct": 1,
                    "explanation": "ITガバナンスは、ITが企業価値の向上に寄与するよう、IT投資・運用を適切に統制し、ITから最大の価値を創出することを目的とします。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "practiceQuestions.ts"
            },
            {"id": "prac080",
            {
                    "category": "practice",
                    "level": "standard", 
                    "text": "次の選択肢のうち、正しいものはどれか。",
                    "code": null,
                    "choices": [
                            "プログラムの実行速度を測定する",
                            "ソフトウェアの規模を機能の観点から測定する",
                            "システムの可用性を評価する",
                            "データベースの性能を測定する"
                    ],
                    "correct": 1,
                    "explanation": "ファンクションポイント法は、ユーザーから見たソフトウェアの機能の観点からシステムの規模を測定し、開発工数やコストの見積もりに使用される手法です。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "practiceQuestions.ts"
            }
    ],

    more_subject_a:     [
            {"id": "a011",
                    "choices": [
                            "1111011",
                            "1111001",
                            "1110011",
                            "1101011"
                    ],
                    "correct": 0,
                    "explanation": "123 ÷ 2 = 61 余り 1、61 ÷ 2 = 30 余り 1、30 ÷ 2 = 15 余り 0、15 ÷ 2 = 7 余り 1、7 ÷ 2 = 3 余り 1、3 ÷ 2 = 1 余り 1、1 ÷ 2 = 0 余り 1。余りを逆順に並べると1111011。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "基礎理論",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a012",
                    "choices": [
                            "10^9バイト",
                            "10^12バイト",
                            "2^40バイト",
                            "2^30バイト"
                    ],
                    "correct": 2,
                    "explanation": "1TB = 2^40バイト = 1,099,511,627,776バイト。テラは2^40を表します。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a013",
                    "choices": [
                            "メモリ容量を増やす",
                            "命令実行の並列化による性能向上",
                            "キャッシュヒット率を上げる",
                            "消費電力を削減する"
                    ],
                    "correct": 1,
                    "explanation": "パイプライン処理は、命令の実行段階を分割し、複数の命令を並列的に処理することで全体の処理性能を向上させる技術です。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a014",
                    "choices": [
                            "32ビット",
                            "64ビット",
                            "96ビット",
                            "128ビット"
                    ],
                    "correct": 3,
                    "explanation": "IPv6アドレスは128ビットで構成されており、IPv4の32ビットから大幅に拡張されています。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a015",
                    "choices": [
                            "80",
                            "443",
                            "993",
                            "995"
                    ],
                    "correct": 1,
                    "explanation": "HTTPSは標準でポート番号443を使用します。HTTPは80、IMAPS は993、POP3S は995を使用します。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a016",
                    "choices": [
                            "Atomicity（原子性）",
                            "Availability（可用性）",
                            "Accuracy（正確性）",
                            "Authentication（認証）"
                    ],
                    "correct": 0,
                    "explanation": "ACIDのAはAtomicity（原子性）を表し、トランザクションが全て実行されるか、全て実行されないかのどちらかであることを保証します。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a017",
                    "choices": [
                            "レコードを削除する",
                            "テーブルを結合する",
                            "指定した列の値でグループ化する",
                            "レコードの順序を変更する"
                    ],
                    "correct": 2,
                    "explanation": "GROUP BY句は、指定した列の値が同じレコードをグループ化し、集計関数と組み合わせて使用します。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a018",
                    "choices": [
                            "暗号化と復号化に同じ鍵を使用する",
                            "暗号化と復号化に異なる鍵を使用する",
                            "鍵の配布が不要である",
                            "処理速度が共通鍵暗号より速い"
                    ],
                    "correct": 1,
                    "explanation": "公開鍵暗号方式では、暗号化に公開鍵、復号化に秘密鍵という異なる鍵のペアを使用します。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a019",
                    "choices": [
                            "送信者の認証",
                            "データの完全性確保",
                            "データの機密性確保",
                            "否認防止"
                    ],
                    "correct": 2,
                    "explanation": "ディジタル署名は送信者の認証、データの完全性確保、否認防止を目的としますが、データの機密性確保は暗号化の目的です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a020",
                    "choices": [
                            "最も重要な作業",
                            "最も時間のかかる作業順序",
                            "最も費用のかかる作業",
                            "最も多くの人員が必要な作業"
                    ],
                    "correct": 1,
                    "explanation": "クリティカルパスは、プロジェクトの開始から終了までの最も時間のかかる作業順序（経路）のことです。",
                    "keyPoints": "マネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "マネジメント",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a021",
                    "choices": [
                            "組織図を表す",
                            "作業の進捗を時系列で表す",
                            "費用の推移を表す",
                            "品質の変化を表す"
                    ],
                    "correct": 1,
                    "explanation": "ガントチャートは、プロジェクトの各作業の開始日、終了日、進捗状況を時系列で視覚的に表現する図表です。",
                    "keyPoints": "マネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "マネジメント",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a022",
                    "choices": [
                            "楕円",
                            "長方形",
                            "ひし形",
                            "平行四辺形"
                    ],
                    "correct": 2,
                    "explanation": "フローチャートでは、ひし形で判断処理（条件分岐）を表します。楕円は開始/終了、長方形は処理、平行四辺形は入出力を表します。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a023",
                    "choices": [
                            "プログラムの内部構造を基にテストする",
                            "プログラムの仕様を基にテストする",
                            "プログラムのソースコードを基にテストする",
                            "プログラムの実行時間を基にテストする"
                    ],
                    "correct": 1,
                    "explanation": "ブラックボックステストは、プログラムの内部構造を考慮せず、仕様書に基づいて入力と期待される出力の関係をテストする手法です。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a024",
                    "choices": [
                            "プログラミング言語の一つ",
                            "データベース管理システム",
                            "統一モデリング言語",
                            "ネットワークプロトコル"
                    ],
                    "correct": 2,
                    "explanation": "UML（Unified Modeling Language）は、ソフトウェア開発において設計を図式化するための統一モデリング言語です。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a025",
                    "choices": [
                            "各工程を並行して実施する",
                            "各工程を順次進める",
                            "試作品を繰り返し改良する",
                            "短期間での開発が可能"
                    ],
                    "correct": 1,
                    "explanation": "ウォーターフォールモデルは、要件定義、設計、実装、テスト、運用の各工程を順次進める開発手法です。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a026",
                    "choices": [
                            "入力",
                            "記憶",
                            "制御",
                            "通信"
                    ],
                    "correct": 3,
                    "explanation": "コンピュータの五大機能は、入力、記憶、演算、制御、出力です。通信は含まれません。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a027",
                    "choices": [
                            "メモリの高速化技術",
                            "ディスクの冗長化技術",
                            "CPUの並列処理技術",
                            "ネットワークの暗号化技術"
                    ],
                    "correct": 1,
                    "explanation": "RAID（Redundant Arrays of Inexpensive Disks）は、複数のハードディスクを組み合わせて冗長性や性能を向上させる技術です。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a028",
                    "choices": [
                            "プロセス管理",
                            "メモリ管理",
                            "ファイル管理",
                            "アプリケーション開発"
                    ],
                    "correct": 3,
                    "explanation": "OS（オペレーティングシステム）の主要機能は、プロセス管理、メモリ管理、ファイル管理、入出力管理などです。アプリケーション開発はOSの機能ではありません。",
                    "keyPoints": "ソフトウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a029",
                    "choices": [
                            "プログラムを事前に機械語に変換する",
                            "プログラムを実行時に逐次解釈実行する",
                            "プログラムの文法をチェックする",
                            "プログラムを最適化する"
                    ],
                    "correct": 1,
                    "explanation": "インタープリタは、プログラムを実行時に一行ずつ解釈して実行する言語処理系です。",
                    "keyPoints": "ソフトウェアの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a030",
                    "choices": [
                            "O(1)",
                            "O(log n)",
                            "O(n)",
                            "O(n²)"
                    ],
                    "correct": 1,
                    "explanation": "バイナリサーチは、ソート済みのデータを半分ずつ絞り込んで検索するため、計算量はO(log n)です。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a031",
                    "choices": [
                            "メモリ不足が発生すること",
                            "異なるキーが同じハッシュ値になること",
                            "データが破損すること",
                            "プログラムが異常終了すること"
                    ],
                    "correct": 1,
                    "explanation": "ハッシュ法における衝突（コリジョン）とは、異なるキーに対してハッシュ関数が同じハッシュ値を返すことです。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a032",
                    "choices": [
                            "pop",
                            "top",
                            "enqueue",
                            "empty"
                    ],
                    "correct": 2,
                    "explanation": "enqueueはキューの操作です。スタックの基本操作はpush（積む）、pop（取り出す）、top（先頭を見る）、empty（空かチェック）です。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a033",
                    "choices": [
                            "同軸ケーブル",
                            "ツイストペアケーブル",
                            "光ファイバケーブル",
                            "無線"
                    ],
                    "correct": 1,
                    "explanation": "現在のLANでは、取り扱いやすさとコストの面から、ツイストペアケーブル（UTPケーブル）が最も一般的に使用されています。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a034",
                    "choices": [
                            "先頭8ビットがネットワーク部",
                            "先頭16ビットがネットワーク部",
                            "先頭24ビットがネットワーク部",
                            "先頭32ビットがネットワーク部"
                    ],
                    "correct": 1,
                    "explanation": "クラスBのIPアドレスは、先頭16ビットがネットワーク部、残り16ビットがホスト部となっています。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a035",
                    "choices": [
                            "ドメイン名をIPアドレスに変換する",
                            "IPアドレスを自動割り当てする",
                            "ネットワークの経路を制御する",
                            "データを暗号化する"
                    ],
                    "correct": 0,
                    "explanation": "DNS（Domain Name System）は、人間が覚えやすいドメイン名を、コンピュータが理解できるIPアドレスに変換するシステムです。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a036",
                    "choices": [
                            "検索速度の向上",
                            "データの冗長性の排除",
                            "セキュリティの向上",
                            "バックアップの簡素化"
                    ],
                    "correct": 1,
                    "explanation": "データベースの正規化の主な目的は、データの冗長性（重複）を排除し、データの整合性を保つことです。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a037",
                    "choices": [
                            "データの圧縮率を向上させる",
                            "データの検索速度を向上させる",
                            "データの安全性を向上させる",
                            "データの可読性を向上させる"
                    ],
                    "correct": 1,
                    "explanation": "インデックスは、データベースにおいて特定の列の値に基づいてデータの検索速度を向上させるためのデータ構造です。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a038",
                    "choices": [
                            "複数のテーブルを結合する",
                            "テーブルを分割する",
                            "データを暗号化する",
                            "インデックスを作成する"
                    ],
                    "correct": 0,
                    "explanation": "JOIN文は、複数のテーブルを指定した条件に基づいて結合し、関連するデータを同時に取得するために使用します。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a039",
                    "choices": [
                            "フロッピーディスク",
                            "電子メール",
                            "CD-ROM",
                            "プリンタ"
                    ],
                    "correct": 1,
                    "explanation": "現在では、電子メールの添付ファイルやWebサイトからのダウンロードが、コンピュータウイルスの主要な感染経路となっています。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a040",
                    "choices": [
                            "英数字と記号を組み合わせる",
                            "定期的に変更する",
                            "他人と共有する",
                            "推測しにくい文字列にする"
                    ],
                    "correct": 2,
                    "explanation": "パスワードを他人と共有することは、セキュリティ上非常に危険です。パスワードは個人が秘密に管理すべきものです。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a041",
                    "choices": [
                            "データ圧縮",
                            "データ暗号化",
                            "データ検索",
                            "データ変換"
                    ],
                    "correct": 1,
                    "explanation": "SSL/TLS（Secure Sockets Layer/Transport Layer Security）は、インターネット上でのデータ通信を暗号化し、安全性を確保するプロトコルです。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a042",
                    "choices": [
                            "プロジェクトの期間",
                            "プロジェクトの予算",
                            "プロジェクトの作業範囲",
                            "プロジェクトの品質"
                    ],
                    "correct": 2,
                    "explanation": "スコープとは、プロジェクトで実行すべき作業の範囲、つまり何を作り、何を作らないかを明確に定義したものです。",
                    "keyPoints": "マネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "マネジメント",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a043",
                    "choices": [
                            "リスク特定 → リスク分析 → リスク対応 → リスク監視",
                            "リスク分析 → リスク特定 → リスク対応 → リスク監視",
                            "リスク対応 → リスク特定 → リスク分析 → リスク監視",
                            "リスク監視 → リスク特定 → リスク分析 → リスク対応"
                    ],
                    "correct": 0,
                    "explanation": "リスクマネジメントは、リスクの特定、分析、対応、監視の順序で実施します。",
                    "keyPoints": "マネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "マネジメント",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a044",
                    "choices": [
                            "詳細な文書を重視する",
                            "計画の厳密な遵守を重視する",
                            "短い反復での開発を行う",
                            "大規模なチームで開発する"
                    ],
                    "correct": 2,
                    "explanation": "アジャイル開発は、短い反復（スプリント）での開発を繰り返し、顧客との協働や変化への対応を重視する開発手法です。",
                    "keyPoints": "ソフトウェア工学の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ソフトウェア工学",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a045",
                    "choices": [
                            "システム設計書",
                            "サービス品質保証書",
                            "サービスレベル合意書",
                            "システム運用手順書"
                    ],
                    "correct": 2,
                    "explanation": "SLA（Service Level Agreement）は、ITサービスの品質レベルについて、サービス提供者と利用者の間で結ぶ合意書です。",
                    "keyPoints": "サービスマネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "サービスマネジメント",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a046",
                    "choices": [
                            "システムの開発",
                            "システムの運用",
                            "システムの評価",
                            "システムの保守"
                    ],
                    "correct": 2,
                    "explanation": "システム監査は、情報システムの信頼性、安全性、効率性などを客観的に評価することを目的とします。",
                    "keyPoints": "システム監査の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム監査",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a047",
                    "choices": [
                            "新規事業の計画",
                            "災害時の事業継続のための計画",
                            "事業拡大の計画",
                            "人材育成の計画"
                    ],
                    "correct": 1,
                    "explanation": "BCP（Business Continuity Plan）は、災害や事故などの緊急事態が発生した際に、事業を継続または早期復旧するための計画です。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a048",
                    "choices": [
                            "初期投資の削減",
                            "スケーラビリティの向上",
                            "データの完全なコントロール",
                            "運用負荷の軽減"
                    ],
                    "correct": 2,
                    "explanation": "クラウドコンピューティングでは、データはクラウド事業者のサーバに保存されるため、完全なコントロールを持つことは困難です。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a049",
                    "choices": [
                            "インターネット上の電子商取引",
                            "様々なモノがインターネットに接続される仕組み",
                            "インターネットのセキュリティ技術",
                            "インターネットの通信プロトコル"
                    ],
                    "correct": 1,
                    "explanation": "IoT（Internet of Things）は、家電製品、自動車、センサーなど様々なモノがインターネットに接続され、情報をやり取りする仕組みです。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a050",
                    "choices": [
                            "音声認識システム",
                            "画像認識システム",
                            "自然言語処理システム",
                            "ハードウェア設計システム"
                    ],
                    "correct": 3,
                    "explanation": "ハードウェア設計は主に人間の専門知識と創造性が必要な分野で、現在のAI技術での完全な自動化は困難です。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a051",
                    "choices": [
                            "Volume（量）",
                            "Velocity（速度）",
                            "Variety（多様性）",
                            "Visibility（可視性）"
                    ],
                    "correct": 3,
                    "explanation": "ビッグデータの特徴を表す「3V」は、Volume（量）、Velocity（速度）、Variety（多様性）です。Visibility（可視性）は含まれません。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a052",
                    "choices": [
                            "ウイルス",
                            "ワーム",
                            "トロイの木馬",
                            "プロトコル"
                    ],
                    "correct": 3,
                    "explanation": "プロトコルは通信規約であり、マルウェアではありません。ウイルス、ワーム、トロイの木馬はすべてマルウェアの種類です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a053",
                    "choices": [
                            "SQLインジェクション",
                            "フィッシング詐欺",
                            "バッファオーバーフロー",
                            "DDoS攻撃"
                    ],
                    "correct": 1,
                    "explanation": "フィッシング詐欺は、偽のWebサイトや電子メールを使って人を騙し、個人情報を盗み取るソーシャルエンジニアリング攻撃の一種です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a054",
                    "choices": [
                            "ITコストの削減",
                            "IT投資の効果を最大化",
                            "IT人材の育成",
                            "IT機器の調達"
                    ],
                    "correct": 1,
                    "explanation": "ITガバナンスは、組織がITを効果的に活用し、事業価値を最大化するための仕組みや取り組みです。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a055",
                    "choices": [
                            "データを圧縮する技術",
                            "データを暗号化する技術",
                            "大量のデータから有用な情報を発見する技術",
                            "データを転送する技術"
                    ],
                    "correct": 2,
                    "explanation": "データマイニングは、大量のデータの中から、統計学や機械学習などの手法を用いて有用なパターンや知識を発見する技術です。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a056",
                    "choices": [
                            "電子メールシステム",
                            "企業資源計画システム",
                            "電子商取引システム",
                            "顧客管理システム"
                    ],
                    "correct": 1,
                    "explanation": "ERP（Enterprise Resource Planning）は、企業の経営資源（人、物、金、情報）を統合的に管理する企業資源計画システムです。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a057",
                    "choices": [
                            "在庫管理の最適化",
                            "顧客関係の管理",
                            "財務管理の効率化",
                            "人事管理の自動化"
                    ],
                    "correct": 1,
                    "explanation": "CRM（Customer Relationship Management）は、顧客との関係を管理し、顧客満足度の向上や売上の増加を目指すシステムです。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a058",
                    "choices": [
                            "開発者専用のツール",
                            "運用者専用のツール",
                            "開発と運用の連携を重視する文化",
                            "セキュリティ監査のツール"
                    ],
                    "correct": 2,
                    "explanation": "DevOpsは、開発（Development）と運用（Operations）の連携を重視し、ソフトウェアの開発から運用までを効率化する文化や実践方法です。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a059",
                    "choices": [
                            "アプリケーションの軽量化",
                            "環境の一貫性",
                            "スケーラビリティの向上",
                            "ハードウェアの性能向上"
                    ],
                    "correct": 3,
                    "explanation": "コンテナ技術は、アプリケーションの軽量化、環境の一貫性、スケーラビリティの向上などの利点がありますが、ハードウェアの性能自体を向上させるものではありません。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            },
            {"id": "a060",
                    "choices": [
                            "APIを使った経済活動",
                            "APIの開発手法",
                            "APIのセキュリティ対策",
                            "APIの性能測定"
                    ],
                    "correct": 0,
                    "explanation": "APIエコノミーとは、API（Application Programming Interface）を通じて企業がサービスやデータを公開し、新たなビジネスモデルや経済活動を創出することです。",
                    "keyPoints": "システム戦略の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "システム戦略",
                    "sourceFile": "moreQuestions.ts"
            }
    ],

    more_algorithm:     [
            {"id": "b006",
                    "choices": [
                            "15",
                            "9",
                            "6",
                            "10"
                    ],
                    "correct": 1,
                    "explanation": "i += 2により、インデックス0, 2, 4の要素（1, 3, 5）が加算されます。1 + 3 + 5 = 9となります。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プログラミング",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b007",
                    "choices": [
                            "O(n)",
                            "O(n log n)",
                            "O(n²)",
                            "O(1)"
                    ],
                    "correct": 2,
                    "explanation": "バブルソートは二重ループで隣接要素を比較・交換するため、最悪時間計算量はO(n²)です。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b008",
                    "choices": [
                            "線形探索",
                            "二分探索",
                            "ハッシュ探索",
                            "深さ優先探索"
                    ],
                    "correct": 1,
                    "explanation": "このコードは二分探索アルゴリズムです。配列の中央値と比較して探索範囲を半分に絞り込んでいます。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b009",
                    "choices": [
                            "引数が多すぎる",
                            "ベースケース（終了条件）がない",
                            "戻り値が大きすぎる",
                            "処理時間が長すぎる"
                    ],
                    "correct": 1,
                    "explanation": "再帰関数にベースケース（終了条件）がないと、無限に自身を呼び出し続け、スタックオーバーフローが発生します。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プログラミング",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b010",
                    "choices": [
                            "配列",
                            "連結リスト",
                            "二分木",
                            "ハッシュテーブル"
                    ],
                    "correct": 1,
                    "explanation": "Nodeクラスがデータとnext（次のノードへの参照）を持ち、先頭に要素を追加していることから、単方向連結リストの実装です。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プログラミング",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b011",
                    "choices": [
                            "不安定なソートアルゴリズムである",
                            "最悪時間計算量がO(n²)である",
                            "分割統治法を用いる",
                            "インプレースソートである"
                    ],
                    "correct": 2,
                    "explanation": "マージソートは分割統治法を用いて、配列を再帰的に分割し、マージしながらソートする安定なアルゴリズムです。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b012",
                    "choices": [
                            "全従業員数",
                            "給与が50000を超える従業員数",
                            "各部署で給与が50000を超える従業員が5人より多い部署の数のリスト",
                            "給与が50000を超える従業員がいる部署数"
                    ],
                    "correct": 2,
                    "explanation": "このクエリは部署ごとにグループ化し、給与が50000を超える従業員が5人より多い部署のみを抽出し、その各部署の該当人数を返します。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プログラミング",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b013",
                    "choices": [
                            "オイラー路",
                            "ハミルトン路",
                            "最短経路",
                            "全域木"
                    ],
                    "correct": 1,
                    "explanation": "ハミルトン路は、グラフの全ての頂点を一度ずつ訪問する経路です。オイラー路は全ての辺を一度ずつ通る経路です。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b014",
                    "choices": [
                            "部分問題の解を記憶する",
                            "重複する計算を避ける",
                            "貪欲法の一種である",
                            "フィボナッチ数列の計算に適用できる"
                    ],
                    "correct": 2,
                    "explanation": "動的計画法は貪欲法とは異なるアルゴリズム設計手法です。部分問題の解を記憶し、重複計算を避けることで効率化を図ります。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b016",
                    "choices": [
                            "TCPは信頼性が低く、UDPは信頼性が高い",
                            "TCPはコネクションレス、UDPはコネクション型",
                            "TCPは信頼性が高く、UDPは高速性を重視",
                            "TCPは暗号化され、UDPは暗号化されない"
                    ],
                    "correct": 2,
                    "explanation": "TCPは信頼性を重視したコネクション型プロトコル、UDPは高速性を重視したコネクションレス型プロトコルです。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b017",
                    "choices": [
                            "チェイン法",
                            "オープンアドレス法",
                            "線形探査法",
                            "バブルソート法"
                    ],
                    "correct": 3,
                    "explanation": "バブルソートは並べ替えアルゴリズムであり、ハッシュテーブルの衝突解決方法ではありません。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b018",
                    "choices": [
                            "ステートレスな通信",
                            "リソースベースのURL設計",
                            "HTTPメソッドの適切な使用",
                            "セッション情報の保持"
                    ],
                    "correct": 3,
                    "explanation": "REST APIはステートレスであるべきで、サーバー側でセッション情報を保持しないことが原則です。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プログラミング",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b019",
                    "choices": [
                            "URLアドレス",
                            "IPアドレス",
                            "メールアドレス",
                            "電話番号"
                    ],
                    "correct": 2,
                    "explanation": "この正規表現は、基本的なメールアドレスの形式（ユーザー名@ドメイン名.拡張子）を表しています。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プログラミング",
                    "sourceFile": "moreBQuestions.ts"
            },
            {"id": "b020",
                    "choices": [
                            "パスワードの暗号化",
                            "入力値の検証とエスケープ処理",
                            "SSLの使用",
                            "ファイアウォールの設定"
                    ],
                    "correct": 1,
                    "explanation": "XSS攻撃を防ぐには、ユーザー入力の検証と、HTMLに出力する際の適切なエスケープ処理が最も効果的です。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "moreBQuestions.ts"
            }
    ],

    sample_questions:     [
            {"id": "a001",
                    "choices": [
                            "10進数の25を2進数で表すと11001である",
                            "16進数のFFを10進数で表すと256である",
                            "2進数の1010を10進数で表すと12である",
                            "8進数の17を10進数で表すと17である"
                    ],
                    "correct": 0,
                    "explanation": "10進数の25を2進数に変換すると、25 = 16 + 8 + 1 = 2^4 + 2^3 + 2^0 = 11001となります。",
                    "keyPoints": "基礎理論の重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "基礎理論",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a002",
                    "choices": [
                            "データリンク層",
                            "ネットワーク層",
                            "トランスポート層",
                            "セッション層"
                    ],
                    "correct": 1,
                    "explanation": "OSI基本参照モデルは7層構造で、第3層はネットワーク層です。IPアドレスによる経路制御などを行います。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a003",
                    "choices": [
                            "FIFO（First In First Out）",
                            "LIFO（Last In First Out）",
                            "ランダムアクセス",
                            "優先度付きキュー"
                    ],
                    "correct": 1,
                    "explanation": "スタックはLIFO（Last In First Out：後入れ先出し）の性質を持つデータ構造です。",
                    "keyPoints": "アルゴリズムとプログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズムとプログラミング",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a004",
                    "choices": [
                            "CREATE",
                            "DROP",
                            "UPDATE",
                            "GRANT"
                    ],
                    "correct": 2,
                    "explanation": "DMLはデータ操作言語で、SELECT、INSERT、UPDATE、DELETEが該当します。CREATEとDROPはDDL、GRANTはDCLです。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a005",
                    "choices": [
                            "プロジェクトの作業を階層的に分解した構造図",
                            "プロジェクトメンバーの責任分担表",
                            "プロジェクトの進捗を表すガントチャート",
                            "プロジェクトのリスク一覧表"
                    ],
                    "correct": 0,
                    "explanation": "WBS（Work Breakdown Structure）は、プロジェクトの成果物や作業を階層的に分解した構造図です。",
                    "keyPoints": "マネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "マネジメント",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "b002",
                    "choices": [
                            "O(1)",
                            "O(n)",
                            "O(n²)",
                            "O(n³)"
                    ],
                    "correct": 2,
                    "explanation": "二重ループで、外側のループがn回、内側のループもn回実行されるため、全体でn×n = n²回の処理が行われます。",
                    "keyPoints": "アルゴリズムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "アルゴリズム",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "b003",
                    "choices": [
                            "SSLまたはTLS",
                            "FTPとSFTP",
                            "POP3とIMAP",
                            "DNSとDHCP"
                    ],
                    "correct": 0,
                    "explanation": "HTTPSは、HTTP over SSL/TLSの略で、SSL（Secure Sockets Layer）またはTLS（Transport Layer Security）を使用して通信を暗号化します。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "b004",
                    "choices": [
                            "プログラムの実行速度が向上する",
                            "コードの再利用性が高まる",
                            "メモリ使用量が削減される",
                            "コンパイル時間が短縮される"
                    ],
                    "correct": 1,
                    "explanation": "継承により、既存のクラスの機能を引き継いで新しいクラスを作成できるため、コードの再利用性が高まります。",
                    "keyPoints": "プログラミングの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "プログラミング",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "b005",
                    "choices": [
                            "すべての非キー属性が主キーに完全関数従属する",
                            "すべての属性が原子値である",
                            "推移的関数従属が存在しない",
                            "多値従属が存在しない"
                    ],
                    "correct": 1,
                    "explanation": "第1正規形の条件は、すべての属性が原子値（それ以上分割できない値）であることです。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a006",
                    "choices": [
                            "メインメモリよりも容量が大きく、アクセス速度が遅い",
                            "メインメモリよりも容量が小さく、アクセス速度が速い",
                            "メインメモリよりも容量が大きく、アクセス速度が速い",
                            "メインメモリよりも容量が小さく、アクセス速度が遅い"
                    ],
                    "correct": 1,
                    "explanation": "キャッシュメモリは、CPUとメインメモリの間に配置される高速な記憶装置で、容量は小さいがアクセス速度が非常に速いという特徴があります。",
                    "keyPoints": "コンピュータシステムの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "コンピュータシステム",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a007",
                    "choices": [
                            "先頭8ビットがネットワーク部、残り24ビットがホスト部",
                            "先頭16ビットがネットワーク部、残り16ビットがホスト部",
                            "先頭24ビットがネットワーク部、残り8ビットがホスト部",
                            "全32ビットがネットワーク部"
                    ],
                    "correct": 0,
                    "explanation": "クラスAのIPv4アドレスは、先頭8ビットがネットワーク部、残り24ビットがホスト部となっており、大規模なネットワークに適しています。",
                    "keyPoints": "ネットワークの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "ネットワーク",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a008",
                    "choices": [
                            "すべての属性が原子値である",
                            "第1正規形であり、部分関数従属がない",
                            "第2正規形であり、推移的関数従属がない",
                            "すべての属性が主キーに完全関数従属する"
                    ],
                    "correct": 1,
                    "explanation": "第2正規形は、第1正規形の条件を満たし、かつ部分関数従属（主キーの一部の属性に従属する非キー属性）が存在しないことが条件です。",
                    "keyPoints": "データベースの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "データベース",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a009",
                    "choices": [
                            "コンピュータウイルスの検出と駆除",
                            "ネットワーク通信の監視と制御",
                            "データの暗号化と復号化",
                            "システムの脆弱性診断"
                    ],
                    "correct": 1,
                    "explanation": "ファイアウォールは、内部ネットワークと外部ネットワーク間の通信を監視し、事前に定義されたルールに基づいて通信を許可または拒否する機能を持ちます。",
                    "keyPoints": "セキュリティの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "セキュリティ",
                    "sourceFile": "sampleQuestions.ts"
            },
            {"id": "a010",
                    "choices": [
                            "Plan → Do → Check → Action",
                            "Plan → Do → Action → Check",
                            "Do → Plan → Check → Action",
                            "Check → Action → Plan → Do"
                    ],
                    "correct": 0,
                    "explanation": "PDCAサイクルは、Plan（計画）→ Do（実行）→ Check（評価）→ Action（改善）の順序で継続的な改善を行う管理手法です。",
                    "keyPoints": "マネジメントの重要問題",
                    "relatedInfo": "基本情報技術者試験 練習問題",
                    "year": "practice",
                    "originalTopic": "マネジメント",
                    "sourceFile": "sampleQuestions.ts"
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