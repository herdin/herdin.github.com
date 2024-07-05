---
layout: post
title: "github action cheatsheet"
date: 2024-04-12
tags: github-action
---

# 이전 job 성공/실패 분기처리, variable sharing between jobs/steps

``` yaml
name: PAUL TEST

on:
  push:
    branches:
      - 'test/paul'

env:
  WORKDIR: "paul-test"

jobs:
  init:
    runs-on: [ self-hosted ]
    steps:
      - name: checkout
        uses: actions/checkout@v3
        with:
          path: ${{ env.WORKDIR }}
      - name: check-dir
        run: |
          ls -al
  paul-test-job:
    runs-on: [ self-hosted ]
    needs: init
    outputs:
      HELLO: ${{ steps.paul-test-step-1.outputs.HELLO }}
    steps:
      - name: paul-test-step-1
        id: paul-test-step-1
        working-directory: ${{ env.WORKDIR }}
        run: |
          echo "hello, github action workflow"
          echo "HELLO=WORLD" >> "$GITHUB_OUTPUT"
          exit 1
      - name: notify-step-fail
        if: ${{ failure() }}
        working-directory: ${{ env.WORKDIR }}
        run: |
          PAUL_FIRST_TOKEN="fBUFAjZzKZKGomLY1yfP26dQuTiIHkjYVB3HGixCJtl"
          TOKEN=$PAUL_FIRST_TOKEN
          LINE_MESSAGE="step 실패다!!!"
          curl -v -X POST -H "Authorization: Bearer "$TOKEN -d "message=$LINE_MESSAGE" https://notify-api.line.me/api/notify
      - name: notify-step-fail
        if: ${{ success() }}
        working-directory: ${{ env.WORKDIR }}
        run: |
          PAUL_FIRST_TOKEN="fBUFAjZzKZKGomLY1yfP26dQuTiIHkjYVB3HGixCJtl"
          TOKEN=$PAUL_FIRST_TOKEN
          LINE_MESSAGE="step 성공이다!!!"
          curl -v -X POST -H "Authorization: Bearer "$TOKEN -d "message=$LINE_MESSAGE" https://notify-api.line.me/api/notify
      - name: paul-test-step-check
        working-directory: ${{ env.WORKDIR }}
        env:
          HELLO: ${{ steps.paul-test-step-1.outputs.HELLO }}
        run: |
          echo "hello, github action workflow"
          echo "HELLO : $HELLO"
  notify-fail:
    runs-on: [ self-hosted ]
    needs: paul-test-job
    if: ${{ failure() }}
    steps:
      - name: notify-step
        working-directory: ${{ env.WORKDIR }}
        run: |
          PAUL_FIRST_TOKEN="fBUFAjZzKZKGomLY1yfP26dQuTiIHkjYVB3HGixCJtl"
          TOKEN=$PAUL_FIRST_TOKEN
          LINE_MESSAGE="이전 job 실패다!!!"
          curl -v -X POST -H "Authorization: Bearer "$TOKEN -d "message=$LINE_MESSAGE" https://notify-api.line.me/api/notify
  notify-success:
    runs-on: [ self-hosted ]
    needs: paul-test-job
    if: ${{ success() }}
    steps:
      - name: notify-step
        working-directory: ${{ env.WORKDIR }}
        env:
          HELLO: ${{ needs.paul-test-job.outputs.HELLO }}
        run: |
          PAUL_FIRST_TOKEN="fBUFAjZzKZKGomLY1yfP26dQuTiIHkjYVB3HGixCJtl"
          TOKEN=$PAUL_FIRST_TOKEN
          LINE_MESSAGE="이전 job 성공이다!!! $HELLO"
          curl -v -X POST -H "Authorization: Bearer "$TOKEN -d "message=$LINE_MESSAGE" https://notify-api.line.me/api/notify


```