const program = require('commander')
const exec = require('child_process').exec
const fs = require('fs')

program
.command('create <name>')
.action(function (name) {
  exec(`git clone --depth=1 https://github.com/GGICE/Ant.git ${name} && rm -rf ${name}/.git`, function(error, stdout){
    var config
    if(error) {
      console.error(error)
    } else {
      config = fs.readFileSync(`${name}/package.json`).toString()
      config = JSON.parse(config)
      config.name = name
      config.version = '0.0.1'
      fs.writeFileSync(`${name}/package.json`, JSON.stringify(config, null, 2))
      console.log(`Done!`)
      console.log(`cd ${name} && yarn && node index.js`)
    }
})
});

program.parse(process.argv)