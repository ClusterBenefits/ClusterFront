# validadtorJS

## Preparing New Release

_NOTE: Make sure not to bump version as it will be handled by `np` in step 5_

1. Create local branch which contains all the code to include in new version
2. When completed, push all code to branch from step 1
3. From skaterdav85/validatorjs create PR (should be able to auto prepare)
4. When CI completes, Squash and Merge
5. Execute np, bumping to desired version (this will allow forcing a specific version)
   `$ np <version> eg np 3.17.0`

## Tasks

- [C] Integrate husky
- [x] Integrate ESLint
- [ ] Remove Grunt integraton
  - [ ] build (browserify)
  - [ ] dist (build)
  - [ ] default (dist)
- [ ] Figure out best approach for building UMD
  - [ ] Webpack?
- [x] Confirm proper executing using `<script>` tag
- [x] Is it necessary to create `.min` version
- [x] Remove `bower.json` distribution

## References

Upgrading to Puppeteer / ChromeHeadless -- [Link](https://medium.com/@metalex9/replace-phantomjs-with-headless-chromium-for-javascript-unit-testing-in-karma-59812e6f8ce4)
[Debugging Mocha Tests](https://github.com/microsoft/vscode-recipes/tree/master/debugging-mocha-tests)
