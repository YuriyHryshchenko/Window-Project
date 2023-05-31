import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
	const windowForm = document.querySelectorAll('.balcon_icons_img'),
			windowWidth = document.querySelectorAll('#width'),
			windowHeight = document.querySelectorAll('#height'),
			windowType = document.querySelectorAll('#view_type'),
			windowProfile = document.querySelectorAll('.checkbox'),
			nextButtonFirst = document.querySelector('.popup_calc_button'),
			nextButtonSecond = document.querySelector('.popup_calc_profile_button');

	checkNumInputs('#width');
	checkNumInputs('#height');

	function bindActionToElems(event, elem, prop){
		nextButtonFirst.disabled = true;
		nextButtonSecond.disabled = true;
		elem.forEach((item, i) => {
			item.addEventListener(event, () => {
				switch(item.nodeName) {
					case 'SPAN':
						state[prop] = i;
						break;
					case 'INPUT':
						if(item.getAttribute('type') === 'checkbox'){
							i === 0 ? state[prop] = 'Cold' : state[prop] = 'Warm';
							elem.forEach((box, j) => {
								box.checked = false;
								if(i == j) {
									box.checked = true;
								}
							})
						} else {
							state[prop] = item.value;
						}
						break;
					case 'SELECT':
						state[prop] = item.value;
						break;
				}
				console.log(state);
				if(state.form && state.width && state.height){
					nextButtonFirst.disabled = false;
				}
				
				if(state.type && state.profile){
					nextButtonSecond.disabled = false;
				}
			})
		});
	}
	bindActionToElems('click', windowForm, 'form');
	bindActionToElems('input', windowWidth, 'width');
	bindActionToElems('input', windowHeight, 'height');
	bindActionToElems('change', windowType, 'type');
	bindActionToElems('change', windowProfile, 'profile');
}

export default changeModalState;