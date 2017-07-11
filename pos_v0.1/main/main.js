'use strict';

function processInput(inputs){
  let receiptItems = [];
  let thisItemCode = inputs[0].barcode;
  let cnt = 0;

  receiptItems.push({
    barcode: inputs[0].barcode,
    name: inputs[0].name,
    count: 0,
    unit: inputs[0].unit,
    price: inputs[0].price,
    subTotal: 0
  });

  for(let item of inputs){
    if(thisItemCode == item.barcode){
      receiptItems[cnt].count ++;
      receiptItems[cnt].subTotal += receiptItems[cnt].price;
    }
    else{
        cnt++;
        receiptItems.push({
        name: item.name,
        count: 1,
        unit: item.unit,
        price: item.price,
        subTotal: item.price
      });
        thisItemCode = item.barcode;
    }
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
