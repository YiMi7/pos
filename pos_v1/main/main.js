'use strict';

function getPromotionsAndCounts(inputs){
  let arr = loadPromotions();
  let array = [];

  for(let items of inputs){
    items = { barcode: items };
    let position = items.barcode.indexOf('-');
    if(position !== -1){
      items.count = items.barcode.substring(position + 1) - '0';
      items.barcode = items.barcode.substring(0, position);
    }
    else{
      items.count = 1;
    }
    for(let itembarcodes of arr[0].barcodes){
        if(items.barcode === itembarcodes ){
          items.isPromoting = 1;
        }
      }
    array.push(items);
  }
  return array;
}

function preProcessInput(inputs){
  let input = getPromotionsAndCounts(inputs);
  let arr = loadAllItems();

   for(let inputItem of input){
     for(let arrItem of arr){
       if(inputItem.barcode === arrItem.barcode){
         inputItem.name = arrItem.name;
         inputItem.unit = arrItem.unit;
         inputItem.price = arrItem.price;
       }
     }
   }
  return input;
}

function processInput(inputs){
  let input = preProcessInput(inputs);
  let save = 0;
  let receiptItems = [];
  let thisItemCode = input[0].barcode;
  let cnt = 0;

  receiptItems.push({
    barcode: input[0].barcode,
    name: input[0].name,
    count: 0,
    unit: input[0].unit,
    price: input[0].price,
    subTotal: 0,
    isPromoting: input[0].isPromoting
  });
  for(let item of input){
    if(thisItemCode === item.barcode){
      receiptItems[cnt].count += item.count;
      receiptItems[cnt].subTotal += item.price * item.count;
    }
    else{
      cnt++;
      receiptItems.push({
        barcode: item.barcode,
        name: item.name,
        count: item.count,
        unit: item.unit,
        price: item.price,
        subTotal: item.price * item.count,
        isPromoting: item.isPromoting
      });
      thisItemCode = item.barcode;
    }
  }

  for(let items of receiptItems){
    if(items.isPromoting === 1){
      let mod = items.count % 3;
      let x = ( items.count - mod)/3;
      items.subTotal -= x * items.price;
      save += x * items.price;
    }
  }

  return {
    receiptItems,
    save
  };
}

function buildSingleItem(receiptItem) {
  return `名称：${receiptItem.name}，数量：${receiptItem.count}${receiptItem.unit}，单价：${receiptItem.price.toFixed(2)}(元)，小计：${receiptItem.subTotal.toFixed(2)}(元)`
}

function printReceipt(inputs) {
  let itemStrings = "";
  let receiptItems = processInput(inputs).receiptItems ;
  //console.log(receiptItems);
  let save = processInput(inputs).save;
  let total = 0;

  for (let item of receiptItems) {
    itemStrings += buildSingleItem(item) + '\n';
    total += item.subTotal;

  }
  console.log( `***<没钱赚商店>收据***
${itemStrings}----------------------
总计：${total.toFixed(2)}(元)
节省：${save.toFixed(2)}(元)
**********************`);

}
