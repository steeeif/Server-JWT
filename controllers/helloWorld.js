module.exports = function(router) {
  router.get('/api/hello-world', function(req, res) {
    res.json({ data: 'You can see this becous you are loged in!' })
  })

  return router
}
