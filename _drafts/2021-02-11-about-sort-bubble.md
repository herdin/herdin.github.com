---
layout: post
title: "버블 정렬"
date: 2021-02-11
tags: algorithm
---

### Bubble sort, best=O(n), average=O(n^2), worst=O(n^2), memory=O(1)
정렬되는 모양새가 거품같다 하여 버블 정렬
앞에서부터 두개씩 비교해가며 정렬한다.
```
6 5 3 1 8 7 2 4
1번째 루프를 다 돌게 되면, 마지막에는 가장 큰 수가 위치하게 된다.
[6 5] 3 1 8 7 2 4 -> [5 6] 3 1 8 7 2 4
5 [6 3] 1 8 7 2 4 -> 5 [3 6] 1 8 7 2 4
5 3 [6 1] 8 7 2 4 -> 5 3 [1 6] 8 7 2 4
5 3 1 [6 8] 7 2 4 -> 5 3 1 [6 8] 7 2 4
5 3 1 6 [8 7] 2 4 -> 5 3 1 6 [7 8] 2 4
5 3 1 6 7 [8 2] 4 -> 5 3 1 6 7 [2 8] 4
5 3 1 6 7 2 [8 4] -> 5 3 1 6 7 2 [4 8]
2번째 루프는 마지막을 제외하고 돈다.
...
```

예제 소스
``` java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.stream.IntStream;

public class BubbleSort {
    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(BubbleSort.class);
        int arrLength = 10;
        int[] arr = new int[arrLength];
        IntStream.range(0, arrLength).forEach(i -> arr[i] = (int) (Math.random()*arrLength));
        logger.debug("before arr -> {}", Arrays.toString(arr));

        /**
         * array 길이가 10 이라면,
         * 내부 루프가
         * 처음에는 8, 9 쌍이 마지막(length-2, length-1 index 까지) -> i=arr.length-1
         * 마지막에는 0, 1 쌍을 비교해야하기 때문에 -> i>0, j<i
         * */
        for(int i=arr.length-1; i>0; i--) {
            for(int j=0; j<i; j++) {
                logger.debug("{}, {}", j, j+1);
                if(arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }

        logger.debug("after arr -> {}", Arrays.toString(arr));
    }
}
```
