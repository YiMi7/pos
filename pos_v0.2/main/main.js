'use strict';


//JS深拷贝的方法
let deepCopy= function(source) {
  let result={};
  for (let key in source) {
    result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
  }
  return result;
};

function preProcessInput(inputs){
  //console.log(intputs)
  let arr = loadAllItems();
  for(let index = 0; index < inputs.length; index++){
    for(let j = 0; j < arr.length; j++){
      if(inputs[index] == arr[j].barcode){
        //console.log(arr[j])
        inputs[index] = deepCopy(arr[j]);
      }
    }
  }
  //console.log(intputs)
  return inputs;
}



function processInput(inputs){

  preProcessInput(inputs);

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
//console.log(receiptItem.price.toFixed(2))
  return `名称：${receiptItem.name}，数量：${receiptItem.count}${receiptItem.unit}，单价：${receiptItem.price.toFixed(2)}(元)，小计：${receiptItem.subTotal.toFixed(2)}(元)`

}

function printReceipt(inputs) {
  let itemStrings = "";
  let receiptItems = processInput(inputs);
  let total = 0;

  for (let item of receiptItems) {
    itemStrings += buildSingleItem(item) + '\n';
    total += item.subTotal;

  }
  console.log( `***<没钱赚商店>收据***
${itemStrings}----------------------
总计：${total.toFixed(2)}(元)
**********************`);

}

