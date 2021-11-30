const pieces = require('./piecesData');
const motherCoils = require('./motherCoilData');

// Take the minimum of length/width of each piece & save as size of LW object for each piece
class LW {
	constructor(piece, size) {
		this.piece = piece;
		this.size = size;
	}
}
// Create a lwPool & sort from largest size to smallest
const savedPool = pieces.map(p => {
	const size = p.length <= p.width ? p.length : p.width;
	return new LW(p, size);
});
savedPool.sort((a, b) => (a.size >= b.size ? -1 : 1));

/**************************************************************************/
const placeNewBatch = (lwPool, tempMotherCoils) => {
	while (lwPool.length > 0) {
		const currentLW = lwPool.shift();
		let i = 0;
		while (!currentLW.piece.positioned && i < tempMotherCoils.length) {
			const currentMotherCoil = tempMotherCoils[i];
			if (currentMotherCoil.residue > currentLW.size) {
				// if bucket is large enough, place it
				currentMotherCoil.springCoils.push(currentLW.piece);
				currentMotherCoil.residue -= currentLW.size;
				currentLW.piece.positioned = true;

				/*
            step 2: consider motherCoil fully used along length, so
            - calculate no. of  additional pieces created (using weight to width proportion of mother & spring coil)
            - adjust currentLW.piece.target (reducing newly made pieces from target)
            */
				const currentSpringCoilWeight =
					currentMotherCoil.weight * (currentLW.size / currentMotherCoil.width);
				const additionalPieces = Math.floor(currentSpringCoilWeight / currentLW.piece.weight);
				currentLW.piece.target -= additionalPieces;
			} else {
				// if not enough residue, move to next motherCoil
				i++;
			}
		}
	}
};

/*
place & cut a batch, doing this will cut 1 batch of all pieces parallely, not focussing on crossing a single piece's target

1. in the end all positioned becomes true, so convert all to false & run again
2. at this stage, filter motherCoils array, if residue is below the lowest LW size, reject it
3. Run this whole cycle
*/

let lwPool = savedPool.slice(0);
let tempMotherCoils = motherCoils.slice(0);
while (tempMotherCoils.length > 0) {
	placeNewBatch(lwPool, tempMotherCoils);
	lwPool = savedPool.filter(l => l.piece.target > 0);
	lwPool.forEach(l => (l.piece.positioned = false));
	const minSize = Math.min(...lwPool.map(l => l.size));
	tempMotherCoils = motherCoils.filter(mc => mc.residue >= minSize);
}

console.log(
	'Targets - ',
	savedPool.map(l => `${l.size} - ${l.piece.target}`),
);
console.log(motherCoils.map(m => m.residue));
