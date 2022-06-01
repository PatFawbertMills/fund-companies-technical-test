# "Golden Gadgets" - Technical Test

The task was to take the given data file (data.json) and determine how much of a fund is invested in each company. Particularly 'Golden Gadgets'. 

The obvious challenge here was that funds can consist of other funds. Also, in theory, a fund could have an infinate nesting if one fund in the hierarchy contained a ancestor fund. Finally, the 'weighting' of the fund is a ratio of the overall value of the fund, so this needs to be taken into account when calculating the share of a company.

The UI was not part of the test, so I have intentionally gone very basic.

### Preview

<figure>
<img src="./screenshot.PNG" width="500">
<figcaption>Preview of the application viewed in the browser</figcaption>
</figure>

### Running the application

Install the dependancies
```
npm i
```
Run the application and view it in the browser at: http://localhost:3000/
```
npm run dev
```
Run the unit tests, results are displayed in the terminal:
```
npm run test
```

-----

## Tool justifications

### Vite & Vitest
I have read about vite and wanted an excuse to try it out. Nothing more to it than that.

Vitest is vite's own testing framework, which in terms of syntax is virtually identical to Jest. Using Jest however would've meant I needed to set up another pipeline in order to run the tests.

### React
A quick an easy way to get content rendered to the page.

### lodash
The useful utility methods like find and deepClone make lodash a natural choice.
