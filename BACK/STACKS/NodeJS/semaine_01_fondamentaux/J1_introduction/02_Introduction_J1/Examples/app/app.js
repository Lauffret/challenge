const { utils : { foo , baz} } = require('./utils');

const utils = require('./utils');

console.log(foo());
console.log(baz());

console.log(utils.utils.foo())

// chargement du module dans le script courant
const os = require('os');

// on récupère les informations de l'utilisateur
const { username } = os.userInfo();

// on récupère le nombre de CPU
const cpus = os.cpus().length;

console.log(
  `Cet ordinateur appartient à ${username} il a ${cpus} CPU.`
);


process.stdin.on('data', (chunk) => {
    console.log(chunk);
    // récupère le flux et le converti en chaine de caractères, la méthode replace permet de supprimer le saut de ligne            
    const text = chunk.toString().replace("\n", ""); 

    console.log(text);

    if(text === 'stop') process.exit(0); 
});