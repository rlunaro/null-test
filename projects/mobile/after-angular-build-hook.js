// File needs to be CommonJs
// Taken from: 
// https://forum.ionicframework.com/t/possible-solution-to-capacitor-and-angular-i18n-incompatibility/236633
const fs = require("fs");
const path = require("node:path");

const INDEX_HTML_PATH = "./projects/mobile/www/index.html";
const htmlContent =
`<script type="text/javascript">

const currentLocale = navigator.language;
const availableLocales = #availableLocales#;

if( availableLocales.indexOf(currentLocale) >= 0 ){
  // current locale is supported
  window.location.href = "./" + currentLocale + "/index.html";
}else{
  // remove possible dialect variant 'es-AR' -> 'es'
  const languageOnly = currentLocale.replace( /-.*/, "" );
  if( availableLocales.indexOf(languageOnly) >= 0 ){
    // language only variant is supported ("es" instead of "es-AR")
    window.location.href = "./" + languageOnly + "/index.html";
  }else{
    // fall back to default locale
    window.location.href = "./" + availableLocales[0] + "/index.html";
  }
}
</script>`;

module.exports = function () {
  console.log(`creating index.html in ${process.cwd()}...`);
  const availableLocales = readAvailableLocales();
  createIndexHtml( htmlContent.replace("#availableLocales#", JSON.stringify(availableLocales) ) );
};

function createIndexHtml( htmlContent ) {

  fs.writeFile(INDEX_HTML_PATH, htmlContent, (error) => {
    if (error) {
      throw new Error(`Error writing file: ${INDEX_HTML_PATH}`, { cause: error });
    } else {
      console.log("Successfully created file:", INDEX_HTML_PATH);
    }
  });
}

/**
 * Read the available locales from the angular.json file itself.
 * 
 * The first locale will be the default locale. 
 * 
 * @returns the available locales configured at the configurations > production > localize entry in angular.json
 */
function readAvailableLocales( ){
  angularJsonFile = path.join( __dirname, "..", "..", "angular.json" );
  angularConfig = JSON.parse( fs.readFileSync( angularJsonFile, { encoding: 'utf-8' } ) ); 
  return angularConfig.projects.mobile.architect.build.configurations.production.localize;
}

