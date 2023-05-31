const images = () => {
	const imgPopup = document.createElement('div'),
			workSection = document.querySelector('.works'),
			bigImage = document.createElement('img'),
			scroll = calcScroll();

	imgPopup.classList.add('popup');
	workSection.appendChild(imgPopup);

	imgPopup.style.display = 'none';
	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	bigImage.style.width = '400px';
	bigImage.style.height = '400px';

	imgPopup.appendChild(bigImage);

	workSection.addEventListener('click', (e) => {
		e.preventDefault();
		if(e.target && e.target.matches('.preview')){
			imgPopup.style.display = 'flex';
			document.body.style.overflow = 'hidden';
			document.body.style.marginRight = `${scroll}px`;
			const path = e.target.parentNode.getAttribute('href');
			bigImage.setAttribute('src', path);
		}

		if(e.target && e.target.matches('div.popup')){
			imgPopup.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;
		}
	})
	function calcScroll() {
		const div = document.createElement('div');
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);

		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}
}

export default images;