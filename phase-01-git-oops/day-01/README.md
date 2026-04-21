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

## For the Merge Conflict Resolve
- Conflict generate when editing in to same file and same line with differnt branch
- `Solve` Accept the any one PR Request(Merge) add to main branch with editor which using(Manually). After coommit the resolve file

<<<<<<< HEAD



Update this line for brnach main
=======
For the another branch update the existing file


Update tile file for merge conflict with master 
>>>>>>> master

- After conflict resolve manually and for push into git hub i got issue :

---
PS D:\fullStackInternTraining-Pratik> git push origin main
To https://github.com/pratikjetani0/fullStackInternTraining.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/pratikjetani0/fullStackInternTraining.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. If you want to integrate the remote changes,
hint: use 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
---

## Git Pull vs Git Fetch
- Downloads and merge where in fetch  Downloads update from remote
- Quick adding cureent branch where in fetch reviewing changes before merging
