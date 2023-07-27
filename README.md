<div align="center">
  <h1>Safana Bekam Admin Mobile </h1>
  <p>
    Mobile Application for Safana Bekam CMS System
  </p>

<p>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/JinChor1/SafanaBekamAdminMobile" alt="watchers" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/watchers/JinChor1/SafanaBekamAdminMobile" alt="last update" />
  </a>
</p>


</div>


<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

Set up backend service using [this repo](https://github.com/JinChor1/SafanaBekamBackend)

<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/JinChor1/SafanaBekamAdminMobile.git
```

Go to the project directory

```bash
  cd project-directory
```

Install dependencies

```bash
  npm install
```

Change company's id on .env file 

```bash
  REACT_APP_COMPANYID=
```

Change api domain name

1. Go to src/constants/DomainAPI.js
2. Go to line 1
```bash
  export default DomainAPI = 'https://safanabekam-backend.onrender.com';
```
3. Change route

4. Run 
```bash
  npx react-native run-android
```

!!! Make sure you've gradle set up with android studio

