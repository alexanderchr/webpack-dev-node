const express = require('express');
const DynamicMiddleware = require('dynamic-middleware');
const renderServerSide = require('./renderServerSide');

const app = express();

if (module.hot) {
  const replaceableRenderServerSide = DynamicMiddleware.create(renderServerSide);
  app.get('*', replaceableRenderServerSide.handler());

  module.hot.accept('./renderServerSide', () => {
    console.log('Hot reloading server...');

    const newRenderServerSide = require('./renderServerSide');
    replaceableRenderServerSide.replace(newRenderServerSide);
  });
} else {
  app.get('*', renderServerSide);
}

app.listen(6753, () => {
  console.log('Server listening at :6753');
})
