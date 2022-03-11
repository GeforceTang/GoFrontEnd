(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	const vm = new Vue({
		el: ".todoapp",
		data: {
			viewlst: [
				{ id: 1, todo: '今天', flag: true },
				{ id: 2, todo: '明天', flag: false }
			],
			todoText: '',
			active: 1,
			nowEditItem: -1
		},
		methods: {
			activeState(state) {
				this.active = state
			},
			addTodo(event) {
				if (this.todoText === '')
					return

				this.viewlst.push({
					id: this.viewlst.length + 1,
					todo: this.todoText,
					flag: false
				})
				this.todoText = ''
			},
			deleteTodo(item) {
				let index = this.viewlst.indexOf(item)
				this.viewlst.splice(index, 1)
			},
			clearCompleted() {
				this.viewlst = this.viewlst.filter(item => !item.flag)
			},
			canShow(item) {
				if (this.active === 2 && item.flag)
					return false
				if (this.active === 3 && !item.flag)
					return false
				return true
			},
			showEdit(id) {
				this.nowEditItem = id
			},
			submit() {
				this.nowEditItem = -1
			}
		},
		computed: {
			countNeedTodo() {
				return this.viewlst.filter(item => !item.flag).length
			}
		}
	});

})(window);
