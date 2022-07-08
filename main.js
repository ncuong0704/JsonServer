const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const queryString = require("query-string")


// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Serverrrrr
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
    req.body.updatedAt = Date.now()
  }else if(req.method === 'PATCH'){
    req.body.updatedAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Custom output for List with pagination
router.render = (req, res) => {
  // Check GET with panigation
  // If yes, custom output
  const headers = res.getHeaders();

  const totalCountHeader = headers['x-total-count']

  if(req.method === "GET" && totalCountHeader){
    const queryParams = queryString.parse(req._parsedUrl.query)
    console.log(queryParams)
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page),
        _limit: Number.parseInt(queryParams._limit),
        _totalRows: Number.parseInt(totalCountHeader)
      },
    };

    return res.jsonp(result)
  }
  
  // Otherwise, keep default behavior
  res.jsonp(res.locals.data)
}

// Use default router
server.use("/api" ,router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})