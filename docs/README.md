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
| `ListPrice`         | Renders the product list price. If it is equal to the product selling price, this block will not be rendered. | 
| `SellingPrice`      | Renders the product selling price.| 
| `Installments`      | Renders the product installments. If more than one option is available, the one with the biggest number of installments will be displayed. | 
| `Savings`           | Renders the product price savings, if there is any. It can show the percentage of the discount or the value of the absolute saving. | 
| `ListPriceRange`    | Renders the product list price range. It follows the same logic applied to the `ListPrice`: if its value is equal to the product selling price, this block is not rendered. | 
| `SellingPriceRange` | The product selling price range. | 

All blocks listed above use product price data fetched from the store catalog. In order to understand further, please access the [Pricing Module overview](https://help.vtex.com/tracks/precos-101--6f8pwCns3PJHqMvQSugNfP).

### Step 2 - Adding the Product Price's blocks to your theme's templates

To add the Product Price's blocks in your theme, you just need to declare them as children of the `product-summary-shelf`, exported by the [Product Summary](https://vtex.io/docs/components/content-blocks/vtex.product-summary@2.52.3) app, or declare them in the theme's Product template (`store.product`).

Notice the following: these blocks necessarily need a Product context in order to work properly. Therefore, when declaring them as children of the `product-summary-shelf`, be sure that they are in a store template in which this context is available.

For example:

```json
"shelf#home": {
  "blocks": ["product-summary.shelf"]
},

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
| `markers`           |`[string]` | IDs of your choosing to identify the block's exported messages and customize them using the admin's Site Editor. Learn how to use them below |`[]`|
|  `blockClass`  |  `string`  |  Block  ID  of your choosing to  be  used  in [CSS  customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization#using-the-blockclass-property)  |  `undefined`  |

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

This makes it possible to fully edit the messages exported by each Product Price's block through the admin's Site Editor.

![Product-Price-Site-Editor-gif](https://user-images.githubusercontent.com/52087100/78073694-bdbffd80-7377-11ea-9262-40854dccdd53.gif)

Notice that you not only can edit the message text used by the block but also choose which data will be rendered according to the options stated in the field description.

In the example above, the block was firstly displaying a `Save $224.40` message. As a final result, it now renders a `You are saving: $224.40 (37%)` thanks to the changes performed through the admin's Site Editor.

![product-price-edited-img](https://user-images.githubusercontent.com/52087100/78073688-bc8ed080-7377-11ea-9a7a-53c36d9a9fe2.png)

### Using the `markers` prop 

1. Using your terminal and the [VTEX IO Toolbelt](https://vtex.io/docs/recipes/development/vtex-io-cli-installment-and-command-reference), login to the desired VTEX account from a development workspace;
2. Access the theme directory and open it using the code editor of your choosing;
3. Using your code editor, add the `markers` prop to the block whose text messages you want to customize and define unique value for it. For example:

```json
"product-price-savings#summary": {
  "props": {
    "markers": [
      "discount"
    ],
  }
},
```

4. Save your changes and [link the theme app](https://vtex.io/docs/recipes/development/linking-an-app);
5. Using the developer workspace you were previously developing, access the account's admin;
6. Then, open the Site Editor section in the CMS module;
7.  Click on the block in which the `markers` prop was added to edit it;
8.  Use the `markers` prop value as a tag, wrapping the desired block message that will be customized by you. For example: `<discount>-{savingsPercentage}</discount>`
 
![markers-prop-site-editor](https://user-images.githubusercontent.com/52087100/78163670-0f6f9300-741f-11ea-83a4-7122113234fb.gif)
*Once the changes performed are dully saved, the wrapped block message gains an identifier that corresponds to the prop value applied in the tag. This will allow the HTML element CSS customization*
9. Using the same development workspace, access the account's website in which you are working on (`{workspaceName}--{accountName}.myvtex.com`); 
10. Then, inspect the HTML element that corresponds to the text message just configured through the admin's Site Editor;
![product-price-markers-inspect](https://user-images.githubusercontent.com/52087100/78162509-578db600-741d-11ea-9d7d-e4c74399576e.png)
*Notice that the HTML element is now wrapped in a new* `span` *with its own unique selector:* `<span class="vtex-product-price-1-x-savings-discount">`.
11. Once all changes are verified, it is time now to use a Production workspace. Repeat the steps above using a workspace in production mode. Then, [promote it to Master](https://vtex.io/docs/recipes/development/promoting-a-workspace-to-master).
12. Done! You are now able to use the new HTML element identifier to customize the text message as desired. To know the next steps, access the [Customing your store using CSS Handles](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization) recipe.

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
