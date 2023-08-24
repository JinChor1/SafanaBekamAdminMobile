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

<!-- Screenshot -->
## 📸: Screenshot

### Home Page
![Screenshot_20230815_182446_com frontendmobile (2)](https://github.com/JinChor1/SafanaBekamAdminMobile/assets/136385395/97dea8eb-6511-494d-b262-bef19d9fe50b)

### Calendar
![Screenshot_20230815_182453_com frontendmobile (1)](https://github.com/JinChor1/SafanaBekamAdminMobile/assets/136385395/c48f2c93-496b-4725-a56c-2ea37c8d1872)

### Profile
![Screenshot_20230815_182525_com frontendmobile (1)](https://github.com/JinChor1/SafanaBekamAdminMobile/assets/136385395/98a6e91b-cc06-4236-8273-9eb65a32aa3e)


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

