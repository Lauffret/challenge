const fs = require("fs");

const FILE_STUDENT = './Data/students.txt';
const FILE_STUDENT2 = './Data/students2.txt';
const PRECISION = 100;
/** 
1. Lisez le fichier à l'aide de la méthode asynchrone. 

2. Recherchez dans le tableau tous les étudiants qui ont eu plus de 17 strictement.

3. Recherchez dans le tableau l'étudiant qui a eu la meilleur node.

4. Récupérez les données dans l'objet student (voir ci-dessous), puis ajoutez chaque étudiant dans un tableau students.

5. Ordonnez maintenant l'ensemble des données dans le tableau.

-- exercices supplémentaires

6. Ajoutez dans le fichier students.text les étudiants suivants :

7. Récupérez tous les étudiants habitant à Paris et placez les dans un nouveau fichier.

8. Faire la moyenne des notes, puis ordonner les valeurs par ordre de longueur des noms.

*/

// 1.
// On utilise le tableau de manière globale pour traiter chacune des questions

fs.readFile(FILE_STUDENT, "utf8", (err, data) => {
  // Gestion des erreurs
  if (err) {
    console.error(err);
    return;
  }

  // on gère le retour chariot \r (éventuel) et saut de ligne \n et on écrase le tableau précédent avec les résultats
  const lines = data.split(/\r?\n/);
  console.log("callback", lines)
});

// 1.bis
// ici le tableau st sera utiliser dans un contexte synchrone aucun problème pour la suite du script. Par contre si c'est asynchrone comme dans la fonctionc readFile vous devez mettre tout le code dans la fonction de callback
let st = [];
try {
  st = fs.readFileSync(FILE_STUDENT, "utf8").split(/\r?\n/);
  st = st.filter((data) => data != "");
} catch (err) {
  console.error(err);
}

const more17 = [];
// En utilisant la première fonction nous pouvons utiliser le tableau lines de manière globale
for (line of st) {
  for (l of line.split(" ")) {
    if (l > 17) {
      more17.push(l);
    }
  }
}

console.log(more17)

// Meilleur note

let bestNote = 0;

for (line of st) {
  for (l of line.split(" ")) {
    if (isNaN(l) === false && l > bestNote) {
      bestNote = parseInt(l);
    }
  }
}

console.log("best note", bestNote);

// 4

const students = []; // tableau pour récupérer les données.

for (line of st) {
  // assignation par décomposition
  const [note, name, address] = line.split(" ");
  // on peut également virer la ligne où se trouve les labels avec cette astuce
  if (name === "Name") continue;
  students.push({ name, note, address });
}

console.log(students);

// 5

students.sort((a, b) => a.note - b.note)

console.log(students);

// 6
(function () {

  const { appendFileSync, open, writeFileSync, readFileSync } = fs;

  /**
  - 18 Sonia Paris
  - 17 Clarisse Marseille
   */


  for (const st of ["\n", "16 Sonia Paris", "\n", "20 Clarisse Marseille"]) {
    appendFileSync(FILE_STUDENT, st);
  }

  const students = readFileSync(FILE_STUDENT, "utf8").split(/\r?\n/);

  for (const st of students) appendFileSync(FILE_STUDENT2, st + "\n", "utf8");

})();

// 8

console.log(students.map(st => parseFloat(st.note)));
let sum = students.map(st => parseFloat(st.note)).reduce((acc, curr) => acc + curr);
const len = students.length;
if (len > 0) {
  const avg = Math.floor(sum / len * PRECISION) / PRECISION;

  console.log(avg);
}
