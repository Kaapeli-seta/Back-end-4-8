const items = [
  {id: 1, name: 'Item1'},
  {id: 2, name: 'Item2'},
];

const getItmes = (res) => {
  res.json(items);
};

const postItmes = (req, res) => {
  const body = req.body;
  res.status(201);
  res.json({your_request: body});
  /*   let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      res.end(body); // res ei tarvitseolla body voi olla tyhjä tai String
      items.push(JSON.parse(body));
    }); */
};

const getItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (item) {
    if (req.query.format === 'plain') {
      res.send(item.name);
      return;
    }
    res.json(item);
  } else {
    res.status(404).json({message: 'item not found'});
  }
};

export {getItmes, postItmes, getItemById};
