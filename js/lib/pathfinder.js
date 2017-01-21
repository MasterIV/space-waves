define(['geo/v2'], function (V2) {
	function Pathfinder(map) {
		this.map = map;
	}

	Pathfinder.prototype.find = function(start, end) {
		var path = [];
		var open = [];
		var nodes = [];
		var current;

		for (var x = 0; x < this.map.size.x; x++)
			nodes[x] = [];

		function Node(pos) {
			this.position = pos;
			this.parent = current;
			this.closed = false;

			this.G = current == null ? 10 : current.G + 10;
			this.H = (Math.abs(pos.x - end.x) + Math.abs(pos.y - end.y)) * 10;
			this.F = this.G + this.H;
		}

		function addOpen(pos) {
			var node;

			if(nodes[pos.x][pos.y]) {
				node = nodes[pos.x][pos.y];
				if(node.closed) return;
				if(node.G <= current.G + 10) return;

				node.parent = current;
				node.G = current.G + 10;
				node.F = node.G + node.H;
			} else {
				node = new Node(pos);
				nodes[pos.x][pos.y] = node;
				open.push(node);
			}
		}

		current = new Node(start);
		open.add(current);

		while(!end.equal(current)) {
			current.closed = true;
			arrayRemove(open, current);

			var adjacent = map.getAdjacent(current.position);
			while( adjacent.length ) addOpen(adjacent.shift());
			if(open.length < 1) throw "No Path available.";

			for(var i in open)
				if(current.closed || current.F > open[i].F)
					current = open[i];
		}

		while( current.parent ) {
			path.add(current.position);
			current = current.parent;
		}

		return path;
	};
});