# IT Benefits

### Installation

1.Make sure you have both .env.production and .env.staging files (see .env.EXAMPLE) , for each scheme in Xcode

### Generate production version

These are the steps to generate `.apk`

### Android

1. Update your version number in `android/app/build.grandle`
2. Make sure you have configured `android/app/app-release.properties` // set release signed key
3. `yarn install` // if needed
5. Make sure you have created bundle files `npx expo start` // you can rebuild it with expo
4. `yarn release:android:apk` OR `yarn release:android:aab`
5. apk file can be found in `./android/app/build/outputs` folder
