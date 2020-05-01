const path = require("path");

module.exports = {
	mode: "production",
	target: "web",
	devtool: "none",
	entry: path.join(process.cwd(), "src", "index.tsx"),
	output: {
		path: path.join(process.cwd(), "repo", "pwa-res"),
		filename: "app.js"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	module: {
		rules: [{
			test: /\.(jsx?|tsx?)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/preset-typescript",
						"@babel/preset-react",
						[
							"@babel/preset-env",
							{
								targets: "> 0.1%"
							}
						]
					],
					plugins: [
						["@babel/plugin-proposal-class-properties",
							{
								"loose": true
							}
						]
					]
				}
			}
		}, {
			test: /\.css$/i,
			use: [{
				loader: "style-loader",
				options: {
					injectType: "singletonStyleTag"
				},
			},
			{
				loader: "css-loader",
				options: {
					modules: {
						localIdentName: "[local]_[hash:base64:5]"
					}
				}
			},
			{
				loader: "postcss-loader",
				options: {
					plugins: () => [
						require("postcss-preset-env")({ browsers: "> 0.1%" }),
						require("cssnano")()
					]
				}
			},
			],
		}, ]
	}
};