# RB FE Task

Summary:
FE Prototype using Angular 2.0 with ECMAScript 6 (Babel compiler), gulp, and all other typical stuff.

## Try

### Install

Clone/fork this repo and:
- make sure node version is > 4.0

```
npm install
npm install babel-register (needs to be installed seperately on some machines)
```

### Build

Build once:

```
gulp build
```

Watch files and rebuild:

```
npm run watch
# or
npm start
# or
gulp watch
```

### Preview

```
npm install -g http-server (needs to be installed globally)
http-server public
```
