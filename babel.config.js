module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'//babel解码预设
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
