-<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

First of all (even before the block's name), its README.md should contain the following sentence at the very beginning:

📢 Use this project, [contribute](https://github.com/vtex-apps/productPrice) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Price

Product Price app is responsible for exporting blocks related to the product's price, such as list price, selling price and savings.

![image](https://user-images.githubusercontent.com/8443580/77692675-d5694180-6f85-11ea-8690-49db5be24b3d.png)

## Configuration

### Step 1 - Adding the Product Price app to your theme's dependencies

In your theme's `manifest.json`, add the Search Result app as a dependency:

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

ℹ️ These blocks need the product context to work correctly, so be sure that you are putting them where this context is available!

### Step 2 - Adding the Product Price to page templates

To add the blocks of this app in your theme, you just need to add them as children in the desired block. For example:

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

| Block name          | Type      |  Description | Default value |
| --------------------| ----------|--------------|---------------|
| `markers`           |`string[]` |Custom markers used to customize parts of the message on siteeditor|`[]`|
|  `blockClass`  |  `String`  |  Unique  block  ID  to  be  used  in [CSS  customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization#using-the-blockclass-property)  |  `undefined`  |

Example  of usage:

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

Every Product Price message uses the [ICU Message Format](https://format-message.github.io/icu-message-format-for-translators/), which means you can interpolate values and apply some conditions to the message. This makes it possible to fully edit the prices' messages. Every block has its values that can be interpolated in the message and you can check them out in the description of the field on site-editor:

![image](https://user-images.githubusercontent.com/8443580/77782384-f6896b00-7035-11ea-8808-fb2a5533d1a6.png)

Another special feature these messages have are `markers`, which gives the possibility to wrap a part of the message in a `span` with its own CSS handle. To use `markers` in your message, do the following:

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
