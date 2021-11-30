const motherWidth = [
	830, 860, 950, 980, 1055, 1055, 1290, 1290, 1290, 1290, 1290, 1290, 1470, 1470, 1470, 1470, 1470,
	1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1470, 1590, 1590,
];
class MotherCoil {
	constructor(width) {
		this.width = width;
		this.springCoils = [];
		this.residue = width;
	}
}
const motherCoils = motherWidth
	.sort()
	.map(w => new MotherCoil(w));
module.exports = motherCoils;
