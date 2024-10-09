const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Ваша точка входу
  output: {
    path: path.resolve(__dirname, "dist"), // Вихідна директорія
    filename: "bundle.js", // Назва вихідного файлу
  },
  mode: "development", // Режим: 'development' або 'production'
  devServer: {
    static: path.join(__dirname, "dist"), // Використання 'static' для devServer
    port: 3000, // Порт для dev-сервера
    hot: true, // Додати підтримку гарячої заміни
    open: true, // Автоматичне відкриття браузера
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/, // Підтримка JS, JSX, TS, TSX
        include: path.resolve(__dirname, "src"), // Шлях до вашого коду
        loader: "babel-loader", // Використовуємо babel-loader
        options: {
          
          presets: [
            [
              require.resolve("babel-preset-react-app"), // Пресет для React
              {
                runtime: "automatic", // Налаштування для JSX
              },
            ],
          ],
          plugins: [
            // Додати плагіни для Babel тут, якщо потрібно
          ],
          cacheDirectory: true, // Кешування
          cacheCompression: false,
          compact: false, // Зменшення коду
        },
      },
      {
        test: /\.css$/, // Обробка CSS
        use: ["style-loader", "css-loader"], // Завантажувачі для CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Шаблон HTML
      filename: "index.html", // Вихідний HTML-файл
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Дозволяє імпорт без розширень
  },
};
