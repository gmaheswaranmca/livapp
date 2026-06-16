        0 1 2 3 4 5 6 7 8 9
nums = [0,0,1,1,1,2,2,3,3,4]
          ^
          slow 

            ^
            fast

slow = 0
fast = 1

slow    nums[slow]  fast    nums[fast]  slow   [slow]  fast 
0       0           1       0           -      -       2
0       0           2       1           1      [1]1    3
1       1           3       1           -      -       4
1       1           4       1           -      -       5
1       1           5       2           2      [2]2    6
2       2           6       2           -      -       7
2       2           7       3           3      [3]3    8
3       3           8       3           -      -       9
3       3           9       4           4      [4]4    Stop



