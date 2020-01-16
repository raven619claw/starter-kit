module.exports = {
  verbose: true,
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'src/shared/utils'],
  // to have same resolvers as webpack add them here
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less|scss)$':
      'identity-obj-proxy',
    'client/(.*)$': '<rootDir>/src/client/$1',
    'shared/(.*)$': '<rootDir>/src/shared/$1',
    'assets/(.*)$': '<rootDir>/src/assets/$1',
    'config/(.*)$': '<rootDir>/config/$1'
  }
  // transformIgnorePatterns: [
  //   '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
  //   '^.+\\.module\\.{css,sass,scss}$',
  // ],
}
