# Day 01 — Git & GitHub  

## 🔹 Repository Setup  
- `git init` : Initialize a new repository  
- `git clone` : Download an existing repository  

## 🔹 Tracking & Staging  
- `git status` : Check changes  
- `git add [filename | .]` : Move files to staging area  
- `git commit -m "message"` : Save changes  

## 🔹 History & Differences  
- `git log` : View commit history  
- `git diff` : See changes between commits/branches  
  - Example: `git diff main master`  
  - Example: `git diff commit1 commit2`  

## 🔹 Branching & Switching  
- `git branch` : List all branches  
- `git branch [branchname]` : Create new branch  
- `git checkout -b [branchname]` : Create and switch to new branch  
- `git checkout [branchname]` : Switch branch  

## 🔹 Combining Work  
- `git merge [branchname]` : Combine branch  
- `git rebase` : Move my commits for clean history  

## 🔹 Get & Upload 
- `git pull` : Get latest changes  
- `git push origin main` : Upload changes  

## 🔹 Resetting Commits  
- `git reset` : Move branch [HEAD] pointer backward, optionally change files  
  - **Soft reset** : Remove commit, files stay staged  
  - **Mixed reset** : Remove commit, files unstaged in working directory  
  - **Hard reset** : Remove commit, remove all files from directory  

