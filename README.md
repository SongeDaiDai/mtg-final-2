# CCCS 3 10 Final

#### Introduction

Using what you have learned to construct the following webpage.


Your webpage should look “identical” to the page above: similar colors, same indentation, and same styles. You can
choose any font-family you like, and you can adjust the font size based on your preference. Try to get it as close as you
can to what is presented here so you can receive more scores.

#### Part 1: Get Information via API ( 20 points)

In this work, you need to get all the card information from a given API. I am only using two API below to complete the
work:

For getting types information: https://api.magicthegathering.io/v1/types

For getting card list API: https://api.magicthegathering.io/v1/cards?type=Artifact (type is obtained from the above API)

You can read more detail instruction from the API main page: https://docs.magicthegathering.io/

**Alternative API:**

If the above server is down, you can use this API server: https://scryfall.com/docs/api/cards

For a query set of cards, you can use any query you like. Please check below for an example:

Get 598 cards: https://api.scryfall.com/cards/search?order=rarity&q=c%3Ared+pow%3D

Since this API does not provide API to get all unique types, you can extra all the unique types from the attribute of
**type_line** in each card.

If you don’t know how to fetch data via API, you can download the JSON file as a bulk file. Please see the link below:

https://scryfall.com/docs/api/bulk-data

Note that you will lose 20 points if you do not get data via API


#### Part 2: Card ( 20 points) For partial points, use fake cards if you cannot use API

```
For each card, you should have the following information:
```
## Card image

## Card name

## Card type

## Card Rarity

## Card text / oracle_text

## Bold

## Italic

## If image is not found from the

## server, just ignore the card.


#### Part 3: Type Filter ( 25 points)

You need to provide a type filter like the below. The default type should be ‘any’. All the other types should be added
from the types API when first time launching the site.

(Hint: You should call the cards API for each type and store all the returned data in a local repository when launching the
webpage.)

When the type is clicked, you should only display cards which match the type selected.


#### Part 4: Rarity Filter ( 25 points)

You should provide a rarity filter using checkbox. The default value is ‘any’ and only one checkbox can be selected at the
same time. When the rarity is selected, you should only display cards which match the rarity selected.

### Note: when both type and rarity are selected, you should only display cards that

### match the two requirements.

#### Part 4: Responsive Design (5 points)

You should have the following 3 responsive design:

## <760 760 ~ 960^ >^


#### Part 5 : Footer (5 points)

You have 3+1 hours to do this task. You can only get maximum 80 points if you use the extra hour.

##### What to submit

Zip and submit all the files to MyCourses. Please do not use .rar


