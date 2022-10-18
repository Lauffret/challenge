let count = 0;
const MAX = 5;

console.log(
  "Vous devez commencer le jeu choisissez un nombre compris entre 1 à 100"
);

const searchNumber = Math.floor ( Math.random() * 100 ) + 1 ;

process.stdin.on("data", (chunk) => {
  const number = parseInt(chunk);

  // error firts 
  if (isNaN(number) === true) {
    console.log("ce n'est pas un nombre");

    return;
  }

  count += 1 ;

  if (count > MAX) {
    console.log(`Vous avez dépasser les ${MAX} tentatives, le nombre était ${searchNumber}`);
    process.exit(0);
  }

  if (number > searchNumber) {
    console.log(`Le nombre est plus petit que ${number}`);
  } else if (number < searchNumber) {
    console.log(`Le nombre est plus grand que ${number}`);
  } else {
    console.log(
      `Vous avez gagnez en ${count}, c'était bien le nombre ${searchNumber}`
    );
    process.exit(0);
  }
});
