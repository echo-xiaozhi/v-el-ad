const lists = [
  {
    s1: '1',
    s2: '2',
    stock: 321
  },
  {
    s1: '1',
    s2: '1',
    stock: 0
  },
  {
    s1: '2',
    s2: '1',
    stock: 123
  },
  {
    s1: '1',
    stock: 12
  },
  {
    s2: '2',
    stock: 12
  }
];

const searchSku = {
  s1: 1,
  s2: 2
}

const sku = lists.filter(list => {
  let keys = [];
  for(let key in searchSku) {
    keys.push(key)
  }

  const res = keys.filter(key => {
    return String(searchSku[key]) === String(list[key])
  })

  return keys.length === res.length
})

console.log(sku)
