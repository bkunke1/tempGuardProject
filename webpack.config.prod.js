const path = require('path');

// eslint-disable-next-line no-undef
module.exports = {
    mode: 'production',
    entry: {
        dashboard: './src/dashboard.js',
        history: './src/history.js',
        settings: './src/settings.js',
        support: './src/support.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'assets', 'scripts')
    }
    devtool: 'cheap-source-map'
};
