---
layout: post
title: "select problems.name from leetcode.problems order by frequency desc"
date: 2021-01-07
tags: algorithm
---

``` javascript
let problems = [];
[].slice.apply($('.table.table-striped > .reactable-data').find('tr'))
  .map(item => item.childNodes[2])
  .forEach(item => {
    let problemName = item.innerText.trim();
    problems[problems.length] = problemName
    console.log(problemName);
  });
```

## for 20 pages.

- Two Sum
- LRU Cache
- Trapping Rain Water
- Number of Islands
- Consecutive Numbers Sum
- Decode Ways
- Add Two Numbers
- Merge Intervals
- Longest Palindromic Substring
- Product of Array Except Self
- Best Time to Buy and Sell Stock
- Text Justification
- Maximum Subarray
- Integer to English Words -> hard, next
- Verifying an Alien Dictionary
- Median of Two Sorted Arrays -> hard, next
- Valid Parentheses
- Design Underground System
- Longest Substring Without Repeating Characters
> done here

- 3Sum
- Meeting Rooms II
- K Closest Points to Origin
- Reverse Linked List
- Word Break
- Critical Connections in a Network
- Maximal Square
- Insert Delete GetRandom O(1)
- Strong Password Checker
- Minimum Difficulty of a Job Schedule
- Minimum Remove to Make Valid Parentheses
- Next Permutation
- Partition Labels
- Merge k Sorted Lists
- Decode String
- Subarray Sum Equals K
- Robot Bounded In Circle
- Minimum Window Substring
- Reaching Points
- Spiral Matrix
- Regular Expression Matching
- Burst Balloons
- First Missing Positive
- Find Median from Data Stream
- String Compression
- Merge Two Sorted Lists
- Number of Provinces
- Letter Combinations of a Phone Number
- Add Strings
- Sliding Window Maximum
- Maximum Profit in Job Scheduling
- Generate Parentheses
- Word Search
- Coin Change
- Container With Most Water
- Copy List with Random Pointer
- Basic Calculator
- Reverse Integer
- Design In-Memory File System
- Serialize and Deserialize Binary Tree
- Binary Tree Right Side View
- Kth Largest Element in an Array
- Top K Frequent Elements
- Time Based Key-Value Store
- Search in Rotated Sorted Array
- Permutations
- Random Pick with Weight
- Second Highest Salary
- Minimum Knight Moves
- Leftmost Column with at Least a One
- Alien Dictionary
- Group Anagrams
- Top K Frequent Words
- Longest Consecutive Sequence
- Maximal Rectangle
- Pairs of Songs With Total Durations Divisible by 60
- Reorder Data in Log Files
- Last Substring in Lexicographical Order
- LFU Cache
- Binary Tree Maximum Path Sum
- Palindrome Linked List
- Reorganize String
- Word Break II
- Task Scheduler
- Max Area of Island
- Maximum Performance of a Team
- Remove All Adjacent Duplicates in String II
- Coin Change 2
- Analyze User Website Visit Pattern
- Min Stack
- Rotting Oranges
- Basic Calculator II
- Rotate Image
- Reverse Linked List II
- Design HashMap
- Reverse Nodes in k-Group
- String Compression II
- Remove Invalid Parentheses
- Subdomain Visit Count
- Employee Free Time
- Maximum Product Subarray
- Construct Binary Tree from Preorder and Inorder Traversal
- Vertical Order Traversal of a Binary Tree
- Design Browser History
- Find the Smallest Divisor Given a Threshold
- House Robber
- Fizz Buzz
- Valid Palindrome II
- Jump Game II
- Longest Common Prefix
- Lowest Common Ancestor of a Binary Tree
- Valid Palindrome
- Design Hit Counter
- K-diff Pairs in an Array
- Daily Temperatures
- Binary Tree Zigzag Level Order Traversal
- Minimum Moves to Equal Array Elements
- Read N Characters Given Read4 II - Call multiple times
- Distinct Subsequences
- Move Zeroes
- Add Two Numbers II
- Fibonacci Number
- Word Ladder
- Reconstruct Itinerary
- Find All Duplicates in an Array
- Edit Distance
- Contain Virus
- Add Binary
- Roman to Integer
- Palindromic Substrings
- Palindrome Number
- Happy Number
- Minimum Number of Taps to Open to Water a Garden
- Subsets
- Sudoku Solver
- All Nodes Distance K in Binary Tree
- Minimum Number of Refueling Stops
- Accounts Merge
- ZigZag Conversion
- Tweet Counts Per Frequency
- Longest Increasing Subsequence
- Find Duplicate File in System
- Basic Calculator IV
- Validate IP Address
- Wildcard Matching
- Find the Duplicate Number
- Design Add and Search Words Data Structure
- Perfect Squares
- Longest Increasing Path in a Matrix
- Guess the Word
- Minimum Path Sum
- Interval List Intersections
- Search a 2D Matrix II
- Pow(x, n)
- Max Sum of Rectangle No Larger Than K
- Gas Station
- UTF-8 Validation
- Frog Jump
- Count Vowels Permutation
- Longest Valid Parentheses
- Snakes and Ladders
- Subarray Sums Divisible by K
- First Unique Character in a String
- Cherry Pickup
- Minimum Size Subarray Sum
- Course Schedule II
- Design Tic-Tac-Toe
- Running Sum of 1d Array
- Largest Number
- Binary Search Tree Iterator
- Remove Linked List Elements
- Course Schedule
- Flatten Nested List Iterator
- Longest String Chain
- Count Unique Characters of All Substrings of a Given String
- Nth Highest Salary
- Find First and Last Position of Element in Sorted Array
- Longest Absolute File Path
- Climbing Stairs
- String to Integer (atoi)
- Evaluate Division
- Palindrome Partitioning
- Subtree of Another Tree
- Diameter of Binary Tree
- Partition List
- Majority Element
- Sort List
- Merge Sorted Array
- The Skyline Problem
- Number of Music Playlists
- Web Crawler Multithreaded
- Integer to Roman
- N-Queens
- Combination Sum
- Candy Crush
- Combine Two Tables
- Validate Binary Search Tree
- Reverse Pairs
- Exclusive Time of Functions
- Dot Product of Two Sparse Vectors
- Clone Graph
- Word Search II
- Best Time to Buy and Sell Stock III
- Minimum Time Difference
- Best Time to Buy and Sell Stock with Cooldown
- Continuous Subarray Sum
- Shortest Path in Binary Matrix
- Search a 2D Matrix
- 4Sum
- Maximum Length of a Concatenated String with Unique Characters
- Find Peak Element
- Remove K Digits
- Concatenated Words
- Valid Anagram
- Best Time to Buy and Sell Stock IV
- Max Points on a Line
- Reorder List
- Count of Smaller Numbers After Self
- Boundary of Binary Tree
- Robot Room Cleaner
- Valid Number
- Symmetric Tree
- Two City Scheduling
- Find Pivot Index
- Pascal's Triangle
- Word Ladder II
- Minimum Cost Tree From Leaf Values
- Count and Say
- Reverse String
- Maximum Points You Can Obtain from Cards
- Kth Smallest Element in a Sorted Matrix
- Divide Two Integers
- Find the Closest Palindrome
- Remove Nth Node From End of List
- Remove Duplicates from Sorted List
- Find All Anagrams in a String
- Flatten a Multilevel Doubly Linked List
- Invert Binary Tree
- Russian Doll Envelopes
- Partition to K Equal Sum Subsets
- Asteroid Collision
- Pacific Atlantic Water Flow
- Angle Between Hands of a Clock
- Convert Binary Search Tree to Sorted Doubly Linked List
- Sort Colors
- Sliding Window Median
- Missing Number
- My Calendar I
- Design Search Autocomplete System
- Largest Rectangle in Histogram
- Simplify Path
- Word Search II
- Best Time to Buy and Sell Stock III
- Minimum Time Difference
- Best Time to Buy and Sell Stock with Cooldown
- Continuous Subarray Sum
- Shortest Path in Binary Matrix
- Search a 2D Matrix
- 4Sum
- Maximum Length of a Concatenated String with Unique Characters
- Find Peak Element
- Remove K Digits
- Concatenated Words
- Valid Anagram
- Best Time to Buy and Sell Stock IV
- Max Points on a Line
- Reorder List
- Count of Smaller Numbers After Self
- Boundary of Binary Tree
- Robot Room Cleaner
- Valid Number
- Symmetric Tree
- Two City Scheduling
- Find Pivot Index
- Pascal's Triangle
- Word Ladder II
- Minimum Cost Tree From Leaf Values
- Count and Say
- Reverse String
- Maximum Points You Can Obtain from Cards
- Kth Smallest Element in a Sorted Matrix
- Divide Two Integers
- Find the Closest Palindrome
- Remove Nth Node From End of List
- Remove Duplicates from Sorted List
- Find All Anagrams in a String
- Flatten a Multilevel Doubly Linked List
- Invert Binary Tree
- Russian Doll Envelopes
- Partition to K Equal Sum Subsets
- Asteroid Collision
- Pacific Atlantic Water Flow
- Angle Between Hands of a Clock
- Convert Binary Search Tree to Sorted Doubly Linked List
- Sort Colors
- Sliding Window Median
- Missing Number
- My Calendar I
- Design Search Autocomplete System
- Largest Rectangle in Histogram
- Simplify Path
- Logger Rate Limiter
- Triangle
- Binary Tree Level Order Traversal
- Optimal Account Balancing
- Shortest Path in a Grid with Obstacles Elimination
- Path Sum III
- Prison Cells After N Days
- Reverse Words in a String
- Fraction Addition and Subtraction
- Line Reflection
- Encode and Decode TinyURL
- Count All Valid Pickup and Delivery Options
- Minesweeper
- Count Primes
- Maximum Swap
- Meeting Scheduler
- Moving Average from Data Stream
- Number of Atoms
- Number of Distinct Islands
- Water and Jug Problem
- Multiply Strings
- String Transforms Into Another String
- Serialize and Deserialize N-ary Tree
- Shortest Unsorted Continuous Subarray
- Valid Sudoku
- Basic Calculator III
- Minimum Value to Get Positive Step by Step Sum
- Binary Tree Vertical Order Traversal
- First Bad Version
- Queue Reconstruction by Height
- Shortest Palindrome
- Recover Binary Search Tree
- Maximum Length of Repeated Subarray
- Sparse Matrix Multiplication
- 3Sum Closest
- Single Element in a Sorted Array
- Maximum Sum of Two Non-Overlapping Subarrays
- Open the Lock
- All Paths From Source to Target
- Divisor Game
- Special Binary String
- Intersection of Two Linked Lists
- Candy
- Scramble String
- Design Snake Game
- Max Stack
- Restore IP Addresses
- Spiral Matrix II
- 24 Game
- Palindrome Pairs
- Can Make Palindrome from Substring
- Walls and Gates
- Flatten Binary Tree to Linked List
- Range Sum of BST
- Best Time to Buy and Sell Stock II
- Design Twitter
- Paint House
- Next Greater Element II
- Find Minimum in Rotated Sorted Array
- Longest Substring with At Least K Repeating Characters
- Single Number
- Design a Stack With Increment Operation
- Shortest Bridge
- Set Matrix Zeroes
- Shortest Subarray with Sum at Least K
- Break a Palindrome
- Snapshot Array
- Encode String with Shortest Length
- Is Graph Bipartite?
- Repeated DNA Sequences
- Fizz Buzz Multithreaded
- Partition Equal Subset Sum
- Interleaving String
- Implement Trie (Prefix Tree)
- Unique Paths
- Bus Routes
- Remove All Adjacent Duplicates In String
- High Five
- Design Circular Queue
- Expression Add Operators
- Monotone Increasing Digits
- Design A Leaderboard
- Populating Next Right Pointers in Each Node II
- Max Consecutive Ones III
- Capacity To Ship Packages Within D Days
- Flood Fill
- Sum of Two Integers
- Number of Digit One
- Valid Phone Numbers
- Remove Comments
- Kth Largest Element in a Stream
- Maximum Number of Events That Can Be Attended
- Number of Ways to Paint N × 3 Grid
- Numbers With Repeated Digits
- Plus One
- Knight Dialer
- Longest Repeating Character Replacement
- Nested List Weight Sum
- Online Stock Span
- Split Array Largest Sum
- Subarrays with K Different Integers
- Shortest Path to Get All Keys
- Number of Dice Rolls With Target Sum
- Permutation in String
- Trapping Rain Water II
- Rotate List
- Word Frequency
- Backspace String Compare
- Fraction to Recurring Decimal
- Stone Game II
- Insert Delete GetRandom O(1) - Duplicates allowed
- All O`one Data Structure
- Longest Palindromic Subsequence
- Different Ways to Add Parentheses
- Validate Stack Sequences
- Cracking the Safe
- Linked List Cycle
- Single Number II
- Jump Game
- Rectangle Overlap
- Longest Arithmetic Subsequence
- Matrix Block Sum
- Knight Probability in Chessboard
- Distribute Coins in Binary Tree
- Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
- Most Common Word
- Range Module
- Insert Interval
- Sort the Matrix Diagonally
- Largest Divisible Subset
- Excel Sheet Column Title
- Repeated Substring Pattern
- Contiguous Array
- Contains Duplicate II
- Find in Mountain Array
- Least Number of Unique Integers after K Removals
- Minimum Deletion Cost to Avoid Repeating Letters
- Path Sum
- Minimum Cost For Tickets
- Department Top Three Salaries
- Convert Sorted Array to Binary Search Tree
- Game of Life
- Binary Tree Level Order Traversal II
- Unique Paths III
- Shuffle an Array
- Maximum Product of Three Numbers
- Shortest Word Distance II
- Isomorphic Strings
- Next Greater Element I
- Evaluate Reverse Polish Notation
- Find the Celebrity
- Remove Duplicate Letters
- Populating Next Right Pointers in Each Node
- Number of Closed Islands
- 01 Matrix
- Reconstruct a 2-Row Binary Matrix
- Majority Element II
- Shortest Distance from All Buildings
- Sliding Puzzle
- Counting Bits
- Island Perimeter
- Greatest Sum Divisible by Three
- Count Different Palindromic Subsequences
- Surrounded Regions
- Target Sum
- Minimum Insertion Steps to Make a String Palindrome
- Get the Maximum Score
- Minimum Cost to Cut a Stick
- Meeting Rooms
- Maximum Sum of 3 Non-Overlapping Subarrays
- Minimum Window Subsequence
- Compare Version Numbers
- Longest Substring with At Most K Distinct Characters
- Find K Closest Elements
- Add Bold Tag in String
- Elimination Game
- Making A Large Island
- Valid Parenthesis String
- Score of Parentheses
- Check If Array Pairs Are Divisible by k
- Tiling a Rectangle with the Fewest Squares
- Beautiful Array
- Design File System
- Missing Element in Sorted Array
- Sum of Subarray Minimums
- Pancake Sorting
- Dice Roll Simulation
- Design Bounded Blocking Queue
- Cheapest Flights Within K Stops
- Non-overlapping Intervals
- Count Number of Teams
- Maximum Depth of Binary Tree
- Sqrt(x)
- Maximum XOR of Two Numbers in an Array
- Implement Queue using Stacks
- Construct Binary Tree from Inorder and Postorder Traversal
- Car Fleet
- Serialize and Deserialize BST
- Palindrome Partitioning II
- Range Sum Query 2D - Immutable
- Longest Mountain in Array
- Invalid Transactions
- Expressive Words
- Wiggle Sort II
- Binary Tree Cameras
- Freedom Trail
- Baseball Game
- Reverse Words in a String III
- Split Array into Consecutive Subsequences
- Read N Characters Given Read4
- Non-decreasing Array
- Find All Numbers Disappeared in an Array
- Group Shifted Strings
- Minimum Possible Integer After at Most K Adjacent Swaps On Digits
- Champagne Tower
- Strange Printer
- Number of Connected Components in an Undirected Graph
- Two Sum II - Input array is sorted
- Find K Pairs with Smallest Sums
- Android Unlock Patterns
- Maximum Frequency Stack
- Min Cost Climbing Stairs
- Add Digits
- Squares of a Sorted Array
- Unique Binary Search Trees
- Longest Common Subsequence
- 3Sum Smaller
- Intersection of Two Arrays
- Ugly Number II
- Shuffle the Array
- Reducing Dishes
- Best Meeting Point
- Campus Bikes
- Rotate String
- Largest Time for Given Digits
- Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts
- Sum of Distances in Tree
- Merge Two Binary Trees
- Battleships in a Board
- Trips and Users
- Count Square Submatrices with All Ones
- Number of Ships in a Rectangle
- Subarray Product Less Than K
- Count Complete Tree Nodes
- Create Maximum Number
- Find Winner on a Tic Tac Toe Game
- Binary Tree Paths
- Largest Sum of Averages
- Largest BST Subtree
- Reformat Date
- Minimum Cost to Connect Sticks
- Super Egg Drop
- Reverse Vowels of a String
- Minimum Number of Frogs Croaking
- Number of Matching Subsequences
- Flower Planting With No Adjacent
- Remove Duplicates from Sorted Array
- Count Unhappy Friends
- Convert Sorted List to Binary Search Tree
- Path Sum II
- Bulb Switcher III
- Valid Tic-Tac-Toe State
- Circular Array Loop
- Web Crawler
- Construct Binary Tree from Preorder and Postorder Traversal
- Path with Maximum Gold
- 2 Keys Keyboard
- Convert Binary Number in a Linked List to Integer
- K-th Smallest Prime Fraction
- Intersection of Two Arrays II
- Employees Earning More Than Their Managers
- Delete Nodes And Return Forest
- Closest Binary Search Tree Value
- Minimum Area Rectangle
- Cat and Mouse
- Implement strStr()
- Bulb Switcher
- Maximum Difference Between Node and Ancestor
- Dungeon Game
- Construct Binary Tree from String
- Smallest Range Covering Elements from K Lists
- Divide Array in Sets of K Consecutive Numbers
- Permutations II
- Ransom Note
- House Robber III
- Maximum Sum Circular Subarray
- Degree of an Array
- Minimum Number of Steps to Make Two Strings Anagram
- IPO
- Height Checker
- Bulls and Cows
- Number of 1 Bits
- Next Greater Node In Linked List
- Swap Adjacent in LR String
- Minimum Absolute Difference
- Advantage Shuffle
- Sort an Array
- Rank Teams by Votes
- Find Duplicate Subtrees
- Bitwise ORs of Subarrays
- Unique Paths II
- Surface Area of 3D Shapes
- Minimum Cost to Make at Least One Valid Path in a Grid
- Minimum Increment to Make Array Unique
- K-th Symbol in Grammar
- Longest Substring with At Most Two Distinct Characters
- Binary Tree Inorder Traversal
- Diagonal Traverse II
- Closest Leaf in a Binary Tree
- Maximum of Absolute Value Expression
- Construct Target Array With Multiple Sums
- Find the City With the Smallest Number of Neighbors at a Threshold Distance
- Parsing A Boolean Expression
- One Edit Distance
- Rotate Array
- Number of Submatrices That Sum to Target
- Push Dominoes
- Design Excel Sum Formula
- Bitwise AND of Numbers Range
- Is Subsequence
- Design Log Storage System
- Construct Binary Search Tree from Preorder Traversal
- Product of the Last K Numbers
- Sum of Left Leaves
- Robot Return to Origin
- Monotonic Array
- Shortest Common Supersequence
- Score After Flipping Matrix
- Number of Recent Calls
- Shortest Subarray to be Removed to Make Array Sorted
- Inorder Successor in BST II
- Word Pattern
- Lexicographical Numbers
- Missing Ranges
- Minimum Number of Days to Eat N Oranges
- Find Common Characters
- Longest Word in Dictionary
- Delete Duplicate Emails
- Rank Scores
- Tag Validator
- Allocate Mailboxes
- Subsets II
- Find Two Non-overlapping Sub-arrays Each With Target Sum
- Wiggle Subsequence
- The Maze
- Reverse Substrings Between Each Pair of Parentheses
- Stamping The Sequence
- Single Number III
- Next Closest Time
- Longest Well-Performing Interval
- Substring with Concatenation of All Words
- License Key Formatting
- Summary Ranges
- XOR Queries of a Subarray
- Count The Repetitions
- Cut Off Trees for Golf Event
- Same Tree
- Swap Nodes in Pairs
- Insert into a Sorted Circular Linked List
- Strobogrammatic Number II
- Confusing Number II
- Maximize Distance to Closest Person
- Rectangle Area II
- Factorial Trailing Zeroes
- Minimum Number of K Consecutive Bit Flips
- Integer Break
- Filter Restaurants by Vegan-Friendly, Price and Distance
- First Unique Number
- Greatest Common Divisor of Strings
- Flip Equivalent Binary Trees
- Additive Number
- Middle of the Linked List
- Minimum Domino Rotations For Equal Row
- Pour Water
- Bulb Switcher IV
- Regions Cut By Slashes
- Maximum Number of Non-Overlapping Substrings
- Keys and Rooms
- Number of Nodes in the Sub-Tree With the Same Label
- Range Sum Query - Immutable
- Odd Even Linked List
- Find Right Interval
- Spiral Matrix III
- Maximum Side Length of a Square with Sum Less than or Equal to Threshold
- Inorder Successor in BST
- Minimum Number of Increments on Subarrays to Form a Target Array
- Maximum Subarray Sum with One Deletion
- Arithmetic Slices II - Subsequence
- Excel Sheet Column Number
- Maximum Gap
- Balance a Binary Search Tree
- Sort Characters By Frequency
- Binary Tree Coloring Game
- Magic Squares In Grid
- Car Pooling
- Sum Root to Leaf Numbers
- Find And Replace in String
- Delete Node in a BST
- The Most Similar Path in a Graph
- Combination Sum II
- Best Position for a Service Centre
- Search Suggestions System
- Arithmetic Slices
- Transpose Matrix
- Longest Univalue Path
- Escape a Large Maze
- Decode Ways II
- Encode N-ary Tree to Binary Tree
- Minimum Height Trees
- Data Stream as Disjoint Intervals
- Consecutive Numbers
- Hexspeak
- Binary Search
- Max Chunks To Make Sorted
- Department Highest Salary
- Random Pick Index
- Cinema Seat Allocation
- Search Insert Position
- Last Stone Weight II
- Maximum Number of Achievable Transfer Requests
- Find Servers That Handled Most Number of Requests
- All People Report to the Given Manager
- Maximum Width of Binary Tree
- Linked List Cycle II
- Count of Range Sum
- K-Concatenation Maximum Sum
- Cousins in Binary Tree
- Hand of Straights
- Number of Squareful Arrays
- Find K-th Smallest Pair Distance
- Nth Magical Number
- Lowest Common Ancestor of a Binary Search Tree
- Shortest Distance to a Character
- Design Skiplist
- Number of Ways to Split a String
- Network Delay Time
- Nth Digit
- Parse Lisp Expression
- Count Univalue Subtrees
- Kth Smallest Element in a BST
- Length of Longest Fibonacci Subsequence
- Maximum Number of Balloons
- Find the Kth Smallest Sum of a Matrix With Sorted Rows
- All Possible Full Binary Trees
- Iterator for Combination
- House Robber II
- Mirror Reflection
- Valid Triangle Number
- As Far from Land as Possible
- Minimum Number of Arrows to Burst Balloons
- Graph Valid Tree
- Number of Longest Increasing Subsequence
- Longest Happy String
- Build Binary Expression Tree From Infix Expression
- Partition Array Into Three Parts With Equal Sum
- Sort Array By Parity II
- K-Similar Strings
- Distribute Candies to People
- Beautiful Arrangement
- Implement Magic Dictionary
- Find Largest Value in Each Tree Row
- Find the Town Judge
- Maximum Nesting Depth of Two Valid Parentheses Strings
- Walking Robot Simulation
- Stream of Characters
- Couples Holding Hands
- Count Substrings with Only One Distinct Letter
- Minimum Swaps to Make Strings Equal
- Number of Good Pairs
- Maximum Number of Vowels in a Substring of Given Length
- Time Needed to Inform All Employees
- Find the Shortest Superstring
- Race Car
- Peeking Iterator
- Jump Game III
- Third Maximum Number
- Wiggle Sort
- 132 Pattern
- Tree Diameter
- Smallest String With Swaps
- Smallest Sufficient Team
- Linked List Components
- Contains Duplicate
- Minimum Swaps to Group All 1's Together
- Longest Palindrome
- Print in Order
- Longest Chunked Palindrome Decomposition
- Count Numbers with Unique Digits
- Jewels and Stones
- Insertion Sort List
- Form Largest Integer With Digits That Add up to Target
- Remove Sub-Folders from the Filesystem
- Print Words Vertically
- Falling Squares
- Smallest Subsequence of Distinct Characters
- Slowest Key
- Paint Fence
- Range Addition II
- Paint House II
- Longest Word in Dictionary through Deleting
- Longest Continuous Increasing Subsequence
- Employee Importance
- Nested List Weight Sum II
- Permutation Sequence
- Minimum Falling Path Sum II
- Word Squares
- Number of Subarrays with Bounded Maximum
- Number of Subsequences That Satisfy the Given Sum Condition
- Shortest Path Visiting All Nodes
- Super Washing Machines
- Parallel Courses
- Gray Code
- Max Consecutive Ones
- Count Submatrices With All Ones
- Design Phone Directory
- Unique Binary Search Trees II
- Valid Square
- Numbers At Most N Given Digit Set
- Grid Illumination
- Implement Rand10() Using Rand7()
- Probability of a Two Boxes Having The Same Number of Distinct Balls
- Minimum Add to Make Parentheses Valid
- Diameter of N-Ary Tree
- Tenth Line
- Valid Palindrome III
- Distinct Echo Substrings
- Random Pick with Blacklist
- Divide Chocolate
- Can Place Flowers
- H-Index
- Partition Array for Maximum Sum
- Redundant Connection
- Last Stone Weight
- Ugly Number
- Range Sum Query 2D - Mutable
- Swap Salary
- Kids With the Greatest Number of Candies
- Construct String from Binary Tree
- Uncrossed Lines
- Zuma Game
- Self Crossing
- Connecting Cities With Minimum Cost
- Graph Connectivity With Threshold
- Path With Minimum Effort
- Convert to Base -2
- Find the Longest Substring Containing Vowels in Even Counts
- Minimum Swaps To Make Sequences Increasing
- Defanging an IP Address
- Remove Duplicates from Sorted List II
- Sort Array By Parity
- Brick Wall
- Reveal Cards In Increasing Order
- Maximum Sum BST in Binary Tree
- Remove Boxes
- Perfect Rectangle
- K-th Smallest in Lexicographical Order
- Increasing Decreasing String
- Design Linked List
- 1-bit and 2-bit Characters
- Reconstruct Original Digits from English
- Binary Search Tree to Greater Sum Tree
- Minimum Deletions to Make Character Frequencies Unique
- Maximum Length of Pair Chain
- Number of Substrings Containing All Three Characters
- Minimum Number of Days to Make m Bouquets
- Sequence Reconstruction
- Find Leaves of Binary Tree
- Verbal Arithmetic Puzzle
- Build Array Where You Can Find The Maximum Exactly K Comparisons
- Exam Room
- Strings Differ by One Character
- Delete Node in a Linked List
- Intersection of Three Sorted Arrays
- Find N Unique Integers Sum up to Zero
- Non-negative Integers without Consecutive Ones
- Flatten 2D Vector
- The Maze II
- Exchange Seats
- Maximum Number of Visible Points
- Possible Bipartition
- Largest Palindrome Product
- Set Intersection Size At Least Two
- Minimum Cost to Hire K Workers
- Complete Binary Tree Inserter
- Maximum Average Subtree
- Find Words That Can Be Formed by Characters
- Verify Preorder Sequence in Binary Search Tree
- Count Servers that Communicate
- Reverse Words in a String II
- Bulb Switcher II
- Number of Valid Words for Each Puzzle
- Perfect Number
- Length of Last Word
- New 21 Game
- Erect the Fence
- Rearrange String k Distance Apart
- Diagonal Traverse
- Construct Quad Tree
- Search in Rotated Sorted Array II
- Reverse String II
- Number of Ways to Reorder Array to Get Same BST
- Predict the Winner
- Repeated String Match
- Statistics from a Large Sample
- Trim a Binary Search Tree
- Heaters
- Find Longest Awesome Substring
- Reorder Routes to Make All Paths Lead to the City Zero
- Maximal Network Rank
- Contains Duplicate III
- Path with Maximum Probability
- Peak Index in a Mountain Array
- Count Negative Numbers in a Sorted Matrix
- Minimum Cost to Merge Stones
- Split Array into Fibonacci Sequence
- Split Array with Equal Sum
- Sort Integers by The Number of 1 Bits
- Koko Eating Bananas
- Delete and Earn
- Minimum Time Visiting All Points
- Split Array With Same Average
- Maximum Number of Occurrences of a Substring
- Swap For Longest Repeated Character Substring
- Zigzag Iterator
- Check Completeness of a Binary Tree
- Power of Two
- Three Equal Parts
- How Many Numbers Are Smaller Than the Current Number
- Combination Sum IV
- Can I Win
- Longest Line of Consecutive One in Matrix
- Insert into a Binary Search Tree
- Reformat Department Table
- Filling Bookcase Shelves
- Building H2O
- Pascal's Triangle II
- Sort Items by Groups Respecting Dependencies
- Maximum Size Subarray Sum Equals k
- Validate Binary Tree Nodes
- Alphabet Board Path
- Minimum Depth of Binary Tree
- Guess Number Higher or Lower II
- Path With Maximum Minimum Value
- Rank Transform of an Array
- Fruit Into Baskets
- Shortest Word Distance
- Construct K Palindrome Strings
- Nim Game
- Count Number of Nice Subarrays
- Grumpy Bookstore Owner
- Minimum Falling Path Sum
- Binary Watch
- Sequential Digits
- Sum of Nodes with Even-Valued Grandparent
- Number of Good Leaf Nodes Pairs
- Combinations
- Number of Days Between Two Dates
- Minimum Genetic Mutation
- Design an Expression Tree With Evaluate Function
- Toeplitz Matrix
- Increasing Triplet Subsequence
- Chalkboard XOR Game
- Minimize Rounding Error to Meet Target
- Linked List Random Node
- Best Time to Buy and Sell Stock with Transaction Fee
- Shopping Offers
- Human Traffic of Stadium
- Student Attendance Record II
- Friends Of Appropriate Ages
- Split a String in Balanced Strings
- Range Sum Query - Mutable
- Find Mode in Binary Search Tree
- Largest Plus Sign
- Count Good Nodes in Binary Tree
- Flipping an Image
- Array Partition I
- Max Chunks To Make Sorted II
- Base 7
- Minimum Moves to Equal Array Elements II
- Check if There is a Valid Path in a Grid
- Minimum Difference Between Largest and Smallest Value in Three Moves
- RLE Iterator
- Print Binary Tree
- Find Users With Valid E-Mails
- Magnetic Force Between Two Balls
- Restore The Array
- Stone Game V
- Card Flipping Game
- 4Sum II
- Partition Array into Disjoint Intervals
- Encode Number
- Decompress Run-Length Encoded List
- Strobogrammatic Number
- Minimize Malware Spread
- Rectangle Area
- Design HashSet
- Course Schedule III
- Strange Printer II
- Number of Operations to Make Network Connected
- Global and Local Inversions
- Make Sum Divisible by P
- Lowest Common Ancestor of Deepest Leaves
- My Calendar II
- Remove Outermost Parentheses
- Minimum Distance to Type a Word Using Two Fingers
- Integer Replacement
- Average of Levels in Binary Tree
- Maximum Number of Coins You Can Get
- Balanced Binary Tree
- Stone Game III
- Change the Root of a Binary Tree
- Binary Trees With Factors
- Maximum Level Sum of a Binary Tree
- Dinner Plate Stacks
- Max Value of Equation
- Remove Covered Intervals
- Short Encoding of Words
- Brace Expansion II
- Transform to Chessboard
- Minimum Numbers of Function Calls to Make Target Array
- Flip String to Monotone Increasing
- Bricks Falling When Hit
- Cells with Odd Values in a Matrix
- Video Stitching
- Online Majority Element In Subarray
- Parallel Courses II
- Maximum Binary Tree
- Find Minimum in Rotated Sorted Array II
- Minimize Malware Spread II
- Reduce Array Size to The Half
- Coloring A Border
- Custom Sort String
- Next Greater Element III
- Swim in Rising Water
- Second Minimum Node In a Binary Tree
- Minimum Swaps to Arrange a Binary Grid
- Number of Islands II
- Mini Parser
- Arranging Coins
- Implement Stack using Queues
- Jump Game V
- Sell Diminishing-Valued Colored Balls
- Poor Pigs
- Array Transformation
- Max Increase to Keep City Skyline
- Palindrome Permutation II
- Longest Arithmetic Subsequence of Given Difference
- Find the Difference
- Minimum Subsequence in Non-Increasing Order
- Uncommon Words from Two Sentences