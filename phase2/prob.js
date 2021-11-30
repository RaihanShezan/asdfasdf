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
let lwPool = pieces.map(p => {
	const size = p.length <= p.width ? p.length : p.width;
	return new LW(p, size);
});
lwPool.sort((a, b) => (a.size >= b.size ? -1 : 1));
const savedPool = lwPool.slice(0);

/**************************************************************************/
while (lwPool.length > 0) {
	const currentLW = lwPool.shift();
	let i = 0;
	while (currentLW.piece.target > 0) {
		if (i === motherCoils.length) {
			console.log('Ran out of mother coils');
			console.log(
				'Targets - ',
				savedPool.map(l => `${l.size} - ${l.piece.target}`),
			);
			console.log(motherCoils.map(m => m.residue));
			process.exit(1);
		}

		const currentMotherCoil = motherCoils[i];
		if (currentMotherCoil.residue > currentLW.size) {
			/*
         if current motherCoil residue is large enough, place it
         step 1: 1d solve - get optimal motherCoil to place a new piece (by width only)
         */
			currentMotherCoil.springCoils.push(currentLW.piece);
			currentMotherCoil.residue -= currentLW.size;

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
			// if current motherCoil residue is NOT large enough take a new motherCoil, i.e. increment i
			i++;
		}
	}
}

console.log(motherCoils.slice(0, 1));
