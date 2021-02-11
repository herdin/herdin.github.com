---
layout: post
title: "Insertion Sort, 삽입 정렬"
date: 2021-02-11
tags: algorithm
---

### Insertion sort, best=O(n), average=O(n^2), worst=O(n^2), memory=O(1)
두번째 인덱스부터 시작하여, 자신이 있어야할 위치를 앞쪽으로 찾는다.
있어야할 위치가 아니면 밀어놓는다. (아래서 설명)
```
8 5 6 2 4
1번째 루프, 인덱스(1)에 있는 5가 들어갈 곳을 앞에서부터 찾는다.
5와 8을 비교해서 8이 더 크니까 5가 있던 자리로 8을 밀어놓는다.
8 [5] 6 2 4 -> > 8 6 2 4 -> [5] 8 6 2 4

2번째 루프, 인덱스(2)에 있는 6이 들어갈 곳을 앞에서부터 찾는다.
6과 8을 비교하여 8이 크므로 6이 있던자리에 8을 밀어놓는다.
6과 5를 비교하여 6이 크니까 해당 자리에 6을 넣는다.(insert)
5 8 [6] 2 4 -> 5 > 8 2 4 -> 5 [6] 8 2 4

3번째 루프, 인덱스(3)에 있는 2가 들어갈 곳을 앞에서부터 찾는다.
5 6 8 [2] 4 -> 5 6 > 8 4 -> 5 > 6 8 4 -> [2] 5 6 8 4

4번째 루프, 인덱스(4)에 있는 4가 들어갈 곳을 앞에서부터 찾는다.
2 5 6 8 [4] -> 2 5 6 > 8 -> 2 5 > 6 8 -> 2 > 5 6 8 -> 2 [4] 5 6 8
```

예제
``` java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.stream.IntStream;

public class InsertionSort {
    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(InsertionSort.class);
        int arrLength = 10;
        int[] arr = new int[arrLength];
        IntStream.range(0, arrLength).forEach(i -> arr[i] = (int) (Math.random()*arrLength*10));
        logger.debug("before arr -> {}", Arrays.toString(arr));
        for(int i=1; i<arrLength; i++) {
            int currentPivot = arr[i];
            int j=i-1;
            while(j>=0 && arr[j] > currentPivot) {
                arr[j+1] = arr[j];
                j--;
            }
//            for(; j>=0; j--) {
//                if(currentPivot < arr[j]) {
//                    arr[j+1] = arr[j];
//                } else {
//                    break;
//                }
//            }
            arr[j+1] = currentPivot;
        }

        logger.debug("after arr  -> {}", Arrays.toString(arr));
    }
}
```
