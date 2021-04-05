(() => {
	window.storage = {
		get: get,
		getItem: get,
		setItem: set,
		removeItem: remove,
		set: set,
		remove: remove
	}
	async function get(item){
		return await fetch(`https://storage.explosionscratc.repl.co/get/${escape(item)}`).then(res => res.json());
	}
	async function set(item, newThing){
		return await fetch(`https://storage.explosionscratc.repl.co/set/${escape(item)}?q=${escape(newThing)}`).then(res => res.json());
	}
	async function remove(item){
		return await fetch(`https://storage.explosionscratc.repl.co/delete/${escape(item)}`).then(res => res.json());
	}
})();