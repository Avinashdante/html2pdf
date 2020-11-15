'use strict';

const {Server} = require('hapi');
const head = require('hapi-cors-headers')
const fs = require('fs')
const inert = require('inert')
const init = async () => {

    const server = new Server()
    server.connection({
        port :3000
    })
    server.ext('onPreResponse',head)
    //  Hapi.server({
    //     port: 3000,
    //     host: 'localhost'
    // });
    server.register([inert],err=>{
        if(err){
            console.log(err)
        }
        server.route([{
            method: 'GET',
            path: '/',
            handler: (request, h) => {
    
                return h('Hello World!');
            }
        },
        {
            method: 'GET',
            path: '/{name*}',
            handler: async (request, h) => {
                const path = `./testfiles/${request.params.name}`
                console.log(path)
             try {
                if(fs.existsSync(path)){
                    console.log('file exists');
                    // setTimeout(() => {  
                    // }, 0000);
                    return h.file(path)
                }else {
                    console.log('no file exists')
                    return h({error:true,msg:'no file exists'})
                }
             } catch (error) {
                return h({error:true,msg: error})
             }
            }
        }]);
    })
   

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();