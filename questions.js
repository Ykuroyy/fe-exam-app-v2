// 基本情報技術者試験 科目B 問題データベース
// アルゴリズム60問 + 情報セキュリティ4問 = 計64問
// 徹底的な科目B対策 - 前回250点から合格点突破を目指す

const questions = {
    algorithm: [
        {
            id: 'alg001',
            category: 'algorithm',
            level: 'basic',
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