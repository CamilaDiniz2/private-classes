// fileSystem
const fs = require('fs')

const data = require('./data.json')

// Function POST
exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for(key of keys){
    if (req.body[key] == "") return res.send("Please, fill all fields")
  }

  req.body.birth = Date.parse(req.body.birth)
  req.body.created_at = Date.now()

  // cria o id do grupo de dados
  req.body.id = Number(data.teachers.length + 1)

  // desestruturando
  const { avatar_url, name, birth, scholarity, typeOfClass, disciplines, created_at, id } = req.body


  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    scholarity,
    typeOfClass,
    disciplines,
    created_at,
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send("Write file error")

    return res.redirect("/teachers")
  })
}