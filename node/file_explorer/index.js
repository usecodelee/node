var fs=require('fs'),
    stdin=process.stdin,
    stdout=process.stdout;


fs.readdir(__dirname,function(err,files){
    console.log('');
    if(!files.length){
        return console.log('\033[31m没有文件\033[39m');
    }
    console.log('你想看哪一个文件？');
    var stats=[];

    function file(i){
        var filename=files[i];
        fs.stat(__dirname+'/'+filename,function(err,stat){
            stats[i]=stat;
            if(stat.isDirectory()){
                console.log(i+'\033[36m'+filename+'\033[39m');
            }else{
                console.log(i+'\033[90m'+filename+'\033[39m');
            }
            if(++i==files.length){
                read();
                
            }else{
                file(i);
            }
        });
    }

    function read(){
        console.log('');
        stdout.write('\033[33m输入你的选择:\033[39m');
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data',option);
    }
    function option(data){
        var filename=files[Number(data)];
        if(!filename){
            stdout.write('\033[33m输入你的选择:\033[39m');
        }else{
            stdin.pause();

            if(stats[Number(data)].isDirectory()){
                fs.readdir(__dirname+'/'+filename,function(err,files){
                    console.log('');
                    console.log('('+files.length+'files)');
                    files.forEach((file)=>{
                        console.log('-'+file);
                    });
                    console.log('');
                })
            }else{
                fs.readFile(__dirname+'/'+filename,'utf8',function(err,data){
                    console.log('');
                    console.log('\033[90m'+data.replace(/(.*)/g,'$1')+'\033[39m');
                });
            }
        }
    }
    file(0);
});