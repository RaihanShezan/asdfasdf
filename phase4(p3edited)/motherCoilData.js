const motherWidth = [
	830, 860, 950, 980, 1055, 1055, 1290, 1290, 1290, 1290, 1290, 1290, 1470, 1470, 1470, 1470, 1470,
	1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1590, 1590,
];
const motherWeight = [
	2260, 6065, 6065, 3465, 1510, 2660, 6210, 6210, 6220, 6240, 1370, 5100, 6450, 6310, 6310, 6310,
	4700, 5010, 3240, 2680, 6370, 6450, 6830, 6470, 6360, 6370, 6360, 6810, 6785, 6460, 6310,
];
class MotherCoil {
	constructor(width, weight) {
		this.width = width;
		this.weight = weight;
		this.springCoils = [];
		this.residue = width;
	}
}
const motherCoils = motherWidth.map((wid, idx) => new MotherCoil(wid, motherWeight[idx]));
motherCoils.sort((a, b) => {
	if (a.width > b.width) {
		return -1;
	} else if (a.width < b.width) {
		return 1;
	} else {
		// both width equal, sort by weight
		return a.weight >= b.weight ? -1 : 1;
	}
});

module.exports = motherCoils;
