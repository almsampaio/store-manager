const express = require('express');

const Router = () => {
  const routes = express.Router();
  routes.rest = (route, controller) => {
    routes.post(`${route}`, controller.create);
    routes.get(`${route}`, controller.getAll);
    routes.get(`${route}/:id`, controller.get);
    routes.put(`${route}/:id`, controller.update);
    routes.delete(`${route}/:id`, controller.delete);
  };
  return routes;
};

module.exports = { ...express, Router };
