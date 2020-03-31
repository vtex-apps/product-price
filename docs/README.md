-<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

📢 Use this project, [contribute](https://github.com/vtex-apps/product-price) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Price

Product Price app is responsible for exporting blocks related to the product's price, such as list price, selling price and savings.

![image](https://user-images.githubusercontent.com/8443580/77692675-d5694180-6f85-11ea-8690-49db5be24b3d.png)

## Configuration

### Step 1 - Adding the Product Price app to your theme's dependencies

In your theme's `manifest.json`, add the Product Price app as a dependency:

```json
"dependencies": {
  "vtex.product-price": "1.x"
}
```
  
Now, you can use all the blocks exported by the `product-price` app. Check out the full list below:

| Block name          |  Description |
| --------------------| -------- |
| `ListPrice`         | The product's list price. If the product's list price is the same as the selling price, this block will not be rendered. | 
| `SellingPrice`      | The product's selling price.| 
| `Installments`      | The product's installments. If there is more than one option, the one with the biggest number of installments will be displayed.| 
| `Savings`           | The product's price savings, if there is any. It can show the percentage of the discount and the value of the absolute savings. | 
| `ListPriceRange`    | The list price range of the product. It follows the same rule of the `ListPrice`, if it is the same as `SellingPriceRange`, this block is not rendered. | 
| `SellingPriceRange` | The selling price range of the product. | 

All blocks listed above use product price data fetched from the store catalog. In order to understand further, please access the [Pricing Module overview](https://help.vtex.com/tracks/precos-101--6f8pwCns3PJHqMvQSugNfP).

### Step 2 - Adding the Product Price to page templates

To add the Product Price's blocks in your theme, you just need to declare them as children of the `product-summary-shelf`, exported by the [Product Summary](https://vtex.io/docs/components/content-blocks/vtex.product-summary@2.52.3) app, or declare them in the theme's Product template (`store.product`).

Notice the following: these blocks necessarily need a Product context in order to work properly. Therefore, when declaring them as children of the `product-summary-shelf`, be sure that they are in a store template in which this context is available.

For example:

```json
"product-summary.shelf": {
  "children": [
    "product-list-price",
    "product-selling-price",
    "product-price-savings",
    "product-installments"
  ]
},
```

Every block in this app has some props in common:

| Prop name          | Type      |  Description | Default value |
| --------------------| ----------|--------------|---------------|
| `markers`           |`string[]` | Custom markers used to customize parts of the message on Site Editor|`[]`|
|  `blockClass`  |  `string`  |  Unique  block  ID  to  be  used  in [CSS  customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization#using-the-blockclass-property)  |  `undefined`  |

For example:

```json
"product-price-savings#summary": {
  "props": {
    "markers": [
      "discount"
    ],
    "blockClass": "summary"
  }
},
```

### Step 3 - Editing the values on Site Editor

Every Product Price's block uses the [ICU Message Format](https://format-message.github.io/icu-message-format-for-translators/).

This makes it possible to fully edit the messages exported by each Product Price's block. Check it out in the admin's Site Editor:

![image](https://user-images.githubusercontent.com/8443580/77782384-f6896b00-7035-11ea-8808-fb2a5533d1a6.png)

Each of these messages has `markers` responsible for wrapping a part of the message with its own CSS handle. To use `markers` in your message, do the following:

1 - Add to the prop `markers` a marker name, for example: `"markers": ["highlight"]`
2 - Open the Site Editor and click to edit the block
3 - In the edition form of the block, fill the field with a text and wrap the piece of a text using the marker as if it were an element. Example: `<highlight>-{savingsPercentage}</highlight>`
4 - Save the changes
5 - If you inspect the HTML of the element you will notice that this part of the text is wrapped in a new `span` with its own unique selector: `<span class="vtex-product-price-1-x-savings-highlight">`

## Customization

To apply  CSS  customization in this and other blocks, follow the instructions given in the recipe on  [Using  CSS  Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ----------- |
| `installments` |
| `installmentsNumber` |
| `installmentValue` |
| `installmentsTotalValue` |
| `interestRate` |
| `listPrice'` |
| `listPriceValue` |
| `listPriceRange` |
| `listPriceRangeMinValue` |
| `listPriceRangeMaxValue` |
| `listPriceRangeUniqueValue` |
| `savings` |
| `previousPriceValue` |
| `newPriceValue` |
| `savingsValue` |
| `savingsPercentage` |
| `sellingPrice` |
| `sellingPriceValue` |
| `sellingPriceRange` |
| `sellingPriceRangeMinValue` |
| `sellingPriceRangeMaxValue` |
| `sellingPriceRangeUniqueValue` |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
