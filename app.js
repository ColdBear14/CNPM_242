const express = require('express')
const app = express()


const space = require('./routes/space_detail_router')

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/api/spaces', space)


app.listen(5000,() => {
  console.log('Server is listening on port 5000...')
})