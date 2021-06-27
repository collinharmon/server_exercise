import express from 'express'

const app = express()

app.use(express.json())

const fs = require("fs")

const MAX_MCA = 4026531839 //EF.FF.FF.FF


app.get('/', (req, res) => {
  /*
  * Read from local JSON file to get current MCA to send.
  * Determine if MCA to send should be recycled or the next current MCA, per counter. 
  * If not recycled MCA, increment and rewrite JSON file for next request.
  * Else pop from front of recycled_mcas array and send.
  */
  var cur_add
  fs.readFile("mcas.json", (err, data) => {
    if(err){
      console.log(err)
    }
    else{
      var obj = JSON.parse(data)
      if(obj.recycled_mcas.length > 0){
        var mcas = obj.recycled_mcas
        var next_mca = mcas.shift()
        obj.recycled_mcas = mcas
        var json = JSON.stringify(obj)
        fs.writeFileSync('mcas.json', json)
        res.send({address: convertMcaIntToStr(next_mca)})
      }
      else{
        var curr_add = obj.mca
        if(curr_add > MAX_MCA){
          res.sendStatus(400)
          return
        }
        obj.mca = curr_add+1
        var json = JSON.stringify(obj)
        fs.writeFileSync('mcas.json', json)
        res.send({address: convertMcaIntToStr(curr_add)})
      }
    }
  })
})

app.delete('/', (req, res) => {
  /*
  * Determine if MCA to delete has been consumed.
  * If so push the MCA to recycled_mcas array, sort, and send Status 200
  * Else send Status 400 */
  const { mca } = req.body
  let mca_int = convertMcaStrToInt(mca)
  fs.readFile("mcas.json", (err, data) => {
    if(err){
      console.log(err)
    }
    else{
      var obj = JSON.parse(data)
      if(mca_int < obj.mca && obj.recycled_mcas.includes(mca_int) === false){
        obj.recycled_mcas.push(mca_int)
        obj.recycled_mcas.sort((a, b) => a - b)
        var json = JSON.stringify(obj)
        fs.writeFileSync('mcas.json', json)
        res.sendStatus(200)
      }
      else{
        res.sendStatus(400)
      }
    }
  })
})

const convertMcaStrToInt = (mca) => {
  if(mca){
    var results = mca.split(".")
    if(results.length != 4){
      return -1
    }
    let hex_str = "0x"
    for (var i = 0; i < results.length; i++){
      var hex = ('00' + parseInt(results[i], 10).toString(16).toUpperCase()).slice(-2); //00
      hex_str = hex_str + hex
    }
    return parseInt(Number(hex_str), 10)
  }
  else{
    return -1
  }
}

const convertMcaIntToStr = (mca_int) => {
  var hex = parseInt(mca_int, 10).toString(16).toUpperCase()
  var mca_normal_format = ""

  for (var i = 0; i < 8; i+=2){
    var hex_str = '0x' + hex.substring(i, i+2)
    var dec = Number(hex_str)
    if (i==0){
      mca_normal_format = dec
    }
    else{
      mca_normal_format += '.' + dec
    }
  }
  return mca_normal_format
}

export default app