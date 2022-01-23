
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//to make html files and their modification
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//to extract css
const devMode = process.env.NODE_ENV !== "production";
//__dirname je absolutní adresa tohot souboru webpack.config.js a 'public' je umisteni, kde se ma vytvorit bundle
//path potřebuje absolutní cestu, kde se má vytvořit bundel, modul path.resolve to vytvoří za nás 
module.exports = {
    devtool: 'eval-source-map', //tohle mělo umožnit vidět ts soubory v debugeru prohlížeče a debugovat v nich, ale dubuger je ma načtené defaultně
    mode: 'development',
    entry: './src/app.ts',
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            scriptLoading: 'module' ,
            publicPath:'./',
            inject: 'body',
            minify: {
                minifyCSS: true,
                minifyJS:true
            }
        }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    module: {
        rules: [
            {
                test:/\.tsx?$/, //puvodne bylo bez "x" a "?", tedy "test: /\.ts$/"
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test:/\.m?js$/,
                exclude:/(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets:["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use:[
                        {
                            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
                        },
                        {
                            loader:"css-loader",
                                options: {//enable to read css modules
                                    esModule: true,
                                    modules: {
                                    exportGlobals: true, //namedExport
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]'
                                    }
                                }
                        },
                        {
                            //"postcss-loader", nenainstalovano
                            loader:"sass-loader",
                        }
                    ],
                    include: /\.module\.s[ac]ss$/ //include pro zahrnutí global sass/scss
            },
            {//pro zahrnutí global scss/sass bylo potreby vytvorit novy loader blok pro scss/sass soubory a použití slov include a exclude
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
                    },
                    {
                        loader:"css-loader"
                    },
                    {
                        //"postcss-loader", nenainstalovano
                        loader:"sass-loader",
                    }
                ],
                exclude: /\.module\.s[ac]ss$/, //exclude pro zahrnutí global sass/scss
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/i,
                type:"asset"
            },
            {
                test:/\.(svg)$/i,
                type: "asset/source"
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        //publicPath: 'public', //enable when you need to load bundle.js from public, then Live Reloading is disabled this do not compile new bundle.js, you have to do in cmd line
        filename: 'bundle.js',
        path: path.resolve(__dirname,'public'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true //vymaze vsechno v outputove složce, tedy v public
        
    },
  };