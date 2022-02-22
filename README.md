# True Flight app
App to buy the flights for your next destiny!
This app is a technical test for Truehome startup.
The app uses React v17 and was created using create-react-app, it uses dependencies like React Redux, React Router, Moment, Firebase and Material UI Icons.

## Download the project
### if you're using NPM
```
git clone https://github.com/Isaakavo/trueflight.git
cd trueflight
npm i
```
Run the development server
```
npm start
```
### if you're using Yarn
```
git clone https://github.com/Isaakavo/trueflight.git
cd trueflight
yarn install
```
Run the development server
```
yarn start
```

## Run tests
```
npm run test
yarn test
```
Launches the test runner in the interactive watch mode.

## App description
The app allows you to "buy" tickets for different cities. 
Once you have selected your origin, destination, departure date and number of passengers (by default 1), the submit button will be available, once you have clicked it, the next pages will be shown (thanks to React Router), and a list of available flights will be retrieved from Firebase (I'm using Firestore) with the selected origin and destination. The page will show you the information you had select in the previos page and also the list of flights. When a flight is selected the app will return to the dashboard and the item will be added to the cart, in the cart you can delete a flight if you selected it by mistake or you can go to pay.
When you select the pay button the app will show the final page, which is a form where you have to put your information and optionally insert a coupon (if you're the tester of Truehome try the code "HIRE ME" :) ) to get a discount, once you have filled all your information the submit button will be available, and when it is clicked a confirmation modal will be shown, if you select cancel button nothing will happen and you will be able to edit your information, if you select the confirm button a modal will be shown showing all your information and the tickets you bought and if a coupon has been applied, the percentage discount and your total with that discount. 