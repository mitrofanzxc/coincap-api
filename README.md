# Deploy: [Link](https://mitrofanzxc.github.io/calculator/) 

### `npm i` 

Install all dependencies. 

### `npm run start` 

Run the app in the development mode. 

### `npm run watch` 

Keep track of all changes. 

## Requirements of the project: 

- [x] SPA for tracking cryptocurrencies and building your own portfolio. Technologies: React, Redux, TS/ Styles should be written independently, without the use of third-party libraries (Bootstrap, Material UI, etc.) using styled-components. 
- [x] API: Coincap 
- [x] Main: The main page displays a list (table) of cryptocurrencies with basic information on them and with controls for adding to the portfolio (for example, "+".). Implement pagination. 
- [x] When you click on a table element, a page opens with detailed information on the currency, with a control for adding to the portfolio, as well as its history in the form of a graph (either can be used to visualize data). 
- [x] By clicking on the "+", a modal window opens where you can enter the amount (including fractional) of the cryptocurrency. After the submission, the cryptocurrency is added to the portfolio in the specified amount. 
- [x] Implement routing. The browser's back button should work correctly. 
- [x] Header: Cost of 3 popular cryptocurrencies in a row. The value of the user's portfolio and the difference with the initial value of the portfolio, in parentheses, the percentage difference. Example: $134.32 +2.38 (1.80%). When updating a portfolio, we store information about the value of the added currency at the time of the update. The next time we start (reload) the application, we get the current values ​​of the currencies and can update the difference. 
- [x] When you click on the portfolio information, a modal window opens with a list of currencies in the portfolio and the ability to remove each of them from the portfolio. 
- [x] The portfolio must be page reload resistant (localStorage). 
- [x] The design should be simple, clear and functional. Mobile devices and tablets are supported. 
