---
layout: post
title: "jira cheatcheet"
date: 2025-09-01
tags: jira
---

> 이슈 text 검색
``` jql
(assignee = currentUser() OR reporter  = currentUser()) AND text ~ something order by updated DESC
```

> link 걸어놓은 이슈 검색
``` jql
issue IN linkedIssues(SRC-12345) order by updated DESC
```

> sprint 검색
``` jql
sprint="My Sprint 20250924"
```