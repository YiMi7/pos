'use strict';

function processInput(inputs) {
  let receiptItems = [];
  for (let item of inputs) {
    receiptItems.push({
      name: item.name,
      count: item.count,
      unit: item.unit,
      price: item.price,
      subTotal: item.price * item.count
    });
  }
  return receiptItems;
}

function buildSingleItem(receiptItem) {
  return `名称：${receiptItem.name}，数量：${receiptItem.count}${receiptItem.unit}，单价：${receiptItem.price.toFixed(2)}(元)，小计：${receiptItem.subTotal.toFixed(2)}(元)`
}

function printReceipt(inputs) {
  let itemStrings = "";
  let receiptItems = processInput(inputs);
  let total = 0;
  for (let index = 0; index < receiptItems.length; index ++) {
    if (index != receiptItems.length - 1) {
      itemStrings += buildSingleItem(receiptItems[index]) + '\n';
    } else {
      itemStrings += buildSingleItem(receiptItems[index]);
    }
    total += receiptItems[index].subTotal;
  }
  console.log( `***<没钱赚商店>收据***
${itemStrings}
----------------------
总计：${total.toFixed(2)}(元)
**********************`);
}
