import checkNumInputs from "./checkNumInputs";
const forms = (state) => {
	const form = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');

	checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: 'Loading...',
		success: 'Success',
		error: 'Error :('
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		const res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
	}

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		})
	};

	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);
			if (item.getAttribute('data-calc') === "end"){
				for(let key in state){
					formData.append(key,state[key]);
				}
			}

			postData('assets/server.php', formData)
				.then(data => {
					console.log(data);
					statusMessage.textContent = message.success;
				})
				.catch(e => {
					statusMessage.textContent = message.error;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
					for(let key in state) {
						delete state[key];
					}
					document.querySelector('.popup_calc_button').disabled = true;
					document.querySelector('.popup_calc_profile_button').disabled = true;
				})
		});
	})
};

export default forms;