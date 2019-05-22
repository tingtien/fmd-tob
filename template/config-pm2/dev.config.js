module.exports = {
    "apps": [{
        "name": "react-starAtlas-admin",
        "script": "./index.js",
        "watch": ["app/server"],
        "node_args": "--harmony",
        "merge_logs": true,
        "cwd": "./",
        "instances": 1,
        "exec_mode": "cluster",
        "env": {
            "CONFIG": 'config/dev.config.js'
        }
    }]
};