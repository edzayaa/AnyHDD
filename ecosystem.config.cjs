module.exports = {
    apps: [
        {
            name: "anyhdd",
            script: "build/bin/server.js",
            exec_mode: "cluster",
            instances: "max",
            autorestart: true,
            watch: false,
            max_memory_restart: "900M",
            env_production: {
                NODE_ENV: "production",
                PORT: 3333,
            },
            error_file: "./.logs/err.log",
            out_file: "./.logs/out.log",
            merge_logs: true,
            time: true,
        },
    ],
};