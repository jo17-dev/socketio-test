// modàà
class Nombre {
    #valeur;

    constructor(valeur){
        this.#valeur = valeur;
    }

    getNombre(){
        return this.#valeur;
    }

    setNombre(nouvelleValeur){
        if (typeof nouvelleValeur === 'number') {
            this.#valeur = nouvelleValeur;
        } else {
        console.warn('La valeur doit être un nombre');
        }
    }
}

module.exports = new Nombre(56);