// Jack Stamcos -- 101225743

const fs = require("fs")
function dataDeleter() {
    return Promise.all(
      ['canada', 'usa'].map(
        file =>
          new Promise((res, rej) => {
            try {
              fs.unlink(`${file}.txt`, err => {
                if (err){
                    console.log(`${file}.txt does not exist`)
                }
                else{
                    console.log(`${file}.txt has been deleted`);
                }
              });
            } catch (err) {
              console.error(err);
              rej(err);
            }
          })
      )
    );
  }

  dataDeleter()

  const csv = require('csv-parser')
  const results = [];
  fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
      var arr2 = [];
      var arr3 =[];
       for(let i = 0; i < results.length; i++){
            switch(true) {
                case (results[i]['country']==="Canada")://if
                arr2.push(results[i]['country'] + ", " + results[i]['year'] + ", " + results[i]['population'])
                var filename = 'canada.txt';
                var str = JSON.stringify(arr2, null, " ");
                fs.writeFile(filename, str, function(err){
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("Record: " + i + ' written to canada.txt!');
                    }
                });
                break
                case (results[i]['country']==="United States")://else if
                arr3.push(results[i]['country'] + ", " + results[i]['year'] + ", " + results[i]['population'])
                var filename2 = 'usa.txt';
                var str2 = JSON.stringify(arr3, null, " ");
                fs.writeFile(filename2, str2, function(err){
                  if(err) {
                      console.log(err)
                  } else {
                      console.log("Record: " + i + ' written to usa.txt!');
                  }
              });
                  break
                default://else
                 break
               }  
    }
  });