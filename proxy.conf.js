const PROXY_CONFIG =[
    {
        context: ['/api'],
        target: 'https://10.1.2.210:7284/',
        secure: false,
        loglevel : 'debug'
    }
    ]
    module.exports = PROXY_CONFIG;