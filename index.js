import express from 'express'

const app = express()

const port = 3000

app.listen(port, '0.0.0.0', () => {
    console.log("server is running at port 3000 ....")
})

app.use(express.json()) //any json will be accepted
let teaData = []
let nextId = 1
app.post('/teas', (req,res) => {
    const {name,price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})
//get all tea
app.get('/teas', (req,res) => {
    res.status(200).send(teaData)
})
//get tea with id
app.get('/teas/:id', (req, res) => {
    teaData.find(t => t.id === parseInt(req.params.id)) //the id in url can be used by params
    //find passes the reference to the item
    if(!tea) {
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})
//update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id)) //the id in url can be used by params
    if(!tea) {
        return res.status(404).send("Tea not found")
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})
//delete tea
app.delete('/teas/:id', (req,res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1){
        return res.status(404).send('tea not found')
    }

    teaData.splice(index, 1)
    return res.status(200).send('deleted')
})



app.get("/", (req, res) => {
    res.send("Hello from siri, you are requesting at index")
})

app.get("/ice-tea", (req, res) => {
    res.send("What ice tea would you prefer")
})

//just a test