function getPos (obj, x, y) {
	var w = obj.width;
	var h = obj.height;
	var d = obj.data;

	var color = [];

	color[0] = d[4*(x+y*w)];
	color[1] = d[4*(x+y*w) + 1];
	color[2] = d[4*(x+y*w) + 2];
	color[3] = d[4*(x+y*w) + 3];

	return color;
}

function setPos (obj, x, y, color) {
	var w = obj.width;
	var h = obj.height;
	var d = obj.data;

	d[4*(y*w+x)] = color[0];
	d[4*(y*w+x)+1] = color[1];
	d[4*(y*w+x)+2] = color[2];
	d[4*(y*w+x)+3] = color[3];

}