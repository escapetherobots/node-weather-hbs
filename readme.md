# Example Node Weather App

## run with nodemon and watch js and hbs files:
``` 
nodemon web-server-hbs/src/app.js -e js,hbs
```

## Heroku Steps

``` 
heroku keys:add
```

``` 
heroku create ____unique_app_name____
```


## Prep App for Heroku

### Add node scripts via package.json
Add the following under 'scripts':
``` 
"start": "node src/app.js"
```

### Add .env vars for port and update src/app.js references
### Update client side fetch call for weather: public/js/app.js
