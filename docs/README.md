📢 Use this project, [contribute](https://github.com/vtex-apps/product-price) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Price

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Product Price app exports blocks related to the product price, such as list price, selling price, and savings.

![image](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-product-price-0.png)

> ℹ️ Currently, **Product Price is the only app that provides product price blocks for your theme**. The [Product Summary Price](https://developers.vtex.com/docs/guides/vtex-product-summary-productsummaryprice) block from the [Product Summary](https://developers.vtex.com/docs/guides/vtex-product-summary/) app and the [Product Price](https://developers.vtex.com/docs/guides/vtex-store-components-productprice/) block from [Store Components](https://developers.vtex.com/docs/guides/vtex-store-components/) have been deprecated.

## Configuration

### Step 1 - Adding the Product Price app to your theme dependencies

In the theme's `manifest.json` file, add the Product Price app as a dependency:

```json
"dependencies": {
  "vtex.product-price": "1.x"
}
```

Now, you can use all the blocks exported by the `product-price` app. See the full list below:

| Block name                       | Description                                                                                                                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `product-list-price`             | Renders the product list price. This block will not be rendered if it is equal to or less than the product selling price.                                                                    |
| `product-selling-price`          | Renders the product selling price.                                                                                                                                                           |
| `product-spot-price`             | Renders the product spot price (if it is equal to the selling price, the block is not rendered). This block finds the spot price by looking for the lowest price of all installment options. |
| `product-installments`           | Renders the product installments. If more than one option is available, the one with the highest number of installments will be displayed by default.                                        |
| `product-installments-list`      | Renders all the installments of the payment system with the most installment options by default.                                                                                             |
| `product-installments-list-item` | Renders an installment option from the `product-installments-list-item`.                                                                                                                     |
| `product-price-savings`          | Renders the product price savings, if there are any. It can show the discount percentage or the total amount of the savings.                                                                 |
| `product-spot-price-savings`     | Renders the product spot price savings, if there are any. It can show the discount percentage or the total amount of the savings.                                                            |
| `product-list-price-range`       | Renders the product list price range. It follows the same logic applied to the `ListPrice`: if its value equals the product selling price, this block is not rendered.                       |
| `product-selling-price-range`    | This is the product selling price range.                                                                                                                                                     |
| `product-seller-name`            | Renders the name of the product seller.                                                                                                                                                      |
| `product-price-suspense`         | Renders a fallback component when the price is loading and its children block when it is not loading. This block is handy when the store works with asynchronous prices.                     |

All blocks listed above use product price data fetched from the store catalog. To learn more, please read the [Pricing module overview](https://help.vtex.com/tracks/precos-101--6f8pwCns3PJHqMvQSugNfP).

### Step 2 - Adding the Product Price blocks to your theme templates

To add the Product Price blocks to your theme, you just need to declare them as children of the `product-summary.shelf` exported by the [Product Summary](https://vtex.io/docs/components/content-blocks/vtex.product-summary@2.52.3) app, or declare them in the theme's Product template (`store.product`).

Note that these blocks require a Product context to work correctly. Therefore, when declaring them as children of the `product-summary.shelf`, make sure they are in a store template in which this context is available.

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

Except for `product-price-suspense`, every block in this app only has three props in common:

| Prop name    | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default value |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `markers`    | `[string]` | IDs that you define to identify the block's rendered message and customize it using the Site Editor in the Admin. Learn how to use them by reading the documentation on [Using the Markers prop to customize a block's message](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-the-markers-prop-to-customize-a-blocks-message). Note that a block's message can be customized using the `message` prop in the Store Theme source code. | `[]`          |
| `blockClass` | `string`   | Block ID that you define to be used in [CSS customizations](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization#using-the-blockclass-property).                                                                                                                                                                                                                                                         | `undefined`   |
| `message`    | `string`   | Defines the block's default text, i.e., the block message. If you use the Site Editor in the Admin, you can also define the text message that a block will render on the UI.                                                                                                                                                                                                                                                                                | `undefined`   |

For example:

```json
"product-selling-price#summary": {
  "props": {
    "markers": [
      "highlight"
    ],
    "blockClass": "summary",
    "message": "Selling price: {sellingPriceValue}"
  }
},
```

The `product-price-savings` block has two additional props:

| Prop name           | Type                  | Description                                                                                                                                                               | Default value |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `percentageStyle`   | `locale` or `compact` | Set to `compact` to remove the white space between the number and the percent sign. It uses the pattern provided by the current locale as default.                        | `locale`      |
| `minimumPercentage` | `number`              | Set the minimum value for the percentage value display. If not configured, it will display always. Example: `10` means savings less than or equal to 10% will not appear. | `0`           |
| `arialabel`          | `string` | Aria-label to be included for accessibility purposes                      |

The following blocks have an additional prop: `product-list-price`, `product-selling-price`, `product-spot-price`, `product-spot-price-savings`, `product-price-savings`, `product-list-price-range`, and `product-selling-price-range`. The prop is:

|  Prop name   |   Type    |                       Description                       | Default value |
|:------------:|:---------:|:-------------------------------------------------------:|:-------------:|
| `alwaysShow` | `boolean` | Renders the block even when the product is unavailable. |    `false`    |

For example:

```json
"product-selling-price#summary": {
  "props": {
    "alwaysShow": true
  }
},
```

The `product-installments-list` block has two additional props:

| Prop name            | Type       | Description                                                                                                                                                                                                                                                                                                           | Default value |
| -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `paymentSystemName`  | `string`   | Allows you to filter the listed installment options by a particular payment system. If not passed, the installments of the payment system with the most installment options will be rendered.                                                                                                               | `undefined`   |
| `installmentsToShow` | `number[]` | Determines the installment options you want to show to the user based on the number of installments. For example, if `[1, 3]` is passed as a value for this prop, only the installments options with `NumberOfInstallments` equal to 1 and 3 will be rendered. If a value is not passed, all options will be rendered. | `undefined`   |

The `product-installments` block also has two additional props:

| Prop name                  | Type                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             | Default value  |
| -------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `installmentsCriteria`     | `max-quantity` or `max-quantity-without-interest`               | When set to `max-quantity`, the block renders the installment plan with the most number of installments. When set to `max-quantity-without-interest`, the block renders the installment plan with the most number of installments and **no interest**. Note that if this prop is set to `max-quantity-without-interest` and no installment plan matches the 'without interest' criterion, the component will fall back to the default behavior. | `max-quantity` |
| `installmentOptionsFilter` | `{ paymentSystemName?: string, installmentsQuantity?: number }` | Allows you to define two filtering rules that will narrow down the possible installment plans the component may render.                                                                                                                                                                                                                                                                                                                                 | `undefined`    |

If you are using the asynchronous price feature, you can take advantage of `product-price-suspense` and its props:

| Prop name  |  Type   |                            Description                             |    Default value    |
|:----------:|:-------:|:------------------------------------------------------------------:|:-------------------:|
| `Fallback` | `block` | Name of the block that will be rendered when the price is loading. | `rich-text#loading` |

For example:

```json
{
  "rich-text#loading": {
    "props": {
      "text": "Loading..."
    }
  },
  "product-price-suspense": {
    "props": {
      "Fallback": "rich-text#loading"
    },
    "children": [
      "product-list-price#summary",
      "flex-layout.row#selling-price-savings",
      "product-installments#summary",
      "add-to-cart-button"
    ]
  },
  "product-summary.shelf": {
    "children": [
      "stack-layout#prodsum",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-price-suspense"
    ]
  }
}
```

![9SOSUdfAVa](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-product-price-1.gif)

### Step 3 - Editing the block's messages

Every Product Price block uses the [ICU Message Format](https://format-message.github.io/icu-message-format-for-translators/), making it possible to fully edit the text message and variables displayed by each block.

The variable values are rendered based on the context wrapping the block, meaning it uses product data to render the price accordingly.

You can, however, define the message texts a block will render on the UI using the `message` prop as explained previously.

The `markers` prop, in turn, needs an extra configuration in the Admin's Site Editor to work correctly. When using it, do not forget to read the [Using the Markers prop to customize a block's message](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-the-markers-prop-to-customize-a-blocks-message/) documentation.

![Product-Price-Site-Editor-gif](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-product-price-2.gif)

In addition, remember to take into account the message variables for each block, since you will need them to edit the desired messages using the Admin's Site Editor:

- **`product-list-price`**

| Message variable              | Type      | Description                                                                                      |
| ----------------------------- | --------- | ------------------------------------------------------------------------------------------------ |
| `listPriceValue`              | `string`  | List price value.                                                                                |
| `listPriceWithTax`            | `string`  | List price value with tax.                                                                       |
| `listPriceWithUnitMultiplier` | `string`  | List price multiplied by a unit multiplier.                                                      |
| `taxPercentage`               | `string`  | Tax percentage.                                                                                  |
| `taxValue`                    | `string`  | Tax value.                                                                                       |
| `hasMeasurementUnit`          | `boolean` | Determines whether the product has a unit of measure (`true`) or not (`false`).                  |
| `measurementUnit`             | `string`  | Unit of measure text.                                                                            |
| `hasUnitMultiplier`           | `boolean` | Determines whether the product has a unit multiplier different from 1 (`true`) or not (`false`). |
| `unitMultiplier`              | `string`  | Value of the unit multiplier.                                                                    |

- **`product-selling-price`**

| Message variable                 | Type      | Description                                                                                      |
| -------------------------------- | --------- | ------------------------------------------------------------------------------------------------ |
| `sellingPriceValue`              | `string`  | Selling price value.                                                                             |
| `sellingPriceWithTax`            | `string`  | Selling price with tax.                                                                          |
| `sellingPriceWithUnitMultiplier` | `string`  | Selling price multiplied by a unit multiplier.                                                   |
| `taxPercentage`                  | `string`  | Tax percentage.                                                                                  |
| `hasListPrice`                   | `boolean` | Determines whether the product has a list price (`true`) or not (`false`).                       |
| `taxValue`                       | `string`  | Tax value.                                                                                       |
| `hasMeasurementUnit`             | `boolean` | Determines whether the product has a unit of measure (`true`) or not (`false`).                  |
| `measurementUnit`                | `string`  | Unit of measure text.                                                                            |
| `hasUnitMultiplier`              | `boolean` | Determines whether the product has a unit multiplier different from 1 (`true`) or not (`false`). |
| `unitMultiplier`                 | `string`  | Value of the unit multiplier.                                                                    |

You can use the `product-selling-price` `sellingPriceWithUnitMultiplier`, `hasMeasurementUnit`, `unitMultiplier`, and `measurementUnit` variables together to render the unit of measure and unit multiplier on products that have it.

For example:

```json
{
  "product-selling-price": {
    "props": {
      "message": "{sellingPriceWithUnitMultiplier}{hasMeasurementUnit, select, true { / {hasUnitMultiplier, select, true {{unitMultiplier}} false {}} {measurementUnit}} false {}}"
    }
  }
}
```

According to the example above, products with a unit of measure and a unit multiplier would be rendered as follows:

`$24.00 / 2 oz`

> ℹ️ _Note that the unit of measure and unit multiplier would be properly rendered alongside their price._

Still, in the example, products that do not have a unit of measure and a unit multiplier will only render their price:

`$24.00`

- **`product-spot-price`**

| Message variable | Type     | Description       |
| ---------------- | -------- | ----------------- |
| `spotPriceValue` | `string` | Spot price value. |

- **`product-installments` and `product-installments-list-item`**

| Message variables        | Type      | Description                                                                    |
| ------------------------ | --------- | ------------------------------------------------------------------------------ |
| `spotPriceValue`         | `string`  | Spot price value.                                                              |
| `installmentsNumber`     | `string`  | Number of installments.                                                        |
| `installmentValue`       | `string`  | Amount of each installment.                                                    |
| `installmentsTotalValue` | `string`  | Total amount of installments.                                                  |
| `interestRate`           | `string`  | Interest rate.                                                                 |
| `paymentSystemName`      | `string`  | Payment system for the installments.                                           |
| `hasInterest`            | `boolean` | Determines whether the installments have interest (`true`) or not (`false`).   |
| `hasMoreThanOne`         | `boolean` | Determines whether there is more than 1 installment (`true`) or not (`false`). |

- **`product-price-savings`**

| Message variables    | Type     | Description                                                               |
| -------------------- | -------- | ------------------------------------------------------------------------- |
| `previousPriceValue` | `string` | Previous price value (list price).                                        |
| `newPriceValue`      | `string` | New price value (selling price).                                          |
| `savingsValue`       | `string` | Difference between the previous product price and the new one.            |
| `savingsWithTax`     | `string` | Difference between the previous product price and the new one with taxes. |
| `savingsPercentage`  | `string` | Percentage of savings.                                                    |

- **`product-spot-price-savings`**

| Message variables            | Type     | Description                                                                  |
| ---------------------------- | -------- | ---------------------------------------------------------------------------- |
| `previousPriceValue`         | `string` | Previous price value (list price).                                           |
| `newSpotPriceValue`          | `string` | New price value (spot price).                                                |
| `spotPriceSavingsValue`      | `string` | Difference between the previous product price and the spot price.            |
| `spotPriceSavingsWithTax`    | `string` | Difference between the previous product price and the spot price with taxes. |
| `spotPriceSavingsPercentage` | `string` | Percentage of savings.                                                       |

- **`product-list-price-range`**

| Message variables  | Type     | Description                                                 |
| ------------------ | -------- | ----------------------------------------------------------- |
| `minPriceValue`    | `string` | Value of the cheapest list price SKU.                       |
| `maxPriceValue`    | `string` | Value of the most expensive list price SKU.                 |
| `minPriceWithTax`  | `string` | Value of the cheapest list price SKU with tax.              |
| `maxPriceWithTax`  | `string` | Value of the most expensive list price SKU with tax.        |
| `listPriceValue`   | `string` | Value of the list price of the only SKU available.          |
| `listPriceWithTax` | `string` | Value of the list price of the only SKU available with tax. |

- **`product-selling-price-range`**

| Message variables     | Type     | Description                                                    |
| --------------------- | -------- | -------------------------------------------------------------- |
| `minPriceValue`       | `string` | Value of the cheapest selling price SKU.                       |
| `maxPriceValue`       | `string` | Value of the most expensive selling price SKU.                 |
| `minPriceWithTax`     | `string` | Value of the cheapest selling price SKU with tax.              |
| `maxPriceWithTax`     | `string` | Value of the most expensive selling price SKU with tax.        |
| `sellingPriceValue`   | `string` | Value of the selling price of the only SKU available.          |
| `sellingPriceWithTax` | `string` | Value of the selling price of the only SKU available with tax. |

- **`product-seller-name`**

| Message variable | Type     | Description                     |
| ---------------- | -------- | ------------------------------- |
| `sellerName`     | `string` | The name of the product seller. |

In the gif example above, the block first displayed a `Save $224.40` message. By editing the exported message, it now renders a `You are saving: $224.40 (37%)` message thanks to the changes performed through the Site Editor in the Admin:

![product-price-edited-img](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-product-price-3.png)

## Customization

To apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS handles for store customizations](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS handles                            |
| -------------------------------------- |
| `installmentValue`                     |
| `installmentsListContainer`            |
| `installmentsNumber`                   |
| `installmentsTotalValue`               |
| `installments`                         |
| `interestRate`                         |
| `listPrice'`                           |
| `listPrice--isUnavailable`             |
| `listPriceRangeMaxValue`               |
| `listPriceRangeMaxWithTax`             |
| `listPriceRangeMinValue`               |
| `listPriceRangeMinWithTax`             |
| `listPriceRangeUniqueValue`            |
| `listPriceRangeUniqueWithTax`          |
| `listPriceRange`                       |
| `listPriceRange--isUnavailable`        |
| `listPriceValue`                       |
| `listPriceWithTax`                     |
| `newPriceValue`                        |
| `newSpotPriceValue`                    |
| `paymentSystemName`                    |
| `previousPriceValue`                   |
| `savingsPercentage`                    |
| `savingsValue`                         |
| `savingsWithTax`                       |
| `savings`                              |
| `savings--isUnavailable`               |
| `sellerName`                           |
| `sellerNameContainer`                  |
| `sellerNameContainer--isDefaultSeller` |
| `sellingPrice--hasListPrice`           |
| `sellingPrice--isUnavailable`          |
| `sellingPriceRangeMaxValue`            |
| `sellingPriceRangeMaxWithTax`          |
| `sellingPriceRangeMinValue`            |
| `sellingPriceRangeMinWithTax`          |
| `sellingPriceRangeUniqueValue`         |
| `sellingPriceRangeUniqueWithTax`       |
| `sellingPriceRange`                    |
| `sellingPriceRange--isUnavailable`     |
| `sellingPriceRange--hasListPrice`      |
| `sellingPriceValue`                    |
| `sellingPriceWithTax`                  |
| `sellingPrice`                         |
| `spotPriceSavingsPercentage`           |
| `spotPriceSavingsValue`                |
| `spotPriceSavingsWithTax`              |
| `spotPriceSavings`                     |
| `spotPriceSavings--isUnavailable`      |
| `spotPriceValue`                       |
| `spotPrice`                            |
| `spotPrice--isUnavailable`             |
| `taxPercentage`                        |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://razvanudrea.com"><img src="https://avatars.githubusercontent.com/u/71461884?v=4?s=100" width="100px;" alt=""/><br /><sub><b>razvanudream</b></sub></a><br /><a href="https://github.com/vtex-apps/product-price/commits?author=razvanudream" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/khrizzcristian"><img src="https://avatars.githubusercontent.com/u/43498488?v=4?s=100" width="100px;" alt=""/><br /><sub><b>khrizzcristian</b></sub></a><br /><a href="https://github.com/vtex-apps/product-price/commits?author=khrizzcristian" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Git-the-Sanz"><img src="https://avatars.githubusercontent.com/u/50715158?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sanz</b></sub></a><br /><a href="https://github.com/vtex-apps/product-price/commits?author=Git-the-Sanz" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/renan-guerra-ba91aa17b/"><img src="https://avatars.githubusercontent.com/u/69531548?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Renan Guerra</b></sub></a><br /><a href="https://github.com/vtex-apps/product-price/commits?author=renanguerraa1" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
