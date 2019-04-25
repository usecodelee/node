var net=require('net');



var count=0,users={};
var server=net.createServer(function(conn){
    conn.setEncoding('utf8');
    conn.write('welcome'+'\n'+count+'people'+'\n'+'请输入姓名：');
    count++;
    var username;
    conn.on('data',function(data){
        console.log(data);
        data=data.replace('\r\n','');
        if(!username){
            if(users[data]){
                conn.write('该名字被使用了请换个名字');
                return;
            }
            else{
                username=data;
                users[username]=conn;
                for (var i in users) {
                    users[i].write(username+'加入了聊天');
                }
            }
        }else{
            for (var i in users) {
                if(i !== username){
                    users[i].write(username+':'+data);
                }
            }
        }
    });
    conn.on('close',function(){
        count--;
        delete users[username];
        for (var i in users) {
            users[i].write(username+'退出了');
        }
    });
});

server.listen(3000,function(){
    console.log('服务监听端口：3000');
});