📢 Use this project, [contribute](https://github.com/vtex-apps/product-price) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Price

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Product Price app is responsible for exporting blocks related to the product's price, such as list price, selling price and savings.

![image](https://user-images.githubusercontent.com/8443580/77692675-d5694180-6f85-11ea-8690-49db5be24b3d.png)

:information_source: Currently, **the Product Price is the only app responsible for providing product price blocks for your theme**. Both [Product Summary Price](https://vtex.io/docs/components/all/vtex.product-summary/product-summary-price/) and [Product Price](https://vtex.io/docs/components/all/vtex.store-components/product-price/) blocks, respectively from [Product Summary](https://vtex.io/docs/components/all/vtex.product-summary/) and [Store Components](https://vtex.io/docs/components/all/vtex.store-components/) apps, were deprecated and therefore will no longer be evolved.

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
| `product-list-price`         | Renders the product list price. If it is equal to the product selling price, this block will not be rendered. | 
| `product-selling-price`      | Renders the product selling price.|
| `product-spot-price`         | Renders the product spot price. If it is equal to the product selling price, this block will not be rendered. This component finds the spot price by looking for the cheapest price of all installments options of count 1. For more information about how to set this up in your store, check this [document](https://docs.google.com/document/d/1zguIGidi_qFtoX101J7zPsjU7-MyV0qiQvTo_dOR_w0/edit?usp=sharing).|
| `product-installments`      | Renders the product installments. If more than one option is available, the one with the biggest number of installments will be displayed. | 
| `product-price-savings`           | Renders the product price savings, if there is any. It can show the percentage of the discount or the value of the absolute saving. | 
| `product-list-price-range`    | Renders the product list price range. It follows the same logic applied to the `ListPrice`: if its value is equal to the product selling price, this block is not rendered. | 
| `product-selling-price-range` | The product selling price range. | 

All blocks listed above use product price data fetched from the store catalog. In order to understand further, please access the [Pricing Module overview](https://help.vtex.com/tracks/precos-101--6f8pwCns3PJHqMvQSugNfP).

### Step 2 - Adding the Product Price's blocks to your theme's templates

To add the Product Price's blocks in your theme, you just need to declare them as children of the `product-summary.shelf`, exported by the [Product Summary](https://vtex.io/docs/components/content-blocks/vtex.product-summary@2.52.3) app, or declare them in the theme's Product template (`store.product`).

Notice the following: these blocks necessarily need a Product context in order to work properly. Therefore, when declaring them as children of the `product-summary.shelf`, be sure that they are in a store template in which this context is available.

For example:

```json
"shelf#home": {
  "blocks": ["product-summary.shelf"]
},

"product-summary.shelf": {
  "children": [
    "product-list-price",
    "product-selling-price#summary",
    "product-price-savings",
    "product-installments"
  ]
},
```

Every block in this app only has three props in common:

| Prop name          | Type      |  Description | Default value |
| --------------------| ----------|--------------|---------------|
| `markers`           |`array` | IDs of your choosing to identify the block's rendered message and customize it using the admin's Site Editor. Learn how to use them accessing the documentation on [Using the Markers prop to customize a block's message](https://vtex.io/docs/recipes/style/using-the-markers-prop-to-customize-a-blocks-message). Notice the following: a block's message can also be customized in the Store Theme source code using the `message` prop. |`undefined`|
|  `blockClass`  |  `string`  |  Block  ID  of your choosing to  be  used  in [CSS  customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization#using-the-blockclass-property).  |  `undefined`  |
|  `message`  |  `string`  |  Message variables exported by each block that can be edited in Site Editor as well  |  `undefined`  |

For example:

```json
"product-selling-price#summary": {
  "props": {
    "markers": [
      "highlight"
    ],
    "blockClass": "summary",
    "message": "{sellingPriceValue}"
  }
},
```

### Step 3 - Editing the block's message on Site Editor or in the message prop

Every Product Price's block uses the [ICU Message Format](https://format-message.github.io/icu-message-format-for-translators/), making it possible to fully edit the text messages and the variables displayed by each block.

To edit the messages with the block message prop follow the exemple in the above section using the avalible variables bellow. 

To edit the messages in the Site Editor access your VTEX account's admin, open the Site Editor and look for the Product Price's blocks. 

![Product-Price-Site-Editor-gif](https://user-images.githubusercontent.com/52087100/78073694-bdbffd80-7377-11ea-9262-40854dccdd53.gif)

Once editing their messages, bear in mind the message variables exported by each block (stated below) and the documentation on [how to use the Markers prop](https://vtex.io/docs/recipes/style/using-the-markers-prop-to-customize-a-blocks-message/).

-  **`product-list-price`**

| Message variable | Type | Description |
| --- | --- | --- |
| `listPriceValue` | `string` | List price value. |
| `listPriceWithTax` | `string` | List price value with tax. |
| `taxPercentage` | `string` | Tax percentage. |

-  **`product-selling-price`**

| Message variable | Type | Description |
| --- | --- | --- |
| `sellingPriceValue` | `string` | Selling price value. |
| `sellingPriceWithTax` | `string` | Selling price with tax. |
| `taxPercentage` | `string` | Tax percentage. |
| `hasListPrice` | `boolean` | Whether the product has a list price (`true`) or not (`false`). |

- **`product-spot-price`**

| Message variable | Type | Description |
| --- | --- | --- |
| `spotPriceValue` | `string` | Spot price value. |

- **`product-installments`**

| Message variables | Type | Description |
| --- | --- | --- |
| `spotPriceValue` | `string` | Spot price value. |
| `installmentsNumber` | `string` | Number of installments. |
| `installmentValue` | `string` | Value of each installment. |
| `installmentsTotalValue` | `string` | Total value of installments. |
| `interestRate` | `string` | Interest rate. |
| `hasInterest` | `boolean` | Whether the installments have interest (`true`) or not (`false`). |

- **`product-price-savings`**

| Message variables | Type | Description |
| --- | --- | --- |
| `previousPriceValue` | `string` | Previous price value (list price). |
| `newPriceValue` | `string` | New price value (selling price). |
| `savingsValue` | `string` | Difference between previous product price and the new one. |
| `savingsWithTax` | `string` | Difference between previous product price and the new one with taxes. |
| `savingsPercentage` | `string` | Percentage of savings. |

- **`product-list-price-range`**

| Message variables | Type | Description |
| --- | --- | --- |
| `minPriceValue` | `string` | Value of the cheapest list price SKU. |
| `maxPriceValue` | `string` | Value of the most expensive list price SKU. |
| `minPriceWithTax` | `string` | Value of the cheapest list price SKU with tax. |
| `maxPriceWithTax` | `string` | Value of the most expensive list price SKU with tax. |
| `listPriceValue` | `string` | Value of the list price of the only SKU available. |
| `listPriceWithTax` | `string` | Value of the list price of the only SKU available with tax. |

- **`product-selling-price-range`**

| Message variables | Type | Description |
| --- | --- | --- |
| `minPriceValue` | `string` | Value of the cheapest selling price SKU. |
| `maxPriceValue` | `string` | Value of the most expensive selling price SKU. |
| `minPriceWithTax` | `string` | Value of the cheapest selling price SKU with tax. |
| `maxPriceWithTax` | `string` | Value of the most expensive selling price SKU with tax. |
| `sellingPriceValue` | `string` | Value of the selling price of the only SKU available. |
| `sellingPriceWithTax` | `string` | Value of the selling price of the only SKU available with tax. |

In the gif example above, the block was firstly displaying a `Save $224.40` message. By editing the message exported, it now renders a `You are saving: $224.40 (37%)` message thanks to the changes performed through the admin's Site Editor.

![product-price-edited-img](https://user-images.githubusercontent.com/52087100/78073688-bc8ed080-7377-11ea-9a7a-53c36d9a9fe2.png)


## Customization

To apply CSS customization in this and other blocks, follow the instructions given in the recipe on [Using  CSS  Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ----------- |
| `installmentValue` |
| `installmentsNumber` |
| `installmentsTotalValue` |
| `installments` |
| `interestRate` |
| `listPrice'` |
| `listPriceRangeMaxValue` |
| `listPriceRangeMaxWithTax` |
| `listPriceRangeMinValue` |
| `listPriceRangeMinWithTax` |
| `listPriceRangeUniqueValue` |
| `listPriceRangeUniqueWithTax` |
| `listPriceRange` |
| `listPriceValue` |
| `listPriceWithTax` | 
| `newPriceValue` |
| `previousPriceValue` |
| `savingsPercentage` |
| `savingsValue` |
| `savingsWithTax` |
| `savings` |
| `sellingPrice--hasListPrice` |
| `sellingPriceRangeMaxValue` |
| `sellingPriceRangeMaxWithTax` |
| `sellingPriceRangeMinValue` |
| `sellingPriceRangeMinWithTax` |
| `sellingPriceRangeUniqueValue` |
| `sellingPriceRangeUniqueWithTax` |
| `sellingPriceRange` |
| `sellingPriceValue` |
| `sellingPriceWithTax` | 
| `sellingPrice` |
| `spotPriceValue` |
| `spotPrice` |
| `taxPercentage` |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
