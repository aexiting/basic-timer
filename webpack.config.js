const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,

            },

            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
            ],

    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};